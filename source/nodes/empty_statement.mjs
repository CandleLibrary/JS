/** empty **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class empty_statement extends base {
    constructor() {
        super();
    }
    get type() { return types.empty }
    render() { return "" }
}
