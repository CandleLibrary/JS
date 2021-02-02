import { JSOperatorBase } from "./JSBase";
import { JSArguments } from "./JSFunction";
import { JSIdentifier, JSIdentifierName, JSIdentifierReference } from "./JSIdentifier";
import { JSExpressionClass, JSLeftHandBindingClass, JSReferenceClass, JSRightHandExpressionClass } from "./JSNodeClasses";
import { JSStringLiteral } from "./JSPrimitive";
import { JSNodeType } from "./node_type";


/**
 * An expression of the form
 *
 * >```
 * >identifier = expression
 * >```
 *
 * Extended members are:
 * 1. **`declaration`**
 * 2. **`expression`**
 *
 * This expression can be a child of the following nodes:
 * - `ArrayLiteral`
 * - `ObjectLiteral`
 * - `ArgumentList`
 * - `CatchClause `
 * - `VariableStatement`
 * - `LexicalDeclaration`
 * - `FormalParameters`
 */
export interface JSBindingExpression extends JSOperatorBase {
    type: JSNodeType.BindingExpression;

    nodes: [JSLeftHandBindingClass, JSRightHandExpressionClass?];
}

/**
 * Expression of the form
 *
 * >```
 * >[ member | identifier ] = expression
 * >```
 *
 * Extended members are:
 * 1. **`identifier`**
 * 2. **`expression`**
 */
export interface JSAssignmentExpression extends JSOperatorBase {
    type: JSNodeType.AssignmentExpression;

    symbol: "=" | "/=" | "%=" | "+=" | "-=" | "/=" | "%=" | "*=" | "**=" | "|=" | "&=" | "^=" | "<<=" | ">>=" | ">>>=";

    nodes: [JSLeftHandBindingClass, JSRightHandExpressionClass];
}
/**
 * A binary expression of one of the forms
 *
 * >```
 * > expression | expression
 * > expression & expression
 * > expression ^ expression
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 1. **`right`**
 *
 */

