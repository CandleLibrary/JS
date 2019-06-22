 import base from "./base.mjs";
import types from "./types.mjs";

export default class export_declaration extends base {
    constructor(exports, specifier, DEFAULT = false) {

        super(exports, specifier);

        this.DEFAULT = DEFAULT
    }

    get exports() { return this.vals[0] }
    get specifier() { return this.vals[1] }

    getRootIds(ids, closure) {
        if (this.exports)
            this.exports.getRootIds(ids, closure);
    }

    get type() { return types.export_declaration }

    render() {
        const
            exports = this.exports ? this.exports.render() : "",
        	specifier  = this.specifier ? ` from ${this.specifier.render()}` : "";

        return `export ${this.DEFAULT ? "default " : ""}${exports}${specifier}`;
    }
}