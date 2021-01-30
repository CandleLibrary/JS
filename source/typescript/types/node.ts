import { traverse } from "@candlefw/conflagrate";
import { JSBaseClass, JSNodeBase } from "./JSBase";
import { JSClassClass } from "./JSClass";
import { JSFunctionClass } from "./JSFunction";
import { JSIdentifierClass } from "./JSIdentifier";
import { JSModuleClass } from "./JSModule";
import { JSObjectClass } from "./JSObject";
import { JSOperatorClass } from "./JSOperator";
import { JSPrimitiveClass } from "./JSPrimitive";
import { JSScript } from "./JSScript";
import { JSStatementClass } from "./JSStatement";
import { JSTemplateClass } from "./JSTemplate";
import { JSNodeType } from "./node_type";

export type JSNode =
    JSClassClass
    | JSFunctionClass
    | JSIdentifierClass
    | JSModuleClass
    | JSObjectClass
    | JSOperatorClass
    | JSPrimitiveClass
    | JSScript
    | JSStatementClass
    | JSTemplateClass
    | JSObjectClass;

export type FullJSNode = JSNode;


const any: JSNode = null;

for (const { node } of traverse(any, "nodes")) {
    if (node.type == JSNodeType.FunctionExpression) {
    }
}
