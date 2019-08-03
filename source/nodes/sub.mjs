/** SUBTRACT **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class subtract_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "-";
    }

    get type () { return types.subtract_expression }
}
