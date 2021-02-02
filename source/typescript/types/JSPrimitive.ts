import { JSPrimitiveBase } from "./JSBase";
import { JSTemplate } from "./JSTemplate";
import { JSNodeType } from "./node_type";


/**
 * A literal number
 *
 * ```javascript
 *  number
 * ```
 *
 *
 * This node has the regular properties:
 * - @property {string} value - The original parsed value;
 * - @property {number} computed_value - The value of original parsed value transformed into a float;
 */
export interface JSNumericLiteral extends JSPrimitiveBase {
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

export interface JSBigIntLiteral extends JSPrimitiveBase {
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

export interface JSStringLiteral extends JSPrimitiveBase {
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


export interface JSBooleanLiteral extends JSPrimitiveBase {
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
 */

export interface JSThisLiteral extends JSPrimitiveBase {
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
 */
export interface JSNullLiteral extends JSPrimitiveBase {
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

export interface JSRegexLiteral extends JSPrimitiveBase {
    type: JSNodeType.RegexLiteral;
    value: string;
    flags: string;
}


/**
 * Expression of the form:
 *
 * >```js
 * > new . target
 * >```
 *
 *
 */
export interface JSNewTarget extends JSPrimitiveBase {
    type: JSNodeType.NewTarget;
}

export type JSPrimitiveClass =
    JSNumericLiteral
    | JSTemplate
    | JSBigIntLiteral
    | JSStringLiteral
    | JSBooleanLiteral
    | JSThisLiteral
    | JSNullLiteral
    | JSRegexLiteral
    | JSNewTarget;