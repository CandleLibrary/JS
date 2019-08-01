/** SUPER LITERAL  **/

import base from "./base.js";
import types from "./types.js";

export default class super_literal extends base {
    constructor(sym) {
        super(sym);
    }

    getRootIds(ids, closure) {}

    get type() { return types.super_literal }

    render() { return `super`; }
}
