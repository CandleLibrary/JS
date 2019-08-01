/** TYPEOF **/

import unary_pre from "./unary_prefix_op.js";
import types from "./types.js";

export default class typeof_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "typeof";
    }

    get type() { return types.typeof_expression }
}