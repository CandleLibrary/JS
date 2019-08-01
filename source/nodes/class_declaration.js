import base from "./base.js";
import types from "./types.js";

export default class class_declaration extends base {
    constructor(id, heritage, body) {

        super(id, heritage, body);

        //This is a declaration and id cannot be a closure variable. 
        if (this.id)
            this.id.root = false;
    }

    get id() { return this.vals[0] }
    get heritage() { return this.vals[1] }
    get body() { return this.vals[2] }


    getRootIds(ids, closure) {
        if (this.id)
            this.id.getRootIds(ids, closure);
        if (this.heritage)
            this.heritage.getRootIds(ids, closure);
        if (this.body)
            for(const item of this.body)
                item.getRootIds(ids, closure)
    }

    get name() { return this.id.name }

    get type() { return types.class_declaration }

    render() {
        const
            body_str = this.body.map(b=>b.render()).join(""),
            heritage = (this.heritage) ? " extends "+this.heritage.render() : "",
            id = this.id ? " " + this.id.render() : "";

        return `class${id}${heritage}{${body_str}}`;
    }
}
