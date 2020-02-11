/** ARGUMENT_LIST **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class argument_list extends base {
    constructor(sym) {

        super(...sym);
    }

    get args() { return this.vals }

    getRootIds(ids, closure) {
        this.args.forEach(s => s.getRootIds(ids, closure));
    }

    replaceNode(original, _new = null) {
        let index = 0;
        if ((index = super.replaceNode(original, _new, this.vals)) < 0) {
            this.vals.splice(-(index+1), 1);
        }
    }

    * traverseDepthFirst(p) {
        yield * super.traverseDepthFirst(p, this.vals);
    }

    get length (){
        return this.args.length;
    }

    get type() { return types.argument_list }

    render(USE_PARENTHASIZ) { 
        return this.args.map(s=>(s.render())).join(",") ;
    }
}
