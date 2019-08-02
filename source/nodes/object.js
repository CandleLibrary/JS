/** OBJECT LITERAL **/

import base from "./base.js";

import types from "./types.js";

export default class object_literal extends base {
    constructor(props) {
        super(props);
    }

    get props() { return this.vals[0] }

    getRootIds(ids, closure) {
        if(this.props)
            for(const id of this.props)
                if(id && id.getRootIds)
                    id.getRootIds(ids, closure);
    }

    get type() { return types.object_literal }

    render() { return `{${this.props ? this.props.map(p=>p.render()).join(","): ""} }` }
}
