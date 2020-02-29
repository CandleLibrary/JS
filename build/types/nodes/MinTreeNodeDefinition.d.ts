import { MinTreeNodeType } from "./ntype";
export declare class MinTreeNodeDefinition {
    name: string;
    getters: Array<any>;
    template_pattern: string | object;
    node_type: MinTreeNodeType;
    constructor(name: string, getters: Array<any>, template_pattern: string | object, node_type: MinTreeNodeType);
}
