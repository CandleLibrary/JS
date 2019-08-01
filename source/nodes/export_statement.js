/** EXPORT STATEMENT  **/

import base from "./base.js";
import types from "./types.js";

export default class export_statement extends base {
    constructor(sym) {
        super((sym.length > 2) ? sym[1] : null);
    }

    get expr() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.expr) this.expr.getRootIds(ids, closure);
    }

    get type() { return types.export_statement }

    render() {
        let expr_str = "";
        if (this.expr) {
            if (Array.isArray(this.expr)) {
                expr_str = this.expr.map(e=>e.render()).join(",");
            } else
                expr_str = this.expr.render();
        }
        return `export ${expr_str};`;
    }
}
