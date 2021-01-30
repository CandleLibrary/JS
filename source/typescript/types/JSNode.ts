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
export type JSNode = JSClassClass
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
