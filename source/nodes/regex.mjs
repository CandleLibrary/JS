/** REGULAR EXPRESSION **/

import base from "./base.mjs";

import types from "./types.mjs";

export default class extends base {
    constructor(sym = []) { super(sym[1],sym[3]) }
    get val() { return this.vals[0] }
    get flags() { return this.vals[1] }
    get type() { return types.regex }
    render() { return `/${this.val}/${this.flags || ""}` }
}
