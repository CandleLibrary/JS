/** BLOCK **/

import stmts from "./statements.mjs";
import types from "./types.mjs";
export default class block_statement extends stmts {

    constructor(sym) {
        if (sym) {
            if (!(sym[1] instanceof stmts))
                return sym[1];
            super([sym[1].vals]);
        } else
            super();
    }

    getRootIds(ids, closure) {
        super.getRootIds(ids, new Set([...closure.values()]));
    }

    get type() { return types.block_statement }

    render() { return `{${super.render()}}` }
}