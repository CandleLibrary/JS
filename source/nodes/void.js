/** VOID **/

import unary_pre from "./unary_prefix_op.js";
import types from "./types.js";

export default class void_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "void";
    }

    get type() { return types.void_expression }
}
