import { MinTreeNodeType } from "../types/mintree_node_type.js";
import { NodeRenderDefinition, FormatRule } from "@candlefw/conflagrate/build/types/render/render";

export class MinTreeNodeDefinition implements NodeRenderDefinition {
    type: MinTreeNodeType;
    getters: Array<string | object>;
    template_pattern: string | object;
    format_rule: FormatRule;
    constructor(type: MinTreeNodeType, getters: Array<any>, template_pattern: string | object, format_rule: FormatRule = 0) {
        this.type = type;
        this.getters = getters;
        this.template_pattern = template_pattern;
        this.format_rule = format_rule;
    }
}
