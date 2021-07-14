/**
 * Parses bigint
 */

import { parser, renderCompressed } from "../build/library/javascript.js";

let { ast } = parser("1n;");

assert(renderCompressed(ast) == "1n;");