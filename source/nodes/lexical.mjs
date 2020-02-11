/** LEXICAL DECLARATION **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class lexical_declaration extends base {
    constructor(sym = []) {
        super(sym[1]);
        this.mode = sym[0];
        this.IS_STATEMENT = true;
    }

    get bindings() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.bindings.forEach(b => b.getRootIds(ids, closure, true));
    }

    get type() { return types.lexical_declaration }

    render() { return `${this.mode} ${this.bindings.map(b=>b.render()).join(",")};` }
}
