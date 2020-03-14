import { Lexer } from "@candlefw/whind";
import { MinTreeNodeType } from "./mintree_node_type.js";
/**
 * A Node within a JS MinTree AST
 */
export interface MinTreeNode {

    /**
     *  A **cfw.whind** Lexer that has been fenced to the 
     *  to the starting point of the node's production
     *  within the parsed string.  
     * 
     * Calling `node.pos.slice()` will return a string
     * with the exact text the node covers. 
     */
    pos: Lexer;

    /**
     * A number with information on the MinTreeNodeType and
     *  MinTreeNodeClass of this particular node.
     * 
     * MinTreeNodeType membership can be determined with an equality expression, e.g:
     * ```js
     * node.type == MinTreeNodeType.*
     * ```
     * 
     * MinTreeNodeClass membership can be determined using a bitwise AND expression, e.g:
     * ```js
     * node.type & MinTreeNodeClass.*
     * ```
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

    /**
     * The operating symbol in a binary expression.
     * 
     * Available on binary expression nodes
     */
    symbol?;
}
