/** LEFT_SHIFT **/

import operator from "./operator.js";
import types from "./types.js";
export default class left_shift_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "<<";
    }

    get type() { return types.left_shift_expression }
}
