/** cover_parenthesized_expression_and_arrow_parameter_list **/

import base from "./base.mjs";

import types from "./types.mjs";
export default class argument_list extends base {
    constructor(sym) {
        super((sym) ? (Array.isArray(sym) )? sym : [sym]  : []);
    }

    clearRoots(){
        this.expressions.forEach(a=>a.root = false);
    }

    get expressions() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.expressions.forEach(s => s.getRootIds(ids, closure));
    }

    replaceNode(original, _new = null) {
        let index = -1;
        if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) 
            this.vals[0].splice(index, 1);
    }

    * traverseDepthFirst(p) {
        yield * super.traverseDepthFirst(p, this.vals[0]);
    }

    get type() { return types.cover_parenthesized_expression_and_arrow_parameter_list }

    render() { 
        return `(${this.expressions.map(s=>(s.render())).join(",")})` ;
    }
}
