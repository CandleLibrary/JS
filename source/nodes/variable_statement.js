/** VARIABLE STATEMENT **/

import {statement} from "./base.js";
import types from "./types.js";
export default class variable_declaration extends statement {
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
