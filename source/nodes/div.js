/** DIVIDE EXPRESSION **/

import operator from "./operator.js";
import types from "./types.js";
export default class divide_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "/";
    }

    get type () { return types.divide_expression }
}
