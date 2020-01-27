/** IDENTIFIER **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class identifier extends base {
    constructor(sym) {
        super(sym[0]);
        this.root = true;
    }

    get val() { return this.vals[0] }

    getRootIds(ids, closure) { 
        if(!closure.has(this.val)){
            ids.add(this.val);
        }
    }

      addToClosure(closure){
        this.vals.forEach(a=>closure.add(a.name));   
    }


    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
    }

    get name() { return this.val }

    get type() { return types.identifier }

    render() { return this.val }
}