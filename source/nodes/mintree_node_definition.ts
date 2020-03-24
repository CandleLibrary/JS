import { MinTreeNodeType } from "../types/mintree_node_type.js";
import { MinTreeNodeRenderClass } from "./mintree_node_extensions.js";

export class MinTreeNodeDefinition {
    type: MinTreeNodeType;
    getters: Array<string | object>;
    template_pattern: string | object;

    format_rule: MinTreeNodeRenderClass;
    constructor(type: MinTreeNodeType, getters: Array<any>, template_pattern: string | object, format_rule: MinTreeNodeRenderClass = 0) {
        this.type = type;
        this.getters = getters;
        this.template_pattern = template_pattern;
        this.format_rule = format_rule;
    }
}
