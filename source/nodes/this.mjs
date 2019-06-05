/** THIS LITERAL  **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class this_literal extends base {
    constructor() {
        super();
        this.root = false;
    }

    get name() { return "this" }
    get type() { return types.this_literal }

    render() { return `this` }
}
