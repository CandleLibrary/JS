/** TRY STATEMENT **/

import { statement } from "./base.mjs";
import types from "./types.mjs";
export default class try_statement extends statement {
    constructor(body, _catch, _finally) {
        super(body, _catch, _finally);
    }

    get body() { return this.vals[0] }
    get catch() { return this.vals[1] }
    get finally() { return this.vals[2] }

    getRootIds(ids, clsr) {
        this.body.getRootIds(ids, clsr);
        if (this.catch) this.catch.getRootIds(ids, clsr);
        if (this.finally) this.finally.getRootIds(ids, clsr);
    }

    get type() { return types.try_statement }

    render(){
        return `try ${this.body}${this.catch ? " "+ this.catch : ""}${this.finally ? " "+this.finally : ""}`
    }
}
