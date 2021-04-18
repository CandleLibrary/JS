import { parser_new as parser, renderCompressed, extendAll } from "@candlefw/js";

const
    strA = `({ get: function(){ return hello; } })`,
    strB = `({ get: function id(){ return hello; } })`,
    strC = `({ get: async function id(){ return hello; } })`,
    strD = `({ get: async function * (){ return hello; } })`;

assert(parser(strA).ast !== null);

assert(renderCompressed(parser(strA).ast).trim() == "({get:function(){return hello;}});");
assert(renderCompressed(parser(strB).ast).trim() == "({get:function id(){return hello;}});");
assert(renderCompressed(parser(strC).ast).trim() == "({get:async function id(){return hello;}});");
assert(renderCompressed(parser(strD).ast).trim() == "({get:async function*(){return hello;}});");