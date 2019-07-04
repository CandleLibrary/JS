/** cover_parenthesized_expression_and_arrow_parameter_list **/

import base from "./base.mjs";
import types from "./types.mjs";

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

    get args() { return this.vals }

    get length (){
        return this.vals.length;
    }

    replaceNode(original, _new = null) {

        if(this.looking){
            console.log("AAAAAAAAAAAA11111111111111111AAAAAAAAAAAA11111111111111111AAAAAAAAAAAA11111111111111111AAAAAAAAAAAA11111111111111111")
            console.log( this.render())
            console.log("parenthasized", _new)
        }
        let index = -1;
        if ((index = super.replaceNode(original, _new)) > -1) {
            this.vals.splice(index, 1);
        }
        if(this.looking)
        console.log( this.render())
    }

    get type() { return types.argument_list }

    render(USE_PARENTHASIS = true) { 
        const str = this.vals.map(s=>(s.render())).join(",") ;
        return USE_PARENTHASIS ? `(${str})` : str;
    }
}
