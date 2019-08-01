/** OBJECT **/

import base from "./base.js";

import types from "./types.js";

export default class object_literal extends base {
    constructor(props) {
        super(props);
    }

    get props() { return this.vals[0] }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
        for (const prop of this.props)
            yield* prop.traverseDepthFirst(this);
    }

    getRootIds(ids, closure) {
        for(const id of this.props)
            if(id && id.getRootIds)
                id.getRootIds(ids, closure);
    }

    get type() { return types.object_literal }

    render() { return `{${this.props.map(p=>p.render()).join(",")}}` }
}
