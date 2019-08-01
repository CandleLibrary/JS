/** CONTINUE STATMENT  **/

import base from "./base.js";
import types from "./types.js";

export default class continue_statement extends base {
    get label() { return this.vals[0] }

    get type() { return types.continue_statement }

    render() {
        let label_str = this.label ? " " + this.label.render(): "";        
        return `continue${label_str};`;
    }
}
