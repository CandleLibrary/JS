/** SUBTRACT **/

import operator from "./operator.js";
import types from "./types.js";
export default class subtract_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "-";
    }

    get type () { return types.subtract_expression }
}
