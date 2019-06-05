/** UNARY NOT **/

import unary_pre from "./unary_prefix_op.mjs";
import types from "./types.mjs";

export default class pre_decrement_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "--";
    }

    get type() { return types.pre_decrement_expression }
}
