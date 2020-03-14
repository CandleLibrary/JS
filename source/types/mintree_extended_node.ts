import { MinTreeNode } from "./mintree_node.js";
/**
 * Additional Type information for extended nodes.
 */
export type MinTreeExtendedNode = MinTreeNode & {
    /**
     *
     */
    expression?: MinTreeExtendedNode;
    identifier?: MinTreeExtendedNode;
    object?: MinTreeExtendedNode;
    member?: MinTreeExtendedNode;
    property?: MinTreeExtendedNode;
    module_id?: MinTreeExtendedNode;

    /**
     * Available on FromClause
     */
    url?: MinTreeExtendedNode;

    /**
     * Available on Specifier
     */
    local_id?: MinTreeExtendedNode;

    /**
     * Available on ImportDeclaration and ExportDeclaration
     */
    from?: MinTreeExtendedNode;

    /**
     * Available on binary expression nodes
     */
    left?: MinTreeExtendedNode;

    /**
     * Available on binary expression nodes
     */
    right?: MinTreeExtendedNode;

    /**
     * Available on Specifier nodes
     */
    original?: MinTreeExtendedNode;

    /**
     * An IdentifierModule node
     * 
     * Available on Specifier nodes
     */
    transformed?: MinTreeExtendedNode;


};
