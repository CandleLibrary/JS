/** MEMBER **/

import base from "./base.mjs";
import types from "./types.mjs";
import identifer from "./identifier.mjs";

export default class member_expression extends base {
    constructor(sym) { super(sym[0], sym[2]);
        this.root = true;
        this.mem.root = false;
    }

    get id() { return this.vals[0] }
    get mem() { return this.vals[1] }

    getRootIds(ids, closuere) {
        this.id.getRootIds(ids, closuere);
    }

    replaceNode(original, _new = null) {
        let index = 0;
        if ((index = super.replaceNode(original, _new, this.vals)) > -1) {
            if(index == 0)
                this.replace(_new);
            else
                this.replace(null)
        }
    }

    get name() { return this.id.name }
    get type() { return types.member_expression }

    render() { 
        if(this.mem.type == types.member_expression || this.mem.type == types.identifier){
            return `${this.id.render()}.${this.mem.render()}`;
        }else{
            return `${this.id.render()}[${this.mem.render()}]`;
        }
    }
}
