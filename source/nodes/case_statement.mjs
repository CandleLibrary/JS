/** CASE STATMENT  **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class case_statement extends base {
    get expression() { return this.vals[0] }
    get statements() { return this.vals[1] }

    getRootIds(ids, closure) {
        this.expression.getRootIds(ids, closure);
        if (this.statements) this.statements.getRootIds(ids, closure);
    }

    get type() { return types.case_statement }

    render() {
        return `case ${this.expression.render()}:${this.statements?this.statements.render():""}`;
    }
}
