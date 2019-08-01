/** PROPERTY BINDING DECLARATION **/

import binding from "./binding.js";
import types from "./types.js";
export default class property_binding extends binding {
    constructor(sym) {
        super([sym[0], sym[2]]);
    }
    get type( ){return types.property_binding}
    render() { return `${this.id.type > 2 ? `[${this.id.render()}]` : this.id.render()} : ${this.init.render()}` }
}
