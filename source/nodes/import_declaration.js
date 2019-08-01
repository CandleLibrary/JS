/** IMPORT STATEMENT  **/

import base from "./base.js";
import types from "./types.js";



export default class import_declaration extends base {

    constructor(specifier, import_clause = null) {
        console.log(import_clause)
        super((Array.isArray(import_clause)) ? new base(import_clause) : import_clause , specifier);
    }

    get import_clause() { return this.vals[0] }
    get specifier() { return this.vals[1] }

    getRootIds(ids, closure) {
        if (this.expr) this.expr.getRootIds(ids, closure);
    }

    get type() { return types.import_declaration }

    render() {
        if(this.import_clause)
            return `import ${this.import_clause.render()} from ${this.specifier.render()};`
        else
            return `import ${this.specifier.render()};`
    }
}
