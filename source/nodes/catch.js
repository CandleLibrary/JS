/** CATCH **/

import {statement} from "./base.js";
import types from "./types.js";
export default class catch_statement extends statement {
    constructor(sym) {
        super(sym[2], sym[4]);
    }

    get expression() { return this.vals[0] }
    get body() { return this.vals[1] }

    getRootIds(ids, closure) {
        this.expression.getRootIds(ids, closure);
        this.body.getRootIds(ids, closure);
    }

    get type() { return types.catch_statement }

    render(){
        return `catch (${this.expression})${this.body.type == types.block_statement ? this.body : `{${this.body}}`}`
    }
}
