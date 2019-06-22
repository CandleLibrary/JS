/** BREAK STATMENT  **/

import base from "./base.mjs";
import types from "./types.mjs";



export default class break_statement extends base {
    constructor(sym) {
        super((Array.isArray(sym)) ? null : sym );
    }

    get label() { return this.vals[0] }

    get type() { return types.break_statement }

    render() {
        let label_str = this.label ? " " + this.label.render(): "";        
        return `break${label_str};`;
    }
}
