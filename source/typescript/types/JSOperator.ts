import { JSArguments } from "./JSFunction";
import { JSIdentifier, JSIdentifierBinding, JSIdentifierName, JSIdentifierReference } from "./JSIdentifier";
import { JSExpressionBase, JSOperatorBase } from "./JSBase";
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

    nodes: [JSIdentifierBinding, JSExpressionBase];
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

    nodes: [JSIdentifierBinding, JSExpressionBase];
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
    operator: "|" | "&" | "^";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "==" | "!=" | "===" | "!==";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "**";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "||" | "&&";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "*" | "/" | "%";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "++" | "--";
    nodes: [JSExpressionBase];
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
    operator: "++" | "--";
    nodes: [JSExpressionBase];
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
    operator: never;
    nodes: [JSExpressionBase];
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
    operator: never;
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "<" | ">" | "<=" | ">=";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "<<" | ">>" | ">>>";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "...";
    nodes: [JSExpressionBase];
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
    operator: never;
    nodes: [JSExpressionBase];
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
    operator: "!" | "+" | "~" | "-";
    nodes: [JSExpressionBase];
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
    operator: "!" | "+" | "~" | "-";
    nodes: [JSExpressionBase];
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
    operator: never;
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: never;
    nodes: [JSExpressionBase];
}
export interface JSCoalesceExpression extends JSOperatorBase {
    type: JSNodeType.CoalesceExpression;
    operator: "??";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: "+" | "-";
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: never;
    nodes: [JSExpressionBase, JSExpressionBase];
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
    operator: never;
    nodes: [JSExpressionBase, JSExpressionBase, JSExpressionBase];
}


/**
 * Expression of the form:
 *
 * >```
 * > [ member | identifier ] arguments
 * >```
 *
 * Extended members are:
 * 1. **`identifier`**
 * 1. **`arguments`**
 */
export interface JSCallExpression extends JSOperatorBase {
    type: JSNodeType.CallExpression;
    operator: never;
    TEMPLATE: boolean;
    nodes: [JSIdentifierReference | JSMemberExpression, ...JSExpressionBase[]];
}



/**
 * Expression of the form:
 *
 * >```javascript
 * > super arguments
 * >```
 *
 * Extended member is:
 * 1. **`arguments`**
 *
 */
export interface JSSuperCall extends JSOperatorBase {
    type: JSNodeType.SuperCall;
    operator: never;
    nodes: [JSArguments];
}

export interface JSMemberExpression extends JSOperatorBase {
    type: JSNodeType.MemberExpression;
    COMPUTED: boolean;
    nodes: [JSMemberExpression | JSIdentifier, JSExpressionBase];
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
    nodes: [JSExpressionBase];
}
/**
 * Expression of the form:
 *
 * >```js
 * > new (identifier | member_expression ) arguments
 * >```
 *
 * The extended member is:
 * 1. **`identifier`**
 *
 */
export interface JSNewInstanceExpression extends JSOperatorBase {

    type: JSNodeType.NewInstanceExpression;

    nodes: [JSExpressionBase, JSArguments];
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
    nodes: [JSExpressionBase, JSExpressionBase];
}

export interface JSOptionalChain extends JSOperatorBase {
    type: JSNodeType.OptionalChain;
    nodes: [JSExpressionBase];
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
export interface JSSuperExpression extends JSExpressionBase {
    type: JSNodeType.SuperExpression;
    nodes: [JSIdentifierName];
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
export interface JSExpressionList extends JSExpressionBase {
    type: JSNodeType.ExpressionList;
    nodes: JSExpressionBase[];
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
    | JSOptionalChain
    | JSExpressionList
    | JSSuperExpression;