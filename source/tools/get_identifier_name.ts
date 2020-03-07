import { MinTreeNode } from "../types/mintree_node";
import { MinTreeNodeType } from "../ecma";

/**
 * Returns the root Identifier value when passed a
 * node of one of the following types:
 * 
 * - MemberExpression
 * - Identifier
 * 
 * Returns empty string otherwise.
 * 
 * @param {MinTreeNode} node - a MinTreeNode
 */
export function getIdentifierName(node: MinTreeNode): string {

    switch (node.type) {
        case MinTreeNodeType.Identifier:
            return <string>node.value;
        case MinTreeNodeType.MemberExpression:
            return getIdentifierName(node.nodes[0]);
    }

    return "";
};