/**
 * Parses bigint
 */

import { parser, renderCompressed } from "@candlelib/js";

let { ast } = parser("1n;");

assert(renderCompressed(ast) == "1n;");