/** IN **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class in_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "in";
    }

    get type() { return types.in_expression }
}
