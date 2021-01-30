import { JSNodeType } from "../javascript";
import { JSIdentifier, JSIdentifierBinding } from "./JSIdentifier";
import {
    JSAdditiveExpression, JSAssignmentExpression, JSBitwiseExpression, JSCallExpression, JSCoalesceExpression, JSConditionalExpression, JSDeleteExpression, JSEqualityExpression, JSExponentiationExpression, JSInExpression, JSInstanceOfExpression,
    JSLogicalExpression, JSMemberExpression, JSMultiplicativeExpression, JSNewExpression, JSPostExpression, JSPreExpression, JSRelationalExpression, JSShiftExpression, JSTypeofExpression, JSUnaryExpression, JSVoidExpression, JSYieldExpression
} from "./JSOperator";
import { JSExpressionBase } from "./JSBase";

export type JSAssignmentExpressionClass =
    JSConditionalExpression | JSYieldExpression | JSLogicalExpression |
    JSAssignmentExpression | JSCoalesceExpression | JSBitwiseExpression | JSEqualityExpression |
    JSRelationalExpression | JSInstanceOfExpression | JSInExpression |
    JSShiftExpression | JSAdditiveExpression | JSMultiplicativeExpression |
    JSExponentiationExpression | JSDeleteExpression | JSVoidExpression |
    JSTypeofExpression | JSUnaryExpression | JSPostExpression |
    JSPreExpression | JSLeftHandSideExpressionClass | JSCallExpression;

export type JSPrimaryExpressionClass = JSLeftHandSideExpressionClass | JSParenthesized;

/**
 * Expressions that can accept assignments
 */
export type JSLeftHandSideExpressionClass = JSMemberExpression | JSIdentifier | JSIdentifierBinding | JSIdentifierBinding;


/**
 * Expression of the form
 *
 * >```javascript
 * > ( expression )
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 *
 */
interface JSParenthesized extends JSExpressionBase {
    type: JSNodeType.Parenthesized;
    nodes: [JSExpressionBase];
}