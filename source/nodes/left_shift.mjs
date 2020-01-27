/** LEFT_SHIFT **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class left_shift_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "<<";
    }

    get type() { return types.left_shift_expression }
}