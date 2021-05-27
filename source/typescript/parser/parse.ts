import { lrParse } from "@candlelib/hydrocarbon/build/library/runtime.js";
import { Lexer } from "@candlelib/wind";
import { traverse } from "@candlelib/conflagrate";
import { JSNode } from "../types/JSNode";
import javascript_parser_data from "./javascript.js";
import { JSNodeClass } from "../types/node_class_type.js";
import env from "./env.js";
import js_parser from "./parser.js";
interface ParserResult {
    error: string;
    value: any;
}
/**
 * Parses an input string and returns a MinTree AST data structure. 
 * @throws it will throw a SyntaxError if the input could be completely parsed.
 * @param lex Either a string or a cfw.wind Lexer that contains the string data to be parsed.
 */
export function javascript_parser(arg: any | string | Lexer, debug_info = null): { ast: JSNode, comments: Lexer[]; } {

    let str = arg,
        lexer = str;

    if (typeof str === "string")
        lexer = new Lexer(str);

    if (!(lexer instanceof Lexer))
        throw new ReferenceError("Invalid argument. lex is not a string or a Lexer.");

    const
        result: ParserResult = lrParse<JSNode>(lexer, javascript_parser_data, env, debug_info),
        comments = env.comments.slice();

    env.comments = null;

    if (result.error)
        throw new SyntaxError(result.error);

    return { ast: <JSNode>result.value, comments };
}
/**
 * Parses an input string and returns a MinTree AST data structure. 
 * @throws it will throw a SyntaxError if the input could be completely parsed.
 * @param lex Either a string or a cfw.wind Lexer that contains the string data to be parsed.
 */
export function javascript_parser_new(arg: any | string | Lexer, debug_info = null): { ast: JSNode, comments: Lexer[]; } {
    //*
    let str = arg,
        lexer = str;

    if (typeof str === "string")
        lexer = new Lexer(str);

    if (!(lexer instanceof Lexer))
        throw new ReferenceError("Invalid argument. lex is not a string or a Lexer.");

    const { FAILED, result, error_message } = js_parser(str, env);

    const comments = [];

    env.comments = null;

    if (FAILED)
        throw new SyntaxError(error_message);

    const node = result[0];

    return { ast: <JSNode>node, comments };
    //*/
}

/**
 * Parses an input string and returns the AST of the first JSNode identified as a MinTreeTypeClass EXPRESSION or LITERAL
 * @param expression
 * @throws Throws an EvalError if the string cannot be parsed into an expression AST.
 */
export function expression_parser(expression: any | string | Lexer): JSNode {

    const { ast } = javascript_parser(expression);

    for (const { node } of traverse(ast, "nodes")
        .bitFilter("type",
            JSNodeClass.EXPRESSION
            | JSNodeClass.LITERAL
            | JSNodeClass.IDENTIFIER)
    ) return node;

    throw new EvalError(`String [ ${expression.join("")} ] does not contain an expression.`);
}
/**
 * Parses an input string and returns the AST of the first JSNode identified as a MinTreeTypeClass STATEMENT
 * @param statement 
 * @throws Throws an SyntaxError if the string cannot be parsed into a statement AST.
 */
export function statement_parser(
    /** Any string or @candlelib/wind Lexer that contains at least one TypeScript statement. **/
    statement: any | string | Lexer
): JSNode {

    const { ast } = javascript_parser(statement);

    for (const { node } of traverse(ast, "nodes").bitFilter("type", JSNodeClass.STATEMENT))
        return node;

    throw new EvalError(`String [ ${statement.join("")} ] does not contain a statement.`);
}