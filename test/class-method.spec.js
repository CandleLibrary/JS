import { parser, renderCompressed } from "../build/library/javascript.js";

const
    strA = `class A{js(){}};`,
    strB = `class A{js(){a;}};`,
    strC = `class A extends C{js(){a;}};`,
    strD = `class A extends C{js(){a;}get D(){}};`,
    strE = `class A extends C{js(){a;}set E(d=0){}};`;

assert(renderCompressed(parser(strA).ast) == strA);
assert(renderCompressed(parser(strB).ast) == strB);
assert(renderCompressed(parser(strC).ast) == strC);
assert(renderCompressed(parser(strD).ast) == strD);
assert(renderCompressed(parser(strE).ast) == strE);
