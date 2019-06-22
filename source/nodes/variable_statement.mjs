/** VARIABLE STATEMENT **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class variable_declaration extends base {
    constructor(sym) {
        super(sym[1]);
    }

    get bindings() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.bindings.forEach(b => b.getRootIds(ids, closure, true));
    }

    get type() { return types.variable_declaration }

    render() { return `var ${this.bindings.map(b=>b.render()).join(",")};` }
}
