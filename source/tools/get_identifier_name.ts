import { MinTreeNode } from "../types/mintree_node.js";
import { MinTreeNodeType } from "../types/mintree_node_type.js";

/**
 * Returns the root Identifier value when passed a
 * node of one of the following types:
 * 
* - MemberExpressio
 * - Identifier
 * 
 * Returns empty string otherwise.
 * 
 * @param {MinTreeNode} node - a MinTreeNode
 */
export function getIdentifierName(node: MinTreeNode): string {

    switch (node.type) {
        case MinTreeNodeType.IdentifierReference:
        case MinTreeNodeType.IdentifierLabel:
        case MinTreeNodeType.IdentifierBinding:
        case MinTreeNodeType.Identifier:
            return <string>node.value;
        case MinTreeNodeType.MemberExpression:
            return getIdentifierName(node.nodes[0]);
    }

    return "";
};