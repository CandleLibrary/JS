/** RETURN STATMENT  **/

import base from "./base.mjs";
import types from "./types.mjs";



export default class label_statement extends base {
    constructor(sym) {
        super((sym.length > 2) ? sym[1] : null);
    }

    get id(){return this.vals[0]}
    get stmt(){return this.stmt[1]}

    get type() { return types.label_statement }

    render() {
        return `${this.id.render()}: ${this.stmt.render()}`;
    }
}
