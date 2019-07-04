/** ARGUMENT_LIST **/

import base from "./base.mjs";

import types from "./types.mjs";
export default class argument_list extends base {
    constructor(sym) {

        //if (sym && sym.length == 1)
        //    return sym[0];
        
        super( sym || []);
    }

    clearRoots(){
        this.args.forEach(a=>a.root = false);
    }

    get args() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.args.forEach(s => s.getRootIds(ids, closure));
    }

    replaceNode(original, _new = null) {
        let index = -1;
        if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
            this.vals[0].splice(index, 1);
        }
    }

    * traverseDepthFirst(p) {
        yield * super.traverseDepthFirst(p, this.vals[0]);
    }

    get length (){
        return this.args.length;
    }

    get type() { return types.argument_list }

    render(USE_PARENTHASIZ) { 
        return this.args.map(s=>(s.render())).join(",") ;
    }
}
