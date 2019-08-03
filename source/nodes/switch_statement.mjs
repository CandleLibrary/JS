/** SWITCH STATEMENT **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class switch_statement extends base {

    get expression() { return this.vals[0] }
    get caseblock() { return this.vals[1] }

    getRootIds(ids, closure) {
        //closure = new Set([...closure.values()]);
        this.expression.getRootIds(ids, closure)
        if (this.caseblock) this.caseblock.forEach(c=>c.getRootIds(ids, closure));
    }

    get type() { return types.switch_statement }

    render() {
        let
            expression = this.expression.render(),
            caseblock = this.caseblock.map(
                c =>
                c.render()).join("");

        return `switch(${expression}){${caseblock}}`;
    }
}
