import base from "./base.mjs";
import types from "./types.mjs";

export default class call extends base {
    constructor(sym) {
        super(sym[0], (Array.isArray(sym[1])) ? sym[1] : [sym[1]]);
    }

    get id() { return this.vals[0] }
    get args() { return this.vals[1] }

    getRootIds(ids, closure) {
        this.id.getRootIds(ids, closure);
        this.args.getRootIds(ids, closure);
    }

    get name() { return this.id.name }
    get type() { return types.call }

    render() { 
        return `${this.id.render()}(${this.args.map(a=>a.render()).join(",")})` 
    }
}
