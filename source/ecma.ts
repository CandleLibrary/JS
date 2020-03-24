import { MinTreeNodeDefinitions, createNodeDefinitions, MinTreeNodeRenderClass } from "./nodes/mintree_node_extensions.js";
import { MinTreeNode } from "./types/mintree_node.js";
import { MinTreeNodeDefinition } from "./nodes/mintree_node_definition.js";
import { render, RenderFormatBuilder, RendererBuilder } from "./tools/render.js";
import { MinTreeNodeType, MinTreeNodeClass } from "./types/mintree_node_type.js";
import { ext } from "./tools/extend.js";
import { getIdentifierName } from "./tools/get_identifier_name.js";

import { expression_parser, ecmascript_parser, statement_parser } from "./parser/parser.js";

const extendAll = node => ext(node, true);


export {
    MinTreeNodeClass,
    getIdentifierName,
    MinTreeNodeType,
    MinTreeNodeDefinition,
    MinTreeNodeDefinitions,
    MinTreeNodeRenderClass,
    MinTreeNode,
    ecmascript_parser as parser,
    expression_parser as exp,
    statement_parser as stmt,
    render,
    ext,
    extendAll,
    createNodeDefinitions,
    RenderFormatBuilder as buildRenderFormatArray,
    RendererBuilder as buildRendererArray
};