import _function from "./function_declaration.mjs";
import types from "./types.mjs";

export default class arrow_function_declaration extends _function {
    constructor(...sym) {
        super(...sym);
    }

    getRootIds(ids, closure) {
        this.args.forEach(e => e.getRootIds(ids, closure));
    }

    get name() { return null }

    get type() { return types.arrow_function_declaration }

    render() {
        const
            body_str = this.body.render(),
            args_str = this.args.render();
        return `${args_str} => ${body_str}`;
    }
}
