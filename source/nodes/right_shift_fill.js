/** RIGHT SHIFT **/

import operator from "./operator.js";
import types from "./types.js";
export default class right_shift_fill_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = ">>>";
    }

    get type() { return types.right_shift_fill_expression }
}
