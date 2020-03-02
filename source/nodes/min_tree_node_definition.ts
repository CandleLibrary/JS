import { MinTreeNodeMaskedType } from "./ntype";
import { MinTreeNodeType } from "./mintree_node_type";
export class MinTreeNodeDefinition {
    name: MinTreeNodeType;
    getters: Array<any>;
    template_pattern: string | object;
    node_type: MinTreeNodeMaskedType;
    constructor(name: MinTreeNodeType, getters: Array<any>, template_pattern: string | object, node_type: MinTreeNodeMaskedType) {
        this.name = name;
        this.getters = getters;
        this.template_pattern = template_pattern;
        this.node_type = node_type;
    }
}
