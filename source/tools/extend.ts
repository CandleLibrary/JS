import { extract, replace, traverse } from "@candlefw/conflagrate";

import { MinTreeNodeDefinitions } from "../nodes/mintree_nodes.js";
import { MinTreeNodeDefinition } from "../nodes/min_tree_node_definition.js";
import { MinTreeExtendedNode } from "../types/mintree_extended_node.js";
import { MinTreeNode } from "../types/mintree_node.js";
import { MinTreeNodeType } from "../types/mintree_node_type.js";

class NodeExtender {

    getters: Array<string | object>;
    constructor(getters) {
        this.getters = getters;
    };

    extend(node: MinTreeNode): MinTreeExtendedNode {
        const object = {};
        let index = 0;

        for (const prop of this.getters) {
            if (typeof prop == "string") {
                Object.defineProperty(object, prop, {
                    get: (i => function () { return this.nodes[i]; })(index)
                });
            } else {
                const name = Object.getOwnPropertyNames(prop)[0];
                const val = prop[name];
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
function ExtenderBuilder(node_definitions: Array<MinTreeNodeDefinition>): Map<MinTreeNodeType, NodeExtender> {

    const extenders: Map<MinTreeNodeType, NodeExtender> = new Map();

    for (const node_definition of node_definitions) {

        const extender = buildExtender(node_definition);

        extenders.set(node_definition.name, extender);
    }

    return extenders;

}

let Extenders: Map<string, NodeExtender> = null;

/**
 * Takes a MinTreeNode node and returns an extended version with OO properties
 * 
 * @param {MinTreeNode} node - A MinTreeNode to extend.
 * @param {boolean} EXTEND_ENTIRE_TREE - If true, the entire tree of subnode extending from `node` will also be extended. 
 */
export function ext(node: MinTreeNode, EXTEND_ENTIRE_TREE: boolean = false): MinTreeExtendedNode {

    console.log({ node, EXTEND_ENTIRE_TREE });

    if (EXTEND_ENTIRE_TREE) {

        const object = { ast: null };

        traverse(node, "nodes").then(replace((node, parent, index) => {

            if (!Extenders)
                Extenders = ExtenderBuilder(MinTreeNodeDefinitions);

            const extender = Extenders.get(node.type);

            if (!extender)
                throw new Error(`Cannot find string renderer for MinTree node type ${node.type}`);

            const replaced = extender.extend(node);

            if (parent)
                parent.nodes[index] = replaced;

            if (replaced.nodes)
                replaced.nodes = replaced.nodes.slice();


            return replaced;

        })).then(extract(object));

        return object.ast;
    } else {

        if (!Extenders)
            Extenders = ExtenderBuilder(MinTreeNodeDefinitions);

        const extender = Extenders.get(node.type);

        if (!extender)
            throw new Error(`Cannot find string renderer for MinTree node type ${node.type}`);

        return extender.extend(node);
    }
}

