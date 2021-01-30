import { JSNode } from "./JSNode.js";
/**
 * Additional Type information for extended nodes.
 */
export type MinTreeExtendedNode = JSNode & {
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

    /**
     * An Identifier node
     * 
     * Available on FunctionDeclaration and FunctionExpression nodes
     */
    name?: MinTreeExtendedNode;

    /**
     * A Block node
     * 
     * Available on FunctionDeclaration and FunctionExpression nodes
     */
    body?: MinTreeExtendedNode;

    /**
     * An Identifer node
     * 
     * Available on LabeledStatement nodes
     */
    label?: MinTreeExtendedNode;

    /**
     * An node with class of STATEMENT
     * 
     * Available on LabeledStatement nodes
     */
    statement?: MinTreeExtendedNode;

    arguments?: MinTreeExtendedNode;

    parameters?: MinTreeExtendedNode;
};
