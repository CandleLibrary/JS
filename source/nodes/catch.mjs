/** CATCH **/

import {statement} from "./base.mjs";
import types from "./types.mjs";
export default class catch_statement extends statement {
    constructor(sym) {
        super(sym[2], sym[4]);
    }

    get variable() { return this.vals[0] }
    get body() { return this.vals[1] }

    getRootIds(ids, closure) {
        closure.add(this.variable.val);
        this.body.getRootIds(ids, closure);
    }

    get type() { return types.catch_statement }

    render(){
        return `catch (${this.variable})${this.body.type == types.block_statement ? this.body : `{${this.body}}`}`
    }
}
