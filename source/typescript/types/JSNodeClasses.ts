import { JSClassExpression } from "./JSClass";
import {
    JSArrowFunction,
    JSFunctionDeclaration,
    JSFunctionExpression
} from "./JSFunction";
import { JSIdentifierClass } from "./JSIdentifier";
import { JSImportMeta } from "./JSModule";
import {
    JSArrayBinding,
    JSArrayLiteral,
    JSObjectBinding,
    JSObjectLiteral
} from "./JSObject";
import {
    JSAdditiveExpression,
    JSAssignmentExpression,
    JSAwaitExpression,
    JSBitwiseExpression,
    JSCallExpression,
    JSCoalesceExpression,
    JSConditionalExpression,
    JSDeleteExpression,
    JSEqualityExpression,
    JSExponentiationExpression,
    JSInExpression,
    JSInstanceOfExpression,
    JSLogicalExpression,
    JSMemberExpression,
    JSMultiplicativeExpression,
    JSNewInstanceExpression,
    JSParenthesized,
    JSPostExpression,
    JSPreExpression,
    JSRelationalExpression,
    JSShiftExpression,
    JSSuperCall,
    JSSuperExpression,
    JSTypeofExpression,
    JSUnaryExpression,
    JSVoidExpression,
    JSYieldExpression
} from "./JSOperator";
import {
    JSNewTarget,
    JSPrimitiveClass
} from "./JSPrimitive";
import { JSVariableDeclaration } from "./JSStatement";
import { JSTemplateClass } from "./JSTemplate";

/**
 * All expression types that can be generated 
 */
export type JSExpressionClass = JSRightHandExpressionClass | JSLeftHandBindingClass;

/**
 * Expression that can appear on the right hand side of an assignment
 */
export type JSRightHandExpressionClass =
    //Operators
    JSLogicalExpression | JSAssignmentExpression | JSCoalesceExpression
    | JSBitwiseExpression | JSEqualityExpression | JSRelationalExpression
    | JSInstanceOfExpression | JSInExpression | JSShiftExpression
    | JSAdditiveExpression | JSMultiplicativeExpression | JSExponentiationExpression
    | JSDeleteExpression | JSVoidExpression | JSTypeofExpression
    | JSUnaryExpression | JSPostExpression | JSPreExpression
    | JSConditionalExpression | JSYieldExpression | JSCallExpression
    | JSSuperCall | JSNewInstanceExpression | JSNewTarget | JSAwaitExpression
    //Generic
    | JSParenthesized | JSSuperExpression | JSImportMeta
    //Objects
    | JSArrowFunction | JSClassExpression | JSObjectLiteral | JSArrayLiteral
    | JSPrimitiveClass | JSTemplateClass | JSFunctionExpression
    //References
    | JSMemberExpression | JSIdentifierClass
    ;



/**
 * Expressions that can appear on the left hand side of an assignment expression
 */
export type JSLeftHandBindingClass = JSReferenceClass
    | JSObjectBinding
    | JSArrayBinding;

/**
 * Expression that are references
 */
export type JSReferenceClass = JSMemberExpression
    | JSIdentifierClass
    | JSSuperExpression;

export type JSHoistableDeclarationClass = JSFunctionDeclaration | JSVariableDeclaration;