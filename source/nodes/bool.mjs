/** BOOLEAN **/

import base from "./base.mjs";

import types from "./types.mjs";

export default class bool_literal extends base {
    constructor(sym = []) { super(sym[0]) }

    get type() { return types.bool_literal }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
    }
}
