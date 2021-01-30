import { JSIdentifierBinding, JSIdentifierReference } from "./JSIdentifier";
import { JSBindingExpression } from "./JSOperator";
import { JSNodeType } from "./node_type";
import { JSClauseBase, JSDeclarationBase, JSExpressionBase } from "./JSBase";
import { JSBlockStatement, JSStatementClass } from "./JSStatement";

//** JSFunctionDeclaration ----------------------------------------------------------------------------------------
/**
 * A function declaration of the form:
 *
 * >```
 * > async? function  \*? identifier? \( parameters? \) { body? }
 * >```
 *
 * Extended members are:
 * 1. **name**
 * 1. **parameters**
 * 1. **body**
 *
 * This node has the regular properties
 *
 * - @property {boolean} ASYNC - True if the parse encountered the `async` keyword.
 * - @property {boolean} GENERATOR - True if the parse encountered the symbol `*`.
 */
export interface JSFunctionDeclaration extends JSDeclarationBase {
    type: JSNodeType.FunctionDeclaration;

    ASYNC: boolean;

    GENERATOR: boolean;

    nodes: [JSIdentifierBinding, JSFormalParameters, JSFunctionBody | null];
}






//** JSFunctionExpression ---------------------------------------------------------------------------------------
/**
 * A function expression of the form:
 *
 * >```
 * > async? function  \*? identifier? \( parameters? \) { body? }
 * >```
 *
 * Extended members are:
 * 1. **name**
 * 1. **parameters**
 * 1. **body**
 *
 * This node has the regular properties
 *
 * - @property {boolean} ASYNC - True if the parse encountered the `async` keyword.
 * - @property {boolean} GENERATOR - True if the parse encountered the symbol `*`.
 */
export interface JSFunctionExpression extends JSExpressionBase {
    type: JSNodeType.FunctionExpression;

    ASYNC: boolean;

    GENERATOR: boolean;

    nodes: [JSIdentifierBinding, JSFormalParameters, JSFunctionBody | null];
}






//** JSArrowFunction ---------------------------------------------------------------------------------------
/**
 * A function expression of the form
 *
 * >```
 * > async? [ arguments | identifier ] => [ expression | block_statement ]
 * >```
 *
 * Extended members are:
 * 1. **`arguments`**
 * 1. **`body`**
 *
 * This node contains the regular properties:
 *
 * @property {boolean} IS_ASYNC - True if node was parsed with an `async` keyword
 */
export interface JSArrowFunction extends JSExpressionBase {
    type: JSNodeType.ArrowFunction;

    ASYNC: boolean;

    nodes: [JSIdentifierReference | JSFormalParameters, JSExpressionBase | JSBlockStatement];
}






//** JSMethod ---------------------------------------------------------------------------------------
/**
 * Object method property of the form:
 *
 * >```js
 * > async? *? name ( parameters? ) { body? }
 * >```
 *
 * Extended members are:
 * 1. **name**
 * 1. **parameters**
 * 1. **body**
 *
 * This node has the regular properties
 *
 * - @property {boolean} ASYNC - True if the parse encountered the `async` keyword.
 * - @property {boolean} GENERATOR - True if the parse encountered the symbol `*`.
 */
export interface JSMethod extends JSClauseBase {
    type: JSNodeType.Method;

    ASYNC: boolean;

    GENERATOR: boolean;

    nodes: [JSIdentifierBinding, JSFormalParameters, JSFunctionBody | null];
}


//** JSGetterMethod ---------------------------------------------------------------------------------------
/**
 * A method declaration of the form:
 *
 * >```
 * > get \*? identifier? { body }
 * >```
 *
 * Extended members are:
 * 1. **name**
 * 1. **body**
 *
 * This node has the regular properties
 *
 */
export interface JSGetterMethod extends JSClauseBase {
    type: JSNodeType.GetterMethod;

    nodes: [JSIdentifierBinding, JSFunctionBody];
}





//** JSSetterMethod ---------------------------------------------------------------------------------------
/**
 * A method declaration of the form
 *
 * >```javascript
 * >set ( binding )  { body }
 * >```
 *
 * Extended members are:
 * 1. `binding`
 * 2. `body`
 */
export interface JSSetterMethod extends JSClauseBase {
    type: JSNodeType.SetterMethod;

    nodes: [JSIdentifierBinding, JSBindingExpression, JSFunctionBody | null];
}



//** JSFormalParameters ---------------------------------------------------------------------------------------
/**
 * TODO Description
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
export interface JSFormalParameters extends JSClauseBase {
    type: JSNodeType.FormalParameters;

    nodes: (JSBindingExpression | JSIdentifierBinding)[];
}







//** JSFunctionBody ---------------------------------------------------------------------------------------
/**
 * A list of statements found within a FunctionDeclaration, FunctionExpression, or Method
 *
 * >```
 * > statements+
 * >```
 *
 *
 */
export interface JSFunctionBody extends JSClauseBase {
    type: JSNodeType.FunctionBody;
    nodes: JSStatementClass[];
}



//** JSArguments ---------------------------------------------------------------------------------------
/**
 * A parenthesized list of expressions of the form:
 *
 * >```
 * > ( expression [, expression]* )
 * >```
 *
 *  This node has no extended members.
 *
 */
export interface JSArguments extends JSExpressionBase {
    type: JSNodeType.Arguments;
    nodes: JSExpressionBase[];
}

export type JSFunctionClass = JSFunctionDeclaration
    | JSFunctionExpression
    | JSArrowFunction
    | JSMethod
    | JSGetterMethod
    | JSSetterMethod
    | JSFormalParameters
    | JSFunctionBody
    | JSArguments;