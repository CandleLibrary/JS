import { Lexer } from "@candlefw/whind";
import { MinTreeNode } from "../nodes/mintree_node";
/**
 * Parses an input string and returns a MinTree AST data structure.
 * @throws it will throw a SyntaxError if the input could be completly parsed.
 * @param lex Either a string or a cfw.Whind Lexer that contains the string data to be parsed.
 */
export default function ecmascript_parser(lex: string | Lexer): MinTreeNode;
