 import base from "./base.js";
import types from "./types.js";

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
