/** EQ **/

import operator from "./operator.js";
import types from "./types.js";
export default class equality_expression extends operator {
    constructor(sym) {super(sym); this.op = sym[1];  }
    get type() { return types.equality_expression }
}
