import { traverse } from "@candlelib/conflagrate";
import { Lexer } from "@candlelib/wind";
import { JSNode } from "../types/JSNode";
import { JSStatementClass } from "../types/JSStatement";
import { JSNodeClass } from "../types/node_class_type.js";
import env from "./env.js";
import loader from "./parser.js";

//@ts-ignore
const js_parser = await loader;
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

    let str = arg;

    const comments = [];

    env.comments = null;

    const ast = js_parser(str, env).result[0];

    return { ast, comments };
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
    ) {
        return node;
    }

    console.log({ expression, ast, d: js_parser(expression, env, js_parser.expression).result[0] });

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
): JSStatementClass {

    const { ast } = javascript_parser(statement);

    for (const { node } of traverse(ast, "nodes").bitFilter("type", JSNodeClass.STATEMENT))
        return <JSStatementClass>node;

    throw new EvalError(`String [ ${statement.join("")} ] does not contain a statement.`);
}

