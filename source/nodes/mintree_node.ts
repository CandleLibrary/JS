import { Lexer } from "@candlefw/whind";
import { MinTreeNodeType } from "./mintree_node_type.js";
/**
 * A Node within a JS MinTree AST
 */
export interface MinTreeNode {
    pos: Lexer;
    type: MinTreeNodeType;
    /**
     * An array of MinTreeNodes
     */
    nodes: Array<MinTreeNode>;
}
