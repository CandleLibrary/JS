/** TEMPLATE MIDDLE **/

import base from "./base.js";

import types from "./types.js";

export default class template_tail extends base {

	constructor(sym) { super(sym|| "") }

    get string() { return this.vals[0] }

    get type() { return types.template_tail }

    render() { 
    	return `}${this.string}`;
    }
}
