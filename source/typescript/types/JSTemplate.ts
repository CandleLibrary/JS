import { JSNodeType } from "../javascript";
import { JSNodeBase, JSPrimitiveBase } from "./JSBase";


export interface JSTemplate extends JSNodeBase {
    type: JSNodeType.Template;

    NO_SUBSTITUTE: boolean;

    nodes: [JSTemplateHead];
}

export interface JSTemplateHead extends JSNodeBase {
    type: JSNodeType.TemplateHead;
}

export interface JSTemplateMiddle extends JSNodeBase {
    type: JSNodeType.TemplateMiddle;
}

export interface JSTemplateTail extends JSNodeBase {
    type: JSNodeType.TemplateTail;
}

export interface JSTemplate extends JSNodeBase {
    type: JSNodeType.Template;
}

export type JSTemplateClass = JSTemplate
    | JSTemplateHead
    | JSTemplateMiddle
    | JSTemplateTail
    | JSTemplate;