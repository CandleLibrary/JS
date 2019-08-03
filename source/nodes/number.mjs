/** NUMBER **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class numeric_literal extends base {
    constructor(sym) { super(parseFloat(sym)) }
    get val() { return this.vals[0] }
    get type() { return types.numeric_literal }
    render() { return this.val + "" }
    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
    }
}
