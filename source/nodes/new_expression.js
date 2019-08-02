/** NEW EXPRESSION **/

import base from "./base.js";
import types from "./types.js";
import call_expression from "./call.js";

export default class new_expression extends call_expression {
    constructor(id, args) { 
        super([id, args]);
        this.root = false;
        //this.id.root = false;
    }

    get type(){return types.new_expression}

    render() { 
        const
            args_str = (this.args) ? this.args.render() : "";

        return `new ${this.id.render()}${args_str}`;
    }
}
