 import base from "./base.mjs";
import types from "./types.mjs";

export default class named_imports extends base {
    constructor(imports) {
        super(imports);
    }

    get imports() { return this.vals[0] }

    get type() { return types.named_imports }

    render() {
        const
            imports = this.imports.map(e => e.render()).join(",");

        return `{${imports}}`;
    }
}
