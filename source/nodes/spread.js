/** SPREAD **/

import unary_pre from "./unary_prefix_op.js";
import types from "./types.js";

export default class spread_element extends unary_pre {

    constructor(sym) {
        super(sym);
        this.op = "...";
    }

    get type() { return types.spread_element }

}
