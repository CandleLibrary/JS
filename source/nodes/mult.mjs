/** MULTIPLY **/

import operator from "./operator.mjs";
import types from "./types.mjs";
export default class multiply_expression extends operator {

    constructor(sym) {
        super(sym);
        this.op = "*";
    }

    get type () { return types.multiply_expression }

    
}
