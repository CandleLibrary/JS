/** IDENTIFIER **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class identifier extends base {
    constructor(sym = []) {
        super(sym[0]);
        this.root = true;
    }

    clearRoots(){
        this.root = false;
    }

    get val() { return this.vals[0] }

    getRootIds(ids, closure) {
        if (this.root && !closure.has(this.val)) 
            ids.add(this.val);
    }

    addToClosure(closure) {
        closure.add(this.val);
    }


    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
    }

    get name() { return this.val }

    get type() { return types.identifier }

    render() { return this.val }
}