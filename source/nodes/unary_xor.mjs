/** UNARY BIT XOR **/

import unary_pre from "./unary_prefix_op.mjs";
import types from "./types.mjs";

export default class unary_xor_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "~";
    }

    get type() { return types.unary_xor_expression }
}
