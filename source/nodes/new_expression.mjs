/** NEW EXPRESSION **/

import base from "./base.mjs";
import types from "./types.mjs";
import call_expression from "./call.mjs";

export default class new_expression extends call_expression {
    constructor(id, args) { 
        super([id, args]);
        this.root = false;
        this.id.root = false;
    }

    get type(){return types.new_expression}

    render() { 
        const
            args_str = this.args.render();

        return `new ${this.id.render()}(${args_str})`;
    }
}
