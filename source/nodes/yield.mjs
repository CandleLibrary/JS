/** VOID **/

import unary_pre from "./unary_prefix_op.mjs";
import types from "./types.mjs";

export default class await_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "yield";
    }

    get type() { return types.yield_expression }
}
