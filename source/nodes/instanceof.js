/** INSTANCEOF **/

import operator from "./operator.js";
import types from "./types.js";
export default class instanceof_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "instanceof";
    }

    get type() { return types.instanceof_expression }
}
