import base from "./base.js";
import types from "./types.js";

export default class function_declaration extends base {
    constructor(id, args, body) {

        super(id, args || null, body || null);

        //This is a declaration and id cannot be a closure variable. 
        if (this.id)
            this.id.root = false;
    }

    get id() { return this.vals[0] }
    get args() { return this.vals[1] }
    get body() { return this.vals[2] }

    getRootIds(ids, closure) {
        if (this.id)
            this.id.getRootIds(ids, closure);
        if (this.args)
            this.args.getRootIds(ids, closure);
        if (this.body)
            this.body.getRootIds(ids, closure)
    }

    get name() { return this.id.name }

    get type() { return types.function_declaration }

    render() {
        const
            body_str = (this.body) ? this.body.render() : "",
            args_str = (this.args) ? this.args.render() : "()",
            id = this.id ? this.id.render() : "";

        return `function ${id}${args_str}{${body_str}}`;
    }
}
