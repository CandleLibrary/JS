import { MinTreeNodeDefinitions, MinTreeNodeRenderClass } from "../nodes/mintree_node_extensions.js";
import { MinTreeNode } from "../types/mintree_node.js";
import { MinTreeNodeDefinition } from "../nodes/mintree_node_definition.js";
import { MinTreeNodeType } from "../ecma.js";
import { addNewColumn, addNewLines, incrementColumn, getLastLine } from "./source_map_functions.js";

const defaultStringFormatter = (str: string, type: MinTreeNodeType): string => str;

let Renderers: Array<NodeRenderer> = null, FormatRules: FormatRule[] = null, g_formatString = defaultStringFormatter;
type FormatRule = MinTreeNodeRenderClass;

function tabFill(count: number): string {
    return ("    ").repeat(count);
}


type RenderStub = (
    node: MinTreeNode,
    format_rules: FormatRule[],
    level: number,
    line: number,
    map?: Array<number[]>,
    source_index?: number,
    names?: Map<string, number>,
) => { str: string, level: number, line: number; };

class RenderAction {
    action_list: Array<RenderStub>;

    constructor(action_list: Array<RenderStub>) {
        this.action_list = action_list;
    }

    render(node: MinTreeNode, map: Array<number[]>, format_rules: FormatRule[], level: number, source_index?: number, names?: Map<string, number>)
        : string {

        let string = [], line = 0;

        for (const action of this.action_list) {
            const { str, level: lvl, line: ln }
                = action(node, format_rules, level, line, map, source_index, names);
            line = ln;
            level = lvl;
            string.push(str);
        }

        return string.join("");
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

    render(node: MinTreeNode, format_rules: FormatRule[] = [], level: number = 0, map: Array<number[]> = null, source_index: number = -1, names = null): string {
        for (const cond of this.condition_branches) {
            if (!!node[cond.prop])
                return cond.action.render(node, map, format_rules, level, source_index, names);
        }

        const flag = (node.nodes) ? node.nodes.map((v, i) => !!v ? 1 << i : 0).reduce((r, v) => r | v, 0) : 0xFFFFFFFF;

        for (const cond of this.val_presence_branches) {
            if ((cond.flag & flag) == flag)
                return cond.action.render(node, map, format_rules, level, source_index, names);
        }

        return this.default_branch.render(node, map, format_rules, level, source_index, names);
    }
}

function getRenderRule(node: MinTreeNode, format_rules: FormatRule[]) {

    const rule = format_rules[(node.type >>> 24) & 0xFF] || 0;

    return {
        min_element_split: (rule >> MinTreeNodeRenderClass.MIN_LIST_ELE_LIMIT_SHIFT) & 0xF,
        new_line_count: (rule >> MinTreeNodeRenderClass.NEW_LINES_SHIFT) & 0xF,
        line_split_count: (rule >> MinTreeNodeRenderClass.LIST_SPLIT_SHIFT) & 0xF,
        indent_count: (rule >> MinTreeNodeRenderClass.INDENT_SHIFT) & 0xF,
        OPTIONAL_SPACE: (rule >> MinTreeNodeRenderClass.OPTIONAL_SPACE_SHIFT) & 0x1
    };
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
        regex = /\t|\n|%|0|1|(\@\((\w+),([^\)]+)\s*\))|(\@\.\.\.[^])|(\@[\w\_][\w\_]*\??)|(\@[\w]*\??)|(\\\?|[^01\n?@%])+/g,
        actions_iterator: IterableIterator<RegExpMatchArray> = template_pattern.matchAll(regex),
        action_list: Array<RenderStub> = [];

