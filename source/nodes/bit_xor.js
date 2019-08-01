/** BITWISE XOR EXPRESSION **/

import operator from "./operator.js";
import types from "./types.js";
export default class bitwise_xor_espression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "^";
    }

    get type () { return types.bitwise_xor_espression }
}
