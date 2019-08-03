/** EXPONENT **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class equality_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "**";
    }

    get type() { return types.equality_expression }
}
