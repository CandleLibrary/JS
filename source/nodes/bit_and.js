/** BITWISE AND EXPRESSION **/

import operator from "./operator.js";
import types from "./types.js";
export default class bitwise_and_espression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "&";
    }

    get type () { return types.bitwise_and_espression }
}
