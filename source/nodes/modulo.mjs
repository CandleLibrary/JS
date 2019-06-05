/** MODULO **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class modulo_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "%";
    }

    get type() { return types.modulo_expression }
}
