import base from "./base.js";
import types from "./types.js";

export default class export_clause extends base {
	
    constructor(exports) {
        super(exports);
    }

    get exports() { return this.vals[0] }

    get type() { return types.named_exports }

    render() {
        const
            exports = this.exports.map(e => e.render()).join(",");

        return `{${exports}}`;
    }
}