    let last_index = -1;
    //*
    for (const match of actions_iterator) {

        let string = match[0];

        switch (string[0]) {

            case "@": {

                let CONDITIONAL = false;

                if (string.slice(-1) == "?") {
                    string = string.slice(0, -1);
                    CONDITIONAL = true;
                }

                //Conditional - Insertion
                if (string.slice(0, 2) == "@(") {

                    const
                        CONDITION_PROP_NAME = match[2],
                        sym = match[3];

                    action_list.push((node: MinTreeNode, format_rules, level, line, map, source_index) => {

                        if (node[CONDITION_PROP_NAME]) {

                            if (map) addNewColumn(map, String(sym).length, source_index, node.pos.line, node.pos.column, sym);

                            return { str: String(sym), level, line };

                        } else return { str: "", level, line };

                    });
                }

                //Spread-Value-Insertion
                else if (string.slice(0, 4) == "@...") {

                    const
                        index = last_index + 1,
                        delimiter = string[4] == "%" ? "" : string[4];

                    action_list.push((node: MinTreeNode, format_rules, level, line, map, source_index, names) => {

                        const { line_split_count, min_element_split, OPTIONAL_SPACE } = getRenderRule(node, format_rules),
                            nodes = node.nodes;

                        let sub_map = map ? [] : null, len = nodes.length;

                        const strings = nodes.slice(index).map((n, i) => {

                            let child_map: number[][] = map ? [] : null;

                            const str = render(n, child_map, source_index, names, format_rules, level, node, i);

                            if (map) sub_map.push(child_map);

                            len += str.length;

                            return str;
                        }),
                            SPLIT_LINES = (line_split_count > 0 && min_element_split > 0
                                && (min_element_split < (len / 10) || nodes.length > min_element_split));

                        line += strings.length * +SPLIT_LINES;

                        if (SPLIT_LINES) {

                            const
                                space_fill = tabFill(level),
                                delim_string = ("\n").repeat(line_split_count) + space_fill,
                                dls = delimiter.length;

                            if (map) {
                                const l = sub_map.length;
                                let i = 0;
                                for (const child_map of sub_map) {
                                    addNewLines(map, line_split_count);
                                    addNewColumn(map, space_fill.length, source_index);
                                    getLastLine(map).push(...(child_map[0] || []));
                                    map.push(...child_map.slice(1));
                                    if (i++ < l)
                                        addNewColumn(map, dls);
                                }
                            }

                            return { str: delim_string + strings.join(delimiter + delim_string), level, line };
                        } else {
                            const
                                delim_string = delimiter + (" ").repeat(OPTIONAL_SPACE);

                            if (map) {
                                const l = sub_map.length;
                                let i = 0;
                                for (const child_map of sub_map) {
                                    getLastLine(map).push(...(child_map[0] || []));
                                    map.push(...child_map.slice(1));
                                    if (i++ < l)
                                        addNewColumn(map, delim_string.length);
                                }
                            }

                            return { str: strings.join(delim_string), level: -1, line };
                        }
                    });
                }

                //Value-Index-Insertion
                else if (!isNaN(parseInt(string.slice(1)))) {

                    const index = parseInt(string.slice(1)) - 1;

                    action_list.push((node: MinTreeNode, format_rules, level, line, map, source_index, names) => {

                        if (CONDITIONAL && !node.nodes[index]) return { str: "", level, line };

                        return ({
                            str: render(node.nodes[index], map, source_index, names, format_rules, level, node, index),
                            line,
                            level
                        });
                    });

                    last_index = index;
                }

                //Non-Value-Insertion
                else {
                    const prop = string.slice(1);
                    action_list.push((node: MinTreeNode, fr, level, line, map, source_index) => {

                        const str = g_formatString(String(node[prop]), node.type);

                        if (map) addNewColumn(map, str.length, source_index, node.pos.line, node.pos.column, str);

                        return { str, level, line };
                    });
                }
            } break;//*
            case "\n": {

                action_list.push((node: MinTreeNode, format_rules, level, line, map, source_index) => {

                    const { new_line_count } = getRenderRule(node, format_rules),
                        str = new_line_count > 0 ? ("\n").repeat(new_line_count) + tabFill(level) : "";

                    line += new_line_count;

                    if (map && new_line_count > 0) {
                        addNewLines(map, new_line_count);
                        addNewColumn(map, tabFill(level).length, source_index, node.pos.line, node.pos.column);
                    }

                    return { str, level, line };
                });
            } break;
            case "%": {

                action_list.push((node: MinTreeNode, format_rules, level, line, map, source_index) => {

                    const { OPTIONAL_SPACE } = getRenderRule(node, format_rules),
                        str = (" ").repeat(OPTIONAL_SPACE);

                    if (map) incrementColumn(map, OPTIONAL_SPACE);

                    return { str, level, line };
                });
            } break;
            case "1": {

                action_list.push((node: MinTreeNode, format_rules, level, line) => {

                    const { indent_count } = getRenderRule(node, format_rules);

                    return { str: "", level: level + indent_count, line };
                });
            } break;
            case "0": {

                action_list.push((node: MinTreeNode, format_rules, level, line, map, source_index) => {

                    const { indent_count } = getRenderRule(node, format_rules),
                        REMOVE_INDENT = (indent_count && line > 0),
                        nl = REMOVE_INDENT ? ("\n") + tabFill(level - indent_count) : "";

                    line += +REMOVE_INDENT;

                    if (map && +REMOVE_INDENT) {
                        addNewLines(map, 1);
                        addNewColumn(map, tabFill(level - indent_count).length, source_index, node.pos.line, node.pos.column);
                    }

                    return { str: nl, level: level - indent_count, line };

                });
            } break;
            default: {

                const str = string.replace(/\\\?/, "?");

                if (str)
                    action_list.push((node: MinTreeNode, fr, level, line, map, source_index) => {

                        const out_str = g_formatString(str, node.type);

                        if (map) addNewColumn(map, out_str.length, source_index, node.pos.line, node.pos.column);

                        return { str: out_str, level, line };
                    });
            } break;
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

    /* Elision nodes are special cases that have a unique render action */
    if (node_definition.type == MinTreeNodeType.Elision) {
        _default = new RenderAction(
            [(n, m, level, line, map) => {
                if (map) addNewColumn(map, n.count, n.pos.line, n.pos.column);
                return { str: (",").repeat(n.count), level, line };
            }]
        );
    } else if (typeof template_pattern == "object") {

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
    } else
        _default = buildRendererFromTemplateString(template_pattern);

    return new NodeRenderer(conditions, present_vals, _default);
}

/**
 * Creates a map of NodeRenderers  
 * 
 *  @param node_definitions
 */
export function RendererBuilder(node_definitions: Array<MinTreeNodeDefinition>)
    : { renderers: NodeRenderer[]; } {

    const renderers = new Array(256);

    for (const node_definition of node_definitions) {

        const renderer = buildRenderer(node_definition);

        renderers[node_definition.type >>> 24] = renderer;
    }

    return { renderers };

}

export function RenderFormatBuilder(node_definitions: Array<MinTreeNodeDefinition>)
    : { format_rules: FormatRule[]; } {
    const format_rules = new Array(256);

    for (const node_definition of node_definitions) {
        format_rules[node_definition.type >>> 24] = node_definition.format_rule;
    }

    return { format_rules };
}




/**
 *  Takes a MinTreeNode and produces a string comprising the rendered productions of the ast.
 * @param node - A root node of a MinTree
 * @param map - An optional array to store source map information.
 * @param source_index - The index of the source file to store in the source map information.
 * @param names - A Map of translation names that 
 * @param format_rules - A an array of @type {FormatRule} values.
 * @param formatString - A function that is called on primitive values to allow for syntax highlighting.
 * @param level - Internal Use - Disregard
 * @param parent - Internal Use - Disregard
 * @param index - Internal Use - Disregard
 */
export function render(
    node: MinTreeNode,

    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,

    //format rules
    format_rules = FormatRules,

    level = 0,
    parent = node,
    index = 0,
): string {

    if (!node)
        throw new Error(`Unknown node type passed to render method from ${MinTreeNodeType[parent.type]}.nodes[${index}]`);

    const renderer = Renderers[node.type >>> 24];

    if (!renderer)
        throw new Error(`Cannot find string renderer for MinTree node type ${MinTreeNodeType[node.type]} from ${MinTreeNodeType[parent.type]}.nodes[${index}]`);
    try {
        return renderer.render(node, format_rules, level, map, source_index, names);
    } catch (e) {
        throw new Error(`Cannot render ${MinTreeNodeType[node.type]}${parent !== node ? ` child of ${MinTreeNodeType[parent.type]}.nodes[${index}]` : ""}:\n ${e.message}`);
    }
}

function prepareRender(
    node: MinTreeNode,
    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,

    //format rules
    format_rules = FormatRules
): string {


    /*
        Load Renderers on demand to allow for MinTreeNodeDefinition modifications, additions.
    */
    if (!Renderers) {
        const
            { renderers } = RendererBuilder(MinTreeNodeDefinitions),
            { format_rules: frs } = RenderFormatBuilder(MinTreeNodeDefinitions);
        Renderers = renderers;
        FormatRules = frs;
        if (!format_rules)
            format_rules = frs;
    }

    const str = render(node, map, source_index, names, format_rules, 0, node, 0);
    //Reset formatStrings

    g_formatString = defaultStringFormatter;

    return str;
}

export function renderCompressed(
    node: MinTreeNode
) {
    return prepareRender(node);
}

export function renderWithFormatting(
    node: MinTreeNode,

    //format rules
    format_rules = FormatRules,
    formatString: (str: string, type: MinTreeNodeType) => string = defaultStringFormatter
) {
    if (typeof formatString == "function")
        g_formatString = formatString;

    return prepareRender(node, undefined, undefined, undefined, format_rules);
}

export function renderWithSourceMap(
    node: MinTreeNode,

    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,
) {
    return prepareRender(node, map, source_index, name);
}

export function renderWithFormattingAndSourceMap(
    node: MinTreeNode,

    //format rules
    format_rules = FormatRules,
    formatString: (str: string, type: MinTreeNodeType) => string = defaultStringFormatter,


    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,
) {
    if (typeof formatString == "function")
        g_formatString = formatString;

    return prepareRender(node, map, source_index, names, format_rules);
}