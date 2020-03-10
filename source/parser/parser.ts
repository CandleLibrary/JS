import { lrParse } from "@candlefw/hydrocarbon";
import { Lexer } from "@candlefw/whind";
import { traverse, bit_filter, replace } from "@candlefw/conflagrate";

import { MinTreeNode } from "../types/mintree_node";
import ecmascript_parser_data from "./ecmascript.js";
import { MinTreeNodeClass, MinTreeNodeType } from "../types/mintree_node_type.js";
import env from "./env.js";

interface ParserResult {
    error: string;
    value: any;
}
/**
 * Parses an input string and returns a MinTree AST data structure. 
 * @throws it will throw a SyntaxError if the input could be completely parsed.
 * @param lex Either a string or a cfw.Whind Lexer that contains the string data to be parsed.
 */
export function ecmascript_parser(lex: string | Lexer | TemplateStringsArray): MinTreeNode {
    let lexer = lex;

    if (Array.isArray(lex))
        lex = lex.join("");

    if (typeof lex === "string")
        lexer = new Lexer(lex);

    if (!(lexer instanceof Lexer))
        throw new ReferenceError("Invalid argument. lex is not a string or a Lexer.");

    const result: ParserResult = lrParse(lexer, ecmascript_parser_data, env);

    if (result.error)
        throw new SyntaxError(result.error);

    return <MinTreeNode>result.value;
}


export function expression_parser(expression) {
    const ast = ecmascript_parser(expression);

    for (const node of traverse(ast, "type").then(bit_filter("type", MinTreeNodeClass.EXPRESSION)))
        return node;

    return null;
}

export function statement_parser(statement) {
    const ast = ecmascript_parser(statement);

    for (const node of traverse(ast, "nodes").then(bit_filter("type", MinTreeNodeClass.STATEMENT))) {
        return node;
    }

    return null;
}