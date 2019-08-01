/** MODULE TL  **/

import base from "./base.js";
import types from "./types.js";

export default class module extends base {
    constructor(sym) {
        super(sym);
    }

    get statements() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.statements) this.statements.getRootIds(ids, closure);
    }

    get type() { return types.module }

    render() {
        return this.statements.render();
    }
}
