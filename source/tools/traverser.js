
import ecmascript_parser from "./parser/parser.js";

const Yielder = { yield : node => node, complete : node=>node };

/*
	This function will traverse a mintree ast and return nodes depth first. 
*/
export function* traverse(mintree, yielder = Yielder) {

	if (typeof mintree !== "object")
		throw new Error("Mintree is not a traversable object");

	//Extract Yielders from the object

	//A stack is used to save nodes in a vertical hiearchy. 
	const 
		node_stack = [mintree],
		val_length_stack = [Array.isArray(mintree.vals) ? mintree.vals.length : 0];
	
	let stack_pointer = 0;

	const y = yielder.yield(mintree, stack_pointer, node_stack, val_length_stack);

	if(y) yield y;

	while (stack_pointer >= 0) {

		const len = val_length_stack[stack_pointer];

		if (len > 0) {

			const child = node_stack[stack_pointer].vals[len - 1];

			val_length_stack[stack_pointer] = len - 1;

			stack_pointer++;

			node_stack[stack_pointer] = child;

			const y = yielder.yield(child, stack_pointer, node_stack, val_length_stack);

			if(y) yield y;

			if (child.vals && Array.isArray(child.vals)) {
				val_length_stack[stack_pointer] = child.vals.length;
			} else
				val_length_stack[stack_pointer] = 0;

		} else
			stack_pointer--;

	}
	
	return yielder.complete(node_stack[0]);
}

export function reduce(mintree, yielder = Yielder) {

	//Extract Yielders from the object
	const gen = traverse(mintree, yielder);

	let result = gen.next();
	
	while(!result.done) result = gen.next();

	return result.value;
}

/* 
	IsPure
*/
export function filter(...type_strings) {

	if(!new.target)
		return new filter(...type_strings);
	
	const types = new Set(type_strings.filter(s => typeof s == "string"));

	let nx = null;
	
	this.yield = function(node, stack_pointer, node_stack, val_length_stack){

		const type = node.type;

		if(types.has(type)){
			if(nx){
				return nx.yield(node, stack_pointer, node_stack, val_length_stack)
			}
			else 
				return node;
		}
		return null;
	}

	this.complete = function(node){
		if(nx)	
			return nx.complete(node);
		return node;
	}

	this.next_prep = prev => (prev.next = a =>this.next(a, prev), prev);
	this.next = (nxt, prv = this) => (nx = nxt, nxt.next_prep(prv));
}

/* 
	IsNotPure
*/
export function replaceable(for_each_function) {
		if(!new.target)
		return new replaceable();

	let nx = null;

	function replace(string, node, stack_pointer, node_stack, val_length_stack){
		const result = ecmascript_parser(string);
		
		if(result.error){
			console.error(result)
		} else{
			const replacement_node = result.result;

			let sp = stack_pointer-1;

			//need to trace up the current stack and replace each node with a doublicate
			let child = replacement_node;

			while(sp >= 0){

				const new_obj = Object.assign({}, node_stack[sp]);

				new_obj.vals = new_obj.vals.slice();
				
				new_obj.vals[val_length_stack[sp]] = child;

				child = new_obj;

				node_stack[sp--] = new_obj;
			}
		}
	}
	
	this.yield = function(node, stack_pointer, node_stack, val_length_stack){

		const replaceable = Object.assign({replace:(string)=>replace(string,node, stack_pointer, node_stack, val_length_stack)}, node);

		if(for_each_function)
			for_each_function(replaceable);
		
		if(nx)
			return nx.yield(replaceable, stack_pointer, node_stack, val_length_stack)
		else 
			return replaceable;
	
	}

	this.complete = function(node){
		if(nx)	
			return nx.complete(node);
		return node;
	}

	this.next_prep = prev => (prev.next = a =>this.next(a, prev), prev);
	this.next = (nxt, prv = this) => (nx = nxt, nxt.next_prep(prv));

}

/* 
	IsPure
*/
export function output(receptical) {
	
	if(!new.target)
		return new output(receptical);

	let nx = null;

	this.complete = function(node){
		
		receptical.ast = node;

		if(nx)	
			return nx.complete(node);

		return node;
	}
	
	this.yield = function(node, stack_pointer, node_stack, val_length_stack){
		if(nx)
			return nx.yield(node, stack_pointer, node_stack, val_length_stack)
		else 
			return node;
	
	}

	this.next_prep = prev => (prev.next = a =>this.next(a, prev), prev);
	this.next = (nxt, prv = this) => (nx = nxt, nxt.next_prep(prv));
}