/** DEBUGGER STATEMENT  **/

import base from "./base.js";
import types from "./types.js";

export default class debugger_statement extends base {
    constructor() {
        super();
    }

    getRootIds(ids, closure) {
        if (this.expr) this.expr.getRootIds(ids, closure);
    }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
    }

    get type() { return types.debugger_statement }

    render() { return `debugger;` }
}
