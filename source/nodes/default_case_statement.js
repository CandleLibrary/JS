/** DEFAULT CASE STATMENT  **/

import base from "./base.js";
import types from "./types.js";

export default class default_case_statement extends base {
    get statements() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.statements) this.statements.getRootIds(ids, closure);
    }

    get type() { return types.default_case_statement }

    render() {
        return `default:${this.statements?this.statements.render():""}`;
    }
}
