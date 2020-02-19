/** Computed Property **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class spread_element extends base {

    constructor(sym) {
        super(sym[0]);
        this.op = "...";
    }

    render() { return `[${this.vals[0].render()}]` }

    get type() { return types.computed_property }

}
