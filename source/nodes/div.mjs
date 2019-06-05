/** DIVIDE EXPRESSION **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class divide_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "/";
    }

    get type () { return types.divide_expression }
}
