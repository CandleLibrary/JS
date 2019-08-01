/** SCRIPT TL  **/

import base from "./base.js";
import types from "./types.js";



export default class script extends base {
    constructor(sym) {
        super((Array.isArray(sym)) ? sym[0] : sym) ;
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
