/** VOID **/

import unary_pre from "./unary_prefix_op.js";
import types from "./types.js";

export default class await_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "await";
    }

    get type() { return types.await_expression }
}
