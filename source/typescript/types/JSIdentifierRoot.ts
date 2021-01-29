import { JSNodeType } from "./node_type";
import { JSExpression } from "./node";


export interface JSIdentifierRoot extends JSExpression {
    type: JSNodeType;
    nodes: never;
    value: string;
}

/**
 * Identifier literal used as a reference, of the form:
 *
 * >```
 * > identifier
 * >```
 *
 * This node does not have extended members.
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifier extends JSIdentifierRoot {
    type: JSNodeType.Identifier;

}
/**
 * See `Identifier`
 */

export interface JSIdentifierName extends JSIdentifierRoot {
    type: JSNodeType.IdentifierName;

}
/**
 * Identifier literal used in binding expressions, of the form:
 *
 * >```
 * > identifier
 * >```
 *
 * This node does not have extended members.
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifierBinding extends JSIdentifierRoot {
    type: JSNodeType.IdentifierBinding;

}
/**
 * Identifier literal used as a reference, of the form:
 *
 * >```
 * > identifier
 * >```
 *
 * This node does not have extended members.
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */

export interface JSIdentifierReference extends JSIdentifierRoot {
    type: JSNodeType.IdentifierReference;

}


/**
 * Identifier literal used as a label in Break, Continue, and LabelStatements; of the form:
 *
 * >```
 * > identifier
 * >```
 *
 * This node does not have extended members.
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifierLabel extends JSIdentifierRoot {
    type: JSNodeType.IdentifierLabel;
}


/**
 * Identifier literal used as a module reference. This is either as the name of an exported
 * object, or the name of an imported object.
 *
 * >```
 * > identifier
 * >```
 *
 * This node does not have extended members.
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifierModule extends JSIdentifierRoot {
    type: JSNodeType.IdentifierModule;
}


/**
 * Identifier literal used as a module reference. This is either as the name of an exported
 * object, or the name of an imported object.
 *
 * >```
 * > identifier
 * >```
 *
 * This node does not have extended members.
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */

export interface JSIdentifierProperty extends JSIdentifierRoot {
    type: JSNodeType.IdentifierProperty;
}
/**
 * Identifier literal used as a module reference. This is either as the name of an exported
 * object, or the name of an imported object.
 *
 * >```
 * > identifier
 * >```
 *
 * This node does not have extended members.
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */


export interface JSIdentifierDefault extends JSIdentifierRoot {
    type: JSNodeType.IdentifierDefault;
}

