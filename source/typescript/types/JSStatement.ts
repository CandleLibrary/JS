import { JSIdentifierBinding, JSIdentifierLabel } from "./JSIdentifier";
import { JSNodeType } from "./node_type";
import { JSClauseBase, JSExpressionBase, JSStatementBase } from "./JSBase";



/**
 * Statement of the form
 *
 * >```
 * > { statement_list }
 * >```
 *
 * Extended member is:
 * 1. **`statement_list`**
 *
 */
export interface JSBlockStatement extends JSStatementBase {
    type: JSNodeType.BlockStatement;

    node: JSStatementBase[];
}
/**
 * A statement of the form
 *
 * >```
 * >expression ;
 * >```
 *
 *
 * Extended member is:
 * 1. **`expression`**
 */

export interface JSExpressionStatement extends JSStatementBase {
    type: JSNodeType.ExpressionStatement;
    node: [JSExpressionBase];
}
/**
 * Statement of the form
 *
 * >```
 * > debugger ;
 * >```
 *
 * This node has no extended members;
 *
 */
export interface JSDebuggerStatement extends JSStatementBase {
    type: JSNodeType.DebuggerStatement;
    node: never;
}
/**
 * Statement of the form
 *
 * >```
 * > ;
 * >```
 *
 * This node has no extended members
 *
 */

export interface JSEmptyStatement extends JSStatementBase {
    type: JSNodeType.EmptyStatement;
    node: never;
}
/**
 * Statement of the form:
 *
 * >```
 * > do statement  while ( expression );
 * >```
 *
 * Extended members are:
 * 1. **`statement`**
 * 1. **`expression`**
 */


export interface JSDoStatement extends JSStatementBase {
    type: JSNodeType.DoStatement;
    node: [JSStatementBase, JSExpressionBase];
}
/**
 * Statement of the form:
 *
 * >```
 * > do statement  while ( expression );
 * >```
 *
 * Extended members are:
 * 1. **`statement`**
 * 1. **`expression`**
 */

export interface JSDoStatement extends JSStatementBase {
    type: JSNodeType.DoStatement;
    node: [JSStatementBase, JSExpressionBase];
}
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


export interface JSForInStatement extends JSStatementBase {

    type: JSNodeType.ForInStatement;

    node: [JSVariableDeclaration | JSLexicalBinding | JSExpressionBase, JSExpressionBase, JSStatementBase];
}
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

export interface JSForOfStatement extends JSStatementBase {

    type: JSNodeType.ForOfStatement;

    node: [JSVariableDeclaration | JSLexicalBinding | JSExpressionBase, JSExpressionBase, JSStatementBase];
}
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

export interface JSForStatement extends JSStatementBase {

    type: JSNodeType.ForStatement;

    node: [JSExpressionBase | null, JSExpressionBase | null, JSExpressionBase | null, JSStatementBase];
}
/**
 * Declaration of the form
 *
 * >```
 * > var binding (, binding)*
 * >```
 *
 *
 * This node is only found as a subnode of `ForStatements`.
 *
 */

export interface JSVariableDeclaration extends JSStatementBase {

    type: JSNodeType.VariableDeclaration;

    node: (JSIdentifierBinding | JSIdentifierBinding)[];
}
/**
 * Statement of the form
 *
 * >```
 * > var binding [, binding]* ;
 * >```
 *
 *
 */

export interface JSVariableStatement extends JSClauseBase {

    type: JSNodeType.VariableStatement;

    node: (JSIdentifierBinding | JSIdentifierBinding)[];
}
/**
 * Statement of the form:
 *
 * >```javascript
 * > identifier :  ( statement | function_declaration )
 * >```
 *
 * Extended members are:
 * 1. **`label`**
 * 1. **`statement`**
 *
 */

export interface JSLabeledStatement extends JSStatementBase {

    type: JSNodeType.LabeledStatement;

    node: [JSStatementBase];
}
/**
 * Lexical Scoped variable declaration statement beginning with `let` or `const`.
 * ```
 *  ( let | const ) binding_expression (, binding_expression )* ;
 * ```
 *
 * Extended members is:
 * 1. **`bindings`**
 *
 *
 */

export interface JSLexicalDeclaration extends JSStatementBase {

    type: JSNodeType.LexicalDeclaration;

    node: (JSIdentifierBinding | JSIdentifierBinding)[];
}
/**
 * Lexical declaration used in the initialization field of `for` statements.
 * ```javascript
 * ( let | const )  binding_expression  [, binding_expression ]*
 * ```
 * Extended members is:
 * 1. **`bindings`**
 *
 * Found only as a subnode of `ForStatements`
 */
export interface JSLexicalBinding extends JSClauseBase {

    type: JSNodeType.LexicalBinding;

    node: (JSIdentifierBinding | JSIdentifierBinding)[];
}
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

export interface JSIfStatement extends JSStatementBase {

