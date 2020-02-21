 import base from "./base.mjs";
 import types from "./types.mjs";

 export default class import_specifier extends base {
     constructor(id, alt_id) {

         super(id, alt_id );

         //This is a declaration and id cannot be a closure variable. 
         if (this.id)
             this.id.root = false;
     }

     get id() { return this.vals[0] }
     get alt_id() { return this.vals[1] }

     getRootIds(ids, closure) {
         if (this.alt_id)
             this.alt_id.getRootIds(ids, closure);
         else this.id.getRootIds(ids, closure);
     }

     get name() { return this.alt_id.name }

     get type() { return types.import_specifier }

     render() {
		if (this.alt_id)
            return `${this.id.render()} as ${this.alt_id.render()}`
         else return `${this.id.render()}`
     }
 }
