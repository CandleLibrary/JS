import { extract, replace, traverse } from "@candlelib/conflagrate";

import { JSNodeDefinitions } from "../render/rules.js";
import { JSNodeDefinition } from "../types/node_definition.js";
import { MinTreeExtendedNode } from "../types/extended_node.js";
import { JSNode } from "../types/JSNode.js";
import { JSNodeTypeLU } from "../types/node_type_lu.js";

class NodeExtender {

    getters: Array<string | object>;
    constructor(getters) {
        this.getters = getters;
    };

    extend(node: JSNode, parent: JSNode): MinTreeExtendedNode {

        const object = { typename: JSNodeTypeLU[node.type], parent };

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

function buildExtender(def: JSNodeDefinition): NodeExtender {
    //extract the getters and assign to a new NodeExtender
    const getters = def.getters;

    return new NodeExtender(getters);
}

/**
 * Creates a map of NodeExtenders  
 * 
 *  @param node_definitions
 */
function ExtenderBuilder(node_definitions: Array<JSNodeDefinition>): Array<NodeExtender> {

    const extenders: Array<NodeExtender> = new Array(256);

    for (const node_definition of node_definitions) {

        const extender = buildExtender(node_definition);

        extenders[node_definition.type >>> 23] = extender;
    }

    return extenders;

}

let Extenders: Array<NodeExtender> = null;

/**
 * Takes a JSNode node and returns an extended version with OO properties
 * 
 * @param {JSNode} node - A JSNode to extend.
 * @param {boolean} EXTEND_ENTIRE_TREE - If true, the entire tree of subnode extending from `node` will also be extended. 
 */
export function ext(node: JSNode, EXTEND_ENTIRE_TREE: boolean = false, parent = node, index = 0): MinTreeExtendedNode {

    if (EXTEND_ENTIRE_TREE) {

        const object = { ast: <MinTreeExtendedNode>null };

        traverse(node, "nodes").replace((node, parent, index) => {

            if (!Extenders)
                Extenders = ExtenderBuilder(JSNodeDefinitions);

            const extender = Extenders[node.type >>> 23];

            if (!extender)
                throw new Error(`Cannot find Node Extender for JSNode type ${JSNodeTypeLU[node.type]}`);

            const replaced = extender.extend(node, parent);

            if (parent)
                parent.nodes[index] = replaced;

            if (replaced.nodes)
                replaced.nodes = replaced.nodes.slice();

            return replaced;

        }).extract(object).run();

        return object.ast;
    } else {

        if (!node)
            throw new Error(`Unknown node type passed to render method from ${JSNodeTypeLU[parent.type]}.nodes[${index}]`);

        if (!Extenders)
            Extenders = ExtenderBuilder(JSNodeDefinitions);

        const extender = Extenders[node.type >>> 23];

        if (!extender)
            throw new Error(`Cannot find Node Extender for MinTree node type ${node.type}`);

        return extender.extend(node, null);
    }
}

