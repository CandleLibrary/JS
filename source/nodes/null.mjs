/** NULL **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class null_literal extends base {
    constructor() { super() }
    get type() { return types.null_literal }
    render() { return "null" }
}
