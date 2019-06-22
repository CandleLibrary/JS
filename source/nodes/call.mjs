import base from "./base.mjs";
import types from "./types.mjs";

export default class call_expression extends base {
    constructor(sym) {
        super(sym[0],sym[1]);
        
        // /if(this.args)
        // /    this.args.clearRoots();
    }

    get id() { return this.vals[0] }
    get args() { return this.vals[1] }

    getRootIds(ids, closure) {
        this.id.getRootIds(ids, closure);
        this.args.getRootIds(ids, closure);
    }

    replaceNode(original, _new = null) {
        let index = 0;
        if ((index = super.replaceNode(original, _new, this.vals)) > -1) {
            if(index == 0)
                this.replace(_new);
            else
                this.replace(null)
        }
    }

    get name() { return this.id.name }
    get type() { return types.call_expression }

    render() { 
        return `${this.id.render()}(${this.args.render()})` 
    }
}
