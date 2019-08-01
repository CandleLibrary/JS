/** FOR OF **/

import base from "./base.js";
import types from "./types.js";
export default class for_of_statement extends base {

    get await() { return this.vals[0] }
    get binding() { return this.vals[1] }
    get expression() { return this.vals[2] }
    get body() { return this.vals[3] }

    get type() { return types.for_of_statement }

    render() {
        let binding, expression, body;

        if (this.binding) binding = this.binding.render();
        if (this.expression) expression = this.expression.render();
        if (this.body) body = this.body.render();

        return `for(${binding} of ${expression})${body}`;
    }
}
