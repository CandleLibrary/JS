import { Lexer } from "@candlefw/whind";
import { MinTreeNodeType } from "./mintree_node_type.js";
/**
 * A Node within a JS MinTree AST
 */
export interface MinTreeNode {

    /**
     *  A {Lexer} that has been fenced to the 
     *  to the starting point of node's production
     *  within the input string.  
     * 
     * Calling `node.pos.slice()` will return a string
     * with the exact text the node covers. 
     */
    pos: Lexer;

    /**
     * A string with the type name of the node. 
     */
    type: MinTreeNodeType;

    /**
     * An array of MinTreeNodes.
     */
    nodes: Array<MinTreeNode>;

    /**
     * The raw value of the node's production.  
     * 
     * Present on Literal nodes such as NumericLiteral and StringLiteral
     */
    value?: string | number;

    /**
     * Set to true if the node is a MemberExpression with a computed
     * member accessor e.g. `object[computed_property]` 
     * 
     * Present on MemberExpression nodes.
     */
    COMPUTED?: boolean;
}
