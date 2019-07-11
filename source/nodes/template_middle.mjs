/** TEMPLATE MIDDLE **/

import base from "./base.mjs";

import types from "./types.mjs";

export default class template_middle extends base {

    constructor(sym) { super(sym) }

    get string() { return this.vals[0] }

    get expression() { return this.vals[1] }

    get type() { return types.template_middle }

    render() { 
    	return `}${this.string}\${${this.expression.render()}`;
    }
}
