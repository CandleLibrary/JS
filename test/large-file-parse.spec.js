import { parser, parser_new } from "@candlelib/js";
import URL from "@candlelib/uri";
import { default as s } from "acorn";

const d = await URL.resolveRelative("@candlelib/js/build/library/parser/javascript2.js").fetchText();
let g = 0;

harness.markTime();
g = (new s.Parser).parse(d, { sourceType: "module" });
harness.getTime("Acorn");

harness.markTime();
g = parser_new(d);
harness.getTime("Post Hydrocarbon v0.7.* parser");

harness.markTime();
g = parser(d);
harness.getTime("Pre Hydrocarbon v0.7.* parser");

g = "";

assert(g == "");