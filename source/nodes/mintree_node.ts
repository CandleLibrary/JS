import { Lexer } from "@candlefw/whind";

export interface MinTreeNode {
    pos: Lexer;
    type: string;
    /**
     * An array of MinTreeNodes
     */
    nodes: Array<MinTreeNode | any>;
}
