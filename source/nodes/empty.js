/** empty **/

import base from "./base.js";
import types from "./types.js";
export default class empty_statement extends base {
    constructor() {
        super();
    }
    get type() { return types.empty }
    render() { return ";" }
}
