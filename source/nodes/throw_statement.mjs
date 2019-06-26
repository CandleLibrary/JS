/** THROW STATEMENT  **/

import {statement} from "./base.mjs";
import types from "./types.mjs";

export default class throw_statement extends statement {
    constructor(sym) {
        super(sym[1] == ";" ? null : sym[1]);
    }

    get expr() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.expr) this.expr.getRootIds(ids, closure);
    }

    get type() { return types.throw_statement }

    render() {
        let expr_str = "";
        if (this.expr) {
            if (Array.isArray(this.expr)) {
                expr_str = this.expr.map(e=>e.render()).join(",");
            } else
                expr_str = this.expr.render();
        }
        return `throw ${expr_str};`;
    }
}
