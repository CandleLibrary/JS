import types from "./types.mjs";

export default class base {
    constructor(...vals) {

        this.vals = vals;
        this.parent = null;
    }

    replaceNode(original, _new = null, vals = this.vals) {
        for (let i = 0; i < vals.length; i++) {
            if (vals[i] === original)
                if (_new === null) {
                    return -(i+1);
                } else
                    return vals[i] = _new, i;
        }
    }

    replace(node) {
        if (this.parent)
            this.parent.replaceNode(this, node);
    }

    getRootIds(ids, closure) {
        for(const id of this.vals)
            if(id && id.getRootIds)
                id.getRootIds(ids, closure);
    }

    * traverseDepthFirst(p, vals = this.vals) {
        this.parent = p;
        this.SKIP = false;

        if(vals == this.vals)
            yield this;

        for (let i = 0; i < vals.length; i++) {
            if(this.SKIP == true){
                break;
            }

            const node = vals[i];

            if (!node) continue;

            if(Array.isArray(node)){
                yield* this.traverseDepthFirst(p, node);
            }else if(typeof(node) == "object"){
                yield* node.traverseDepthFirst(this);
            }

            if (vals[i] !== node) // Check to see if node has been replaced. 
                i--; //Reparse the node
        }
    }

    * traverseChildren(vals = this.vals) {
        for (let i = 0; i < vals.length; i++) {
            const node = vals[i];

            if (!node) continue;

            if(Array.isArray(node)){
                yield* this.traverseChildren(node);
            }else if(typeof(node) == "object"){
                node.parent = this;
                yield node;
            }

            if (vals[i] !== node) // Check to see if node has been replaced. 
                i--; //Reparse the node
        }
    }

    skip() {
        this.SKIP = true;
    }

    spin(trvs) {
        let val = trvs.next().value;
        while (val !== undefined && val !== this) { val = trvs.next().value };
    }

    toString() { return this.render() }

    render() { return this.vals.join("") }

    clone(){
        const clone = Object.assign(new this.constructor(), this);

        clone.vals = clone.vals.map(e=>(e && e.clone) ? e.clone() : e);

        return clone.connect;
    }

    copy(){
        return this.clone();
    }

    get connect(){
        this.vals.forEach(v=>{
            if(v instanceof base){
                v.parent = this;
                v.connect;
            }
        });
        return this;
    }
}

export class statement extends base {get IS_STATEMENT(){return true}}
