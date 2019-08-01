/** NULL **/

import base from "./base.js";
import types from "./types.js";
export default class null_literal extends base {
    constructor() { super() }
    get type() { return types.null_literal }
    render() { return "null" }
}
