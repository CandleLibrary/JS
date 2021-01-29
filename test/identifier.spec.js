/**
 * Parses and renders identifiers
 */

import { parser, renderCompressed, exp, JSNodeTypeLU } from "@candlefw/js";

let { ast } = parser("$identifier;");

const expr = exp("$identifier;");

assert(renderCompressed(ast) == "$identifier;");

assert(expr.type == JSNodeTypeLU.IdentifierReference); 