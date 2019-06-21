/** SCRIPT TL  **/

import base from "./base.mjs";
import types from "./types.mjs";



export default class script extends base {
    constructor(sym) {
        super(sym);
    }

    get statements() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.statements) this.statements.getRootIds(ids, closure);
    }

    get type() { return types.script }

    render() {
        return this.statements.render();
    }
}
