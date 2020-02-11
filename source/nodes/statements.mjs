/** STATEMENTS **/

import {statement} from "./base.mjs";

import types from "./types.mjs";
export default class statements extends statement {
    constructor(sym = [[]]) {

        if (sym[0].length == 1)
            return sym[0][0];
        
        super(...sym[0]);
    }

    get stmts() { return this.vals }

    getRootIds(ids, closure) {
        this.stmts.forEach(s => s.getRootIds(ids, closure));
    }

    replaceNode(original, _new = null) {
        let index = -1;
        if ((index = super.replaceNode(original, _new, this.vals)) < 0) {
            this.vals.splice(-(index+1), 1);
        }
    }

    * traverseDepthFirst(p) {
        yield * super.traverseDepthFirst(p, this.vals);
    }

    get type() { return types.statements }

    render() { 
        return this.stmts.map(s=>(s.render())).join("") ;
    }
}
