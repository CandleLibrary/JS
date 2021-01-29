import { JSIdentifier, JSIdentifierBinding, JSIdentifierReference } from "./JSIdentifierRoot";
import { JSNodeType } from "./node_type";
import { JSExpression, JSArguments } from "./node";

/**
 * Unary, Binary, and Ternary operators
 */
export interface JSOperatorNode extends JSExpression {
    symbol: string;
}
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
export interface JSBindingExpression extends JSOperatorNode {
    type: JSNodeType.BindingExpression;

    nodes: [JSIdentifierBinding, JSExpression];
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
export interface JSAssignmentExpression extends JSOperatorNode {
    type: JSNodeType.AssignmentExpression;

    symbol: "=" | "/=" | "%=" | "+=" | "-=" | "/=" | "%=" | "*=" | "**=" | "|=" | "&=" | "^=" | "<<=" | ">>=" | ">>>=";

    nodes: [JSIdentifierBinding, JSExpression];
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

export interface JSBitwiseExpression extends JSOperatorNode {
    type: JSNodeType.BitwiseExpression;
    operator: "|" | "&" | "^";
    nodes: [JSExpression, JSExpression];
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

export interface JSEqualityExpression extends JSOperatorNode {
    type: JSNodeType.EqualityExpression;
    operator: "==" | "!=" | "===" | "!==";
    nodes: [JSExpression, JSExpression];
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

export interface JSExponentiationExpression extends JSOperatorNode {
    type: JSNodeType.ExponentiationExpression;
    operator: "**";
    nodes: [JSExpression, JSExpression];
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
export interface JSLogicalExpression extends JSOperatorNode {
    type: JSNodeType.LogicalExpression;
    operator: "||" | "&&";
    nodes: [JSExpression, JSExpression];
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

export interface JSMultiplicativeExpression extends JSOperatorNode {
    type: JSNodeType.MultiplicativeExpression;
    operator: "*" | "/" | "%";
    nodes: [JSExpression, JSExpression];
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

export interface JSPostExpression extends JSOperatorNode {
    type: JSNodeType.PostExpression;
    operator: "++" | "--";
    nodes: [JSExpression];
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

export interface JSPreExpression extends JSOperatorNode {
    type: JSNodeType.PreExpression;
    operator: "++" | "--";
    nodes: [JSExpression];
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


export interface JSDeleteExpression extends JSOperatorNode {
    type: JSNodeType.DeleteExpression;
    operator: never;
    nodes: [JSExpression];
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

export interface JSInstanceOfExpression extends JSOperatorNode {
    type: JSNodeType.InstanceOfExpression;
    operator: never;
    nodes: [JSExpression, JSExpression];
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

export interface JSRelationalExpression extends JSOperatorNode {
    type: JSNodeType.RelationalExpression;
    operator: "<" | ">" | "<=" | ">=";
    nodes: [JSExpression, JSExpression];
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

export interface JSShiftExpression extends JSOperatorNode {
    type: JSNodeType.ShiftExpression;
    operator: "<<" | ">>" | ">>>";
    nodes: [JSExpression, JSExpression];
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

export interface JSSpread extends JSOperatorNode {
    type: JSNodeType.Spread;
    operator: "...";
    nodes: [JSExpression];
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
export interface JSTypeofExpression extends JSOperatorNode {
    type: JSNodeType.TypeofExpression;
    operator: never;
    nodes: [JSExpression];
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

export interface JSUnaryExpression extends JSOperatorNode {
    type: JSNodeType.UnaryExpression;
    operator: "!" | "+" | "~" | "-";
    nodes: [JSExpression];
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

export interface JSVoidExpression extends JSOperatorNode {
    type: JSNodeType.VoidExpression;
    operator: "!" | "+" | "~" | "-";
    nodes: [JSExpression];
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
export interface JSInExpression extends JSOperatorNode {
    type: JSNodeType.InExpression;
    operator: never;
    nodes: [JSExpression, JSExpression];
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

export interface JSYieldExpression extends JSOperatorNode {
    type: JSNodeType.YieldExpression;
    operator: never;
    nodes: [JSExpression];
}
export interface JSCoalesceExpression extends JSOperatorNode {
    type: JSNodeType.CoalesceExpression;
    operator: "??";
    nodes: [JSExpression, JSExpression];
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
export interface JSAdditiveExpression extends JSOperatorNode {
    type: JSNodeType.AdditiveExpression;
    operator: "+" | "-";
    nodes: [JSExpression, JSExpression];
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


export interface JSAwaitExpression extends JSOperatorNode {
    type: JSNodeType.AwaitExpression;
    operator: "+" | "-";
    nodes: [JSExpression, JSExpression];
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
export interface JSConditionalExpression extends JSOperatorNode {
    type: JSNodeType.ConditionalExpression;
    operator: never;
    nodes: [JSExpression, JSExpression, JSExpression];
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

export interface JSCallExpression extends JSOperatorNode {
    type: JSNodeType.CallExpression;
    operator: never;
    TEMPLATE: boolean;
    nodes: [JSIdentifierReference | JSMemberExpression, ...JSExpression[]];
}
export interface JSMemberExpression extends JSOperatorNode {
    type: JSNodeType.MemberExpression;
    COMPUTED: boolean;
    nodes: [JSMemberExpression | JSIdentifier, JSExpression];
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
export interface JSNewExpression extends JSOperatorNode {
    type: JSNodeType.NewExpression;
    nodes: [JSExpression];
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
export interface JSNewInstanceExpression extends JSOperatorNode {

    type: JSNodeType.NewInstanceExpression;

    nodes: [JSExpression, JSArguments];
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
export interface JSOptionalMemberExpression extends JSOperatorNode {
    type: JSNodeType.OptionalMemberExpression;
    COMPUTED: boolean;
    nodes: [JSExpression, JSExpression];
}

export interface JSOptionalChain extends JSOperatorNode {
    type: JSNodeType.OptionalChain;
    nodes: [JSExpression];
}
