/**
 * Parses bigint
 */

import { parser, renderCompressed } from "@candlefw/js";

let { ast } = parser("1n;");

assert(renderCompressed(ast) == "1n;");