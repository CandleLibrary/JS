import { JSIdentifierBinding } from "./JSIdentifierRoot";
import { JSModule } from "./JSModule";
import { JSScript } from "./JSScript";
import { JSClauseNode, JSStatementNode } from "./JSStatement";
import { JSNodeType } from "./node_type";

export interface BaseJSNode {
    type: JSNodeType;
    nodes?: BaseJSNode[];
}

export interface JSExpression extends BaseJSNode { }

export interface JSDeclaration extends JSStatementNode { }
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
export interface JSFunctionDeclaration extends JSDeclaration {
    type: JSNodeType.FunctionDeclaration;

    ASYNC: boolean;

    GENERATOR: boolean;

    nodes: [JSIdentifierBinding, JSFormalParameters, JSFunctionBody];
}

export interface JSFormalParameters extends JSClauseNode {
    type: JSNodeType.FormalParameters;
}

export interface JSFunctionBody extends JSClauseNode {
    type: JSNodeType.FunctionBody;
}

export interface JSArguments extends JSExpression {
    type: JSNodeType.Arguments;
    nodes: JSExpression[];
}



export type JSNode = BaseJSNode | JSStatementNode | JSModule | JSScript;

export type FullJSNode = JSNode;
