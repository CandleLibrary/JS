/** FOR OF **/

import for_of_statement from "./for_of_statement.mjs";
import types from "./types.mjs";
export default class for_in_statement extends for_of_statement {
    get type() { return types.for_in_statement }
    render() {
        let init, expression, body;

        if (this.init) init = this.init.render();
        if (this.expression) expression = this.expression.render();
        if (this.body) body = this.body.render();

        return `for(${init} in ${expression})${body}`;
    }
}
