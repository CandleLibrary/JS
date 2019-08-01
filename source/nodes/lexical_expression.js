/** LEXICAL EXPRESSION **/

import lexical_declaration from "./lexical.js";
import binding from "./binding.js";
import types from "./types.js";
//Like lexical declaration except omiting the semi-colon within the render() output.
export default class lexical_expression extends lexical_declaration {
	constructor(sym) {
        super(sym);
        this.vals[0] = [new binding([this.vals[0]])];
    }
    render() { 
    	return super.render().slice(0, -1);
   	}
    get type(){return types.lexical_expression}
}
