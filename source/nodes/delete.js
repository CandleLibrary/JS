/** POSTFIX INCREMENT **/

import unary_pre from "./unary_prefix_op.js";
import types from "./types.js";

export default class delete_expression extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "delete";
    }

    get type() { return types.delete_expression }
}
