/** MEMBER **/

import base from "./base.mjs";
import types from "./types.mjs";
import identifer from "./identifier.mjs";

export default class member_expression extends base {
    constructor(id, mem, evaluated = false) { 
        super(id, mem);
        this.evaluated = evaluated;
        this.root = true;
        this.mem.root = false;
    }

    get id() { return this.vals[0] }
    get mem() { return this.vals[1] }

    getRootIds(ids, closure) {
        this.id.getRootIds(ids, closure);
    }

    replaceNode(original, _new = null) {
        let index = 0;
        if ((index = super.replaceNode(original, _new, this.vals)) < 0) {
            if(-(index+1) == 0)
                this.replace(_new);
            else
                this.replace(null)
        }
    }

    get name() { return this.id.name }
    get type() { return types.member_expression }

    render() { 
        if(this.evaluated){
            return `${this.id.render()}[${this.mem.render()}]`;
        }else{
            return `${this.id.render()}.${this.mem.render()}`;
        }
    }
}
