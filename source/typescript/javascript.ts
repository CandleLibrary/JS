import { Lexer } from "@candlelib/wind";
import { traverse } from "@candlelib/conflagrate";

import { createNodeDefinitions } from "./render/rules.js";
import { JSNode, FullJSNode } from "./types/JSNode.js";
import { JSNodeDefinition } from "./types/node_definition.js";
import { renderCompressed, renderWithFormatting, renderWithSourceMap, renderWithFormattingAndSourceMap } from "./render/render.js";
import { JSNodeClass } from "./types/node_class_type.js";
import { JSNodeTypeLU } from "./types/node_type_lu.js";
import { JSNodeType } from "./types/node_type.js";
import { ext } from "./tools/extend.js";
import { expression_parser, javascript_parser, statement_parser } from "./parser/parse.js";
import env, { JSParserEnv } from "./parser/env.js";
import { getIdentifierName } from "./tools/get_identifier_name.js";

function mergeComments<NodeType>(ast: NodeType & { nodes: NodeType[]; pos: Lexer; }, comments: Lexer[]) {

    for (const comment of comments) {
        let closest_node = null;

        if (!closest_node || closest_node.pos.off < comment.off) {

            for (const { node } of traverse(ast, "nodes")) {
                if (node.pos) {
                    if (node.pos.off < comment.off) continue;

                    //Get the first node who
                    closest_node = node;
                    break;
                }
            }
        }

        if (closest_node) {
            if (!closest_node.comments)
                closest_node.comments = [comment];
            else
                closest_node.comments.push(comment);
        }
    }
}

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
const tools = {
    getIdentifierName: getIdentifierName
};

export * from "./render/rules.js";
export * from "./render/render.js";
export {

    //Pure Types
    JSParserEnv,
    JSNodeClass,
    JSNodeType,
    JSNodeDefinition,
    JSNode,
    FullJSNode as FullMintreeNode,

    //Type Object
    JSNodeTypeLU,

    //Objects
    env as JSParserEnvironment,
    javascript_parser as parser,
    expression_parser as exp,
    statement_parser as stmt,

    ext,
    extendAll,

    tools
};
export * from "./types/JSBase.js";
export * from "./types/JSNodeClasses.js";
export * from "./types/JSFunction.js";
export * from "./types/JSIdentifier.js";
export * from "./types/JSModule.js";
export * from "./types/JSObject.js";
export * from "./types/JSOperator.js";
export * from "./types/JSPrimitive.js";
export * from "./types/JSScript.js";
export * from "./types/JSStatement.js";
export * from "./types/JSTemplate.js";