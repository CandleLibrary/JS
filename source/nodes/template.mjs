/** TEMPLATE **/

import base from "./base.mjs";

import types from "./types.mjs";

import string from "./string.mjs";


class nosubstitute_string extends base{
    render(){
        return this.vals[0];
    }
}

export default class template extends base {
    constructor(sym) {

    	const NO_SUBSTITUTE = typeof sym == "string";

        if (NO_SUBSTITUTE){
            super(new nosubstitute_string(sym));
        }
        else
            super(...sym)

        console.log(this.render())

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
