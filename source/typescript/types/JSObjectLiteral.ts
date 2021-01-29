import { JSSpread } from "./JSOperatorNode";
import { JSPrimitiveNode } from "./JSPrimitiveNode";
import { JSExpression } from "./node";
import { JSNodeType } from "./node_type";

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

export interface JSObjectLiteral extends JSExpression {
    type: JSNodeType.ObjectLiteral;
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

export interface JSArrayLiteral extends JSExpression {
    type: JSNodeType.ArrayLiteral;

    nodes: (JSExpression | JSElision | JSSpread)[];
}

export interface JSElision extends JSPrimitiveNode {
    type: JSNodeType.Elision;
    count: number;

}