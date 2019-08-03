/** RIGHT SHIFT **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class right_shift_fill_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = ">>>";
    }

    get type() { return types.right_shift_fill_expression }
}
