import { MinTreeNodeDefinitions, createNodeDefinitions } from "./nodes/mintree_node_extensions.js";
import { MinTreeNode, FullMintreeNode } from "./types/mintree_node.js";
import { MinTreeNodeDefinition } from "./nodes/mintree_node_definition.js";
import { renderCompressed, renderWithFormatting, renderWithSourceMap, renderWithFormattingAndSourceMap } from "./tools/render.js";
import { MinTreeNodeType, MinTreeNodeClass } from "./types/mintree_node_type.js";
import { ext } from "./tools/extend.js";
import { expression_parser, ecmascript_parser, statement_parser } from "./parser/parser.js";
import env, { JSParserEnv } from "./parser/env.js";


const extendAll = node => ext(node, true);

////@ts-ignore Make harness available to all modules.
const global_object = (typeof global !== "undefined") ? global : window;

if (global_object) {
    const cfw_js_data = {
        type: {
            MinTreeNodeClass,
            MinTreeNodeType
        },
        parse: {
            script: ecmascript_parser,
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
export {
    JSParserEnv,
    MinTreeNodeClass,
    MinTreeNodeType,
    MinTreeNodeDefinition,
    MinTreeNodeDefinitions,
    MinTreeNode,
    FullMintreeNode,



    env as JSParserEnvironment,
    ecmascript_parser as parser,
    expression_parser as exp,
    statement_parser as stmt,

    renderCompressed,
    renderWithFormatting,
    renderWithSourceMap,
    renderWithFormattingAndSourceMap,

    ext,
    extendAll,
    createNodeDefinitions
};