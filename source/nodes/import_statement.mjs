/** IMPORT STATEMENT  **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class import_statement extends base {
    constructor(sym) {
        super((sym.length > 2) ? sym[1] : null);
    }

    get expr() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.expr) this.expr.getRootIds(ids, closure);
    }

    get type() { return types.import_statement }

    render() {
    }
}
