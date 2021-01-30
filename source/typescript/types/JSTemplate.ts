import { JSNodeBase, JSPrimitiveBase } from "./JSBase";
import { JSRightHandExpressionClass } from "./JSNodeClasses";
import { JSStringLiteral } from "./JSPrimitive";
import { JSNodeType } from "./node_type";


export interface JSTemplate extends JSNodeBase {
    type: JSNodeType.Template;

    NO_SUBSTITUTE: boolean;

    nodes: [JSTemplateHead | JSRightHandExpressionClass | JSStringLiteral];
}

export interface JSTemplateHead extends JSPrimitiveBase {
    type: JSNodeType.TemplateHead;

    value: string;
}

export interface JSTemplateMiddle extends JSPrimitiveBase {
    type: JSNodeType.TemplateMiddle;

    value: string;
}

export interface JSTemplateTail extends JSPrimitiveBase {
    type: JSNodeType.TemplateTail;

    value: string;
}


export type JSTemplateClass = JSTemplate
    | JSTemplateHead
    | JSTemplateMiddle
    | JSTemplateTail
    | JSTemplate;