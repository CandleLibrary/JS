import { MinTreeNodeDefinitions } from "../nodes/mintree_node_extensions.js";
import { MinTreeNode } from "../types/mintree_node.js";
import { MinTreeNodeDefinition } from "../nodes/mintree_node_definition.js";
import { MinTreeNodeType } from "../ecma.js";
import { createSourceMapEntry, SourceMap } from "@candlefw/conflagrate";
type RenderStub = (arg0: MinTreeNode, map?: SourceMap) => string;

class RenderAction {
    action_list: Array<RenderStub>;

    constructor(action_list: Array<RenderStub>) {
        this.action_list = action_list;
    }

    render(node: MinTreeNode, map: SourceMap): string {
        return this.action_list.map(a => a(node, map)).join("");
    }
}

interface ConditionBranch {
    prop: string,
    action: RenderAction;
}

interface ValuePresenceBranch {
    flag: number,
    action: RenderAction;
}

class NodeRenderer {
    condition_branches: Array<ConditionBranch>;
    val_presence_branches: Array<ValuePresenceBranch>;
    default_branch: RenderAction;
    HAS_CONDITIONS: boolean;
    HAS_VAL_ABSENCE: boolean;

    constructor(condition_branches: Array<ConditionBranch>, val_presence_branches: Array<ValuePresenceBranch>, default_branch: RenderAction) {
        this.HAS_CONDITIONS = !!condition_branches.length;
        this.HAS_VAL_ABSENCE = !!val_presence_branches.length;
        this.condition_branches = condition_branches;
        this.val_presence_branches = val_presence_branches;
        this.default_branch = default_branch;
    }

    render(node: MinTreeNode, map?: SourceMap): string {

        for (const cond of this.condition_branches) {
            if (!!node[cond.prop])
                return cond.action.render(node, map);
        }

        const flag = (node.nodes) ? node.nodes.map((v, i) => !!v ? 1 << i : 0).reduce((r, v) => r | v, 0) : 0xFFFFFFFF;

        for (const cond of this.val_presence_branches) {

            if ((cond.flag & flag) == flag)
                return cond.action.render(node, map);
        }

        return this.default_branch.render(node, map);
    }
}

function buildRendererFromTemplateString(template_pattern: string): RenderAction {

    /* 
        A template pattern may contain template insertion points marked by a [$]
        character. For each insertion point there is an action to perform depending
        on the surrounding syntax:
        
        1. Value-Index-Insertion
        @\n*\?? => This indicates the rendering of the node contained in node.nodes[*] should be
                rendered and the result inserted at this point. 

        2. Spread-Value-Insertion
        @...[.\s] => This indicates that all node.nodes should be rendered and results inserted into
                the output string with a single character separating the entries. If there are proceeding 
                Value-Index-Insertion, the spread will start at the index location following the 
                one specified in Value-Index-Insertion. The spread will be delimited by the character 
                following [@...]

        3. Non-Value-Insertion 
        @\w* => This indicates that a property of node should be inserted into the output
                string, after being coerced to a string value using the string constructor
                String()

        3. Conditional-Insertion
        @(\w+,\.+) => This indicates the truthiness of a node property determines whether
                a string expression is rendered.
    */

    const
        regex = /(\@\((\w+),\s*([^\)]+)\s*\))|(\@\.\.\.[^])|(\@[\w\_][\w\_\n]*\??)|(\@[\w]*\??)|((\\\?|[^?@])+)*/g,
        actions_iterator: IterableIterator<RegExpMatchArray> = template_pattern.matchAll(regex),
        action_list: Array<RenderStub> = [];

    let last_index = -1;

    for (const match of actions_iterator) {
        let str = match[0];


        //Need to determine what type of match we have
        if (str[0] == "@") {

            let CONDITIONAL = false;

            if (str.slice(-1) == "?") {

                str = str.slice(0, -1);

                CONDITIONAL = true;
            }

            //Conditional - Insertion
            if (str.slice(0, 2) == "@(") {

                const CONDITION_PROP_NAME = match[2],
                    sym = match[3];

                action_list.push((node: MinTreeNode, map?: SourceMap): string => {
                    if (node[CONDITION_PROP_NAME]) {

                        if (map) {

                            const col = map.meta.col;

                            map.meta.col += String(sym).length;

                            createSourceMapEntry(0, col, node.pos.line, node.pos.char, "source", "", map);
                        }
                        return String(sym);
                    }
                    return "";
                });
            }

            //Spread-Value-Insertion
            else if (str.slice(0, 4) == "@...") {
                const
                    index = last_index + 1,
                    delimiter = str[4];

                action_list.push((node: MinTreeNode, map?: SourceMap): string => {

                    return node.nodes.slice(index).map((n, i, { length: l }) => {

                        if (i > 0 && map) {

                            const col = map.meta.col;

                            map.meta.col += 1;

                            createSourceMapEntry(0, col, node.pos.line, node.pos.char, "source", "", map);
                        }

                        return render(n, map);

                    }).join(delimiter);
                });
            }

            //Value-Index-Insertion
            else if (!isNaN(parseInt(str.slice(1)))) {

                const index = parseInt(str.slice(1)) - 1;

                action_list.push((node: MinTreeNode, map?: SourceMap): string => {
                    if (CONDITIONAL && !node.nodes[index]) return "";
                    return render(node.nodes[index], map, node, index);
                });

                last_index = index;
            }

            //Non-Value-Insertion
            else {
                const prop = str.slice(1);
                action_list.push((node: MinTreeNode, map?: SourceMap): string => {

                    if (map) {
                        const col = map.meta.col;
                        map.meta.col += String(node[prop]).length;
                        createSourceMapEntry(0, col, node.pos.line, node.pos.char, "source", "", map);
                    }

                    return String(node[prop]);
                });
            }
        }
        //Plain old string insertion
        else {

            str = str.replace(/\\\?/, "?");

            if (str)
                action_list.push((node: MinTreeNode, map?: SourceMap): string => {

                    if (map) {
                        const col = map.meta.col;
                        map.meta.col += String(str).length;
                        createSourceMapEntry(0, col, node.pos.line, node.pos.char, "source", "", map);
                    }

                    return str;
                });
        }
    }

    return new RenderAction(action_list);
}

