/** BINDING DECLARATION **/

import base from "./base.js";
import types from "./types.js";
export default class extends base {
    constructor(sym) {
        super(sym[0], sym[1] || null);
        this.id.root = false;
    }

    get id() { return this.vals[0] }
    get init() { return this.vals[1] }
    get type(){return types.binding}

    getRootIds(ids, closure, declaration = false) {
        if(declaration)
            closure.add(this.id.val)
            //this.id.getRootIds(closure, closure);
        //closure.add(this.id.val)
        if (this.init) this.init.getRootIds(ids, closure);
    }

    render() { return `${this.id}${this.init ? ` = ${this.init.render()}` : ""}` }
}
