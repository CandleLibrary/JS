 import base from "./base.js";
import types from "./types.js";

export default class default_import extends base {
    constructor(sym) {
        super(sym[0]);

    }

    get id() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.id)
            this.id.getRootIds(ids, closure);
    }

    get name() { return this.id.name }

    get type() { return types.default_import }

    render() {
        return this.id.render();
    }
}
