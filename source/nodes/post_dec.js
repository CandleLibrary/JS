/** POSTFIX INCREMENT **/

import unary_post from "./unary_postfix_op.js";
import types from "./types.js";

export default class post_decrement_expression extends unary_post {

    constructor(sym) {
        super(sym);
        this.op = "--";
    }

    get type() { return types.post_decrement_expression }
}
