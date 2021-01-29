import { JSNodeType } from "./node_type";
import { JSExpression } from "./node";

/**
 * Nodes that do not have any children. Represent core
 * indivisible values such as Null, Boolean, Number, and BigInt
 */

export interface JSPrimitiveNode extends JSExpression {
    value?: string | number | boolean;
    nodes: never;
}
/**
 * A literal number
 *
 * ```javascript
 *  number
 * ```
 *
 * This node does not have extended members.
 *
 * This node has the regular properties:
 * - @property {string} value - The original parsed value;
 * - @property {number} computed_value - The value of original parsed value transformed into a float;
 */
export interface JSNumericLiteral extends JSPrimitiveNode {
    type: JSNodeType.NumericLiteral;
    /**
     * The string form of the number as original parsed
     */
    value: string;
    /**
     * The numeric value of the value string
     */
    computed_value: number;
    nodes: never;
}
/**
 * A literal large integer
 *
 * Example:
 * ```javascript
 * 1254548213155444846845446n
 * 1n
 * 50505005050500005500550n
 * ```
 */

export interface JSBigIntLiteral extends JSPrimitiveNode {
    type: JSNodeType.BigIntLiteral;
    value: string;
    nodes: never;
}
/**
* String literal with one of the forms
*
* >```javascript
* > ' value '
* > //or
* > " value "
* >```
*
* This node does not have extended members.
*
* The node has the regular members:
* @property {string} value - The string of characters found between the quotes.
* @property {string} quote_type - A string with a value of either `"` or `'`
*/

export interface JSStringLiteral extends JSPrimitiveNode {
    type: JSNodeType.StringLiteral;
    quote_type: "\"" | "\'";
    value: string;
    nodes: never;
}
/**
 * Literally one of the keywords `true` or `false`
 *
 * >```
 * > [ true | false ]
 * >```
 *
 *
 * This node has the regular property
 * @property {boolean} value
 *
 */


export interface JSBooleanLiteral extends JSPrimitiveNode {
    type: JSNodeType.BooleanLiteral;
    value: boolean;
    nodes: never;
}
/**
 * Literally `this` of the form:
 *
 * >```
 * > this
 * >```
 *
 * This node does not have extended members.
 */

export interface JSThisLiteral extends JSPrimitiveNode {
    type: JSNodeType.ThisLiteral;
    value: never;
    nodes: never;
}
/**
 * #### Literally Null:
 * Example
 * ```javascript
 *  null
 * ```
 *
 * This node does not have extended members.
 */

export interface JSNullLiteral extends JSPrimitiveNode {
    type: JSNodeType.NullLiteral;
    value: never;
}
/**
 * A Regular Expression literal of the form:
 *
 * >```javascript
 * > / expression_string / meta
 * >```
 *
 * Extended members are:
 * 1. **expression_string**
 * 1. **meta**
 *
 */

export interface JSRegexLiteral extends JSPrimitiveNode {
    type: JSNodeType.RegexLiteral;
    value: string;
}
