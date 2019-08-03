/** DEBUGGER STATEMENT  **/

import {statement} from "./base.mjs";
import types from "./types.mjs";

export default class debugger_statement extends statement {
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
