/** FOR IN **/

import { statement } from "./base.js";
import types from "./types.js";
export default class for_in_statement extends statement {

    get binding() { return this.vals[0] }
    get expression() { return this.vals[1] }
    get body() { return this.vals[2] }

    get type() { return types.for_in_statement }

    render() {
        let binding, expression, body;

        if (this.binding) binding = this.binding.render();
        if (this.expression) expression = this.expression.render();
        if (this.body) body = this.body.render();

        return `for(${binding} in ${expression} ) ${body}`;
    }
}
