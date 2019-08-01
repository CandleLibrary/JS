/** cover_parenthesized_expression_and_arrow_parameter_list **/

import base from "./base.js";
import types from "./types.js";

export default class argument_list extends base {
    constructor(...sym) {
        if(!sym || !sym[0])        
            super()
        else
            super(...sym);

        this.looking = this.render() == "($$sym3,$$sym6,env,lex)"
    }

    clearRoots(){
        this.vals.forEach(a=>a.root = false);
    }

    addToClosure(closure){
        this.vals.forEach(a=>closure.add(a.name));   
    }

    get args() { return this.vals }

    get length (){
        return this.vals.length;
    }

    replaceNode(original, _new = null) {

        let index = -1;
        if ((index = super.replaceNode(original, _new)) > -1) {
            this.vals.splice(index, 1);
        }
    }

    get type() { return types.argument_list }

    render(USE_PARENTHASIS = true) { 
        const str = this.vals.map(s=>(s.render())).join(",") ;
        return USE_PARENTHASIS ? `(${str})` : str;
    }
}