export interface JSBitwiseExpression extends JSOperatorBase {
    type: JSNodeType.BitwiseExpression;
    symbol: "|" | "&" | "^";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
 * A binary expression of one of the forms:
 *
 * >```
 * > expression == expression
 * > expression != expression
 * > expression === expression
 * > expression !=== expression
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 2. **`right`**
 *
 */

export interface JSEqualityExpression extends JSOperatorBase {
    type: JSNodeType.EqualityExpression;
    symbol: "==" | "!=" | "===" | "!==";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
* A binary operator of the form
*
* >```
* > expression ** expression
* >```
*
* Extended members are:
* 1. **`left`**
* 2. **`right`**
*
*/

export interface JSExponentiationExpression extends JSOperatorBase {
    type: JSNodeType.ExponentiationExpression;
    symbol: "**";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
 * A binary expression of one of the forms
 *
 * >```
 * > expression || expression
 * > expression && expression
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 2. **`right`**
 *
 */
export interface JSLogicalExpression extends JSOperatorBase {
    type: JSNodeType.LogicalExpression;
    symbol: "||" | "&&";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
 * Binary expression of one of the forms:
 *
 * >```
 * > expression * expression
 * > expression / expression
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 1. **`right`**
 *
 */

export interface JSMultiplicativeExpression extends JSOperatorBase {
    type: JSNodeType.MultiplicativeExpression;
    symbol: "*" | "/" | "%";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
 * Expression of one of the forms:
 *
 * >```javascript
 * > expression ++
 * >
 * > expression --
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 *
 */

export interface JSPostExpression extends JSOperatorBase {
    type: JSNodeType.PostExpression;
    symbol: "++" | "--";
    nodes: [JSRightHandExpressionClass];
}
/**
 * Expression of one of the forms:
 *
 * >```javascript
 * > ++ expression
 * >
 * > -- expression
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 *
 */

export interface JSPreExpression extends JSOperatorBase {
    type: JSNodeType.PreExpression;
    symbol: "++" | "--";
    nodes: [JSRightHandExpressionClass];
}
/**
 * Expression of the form
 *
 * >```
 * > delete expression
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 *
 */


export interface JSDeleteExpression extends JSOperatorBase {
    type: JSNodeType.DeleteExpression;
    symbol: never;
    nodes: [JSRightHandExpressionClass];
}
/**
 * A binary expression of the form:
 *
 * >```javascript
 * > expression instanceof expression
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 2. **`right`**
 *
 */

export interface JSInstanceOfExpression extends JSOperatorBase {
    type: JSNodeType.InstanceOfExpression;
    symbol: never;
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
 * A binary expression of one of the forms:
 *
 * >```
 * > expression < expression
 * > expression > expression
 * > expression <= expression
 * > expression >= expression
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 2. **`right`**
 *
 */

export interface JSRelationalExpression extends JSOperatorBase {
    type: JSNodeType.RelationalExpression;
    symbol: "<" | ">" | "<=" | ">=";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
 * A binary expression of one of the forms:
 *
 * >```javascript
 * > left << right
 * > //or
 * > left >> right
 * > //or
 * > left >>> right
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 2. **`right`**
 *
 */

export interface JSShiftExpression extends JSOperatorBase {
    type: JSNodeType.ShiftExpression;
    symbol: "<<" | ">>" | ">>>";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}
/**
 * Character sequence of the form
 *
 * >```
 * > ... expression
 * >```
 *
 * Extended member is:
 * @property {JSNode} expression **`expression`**
 *
 */

export interface JSSpread extends JSOperatorBase {
    type: JSNodeType.Spread;
    symbol: "...";
    nodes: [JSExpressionClass];
}
/**
 * Expression of the form:
 *
 * >```
 * > typeof expression
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 *
 */
export interface JSTypeofExpression extends JSOperatorBase {
    type: JSNodeType.TypeofExpression;
    symbol: never;
    nodes: [JSRightHandExpressionClass];
}
/**
 * Expression of one of the forms:
 *
 * >```
 * > + expression
 * > - expression
 * > ~ expression
 * > ! expression
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 *
 */

export interface JSUnaryExpression extends JSOperatorBase {
    type: JSNodeType.UnaryExpression;
    symbol: "!" | "+" | "~" | "-";
    nodes: [JSRightHandExpressionClass];
}
/**
 * Expression of the form
 *
 * >```
 * > void expression
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 *
 */

export interface JSVoidExpression extends JSOperatorBase {
    type: JSNodeType.VoidExpression;
    symbol: "!" | "+" | "~" | "-";
    nodes: [JSRightHandExpressionClass];
}

/**
 * TODO Description:
 *
 * >```
 * > undefined
 * >```
 *
 * Extended members are:
 * 1. **`undefined`**
 *
 * TODO Optional Notes
 */
export interface JSInExpression extends JSOperatorBase {
    type: JSNodeType.InExpression;
    symbol: never;
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}

/**
 * Expression of the form
 *
 * >```
 * > yield expression
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 */

export interface JSYieldExpression extends JSOperatorBase {
    type: JSNodeType.YieldExpression;
    symbol: never;
    nodes: [JSRightHandExpressionClass];
}
export interface JSCoalesceExpression extends JSOperatorBase {
    type: JSNodeType.CoalesceExpression;
    symbol: "??";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}


/**
 * A binary expression of one of the forms
 *
 * >```
 * > expression + expression
 * > expression - expression
 * >```
 *
 * Extended members are:
 * 1. **`left`**
 * 2. **`right`**
 *
 */
export interface JSAdditiveExpression extends JSOperatorBase {
    type: JSNodeType.AdditiveExpression;
    symbol: "+" | "-";
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass];
}


/**
 * An expression of the form
 *
 * >```
 * > await expression
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 */
export interface JSAwaitExpression extends JSOperatorBase {
    type: JSNodeType.AwaitExpression;
    symbol: never;
    nodes: [JSRightHandExpressionClass];
}


/**
 * A ternary expression of the form
 *
 * >```
 * > expression ? expression : expression
 * >```
 *
 * Extended members are:
 * 1. **`condition`**
 * 1. **`pass_expression`**
 * 1. **`fail_expression`**
 *
 */
export interface JSConditionalExpression extends JSOperatorBase {
    type: JSNodeType.ConditionalExpression;
    symbol: never;
    nodes: [JSRightHandExpressionClass, JSRightHandExpressionClass, JSRightHandExpressionClass];
}


/**
 * Expression of the form:
 *
 * ```ts
 * <JSReferenceClass> ( <JSArguments> )
 * ```
 * Extended members are:
 * 1. **`identifier`**
 * 1. **`arguments`**
 */
export interface JSCallExpression extends JSOperatorBase {
    type: JSNodeType.CallExpression;
    symbol: never;
    TEMPLATE: boolean;
    nodes: [JSReferenceClass, JSArguments];
}

/**
 * Expression of the form:
 *
 * ```ts
 * <JSReferenceClass> ( <JSStringLiteral | JS> )
 * ```
 * Extended members are:
 * 1. **`identifier`**
 * 1. **`arguments`**
 */
export interface JSImportCallExpression extends JSOperatorBase {
    type: JSNodeType.ImportCall;
    symbol: never;
    TEMPLATE: boolean;
    nodes: [JSRightHandExpressionClass];
}


/**
 * Expression of the form:
 *
 * >```javascript
 * > super( arguments )
 * >```
 *
 * Extended member is:
 * 1. **`arguments`**
 *
 */
export interface JSSuperCall extends JSOperatorBase {
    type: JSNodeType.SuperCall;
    symbol: never;
    nodes: [JSArguments];
}

export interface JSMemberExpression extends JSOperatorBase {
    type: JSNodeType.MemberExpression;
    COMPUTED: boolean;
    nodes: [JSMemberExpression | JSIdentifier, JSRightHandExpressionClass];
}
/**
 * Expression of the form:
 *
 * >```js
 * > new expression
 * >```
 *
 * The extended member is:
 * 1. **`expression`**
 *
 */
export interface JSNewExpression extends JSOperatorBase {
    type: JSNodeType.NewExpression;
    nodes: [JSReferenceClass];
}
/**
 * Expression of the form:
 *
 * >```js
 * > new <identifier | member_expression > ( arguments )
 * >```
 *
 * The extended member is:
 * 1. **`identifier`**
 *
 */
export interface JSNewInstanceExpression extends JSOperatorBase {

