import { lrParse } from "@candlefw/hydrocarbon/build/library/runtime.js";
import { Lexer } from "@candlefw/wind";
import { traverse, bit_filter } from "@candlefw/conflagrate";

import { JSNode } from "../types/node";
import javascript_parser_data from "./javascript.js";
import { JSNodeClass } from "../types/node_class_type.js";
import env from "./env.js";

interface ParserResult {
    error: string;
    value: any;
}
/**
 * Parses an input string and returns a MinTree AST data structure. 
 * @throws it will throw a SyntaxError if the input could be completely parsed.
 * @param lex Either a string or a cfw.wind Lexer that contains the string data to be parsed.
 */
export function javascript_parser(...args: (any[] | string[] | Lexer[])): JSNode {

    let str = args[0],
        lexer = str;

    if (args.length > 0)
        str = args.join("");

    if (typeof str === "string")
        lexer = new Lexer(str);

    if (!(lexer instanceof Lexer))
        throw new ReferenceError("Invalid argument. lex is not a string or a Lexer.");

    const result: ParserResult = lrParse<JSNode>(lexer, javascript_parser_data, env);

    if (result.error)
        throw new SyntaxError(result.error);

    return result.value;
}

/**
 * Parses an input string and returns the AST of the first JSNode identified as a MinTreeTypeClass EXPRESSION or LITERAL
 * @param expression
 * @throws Throws an EvalError if the string cannot be parsed into an expression AST.
 */
export function expression_parser(...expression: (any[] | string[] | Lexer[])) {

    const ast = javascript_parser(...expression);

    for (const { node } of traverse(ast, "nodes")
        .bitFilter("type",
            JSNodeClass.EXPRESSION
            | JSNodeClass.LITERAL
            | JSNodeClass.IDENTIFIER)
    ) return node;

    throw new SyntaxError(`String [ ${expression.join("")} ] does not contain an expression.`);
}
/**
 * Parses an input string and returns the AST of the first JSNode identified as a MinTreeTypeClass STATEMENT
 * @param statement 
 * @throws Throws an SyntaxError if the string cannot be parsed into a statement AST.
 */
export function statement_parser(...statement: any[] | string[] | Lexer[]) {

    const ast = javascript_parser(...statement);

    for (const { node } of traverse(ast, "nodes").bitFilter("type", JSNodeClass.STATEMENT))
        return node;

    throw new SyntaxError(`String [ ${statement.join("")} ] does not contain a statement.`);
}