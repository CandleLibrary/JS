/** AND **/

import operator from "./operator.js";
import types from "./types.js";
export default class and_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "&&";
    }

    get type() { return types.and_expression }
}
