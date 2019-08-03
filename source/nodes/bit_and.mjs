/** BITWISE AND EXPRESSION **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class bitwise_and_espression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "&";
    }

    get type () { return types.bitwise_and_espression }
}
