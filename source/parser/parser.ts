import Whind from "@candlefw/whind";

import { lrParse } from "@candlefw/hydrocarbon";

import env from "./env.js";

import ecmascript_parser_data from "./ecmascript.js";

export default function ecmascript_parser(lex) {
    if (typeof lex == "string")
        lex = new Whind(lex);
    
    const result = lrParse(lex, ecmascript_parser_data, env);

    if(result.error)
    	throw new SyntaxError(result.error);

    return result.value;
}
