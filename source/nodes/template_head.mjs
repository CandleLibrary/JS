/** TEMPLATE HEAD **/

import base from "./base.mjs";

import types from "./types.mjs";

export default class template_head extends base {
	
    constructor(sym) { super(sym|| "") }

    get string() { return this.vals[0] }

    get expression() { return this.vals[1] }

    get type() { return types.template_head }

    render() { 
    	return `${this.string}\${${this.expression.render()}`;
    }
}
