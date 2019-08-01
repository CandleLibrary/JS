/** PLUS **/

import unary_prefix_op from "./unary_prefix_op.js";
import types from "./types.js";

export default class plus_expression extends unary_prefix_op {
    constructor(sym) { super(sym);
        this.op = "+";
    }
    get type() { return types.plus_expression }
}
