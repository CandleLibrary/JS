import { parser, renderCompressed, extendAll, ext } from "@candlefw/js";

const
    strA = `yield this;`,
    strB = `yield * {this:null};`;

assert(parser(strA).ast !== null);

assert(renderCompressed(parser(strA).ast) == "yield this;");

assert(renderCompressed(parser(strB).ast) == "yield* {this:null};");