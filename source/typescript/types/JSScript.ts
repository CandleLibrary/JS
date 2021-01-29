import { BaseJSNode } from "./node";
import { JSStatementNode } from "./JSStatement";
import { JSNodeType } from "./node_type";


/**
 * The root node of a JavaScript module or script.
 */
export interface JSScript extends BaseJSNode {
    type: JSNodeType.Script;
    source?: string;
    nodes: JSStatementNode[];
}
export function JSNode_Is_Script(node: BaseJSNode): node is BaseJSNode { return node.type == JSNodeType.Module; }
