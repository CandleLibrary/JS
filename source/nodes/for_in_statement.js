/** FOR OF **/

import for_of_statement from "./for_of_statement.js";
import types from "./types.js";
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
