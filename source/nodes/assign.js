/** ASSIGNEMENT EXPRESSION **/

import operator from "./operator.js";

import types from "./types.js";

export default class assignment_expression extends operator {
    constructor(sym) {
        super(sym);
        this.op = sym[1];
        //this.id.root = false;
    }
    
    getRootIds(ids, closure) { 
        if(this.left.type !== types.identifier)
            this.left.getRootIds(ids, closure)
        this.right.getRootIds(ids, closure)
    }

    get id() { return this.vals[0] }
    get expr() { return this.vals[2] }
    get type() { return types.assignment_expression }
}
