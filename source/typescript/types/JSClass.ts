import { JSGetterMethod, JSMethod, JSSetterMethod } from "./JSFunction";
import { JSIdentifierBinding } from "./JSIdentifier";
import { JSLeftHandSideExpressionClass } from "./JSNodeClasses";
import { JSNodeType } from "./node_type";
import { JSClauseBase, JSDeclarationBase, JSExpressionBase } from "./JSBase";

/**
 * Class declaration of the form:
 *
 * >```
 * > class identifier? class_heritage? { class_body? }
 * >```
 *
 * Extended members are:
 * 1. **`name`**
 * 2. **`heritage`**
 * 3. **`body`**
 *
 * https://www.ecma-international.org/ecma-262/index.html#sec-class-definitions
 */

export interface JSClassDeclaration extends JSDeclarationBase {
    type: JSNodeType.ClassDeclaration;

    nodes: [JSIdentifierBinding | null, JSClassHeritage | null, ...(JSGetterMethod | JSSetterMethod | JSClassMethod)[]];
}
/**
 * Same as JSClassDeclaration except used in expressions
 */

export interface JSClassExpression extends JSExpressionBase {
    type: JSNodeType.ClassExpression;
    nodes: (JSGetterMethod | JSSetterMethod | JSClassMethod)[];
}

export type JSClassHeritage = JSLeftHandSideExpressionClass;

export interface JSClassMethod extends JSMethod {
    STATIC?: boolean;
}

export type JSClassClass =
    JSClassDeclaration
    | JSClassExpression
    | JSClassHeritage
    | JSClassMethod;