import _function from "./function_declaration.mjs";
import types from "./types.mjs";

export default class arrow_function_declaration extends _function {
    constructor(...sym) {
        
        super(...sym);

        //Since _function boxes args into an array, pull out the argument node
        this.vals[1] = this.vals[1][0]
    }

    getRootIds(ids, closure) {
        if(this.args)
            this.args.getRootIds(ids, closure);
        this.body.getRootIds(ids,closure)
    }

    get name() { return null }

    get type() { return types.arrow_function_declaration }

    render() {
        const
            body_str = this.body.stmts.length > 1 ? `{${this.body.render()}}` : this.body.render(),
            args_str = (this.args) ? this.args.render() : "()";
        return `${args_str} => ${body_str}`;
    }
}
