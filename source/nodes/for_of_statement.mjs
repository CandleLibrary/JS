/** FOR OF **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class for_of_statement extends base {

    get aait() { return this.vals[0] }
    get init() { return this.vals[1] }
    get expression() { return this.vals[2] }
    get body() { return this.vals[3] }

    getRootIds(ids, closure) {  
        if (this.init) this.init.getRootIds(ids, closure);
        if (this.expression) this.expression.getRootIds(ids, closure);        
        if (this.body) this.body.getRootIds(ids, new Set);

    }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
        if (this.init) yield* this.init.traverseDepthFirst(this);
        if (this.expression) yield* this.expression.traverseDepthFirst(this);
        if (this.body) yield* this.body.traverseDepthFirst(this);
        yield this;
    }

    get type() { return types.for_of_statement }

    render() {
        debugger
        let init, expression, body;

        if (this.init) init = this.init.render();
        if (this.expression) expression = this.expression.render();
        if (this.body) body = this.body.render();

        return `for(${init} of ${expression})${body}`;
    }
}
