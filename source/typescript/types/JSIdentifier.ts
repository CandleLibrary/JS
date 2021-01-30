import { JSIdentifierBase } from "./JSBase";
import { JSNodeType } from "./node_type";


/**
 * Identifier literal used as a reference, of the form:
 *
 * >```
 * > identifier
 * >```
 *
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifier extends JSIdentifierBase {
    type: JSNodeType.Identifier;

}
/**
 * See `Identifier`
 */

export interface JSIdentifierName extends JSIdentifierBase {
    type: JSNodeType.IdentifierName;

}
/**
 * Identifier literal used in binding expressions, of the form:
 *
 * >```
 * > identifier
 * >```
 *
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifierBinding extends JSIdentifierBase {
    type: JSNodeType.IdentifierBinding;

}
/**
 * Identifier literal used as a reference, of the form:
 *
 * >```
 * > identifier
 * >```
 *
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */

export interface JSIdentifierReference extends JSIdentifierBase {
    type: JSNodeType.IdentifierReference;

}


/**
 * Identifier literal used as a label in Break, Continue, and LabelStatements; of the form:
 *
 * >```
 * > identifier
 * >```
 *
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifierLabel extends JSIdentifierBase {
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
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */
export interface JSIdentifierModule extends JSIdentifierBase {
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
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */

export interface JSIdentifierProperty extends JSIdentifierBase {
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
 *
 * This node has the regular property:
 *
 * - @property {string} value - The name of the identifier
 */


export interface JSIdentifierDefault extends JSIdentifierBase {
    type: JSNodeType.IdentifierDefault;
}






export type JSIdentifierClass = JSIdentifier
    | JSIdentifierName
    | JSIdentifierBinding
    | JSIdentifierReference
    | JSIdentifierLabel
    | JSIdentifierModule
    | JSIdentifierProperty
    | JSIdentifierDefault;