    type: JSNodeType.IfStatement;

    node: [JSExpressionBase, JSStatementBase, JSIfStatement?];
}
/**
 * Statement loop of the form
 *
 * >```
 * > while ( expression ) statement
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 * 2. **`statement`**
 *
 */

export interface JSWhileStatement extends JSStatementBase {

    type: JSNodeType.WhileStatement;

    node: [JSExpressionBase, JSStatementBase];
}
/**
 * Statement of the form
 *
 * >```
 * > with ( expression ) statement
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 * 2. **`statement`**
 *
 */

export interface JSWithStatement extends JSStatementBase {

    type: JSNodeType.WithStatement;

    node: [JSExpressionBase, JSStatementBase];
}
/**
* Statement of the form:
*
*>```javascript
*> return expression? ;
*>```
*
* Extended members are
* 1.  **expression** *(optional - may be `null`)*
*
*/

export interface JSReturnStatement extends JSStatementBase {

    type: JSNodeType.ReturnStatement;

    node: [JSExpressionBase?];
}

export interface JSBreakStatement extends JSStatementBase {
    type: JSNodeType.BreakStatement;
    nodes: [JSIdentifierLabel?];
}
/**
 * Statement of the form
 *
 * >```
 * > continue identifier? ;
 * >```
 *
 * Extended members are:
 * 1. **`identifier`**
 */

export interface JSContinueStatement extends JSStatementBase {
    type: JSNodeType.ContinueStatement;
    nodes: [JSIdentifierLabel?];
}

/**
* Statement of the form:
*
*>```javascript
*> throw expression? ;
*>```
*
* Extended members are
* 1.  **expression** *(optional - may be `null`)*
*
*/


export interface JSThrowStatement extends JSStatementBase {
    type: JSNodeType.ThrowStatement;
    nodes: [JSExpressionBase?];
}
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

export interface JSTryStatement extends JSStatementBase {
    type: JSNodeType.TryStatement;
    nodes: [JSStatementBase, null | JSCatchClause, null | JSFinallyClause];
}

/**
 * Try-Catch clause of the form:
 *
 * >```
 * > catch ( identifier ) block
 * >```
 *
 * Extended members are:
 * 1. **`identifier`**
 * 2. **`statement`**
 *
 */
export interface JSCatchClause extends JSClauseBase {
    type: JSNodeType.CatchClause;
    nodes: [JSBlockStatement];
}

export interface JSFinallyClause extends JSClauseBase {
    type: JSNodeType.FinallyClause;
    nodes: [JSBlockStatement];
}
/**
 * Statement of the form
 *
 * >```
 * > switch (expression ) case_block
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 * 2. **`block`**
 *
 */
export interface JSSwitchStatement extends JSStatementBase {

    type: JSNodeType.SwitchStatement;

    node: [JSExpressionBase, JSCaseBlock];
}
/**
 * Block expression of the form:
 *
 * >```
 * > { [ case_clauses ]* default_clause? [ case_clauses ]* }
 * >```
 *
 * This node does not have any extended members
 *
 * Found only as sub-node of `SwitchStatements`
 *
 * JSNodeClass Flags:
 * - BLOCK
 */
export interface JSCaseBlock extends JSClauseBase {

    type: JSNodeType.CaseBlock;

    node: (JSCaseClause | JSDefaultClause)[];
}
/**
 * Switch clause of the form:
 *
 * >```
 * > case expression  :  statement_list?
 * >```
 *
 * Extended members are:
 * 1. **`case_expression`**
 * 2. **`statements`**
 *
 */
export interface JSCaseClause extends JSClauseBase {

    type: JSNodeType.CaseClause;

    node: JSStatementBase[];
}
/**
 * Switch clause of the form:
 *
 * >```
 * > default : statement_list?
 * >```
 *
 * Extended members are:
 * 1. **`case_expression`**
 * 2. **`statements`**
 *
 */

export interface JSDefaultClause extends JSClauseBase {

    type: JSNodeType.DefaultClause;

    node: JSStatementBase[];
}

export type JSStatementClass =
    JSBlockStatement
    | JSExpressionStatement
    | JSDebuggerStatement
    | JSEmptyStatement
    | JSDoStatement
    | JSDoStatement
    | JSForInStatement
    | JSForOfStatement
    | JSForStatement
    | JSVariableDeclaration
    | JSVariableStatement
    | JSLabeledStatement
    | JSLexicalDeclaration
    | JSLexicalBinding
    | JSIfStatement
    | JSWhileStatement
    | JSWithStatement
    | JSReturnStatement
    | JSBreakStatement
    | JSContinueStatement
    | JSThrowStatement
    | JSTryStatement
    | JSCatchClause
    | JSFinallyClause
    | JSSwitchStatement
    | JSCaseBlock
    | JSCaseClause
    | JSDefaultClause;