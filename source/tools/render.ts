import { MinTreeNodeDefinitions } from "../nodes/mintree_node_extensions.js";
import { MinTreeNode } from "../types/mintree_node.js";
import { MinTreeNodeType } from "../ecma.js";

import {
    buildRenderers as CFLbuildRenderers,
    renderCompressed as CFLrenderCompressed,
    renderWithFormatting as CFLrenderWithFormatting,
    renderWithSourceMap as CFLrenderWithSourceMap,
    renderWithFormattingAndSourceMap as CFLrenderWithFormattingAndSourceMap,
    FormatRule
} from "@candlefw/conflagrate";

const renderers = CFLbuildRenderers(MinTreeNodeDefinitions, MinTreeNodeType);

export function renderCompressed(
    node: MinTreeNode
) {
    return CFLrenderCompressed(node, renderers);
}

export function renderWithFormatting(
    node: MinTreeNode,

    //format rules
    format_rules: FormatRule[],
    formatString = undefined
) {
    return CFLrenderWithFormatting(node, renderers, format_rules, formatString);
}

export function renderWithSourceMap(
    node: MinTreeNode,

    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,
) {

    return CFLrenderWithSourceMap(node, renderers, map, source_index, name);
}

export function renderWithFormattingAndSourceMap(
    node: MinTreeNode,

    //format rules
    format_rules: FormatRule[] = null,
    formatString = undefined,


    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,
) {
    return CFLrenderWithFormattingAndSourceMap(node, renderers, format_rules, formatString, map, source_index, names);
}