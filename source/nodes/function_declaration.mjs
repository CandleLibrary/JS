import {statement} from "./base.mjs";
import types from "./types.mjs";

export default class function_declaration extends statement {
    constructor(id, args, body, _async = false, generator = false) {

        super(id, args || null, body || null);

        //This is a declaration and id cannot be a closure variable. 
        if (this.id)
            this.id.root = false;

        this.async = _async;
        this.gen = generator;
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

        return `${this.async ? "async ": ""}function ${this.gen ? "* ": ""}${id}${args_str}{${body_str}}`;
    }
}
