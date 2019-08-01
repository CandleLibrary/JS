/** IN **/

import operator from "./operator.js";
import types from "./types.js";
export default class in_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "in";
    }

    get type() { return types.in_expression }
}
