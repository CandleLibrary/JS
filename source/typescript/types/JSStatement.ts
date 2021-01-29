import { JSIdentifierBinding, JSIdentifierLabel } from "./JSIdentifierRoot";
import { JSNodeType } from "./node_type";
import { BaseJSNode, JSExpression } from "./node";


export interface JSStatementNode extends BaseJSNode {
}
export interface JSClauseNode extends BaseJSNode {
}
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
export interface JSBlockStatement extends JSStatementNode {
    type: JSNodeType.BlockStatement;

    node: JSStatementNode[];
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

export interface JSExpressionStatement extends JSStatementNode {
    type: JSNodeType.ExpressionStatement;
    node: [JSExpression];
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
export interface JSDebuggerStatement extends JSStatementNode {
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

export interface JSEmptyStatement extends JSStatementNode {
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


export interface JSDoStatement extends JSStatementNode {
    type: JSNodeType.DoStatement;
    node: [JSStatementNode, JSExpression];
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

export interface JSDoStatement extends JSStatementNode {
    type: JSNodeType.DoStatement;
    node: [JSStatementNode, JSExpression];
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


export interface JSForInStatement extends JSStatementNode {

    type: JSNodeType.ForInStatement;

    node: [JSVariableDeclaration | JSLexicalBinding | JSExpression, JSExpression, JSStatementNode];
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

export interface JSForOfStatement extends JSStatementNode {

    type: JSNodeType.ForOfStatement;

    node: [JSVariableDeclaration | JSLexicalBinding | JSExpression, JSExpression, JSStatementNode];
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

export interface JSForStatement extends JSStatementNode {

    type: JSNodeType.ForStatement;

    node: [JSExpression | null, JSExpression | null, JSExpression | null, JSStatementNode];
}
/**
 * Declaration of the form
 *
 * >```
 * > var binding (, binding)*
 * >```
 *
 * This node does not have extended members.
 *
 * This node is only found as a subnode of `ForStatements`.
 *
 */

export interface JSVariableDeclaration extends JSStatementNode {

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
 * This node does not have extended members.
 *
 */

export interface JSVariableStatement extends JSClauseNode {

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

export interface JSLabeledStatement extends JSStatementNode {

    type: JSNodeType.LabeledStatement;

    node: [JSStatementNode];
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

export interface JSLexicalDeclaration extends JSStatementNode {

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
export interface JSLexicalBinding extends JSClauseNode {

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

export interface JSIfStatement extends JSStatementNode {

    type: JSNodeType.IfStatement;

    node: [JSExpression, JSStatementNode, JSIfStatement?];
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

export interface JSWhileStatement extends JSStatementNode {

    type: JSNodeType.WhileStatement;

    node: [JSExpression, JSStatementNode];
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

export interface JSWithStatement extends JSStatementNode {

    type: JSNodeType.WithStatement;

    node: [JSExpression, JSStatementNode];
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

export interface JSReturnStatement extends JSStatementNode {

    type: JSNodeType.ReturnStatement;

    node: [JSExpression?];
}

export interface JSBreakStatement extends JSStatementNode {
    node: JSNodeType.BreakStatement;
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

export interface JSContinueStatement extends JSStatementNode {
    node: JSNodeType.ContinueStatement;
    nodes: [JSIdentifierLabel?];
}
/**
 * Statement of the form:
 *
 * >```
 * > break identifier? ;
 * >```
 *
 * Extended member is:
 * 1. **`identifier`**
 *
 */


export interface JSBreakStatement extends JSStatementNode {
    node: JSNodeType.BreakStatement;
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


export interface JSThrowStatement extends JSStatementNode {
    node: JSNodeType.ThrowStatement;
    nodes: [JSExpression?];
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

export interface JSTryStatement extends JSStatementNode {
    node: JSNodeType.TryStatement;
    nodes: [JSStatementNode, null | JSCatchClause, null | JSFinallyClause];
}

export interface JSCatchClause extends JSClauseNode {
    node: JSNodeType.CatchClause;
    nodes: [JSBlockStatement];
}

export interface JSFinallyClause extends JSClauseNode {
    node: JSNodeType.FinallyClause;
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
export interface JSSwitchStatement extends JSStatementNode {

    type: JSNodeType.SwitchStatement;

    node: [JSExpression, JSCaseBlock];
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
export interface JSCaseBlock extends JSClauseNode {

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
export interface JSCaseClause extends JSClauseNode {

    type: JSNodeType.CaseClause;

    node: JSStatementNode[];
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

export interface JSDefaultClause extends JSClauseNode {

    type: JSNodeType.DefaultClause;

    node: JSStatementNode[];
}
