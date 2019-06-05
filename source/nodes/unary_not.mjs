/** UNARY NOT **/

import unary_pre from "./unary_prefix_op.mjs";
import types from "./types.mjs";

export default class unary_not_expression extends unary_pre {
    constructor(sym) {
        super(sym);
        this.op = "!";
    }
    get type() { return types.unary_not_expression }
}
