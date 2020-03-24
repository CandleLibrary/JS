import { extract, replace, traverse } from "@candlefw/conflagrate";

import { MinTreeNodeDefinitions } from "../nodes/mintree_node_extensions.js";
import { MinTreeNodeDefinition } from "../nodes/mintree_node_definition.js";
import { MinTreeExtendedNode } from "../types/mintree_extended_node.js";
import { MinTreeNode } from "../types/mintree_node.js";
import { MinTreeNodeType } from "../types/mintree_node_type.js";

class NodeExtender {

    getters: Array<string | object>;
    constructor(getters) {
        this.getters = getters;
    };

    extend(node: MinTreeNode, parent: MinTreeNode): MinTreeExtendedNode {

        const object = { typename: MinTreeNodeType[node.type], parent };

        let index = 0;

        for (const prop of this.getters) {
            if (typeof prop == "string") {
                Object.defineProperty(object, prop, {
                    get: (i => function () { return this.nodes[i]; })(index)
                });
            } else {

                const
                    name = Object.getOwnPropertyNames(prop)[0],
                    val = prop[name];

                Object.defineProperty(object, name, {
                    get: (i => function () { return this.nodes[val]; })(index)
                });
            }
            index++;
        }

        return Object.assign(object, node);
    }
}

function buildExtender(def: MinTreeNodeDefinition): NodeExtender {
    //extract the getters and assign to a new NodeExtender
    const getters = def.getters;

    return new NodeExtender(getters);
}

/**
 * Creates a map of NodeExtenders  
 * 
 *  @param node_definitions
 */
function ExtenderBuilder(node_definitions: Array<MinTreeNodeDefinition>): Array<NodeExtender> {

    const extenders: Array<NodeExtender> = new Array(256);

    for (const node_definition of node_definitions) {

        const extender = buildExtender(node_definition);

        extenders[node_definition.type >>> 24] = extender;
    }

    return extenders;

}

let Extenders: Array<NodeExtender> = null;

/**
 * Takes a MinTreeNode node and returns an extended version with OO properties
 * 
 * @param {MinTreeNode} node - A MinTreeNode to extend.
 * @param {boolean} EXTEND_ENTIRE_TREE - If true, the entire tree of subnode extending from `node` will also be extended. 
 */
export function ext(node: MinTreeNode, EXTEND_ENTIRE_TREE: boolean = false, parent = node, index = 0): MinTreeExtendedNode {

    if (EXTEND_ENTIRE_TREE) {

        const object = { ast: <MinTreeExtendedNode>null };

        traverse(node, "nodes").then(replace((node, parent, index) => {

            if (!Extenders)
                Extenders = ExtenderBuilder(MinTreeNodeDefinitions);

            const extender = Extenders[node.type >>> 24];

            if (!extender)
                throw new Error(`Cannot find Node Extender for MinTree node type ${MinTreeNodeType[node.type]}`);

            const replaced = extender.extend(node, parent);

            if (parent)
                parent.nodes[index] = replaced;

            if (replaced.nodes)
                replaced.nodes = replaced.nodes.slice();

            return replaced;

        })).then(extract(object)).run();

        return object.ast;
    } else {

        if (!node)
            throw new Error(`Unknown node type passed to render method from ${MinTreeNodeType[parent.type]}.nodes[${index}]`);

        if (!Extenders)
            Extenders = ExtenderBuilder(MinTreeNodeDefinitions);

        const extender = Extenders[node.type >>> 24];

        if (!extender)
            throw new Error(`Cannot find Node Extender for MinTree node type ${node.type}`);

        return extender.extend(node, null);
    }
}

