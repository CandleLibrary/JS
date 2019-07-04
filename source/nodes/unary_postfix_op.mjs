/** OPERATOR **/

import base from "./base.mjs";

export default class extends base {

    constructor(sym) {
        super(sym[0]);
        this.op = "";
    }

    replaceNode(original, _new = null) {
        if(_new === null || _new.type == types.null_literal){
            this.replace(_new)
        }
        else
            this.vals[0] = _new
    }

    get expr() { return this.vals[0] }
    render() { return `${this.expr.render()}${this.op}` }
}
