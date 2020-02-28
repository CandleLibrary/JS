import { MinTreeNode } from "../nodes/mintree_nodes.js";
interface WhindLexer {
    pos: number;
    char: number;
    tx: string;
    tk: number;
    pk: WhindLexer;
    copy: () => WhindLexer;
    next: () => WhindLexer;
    nx: () => WhindLexer;
    find: (args: string) => string;
}
export default function ecmascript_parser(lex: string | WhindLexer): MinTreeNode;
export {};