    type: JSNodeType.NewInstanceExpression;

    nodes: [JSReferenceClass, JSArguments];
}
/**
 * An object member access expression using the forms
 *
 * >```
 * >primary_expression .  primary_expression
 * >```
 * >or
 * >```
 * >primary_expression [ primary_expression ]
 * >```
 *
 * Extended members are:
 * 1. 'object'        = nodes[0]
 * 2. 'property'      = nodes[1]
 *
 * If original parsed expression was in the latter form then the property `COMPUTED` will be set to true.
 *
 */
export interface JSOptionalMemberExpression extends JSOperatorBase {
    type: JSNodeType.OptionalMemberExpression;
    COMPUTED: boolean;
    nodes: [JSReferenceClass | JSCallExpression, JSReferenceClass | JSCallExpression];
}

/**
 * An object member access expression using the forms
 *
 * >```
 * >super .  identifier
 * >```
 * >or
 * >```
 * >super [ expression ]
 * >```
 *
 * If original parsed expression was in the latter form then the property `COMPUTED` will be set to true.
 *
 * Extended member is:
 * 1. 'member'
 */
export interface JSSuperExpression extends JSOperatorBase {
    type: JSNodeType.SuperExpression;
    COMPUTER: boolean;
    nodes: [JSRightHandExpressionClass] | [JSIdentifierName];
}


/**
 * Expression of the form
 *
 * >```
 * >  expression [, expression]*
 * >```
 *
 * This node does not have any extended members.
 *
 */
export interface JSExpressionList extends JSOperatorBase {
    type: JSNodeType.ExpressionList;
    nodes: JSExpressionClass[];
}


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
export interface JSParenthesized extends JSOperatorBase {
    type: JSNodeType.Parenthesized;
    nodes: [JSExpressionClass];
}



export type JSOperatorClass = JSBindingExpression
    | JSAssignmentExpression
    | JSBitwiseExpression
    | JSEqualityExpression
    | JSExponentiationExpression
    | JSLogicalExpression
    | JSMultiplicativeExpression
    | JSPostExpression
    | JSPreExpression
    | JSDeleteExpression
    | JSInstanceOfExpression
    | JSRelationalExpression
    | JSShiftExpression
    | JSSpread
    | JSTypeofExpression
    | JSUnaryExpression
    | JSVoidExpression
    | JSInExpression
    | JSYieldExpression
    | JSCoalesceExpression
    | JSAdditiveExpression
    | JSAwaitExpression
    | JSConditionalExpression
    | JSCallExpression
    | JSMemberExpression
    | JSNewExpression
    | JSNewInstanceExpression
    | JSOptionalMemberExpression
    | JSExpressionList
    | JSParenthesized
    | JSSuperCall
    | JSSuperExpression;