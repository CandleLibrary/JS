import { Lexer } from "@candlelib/wind";
import { JSNode } from "../types/JSNode";
import { JSStatementClass } from "../types/JSStatement";
import env from "./env.js";
import loader from "./parser_new.js";

//@ts-ignore
const { parse: js_parser, entry_points } = await loader;
interface ParserResult {
    error: string;
    value: any;
}
/**
 * Parses an input string and returns a MinTree AST data structure. 
 * @throws it will throw a SyntaxError if the input could be completely parsed.
 * @param lex Either a string or a cfw.wind Lexer that contains the string data to be parsed.
 */
export function javascript_parser(string: string, debug_info = null): { ast: JSNode, comments: Lexer[]; } {

    const { result, err } = js_parser(string, env).result[0];

    if (err)
        throw err;

    return { ast: result[0], comments: [] };
}

/**
 * Parses an input string and returns the AST of the first JSNode identified as a MinTreeTypeClass EXPRESSION or LITERAL
 * @param expression
 * @throws Throws an EvalError if the string cannot be parsed into an expression AST.
 */
export function expression_parser(expression: any | string | Lexer): JSNode {

    const { result, err } = js_parser(expression, env, entry_points.exp);

    if (err)
        throw err;

    return result[0];
}

/**
 * Parses an input string and returns the AST of the first JSNode identified as a MinTreeTypeClass STATEMENT
 * @param statement 
 * @throws Throws an SyntaxError if the string cannot be parsed into a statement AST.
 */
export function statement_parser(
    /** Any string or @candlelib/wind Lexer that contains at least one TypeScript statement. **/
    statement: any | string | Lexer
): JSStatementClass {

    const { result, err } = js_parser(statement, env, entry_points.stmt);

    if (err)
        throw err;

    return result[0];
}

