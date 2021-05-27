import {
    CustomFormatFunction,
    renderCompressed as CFLrenderCompressed,
    renderWithFormatting as CFLrenderWithFormatting,
    renderWithSourceMap as CFLrenderWithSourceMap,
    renderWithFormattingAndSourceMap as CFLrenderWithFormattingAndSourceMap,
    FormatRule
} from "@candlelib/conflagrate";

import { format_rules, renderers } from "./rules.js";
import { JSNode } from "../types/JSNode.js";
import { JSNodeType } from "../javascript.js";

export const FormatFunction: CustomFormatFunction<JSNode> = (val, prop_name, node) => {

    if (node.type == JSNodeType.Elision && prop_name == "@full_render")
        return (node.count == 0 ? "%%empty%%" : (",").repeat(Math.max(node.count, 1)));

    return val;

};

export function renderCompressed(
    node: JSNode
) {
    return CFLrenderCompressed<JSNode>(node, renderers, FormatFunction);
}

export function renderWithFormatting(
    node: JSNode,

    //format rules
    fr: FormatRule[] = format_rules,
    formatString = undefined
) {
    return CFLrenderWithFormatting<JSNode>(node, renderers, fr, FormatFunction);
}

export function renderWithSourceMap(
    node: JSNode,

    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,
) {

    return CFLrenderWithSourceMap<JSNode>(node, renderers, map, source_index, name, FormatFunction);
}

export function renderWithFormattingAndSourceMap(
    node: JSNode,

    //format rules
    fr: FormatRule[] = format_rules,
    formatString = FormatFunction,


    //source map data
    map: Array<number[]> = null,
    source_index = -1,
    names: Map<string, number> = null,
) {
    return CFLrenderWithFormattingAndSourceMap<JSNode>(node, renderers, fr, FormatFunction, map, source_index, names);
}