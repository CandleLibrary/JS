import { JSNode } from "../types/node.js";
import { JSNodeType } from "../types/node_type";

/**
 * Returns the root Identifier value when passed a
 * node of one of the following types:
 * 
* - MemberExpression
 * - Identifier
 * 
 * Returns an empty string otherwise.
 * 
 * @param {JSNode} node - a JSNode
 */
export function getIdentifierName(node: JSNode): string {

    switch (node.type) {
        case JSNodeType.IdentifierReference:
        case JSNodeType.IdentifierLabel:
        case JSNodeType.IdentifierBinding:
        case JSNodeType.Identifier:
            return <string>node.value;
        case JSNodeType.MemberExpression:
        case JSNodeType.OptionalChain:
        case JSNodeType.CallExpression:
        case JSNodeType.ExpressionStatement:
            return getIdentifierName(node.nodes[0]);
    }

    return "";
};