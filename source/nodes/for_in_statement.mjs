/** FOR IN **/

import { statement } from "./base.mjs";
import types from "./types.mjs";
export default class for_in_statement extends statement {

    get binding() { return this.vals[0] }
    get expression() { return this.vals[1] }
    get body() { return this.vals[2] }

    get type() { return types.for_in_statement }

    getRootIds(ids, closure) {  
        if (this.binding) this.binding.getRootIds(ids, closure);
        if (this.expression) this.expression.getRootIds(ids, closure);
        if (this.body) this.body.getRootIds(ids, new Set);
    }


    render() {
        let binding, expression, body;

        if (this.binding) binding = this.binding.render();
        if (this.expression) expression = this.expression.render();
        if (this.body) body = this.body.render();

        return `for(${binding} in ${expression} ) ${body}`;
    }
}
