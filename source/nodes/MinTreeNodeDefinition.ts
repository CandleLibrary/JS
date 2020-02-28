import { MinTreeNodeType } from "./ntype";
export class MinTreeNodeDefinition {
    name: string;
    getters: Array<any>;
    template_pattern: string | object;
    node_type: MinTreeNodeType;
    constructor(name: string, getters: Array<any>, template_pattern: string | object, node_type: MinTreeNodeType) {
        this.name = name;
        this.getters = getters;
        this.template_pattern = template_pattern;
        this.node_type = node_type;
    }
}
