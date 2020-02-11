/** OPERATOR **/

import base from "./base.mjs";
export default class extends base {

    constructor(sym = []) {
        super(sym[0], sym[2]);
        this.op = "";
    }

    get left() { return this.vals[0] }
    get right() { return this.vals[1] }

    getRootIds(ids, closure) { 
        this.left.getRootIds(ids, closure)
        this.right.getRootIds(ids, closure)
    }

    replaceNode(original, _new = null) {
        var index;

        if ((index = super.replaceNode(original, _new)) < 0){
            this.replace(this.vals[(-(index))%2]);
        }
    }

    render() { return `${this.left.render()} ${this.op} ${this.right.render()}` }
}
