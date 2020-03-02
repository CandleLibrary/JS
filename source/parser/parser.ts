import { lrParse } from "@candlefw/hydrocarbon";
import { Lexer } from "@candlefw/whind";

import { MinTreeNode } from "../nodes/mintree_node";
import ecmascript_parser_data from "./ecmascript.js";
import env from "./env.js";

interface ParserResult {
    error: string;
    value: any;
}
/**
 * Parses an input string and returns a MinTree AST data structure. 
 * @throws it will throw a SyntaxError if the input could be completly parsed.
 * @param lex Either a string or a cfw.Whind Lexer that contains the string data to be parsed.
 */
export default function ecmascript_parser(lex: string | Lexer): MinTreeNode {

    if (typeof lex === "string")
        lex = new Lexer(lex);

    const result: ParserResult = lrParse(lex, ecmascript_parser_data, env);

    if (result.error)
        throw new SyntaxError(result.error);

    return <MinTreeNode> result.value;
}