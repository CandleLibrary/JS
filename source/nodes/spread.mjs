/** SPREAD **/

import unary_pre from "./unary_prefix_op.mjs";
import types from "./types.mjs";

export default class spread_element extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "...";
    }

    get type() { return types.spread_element }

}
