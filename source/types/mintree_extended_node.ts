import { MinTreeNode } from "./mintree_node.js";
/**
 * Additional Type information for extended nodes.
 */
export type MinTreeExtendedNode = MinTreeNode & {
    /**
     *
     */
    expression?: MinTreeNode;
    identifier?: MinTreeNode;
    object?: MinTreeNode;
    member?: MinTreeNode;
    property?: MinTreeNode;
};
