import { createNodeDefinitions } from "./render/rules.js";
import { JSNode, FullMintreeNode } from "./types/node.js";
import { JSNodeDefinition } from "./types/node_definition.js";
import { renderCompressed, renderWithFormatting, renderWithSourceMap, renderWithFormattingAndSourceMap } from "./render/render.js";
import { JSNodeClass } from "./types/node_class_type.js";
import { JSNodeTypeLU } from "./types/node_type_lu.js";
import { JSNodeType } from "./types/node_type.js";
import { ext } from "./tools/extend.js";
import { expression_parser, javascript_parser, statement_parser } from "./parser/parse.js";
import env, { JSParserEnv } from "./parser/env.js";


const extendAll = node => ext(node, true);

////@ts-ignore Make harness available to all modules.
const global_object = (typeof global !== "undefined") ? global : window;

if (global_object) {
    const cfw_js_data = {
        type: { JSNodeTypeLU: JSNodeTypeLU },
        parse: {
            script: javascript_parser,
            statement: statement_parser,
            expression: expression_parser,
        },
        extend: ext,
        extendAll,
        render: {
            compressed: renderCompressed,
            withFormatting: renderWithFormatting,
            withSourceMap: renderWithSourceMap,
            withFormattingAndSourceMap: renderWithFormattingAndSourceMap,
            createNodeDefinitions
        }
    };
    //@ts-ignore
    if (typeof global_object.cfw == "undefined") {
        //@ts-ignore
        global_object.cfw = { js: cfw_js_data };
        //@ts-ignore
    } else Object.assign(global_object.cfw, { js: cfw_js_data });
}

export * from "./render/rules.js";
export * from "./render/render.js";
export {

    //Pure Types
    JSParserEnv,
    JSNodeClass,
    JSNodeType,
    JSNodeDefinition,
    JSNode,
    FullMintreeNode,


    //Type Object
    JSNodeTypeLU,

    //Objects
    env as JSParserEnvironment,
    javascript_parser as parser,
    expression_parser as exp,
    statement_parser as stmt,

    ext,
    extendAll
};