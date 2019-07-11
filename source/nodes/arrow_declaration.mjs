import _function from "./function_declaration.mjs";
import types from "./types.mjs";
import argument_list from "./parenthasized.mjs";

export default class arrow_function_declaration extends _function {
    constructor(...sym) {

        super(...sym);

        if (!this.args)
            this.vals[1] = new argument_list();

        this.args.clearRoots();
    }

    getRootIds(ids, closure) {
        if (this.args){
            this.args.getRootIds(ids, closure);
            this.args.addToClosure(closure);
        }
        if (this.body)
            this.body.getRootIds(ids, closure)
    }

    get IS_STATEMENT() { return false }

    get name() { return null }

    get type() { return types.arrow_function_declaration }

    render() {
        const
            body_str = ((this.body) ?
                ((this.body.IS_STATEMENT || (this.body.type == types.statements && this.body.stmts.length > 1)) ?
                    `{${this.body.render()}}` :
                    this.body.render()) :
                "{}"),
            args_str = this.args.render(this.args.length !== 1);

        return `${args_str}=>${body_str}`;
    }
}
