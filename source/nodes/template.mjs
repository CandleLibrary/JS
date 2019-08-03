/** TEMPLATE **/

import base from "./base.mjs";

import types from "./types.mjs";

import string from "./string.mjs";

export default class template extends base {
    constructor(sym) {
    	const NO_SUBSTITUTE = typeof sym == "string"

        if (NO_SUBSTITUTE)
            super(new string(sym))
        else
            super(...sym)

        this.NO_SUBSTITUTE = NO_SUBSTITUTE;
    }

    get str() { return this.vals[0] }

    get type() { return types.template }

    render() {
        let str = [this.str.render()];

        if (!this.NO_SUBSTITUTE)
            str = this.vals.map(v => v.render());

        return "`" + str.join("") + "`";
    }
}
