import function_declaration from "./function_declaration.mjs";
import types from "./types.mjs";

export default class class_method extends function_declaration {
    constructor(id, args, body, method_type = "") {

        super(id, args, body);

        this.method_type = ""
        this.static = false;
    }

    get type() { return types.class_method }

    render() {
        const
            body_str = (this.body) ? this.body.render() : "",
            args_str = (this.args) ? this.args.render(true) : "()",
            id = this.id ? this.id.render() : "";

        return `${this.method_type ? this.method_type + " ": ""}${id}${args_str}{${body_str}}`;
    }
}
