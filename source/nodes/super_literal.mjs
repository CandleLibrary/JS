/** SUPER LITERAL  **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class super_literal extends base {
    constructor(sym) {
        super(sym);
    }

    getRootIds(ids, closure) {}

    get type() { return types.super_literal }

    render() { return `super`; }
}
