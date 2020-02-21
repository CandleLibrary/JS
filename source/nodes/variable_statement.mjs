/** VARIABLE STATEMENT **/

import {statement} from "./base.mjs";
import types from "./types.mjs";
export default class variable_declaration extends statement {
    constructor(sym) {
        super(...sym[1]);
    }

    get bindings() { return this.vals }

    getRootIds(ids, closure) {
        this.bindings.forEach(b => b.getRootIds(ids, closure, true));
    }

    get type() { return types.variable_declaration }

    render() { return `var ${this.bindings.map(b=>b.render()).join(", ")};` }
}
