/**
 * Parses and renders identifiers
 */

import { parser, renderCompressed, exp, JSNodeTypeLU } from "../build/library/javascript.js";

const expr = exp("$identifier");

assert(renderCompressed(expr) == "$identifier");

assert(expr.type == JSNodeTypeLU.IdentifierReference);