/** OPERATOR **/

import base from "./base.js";
import types from "./types.js";
export default class extends base {

    constructor(sym) {
        super(sym[1]);
        this.op = "";
    }

    get expr() { return this.vals[0] }

    replaceNode(original, _new = null) {
        if(_new === null || _new.type == types.null_literal){
            this.replace(_new)
        }
        else
            this.vals[0] = _new
    }

    render() { return `${this.op}${this.expr.render()}` }
}
