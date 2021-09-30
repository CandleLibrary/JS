import { JSNodeBase } from "./JSBase";
import { JSStatementClass } from "./JSStatement";
import { JSNodeType } from "./node_type.js";


/**
 * The root node of a JavaScript module or script.
 */
export interface JSScript extends JSNodeBase {
    type: JSNodeType.Script;
    source?: string;
    nodes: JSStatementClass[];
}
export function JSNode_Is_Script(node: JSNodeBase): node is JSNodeBase { return node.type == JSNodeType.Module; }
