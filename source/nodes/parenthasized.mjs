/** cover_parenthesized_expression_and_arrow_parameter_list **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class argument_list extends base {
    constructor(...sym) {
        super(...sym);
    }

    get args() { return this.vals }

    get length() {
        return this.vals.length;
    }

    replaceNode(original, _new = null) {
        let index = 0;
        if ((index = super.replaceNode(original, _new)) < 0) {
            this.vals.splice(-(index + 1), 1);
        }
    }

    get type() { return types.argument_list }

    render(USE_PARENTHASIS = true) {
        const str = this.vals.map(s => (s.render())).join(",");
        return USE_PARENTHASIS ? `(${str})` : str;
    }
}