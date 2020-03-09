import { MinTreeNodeMaskedType } from "../types/ntype.js";
import { MinTreeNodeType } from "../types/mintree_node_type.js";

export class MinTreeNodeDefinition {
    name: MinTreeNodeType;
    getters: Array<string | object>;
    template_pattern: string | object;
    constructor(name: MinTreeNodeType, getters: Array<any>, template_pattern: string | object) {
        this.name = name;
        this.getters = getters;
        this.template_pattern = template_pattern;
    }
}