/**
 *   Builds a string renderer from a MinTreeNodeDefinition
 *   @param node_definition
 */
function buildRenderer(node_definition: MinTreeNodeDefinition): NodeRenderer {

    /* 
        Template pattern may be an object or a string. If it is an object,
        than each key in the object represents a certain condition that is
        checked on MinTreeNode that determines what type of NodeRenderer is used
        to render that version of the node.
 
        For each key in the object:
 
            1. If the key is "default", then use the value as the fallback render template for the node.
 
            2. if the key is [ $(not_{number})+ ], use the value as the render template when certain [nodes] are set to null.
 
            3. Otherwise, use the value if the property node.[key] is set to a truthy value. 
    */

    const
        template_pattern = node_definition.template_pattern,
        conditions: Array<ConditionBranch> = [],
        present_vals: Array<ValuePresenceBranch> = [];

    let _default: RenderAction = null;

    if (typeof template_pattern == "object") {

        const template_pattern_object = template_pattern;

        for (const key in template_pattern) {

            if (key == "default") {

                _default = buildRendererFromTemplateString(template_pattern_object[key]);
            } else if (key[0] == "$") {

                const flag: number = Array
                    .from(key.slice(1).matchAll(/not_(\d+)/))
                    .reduce((r: number, m): number => r ^ (1 << (parseInt(m[1]) - 1)), 0x1FFFFFFF);

                present_vals.push({ flag, action: buildRendererFromTemplateString(template_pattern_object[key]) });
            } else
                conditions.push({ prop: key, action: buildRendererFromTemplateString(template_pattern_object[key]) });
        }
    } else {
        _default = buildRendererFromTemplateString(template_pattern);
    }

    return new NodeRenderer(conditions, present_vals, _default);

}

/**
 * Creates a map of NodeRenderers  
 * 
 *  @param node_definitions
 */
function RendererBuilder(node_definitions: Array<MinTreeNodeDefinition>): Array<NodeRenderer> {

    const renderers = new Array(256);

    for (const node_definition of node_definitions) {

        const renderer = buildRenderer(node_definition);

        renderers[node_definition.name >>> 24] = renderer;
    }

    return renderers;

}

let Renderers: Array<NodeRenderer> = null;

/**
 *  Takes a MinTreeNode and produces a string comprising the rendered productions of the ast.
 */
export function render(node: MinTreeNode, map: SourceMap = null, parent = node, index = 0): string {

    if (!node)
        throw new Error(`Unknown node type passed to render method from ${MinTreeNodeType[parent.type]}.nodes[${index}]`);


    if (map && !map.meta.col)
        map.meta.col = 0;

    /*
        Load Renderers on demand to allow for MinTreeNodeDefinition modifications, additions.
    */
    if (!Renderers)
        Renderers = RendererBuilder(MinTreeNodeDefinitions);

    const renderer = Renderers[node.type >>> 24];

    if (!renderer) {
        throw new Error(`Cannot find string renderer for MinTree node type ${MinTreeNodeType[node.type]}`);
    }

    return renderer.render(node, map);
}