import { Lexer } from "@candlefw/wind";
import { JSNodeType } from "./node_type";
/**
 * A Node within a JS MinTree AST
 */
export interface JSNode {

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
     * A number with information on the JSNodeType and
     *  JSNodeClass of this particular node.
     * 
     * JSNodeType membership can be determined with an equality expression, e.g:
     * ```js
     * node.type == JSNodeType.*
     * ```
     * 
     * JSNodeClass membership can be determined using a bitwise AND expression, e.g:
     * ```js
     * node.type & JSNodeClass.*
     * ```
     */
    type: JSNodeType;

    /**
     * An array of JSNodes.
     */
    nodes: Array<JSNode>;

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
    symbol?: string;

    /**
     * Number of commas in an Elision node.
     */
    count?: number;
}

export interface ExportDeclaration extends JSNode {
    //@ts-ignore
}


export type FullMintreeNode = JSNode | ExportDeclaration;
