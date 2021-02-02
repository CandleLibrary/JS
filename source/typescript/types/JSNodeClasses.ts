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
    JSImportCallExpression,
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
    | JSBinaryExpressionClass
    | JSUnaryExpressionClass
    | JSTernaryExpressionClass
    | JSCallExpressionClass
    //Generic
    | JSNewTarget
    | JSParenthesized
    //Objects
    | JSObjectLiteralExpressionClass
    //References
    | JSReferenceClass
    ;

export type JSCallExpressionClass =
    | JSImportCallExpression
    | JSCallExpression
    | JSSuperCall
    | JSNewInstanceExpression
    ;
export type JSObjectLiteralExpressionClass =
    | JSObjectLiteral
    | JSClassExpression
    | JSFunctionExpressionClass
    | JSPrimitiveClass
    | JSTemplateClass
    | JSArrayLiteral;
export type JSFunctionExpressionClass =
    | JSArrowFunction
    | JSFunctionExpression;

export type JSTernaryExpressionClass = JSConditionalExpression;
export type JSBinaryExpressionClass =
    | JSLogicalExpression
    | JSAssignmentExpression
    | JSCoalesceExpression
    | JSBitwiseExpression
    | JSEqualityExpression
    | JSRelationalExpression
    | JSAdditiveExpression
    | JSMultiplicativeExpression
    | JSExponentiationExpression
    | JSInstanceOfExpression
    | JSInExpression
    | JSShiftExpression
    ;

export type JSUnaryExpressionClass =
    | JSDeleteExpression
    | JSVoidExpression
    | JSTypeofExpression
    | JSAwaitExpression
    | JSUnaryExpression
    | JSPostExpression
    | JSYieldExpression
    | JSPreExpression;

/**
 * Expressions that can appear on the left hand side of an assignment expression
 */
export type JSLeftHandBindingClass =
    | JSReferenceClass
    | JSObjectBinding
    | JSArrayBinding;

/**
 * Expression that are references
 */
export type JSReferenceClass = JSMemberExpression
    | JSImportMeta
    | JSIdentifierClass
    | JSSuperExpression
    | JSSuperExpression;

export type JSHoistableDeclarationClass = JSFunctionDeclaration | JSVariableDeclaration;