 import base from "./base.js";
import types from "./types.js";

export default class name_space_import extends base {
    constructor(sym) {

        super(sym[0]);

        //This is a declaration and id cannot be a closure variable. 
        if (this.id)
            this.id.root = false;
    }

    get id() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.id)
            this.id.getRootIds(ids, closure);
    }

    get name() { return this.id.name }

    get type() { return types.name_space_import }

    render() {
        return `* as ${this.id.render()}`;
    }
}
