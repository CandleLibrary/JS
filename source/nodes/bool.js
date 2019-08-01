/** BOOLEAN **/

import base from "./base.js";

import types from "./types.js";

export default class bool_literal extends base {
    constructor(sym) { super(sym[0]) }

    get type() { return types.bool_literal }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
    }
}
