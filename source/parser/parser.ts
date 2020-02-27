import { lrParse } from "@candlefw/hydrocarbon";
import Whind from "@candlefw/whind";

import { MinTreeNode } from "../nodes/mintree_nodes.js";
import ecmascript_parser_data from "./ecmascript.mjs";
import env from "./env.js";

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

interface ParserResult {
    error: string;
    value: any;
}

export default function ecmascript_parser(lex: string | WhindLexer): MinTreeNode {

    if (typeof lex === "string")
        lex = new Whind(lex);

    const result: ParserResult = lrParse(lex, ecmascript_parser_data, env);

    if (result.error)
        throw new SyntaxError(result.error);

    return <MinTreeNode> result.value;
}
