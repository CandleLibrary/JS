import { Lexer } from "@candlefw/whind";
export interface MinTreeNode {
    pos: Lexer;
    type: string;
    vals: Array<MinTreeNode | any>;
}
