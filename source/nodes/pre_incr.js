/** UNARY NOT **/

import unary_pre from "./unary_prefix_op.js";
import types from "./types.js";

export default class pre_increment_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "--";
    }

    get type() { return types.pre_increment_expression }
}
