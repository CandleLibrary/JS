/** MODULO **/

import operator from "./operator.js";
import types from "./types.js";
export default class modulo_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "%";
    }

    get type() { return types.modulo_expression }
}
