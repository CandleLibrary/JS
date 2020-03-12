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
    module_id?: MinTreeNode;

    /**
     * Available on Specifier
     */
    local_id?: MinTreeNode;

    /**
     * Available on ImportDeclaration and ExportDeclaration
     */
    from?: MinTreeNode;

    /**
     * Available on binary expression nodes
     */
    left?: MinTreeNode;

    /**
     * Available on binary expression nodes
     */
    right?: MinTreeNode;

    /**
     * Available on Specifier nodes
     */
    original?: MinTreeNode;

    /**
     * An IdentifierModule node
     * 
     * Available on Specifier nodes
     */
    transformed?: MinTreeNode;


};
