import { BaseJSNode } from "./node";
import { JSStatementNode } from "./JSStatement";
import { JSNodeType } from "./node_type";

/**
 * A Script node that has at least one export or import statement;
 */
export interface JSModule extends BaseJSNode {
    type: JSNodeType.Module;
    source?: string;
    nodes: JSStatementNode[];
}
export function JSNode_Is_Module(node: BaseJSNode): node is BaseJSNode { return node.type == JSNodeType.Module; }