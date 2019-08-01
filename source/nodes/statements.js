/** STATEMENTS **/

import {statement} from "./base.js";

import types from "./types.js";
export default class statements extends statement {
    constructor(sym) {

        if (sym[0].length == 1)
            return sym[0][0];
        
        super(sym[0]);
    }

    get stmts() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.stmts.forEach(s => s.getRootIds(ids, closure));
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

    get type() { return types.statements }

    render() { 
        return this.stmts.map(s=>(s.render())).join("") ;
    }
}
