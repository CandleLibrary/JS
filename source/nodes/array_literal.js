import base from "./base.js";
import types from "./types.js";

export default class array_literal extends base {
    constructor(list) {

        
        super(list || []);
    }

    get exprs() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.exprs.forEach(e => e.getRootIds(ids, closure));
    }

    replaceNode(original, _new = null) {
        let index = 0;
        if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
            this.vals[0].splice(index, 1);
        }
    }

    get type() { return types.array_literal }

    render() { return `[${this.exprs.map(a=>a.render()).join(",")}]` }
}
