   import base from "./base.mjs";
import types from "./types.mjs";

export default class import_clause extends base {

    constructor(imports) {
        super(imports);
    }

    get imports() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.imports.getRootIds(ids, closure);
    }

    get type() { return types.import_clause }

    render() {
        return this.imports.render();
    }
}
