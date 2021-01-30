import { JSIdentifierBinding, JSIdentifierProperty } from "./JSIdentifier";
import { JSBindingExpression, JSSpread } from "./JSOperator";
import { JSAssignmentExpressionClass } from "./JSNodeClasses";
import { JSExpressionBase, JSOperatorBase, JSPrimitiveBase } from "./JSBase";
import { JSNodeType } from "./node_type";

export type JSBindingRestElement = JSSpread;

/**
 * An object literal declaration of the form
 *
 * >```javascript
 * > { PropertyBinding  [, PropertyBinding ]* }
 * >```
 *
 * Extended members are:
 * 1. **`properties`**
 */

export interface JSObjectLiteral extends JSExpressionBase {
    type: JSNodeType.ObjectLiteral;

    nodes: (JSBindingProperty)[];
}

/**
 * An array object declaration of the form
 *
 * >```
 * > \[ [ expression | elision ]* \]
 * >```
 *
 * Extended members are:
 * 1. **`expression`**
 *
 */

export interface JSArrayLiteral extends JSExpressionBase {
    type: JSNodeType.ArrayLiteral;

    nodes: (JSExpressionBase | JSElision | JSSpread)[];
}


/**
 * Object Binding Pattern
 *
 * >```
 * > { <object_binding_properties> } 
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 */
export interface JSObjectBinding extends JSExpressionBase {
    type: JSNodeType.ObjectBinding,

    nodes: (JSBindingProperty | JSBindingExpression | JSBindingRestElement)[];
}


/**
 * Array Binding Pattern
 *
 * >```
 * > [ <object_binding_properties> ]
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 */
export interface JSArrayBinding extends JSExpressionBase {
    type: JSNodeType.ArrayBinding,

    nodes: (JSElision | JSBindingRestElement | JSBindingExpression)[];
}

/**
 *  A series of commas representing skipped array indices
 * 
 *  Matches the express ``/,+/`` where JSElision~count 
 *  indicate the number of commas
 * 
 *  https://262.ecma-international.org/11.0/#prod-Elision
 */
export interface JSElision extends JSPrimitiveBase {
    type: JSNodeType.Elision;
    count: number;

}



/**
 * A binding of the form:
 *
 * >```javascript
 * > identifier : expression
 * > //or
 * > [ expression ] : expression //if COMPUTED is set to `true`
 * >```
 *
 * Extended members are:
 * 1. **`identifier`**
 * 2. **`expression`**
 *
 */
export interface JSBindingProperty extends JSOperatorBase {
    type: JSNodeType.PropertyBinding;

    nodes: [JSIdentifierProperty, (JSIdentifierBinding | JSBindingExpression)];
}

/**
 * Property name declaration of the form:
 *
 * >```
 * > \[ expression \]
 * >```
 *
 * Extended member is:
 * 1. **`expression`**
 *
 */
export interface JSComputedProperty extends JSOperatorBase {
    type: JSNodeType.ComputedProperty;
    nodes: [JSAssignmentExpressionClass];
}

export type JSObjectClass =
    JSObjectLiteral
    | JSArrayLiteral
    | JSObjectBinding
    | JSArrayBinding
    | JSElision
    | JSBindingProperty
    | JSComputedProperty;