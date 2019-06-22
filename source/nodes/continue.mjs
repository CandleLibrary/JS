/** CONTINUE STATMENT  **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class continue_statement extends base {
    get label() { return this.vals[0] }

    get type() { return types.continue_statement }

    render() {
        let label_str = this.label ? " " + this.label.render(): "";        
        return `continue${label_str};`;
    }
}
