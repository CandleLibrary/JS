/** UNARY BIT XOR **/

import unary_pre from "./unary_prefix_op.js";
import types from "./types.js";

export default class unary_xor_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "~";
    }

    get type() { return types.unary_xor_expression }
}
