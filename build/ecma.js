var js = (function (exports) {
	'use strict';

	var types = {
			number:1,
			string:2,
			id:3,
			object:4,
			null:5,
			stmts:6,
			for:7,
			lex:8,
			var:9,
			const:10,
			try:11,
			catch:12,
			finally:13,
			while:14,
			do:15,
			add:16,
			sub:17,
			mult:18,
			div:19,
			mod:20,
			strict_eq:21,
			exp:22,
			shift_r:23,
			shift_l:24,
			shift_l_fill:25,
			array:26,
			function:27,
			bool:28,
			label:29,
			new:30,
			lt:31,
			gt:32,
			lte:33,
			gte:34,
			assign:35,
			assignment:35,
			equal:36,
			or:37,
			and:38,
			bit_or:39,
			bit_and:40,
			member:41,
			call:42,
			return:43,
			if:44,
			post_inc:45,
			post_dec:46,
			pre_inc:47,
			pre_dec:48,
			condition:49,
			class:50,
			negate:51,
			array_literal:52,
			this_expr:53,
			prop_bind:54,
			function_declaration:55,
			debugger:56,
			expression_list:57,
			new_member:58
		};

	class base {
	    constructor(...vals) {

	        this.vals = vals;
	        this.parent = null;
	    }

	    replaceNode(original, _new = null, vals = this.vals) {
	        for (let i = 0; i < vals.length; i++) {
	            if (vals[i] === original)
	                if (_new === null) {
	                    return i;
	                } else
	                    return vals[i] = _new, -1;
	        }
	    }

	    replace(node) {
	        if (this.parent)
	            this.parent.replaceNode(this, node);
	    }

	    getRootIds() {}

	    * traverseDepthFirst(p, vals = this.vals) {
	        this.parent = p;

	        if(vals == this.vals)
	            yield this;

	        for (let i = 0; i < vals.length; i++) {

	            const node = vals[i];

	            if (!node) continue;

	            if(Array.isArray(node)){
	                yield* this.traverseDepthFirst(p, node);
	            }else
	                yield* node.traverseDepthFirst(this);

	            if (vals[i] !== node) // Check to see if node has been replaced. 
	                i--; //Reparse the node
	        }
	    }

	    skip(trvs) {

	        for (let val = trvs.next().value; val && val !== this; val = trvs.next().value);

	        return trvs;
	    }
	    spin(trvs) {
	        let val = trvs.next().value;
	        while (val !== undefined && val !== this) { val = trvs.next().value; }
	    }
	    toString() { return this.render() }

	    render() { return this.vals.join("") }

	    get connect(){
	        this.vals.forEach(v=>{
	            try{
	                v.parent = this;
	            }catch(e){
	                
	            }
	        });
	        return this;
	    }
	}

	/** FOR **/
	class for_statement extends base {

	    get init() { return this.vals[0] }
	    get bool() { return this.vals[1] }
	    get iter() { return this.vals[2] }
	    get body() { return this.vals[3] }

	    getRootIds(ids, closure) {

	        closure = new Set([...closure.values()]);

	        if (this.bool) this.bool.getRootIds(ids, closure);
	        if (this.iter) this.iter.getRootIds(ids, closure);
	        if (this.body) this.body.getRootIds(ids, closure);
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	        if (this.init) yield* this.init.traverseDepthFirst(this);
	        if (this.bool) yield* this.bool.traverseDepthFirst(this);
	        if (this.iter) yield* this.iter.traverseDepthFirst(this);
	        if (this.body) yield* this.body.traverseDepthFirst(this);
	        yield this;
	    }

	    get type() { return types.for }

	    render() {
	        let init, bool, iter, body;

	        if (this.init) init = this.init.render();
	        if (this.bool) bool = this.bool.render();
	        if (this.iter) iter = this.iter.render();
	        if (this.body) body = this.body.render();

	        return `for(${init};${bool};${iter})${body}`;
	    }
	}

	class call extends base {
	    constructor(sym) {
	        super(sym[0], (Array.isArray(sym[1])) ? sym[1] : [sym[1]]);
	    }

	    get id() { return this.vals[0] }
	    get args() { return this.vals[1] }

	    getRootIds(ids, closure) {
	        this.id.getRootIds(ids, closure);
	        this.args.getRootIds(ids, closure);
	    }

	    get name() { return this.id.name }
	    get type() { return types.call }

	    render() { 
	        return `${this.id.render()}(${this.args.map(a=>a.render()).join(",")})` 
	    }
	}

	/** IDENTIFIER **/
	class id extends base {
	    constructor(sym) {
	        super(sym[0]);
	        this.root = true;
	    }

	    get val() { return this.vals[0] }

	    getRootIds(ids, closuere) { if (!closuere.has(this.val)) ids.add(this.val); }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	    }

	    get name() { return this.val }

	    get type() { return types.id }

	    render() { return this.val }
	}

	/** CATCH **/
	class catch_statement extends base {
	    constructor(sym) {
	        super(sym[2], sym[4]);
	    }

	    get param() { return this.vals[0] }
	    get body() { return this.vals[1] }

	    getRootIds(ids, closure) {
	        if (this.body) this.body.getRootIds(ids, closure);
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	        yield* this.param.traverseDepthFirst(this);
	        yield* this.body.traverseDepthFirst(this);
	    }

	    get type() { return types.catch }
	}

	/** TRY **/
	class try_statement extends base {
	    constructor(body, _catch, _finally) {
	        super(body, _catch, _finally);


	    }
	    get catch() { return this.vals[0] }
	    get body() { return this.vals[1] }
	    get finally() { return this.vals[2] }

	    getRootIds(ids, clsr) {
	        this.body.getRootIds(ids, clsr);
	        if (this.catch) this.catch.getRootIds(ids, clsr);
	        if (this.finally) this.finally.getRootIds(ids, clsr);
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	        if (this.body) yield* this.body.traverseDepthFirst(p);
	        if (this.catch) yield* this.catch.traverseDepthFirst(p);
	        if (this.finally) yield* this.finally.traverseDepthFirst(p);
	    }

	    get type() { return types.try }
	}

	/** STATEMENTS **/
	class stmts extends base {
	    constructor(sym) {

	        if (sym[0].length == 1)
	            return sym[0][0];
	        
	        super(sym[0]);
	    }

	    get stmts() { return this.vals[0] }

	    getRootIds(ids, closure) {
	        this.stmts.forEach(s => s.getRootIds(ids, closure));
	    }

	    replaceNode(original, _new = null) {
	        let index = -1;
	        if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
	            this.vals[0].splice(index, 1);
	        }
	    }

	    * traverseDepthFirst(p) {
	        yield * super.traverseDepthFirst(p, this.vals[0]);
	    }

	    get type() { return types.stmts }

	    render() { 
	        return this.stmts.map(s=>(s.render())).join("") ;
	    }
	}

	/** BLOCK **/
	class block_statement extends stmts {

	    constructor(sym) {
	        if (!(sym[1] instanceof stmts))
	            return sym[1];

	        super(sym[1].vals);
	    }

	    getRootIds(ids, closure) {
	        super.getRootIds(ids, new Set([...closure.values()]));
	    }

	    get type() { return types.block_statement }

	    render() { return `{${super.render()}}` }
	}

	/** LEXICAL DECLARATION **/
	class lexical extends base {
	    constructor(sym) {
	        super(sym[1]);
	        this.mode = sym[0];
	    }

	    get bindings() { return this.vals[0] }

	    getRootIds(ids, closure) {
	        this.bindings.forEach(b => b.getRootIds(ids, closure));
	    }

	    get type() { return types.lex }

	    render() { return `${this.mode} ${this.bindings.map(b=>b.render()).join(",")};` }
	}

	/** BINDING DECLARATION **/
	class binding extends base {
	    constructor(sym) {
	        super(sym[0], sym[1] || null);
	        this.id.root = false;
	    }

	    get id() { return this.vals[0] }
	    get init() { return this.vals[1] }

	    getRootIds(ids, closure) {
	        this.id.getRootIds(closure, closure);
	        if (this.init) this.init.getRootIds(ids, closure);
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	        yield* this.id.traverseDepthFirst(this);
	        yield* this.init.traverseDepthFirst(this);
	    }

	    render() { return `${this.id}${this.init ? ` = ${this.init.render()}` : ""}` }
	}

	/** MEMBER **/

	class mem extends base {
	    constructor(sym) { super(sym[0], sym[2]);
	        this.root = true;
	        this.mem.root = false;
	    }

	    get id() { return this.vals[0] }
	    get mem() { return this.vals[1] }

	    getRootIds(ids, closuere) {
	        this.id.getRootIds(ids, closuere);
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	        yield* this.id.traverseDepthFirst(this);
	        yield* this.mem.traverseDepthFirst(this);
	    }

	    get name() { return this.id.name }
	    get type() { return types.member }

	    render() { 
	        if(this.mem instanceof mem || this.mem instanceof id){
	            return `${this.id.render()}.${this.mem.render()}`;
	        }else{
	            return `${this.id.render()}[${this.mem.render()}]`;
	        }
	    }
	}

	/** OPERATOR **/
	class operator extends base {

	    constructor(sym) {
	        super(sym[0], sym[2]);
	        this.op = "";
	    }

	    get left() { return this.vals[0] }
	    get right() { return this.vals[1] }

	    replaceNode(original, _new = null) {
	        var index;

	        if ((index = super.replaceNode(original, _new)) > -1){
	            this.replace(this.vals[(index+1)%2]);
	        }
	    }

	    render() { return `${this.left.render()} ${this.op} ${this.right.render()}` }
	}

	/** ASSIGNEMENT EXPRESSION **/

	class assignment_expression extends operator {
	    constructor(sym) {
	        super(sym);
	        this.op = sym[1];
	        this.id.root = false;
	    }
	    get id() { return this.vals[0] }
	    get expr() { return this.vals[2] }
	    get type() { return types.assign }
	}

	/** ADD **/
	class add_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "+";
	    }

	    get type() { return types.add_expression }
	}

	/** EXPONENT **/
	class exponent_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "**";
	    }

	    get type() { return types.exp }
	}

	/** SUBTRACT **/
	class subtract_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "-";
	    }

	    get type () { return types.sub }
	}

	/** MULTIPLY **/
	class divide_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "/";
	    }

	    get type () { return types.div }
	}

	/** MULTIPLY **/
	class multiply_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "*";
	    }

	    get type () { return types.mult }

	    
	}

	/** OBJECT **/

	class object extends base {
	    constructor(sym) {
	        super(sym[0] || []);
	    }

	    get props() { return this.vals[0] }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	        for (const prop of this.props)
	            yield* prop.traverseDepthFirst(this);
	    }

	    get type() { return types.object }

	    render() { return `{${this.props.map(p=>p.render()).join(",")}}` }
	}

	/** DEBUGGER STATEMENT  **/

	class debugger_statement extends base {
	    constructor() {
	        super();
	    }

	    getRootIds(ids, closure) {
	        if (this.expr) this.expr.getRootIds(ids, closure);
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	    }

	    get type() { return types.debugger }

	    render() { return `debugger` }
	}

	/** STRING **/

	class string extends base {
	    constructor(sym) { super(sym.length === 3 ? sym[1]: ""); }

	    get val() { return this.vals[0] }

	    getRootIds(ids, closuere) { if (!closuere.has(this.val)) ids.add(this.val); }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	    }


	    get type() { return types.string }

	    render() { return `"${this.val}"` }
	}

	/** NULL **/
	class null_literal extends base {
	    constructor() { super(); }
	    get type() { return types.null }
	    render() { return "null" }
	}

	/** NUMBER **/
	class number extends base {
	    constructor(sym) { super(parseFloat(sym)); }
	    get val() { return this.vals[0] }
	    get type() { return types.number }
	    render() { return this.val + "" }
	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	    }
	}

	/** BOOLEAN **/

	class bool extends base {
	    constructor(sym) { super(sym[0]); }

	    get type() { return types.bool }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	    }
	}

	/** OPERATOR **/
	class unary_pre extends base {

	    constructor(sym) {
	        super(sym[1]);
	        this.op = "";
	    }

	    get expr() { return this.vals[0] }

	    render() { return `${this.op}${this.expr.render()}` }
	}

	/** NEGATE **/

	class negate_expression extends unary_pre {
	    constructor(sym) { super(sym);
	        this.op = "-";
	    }
	    get type() { return types.negate }
	}

	/** RETURN STATMENT  **/



	class return_stmt extends base {
	    constructor(sym) {
	        super((sym.length > 2) ? sym[1] : null);
	    }

	    get expr() { return this.vals[0] }

	    getRootIds(ids, closure) {
	        if (this.expr) this.expr.getRootIds(ids, closure);
	    }

	    get type() { return types.return }

	    render() {
	        let expr_str = "";
	        if (this.expr) {
	            if (Array.isArray(this.expr)) {
	                expr_str = this.expr.map(e=>e.render()).join(",");
	            } else
	                expr_str = this.expr.render();
	        }
	        return `return ${expr_str};`;
	    }
	}

	/** CONDITION EXPRESSIONS **/
	class condition_expression extends base {
	    constructor(sym) {
	        super(sym[0], sym[2], sym[4]);
	    }

	    get bool() { return this.vals[0] }
	    get left() { return this.vals[1] }
	    get right() { return this.vals[2] }

	    getRootIds(ids, closure) {
	        this.bool.getRootIds(ids, closure);
	        this.left.getRootIds(ids, closure);
	        this.right.getRootIds(ids, closure);
	    }

	    get type() { return types.condition }

	    render() {
	        const
	            bool = this.bool.render(),
	            left = this.left.render(),
	            right = this.right.render();

	        return `${bool} ? ${left} : ${right}`;
	    }
	}

	class array_literal extends base {
	    constructor(sym) {
	        super(sym[0] || []);
	    }

	    get exprs() { return this.vals[0] }

	    getRootIds(ids, closure) {
	        this.exprs.forEach(e => e.getRootIds(ids, closure));
	    }

	    replaceNode(original, _new = null) {
	        let index = 0;
	        if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
	            this.vals[0].splice(index, 1);
	        }
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;

	        yield this;

	        for (let i = 0; i < this.exprs.length; i++) {

	            const expr = this.exprs[i];

	            yield* expr.traverseDepthFirst(this);

	            if (this.exprs[i] !== expr)
	                yield* this.exprs[i].traverseDepthFirst(this);
	        }
	    }

	    get name() { return this.id.name }

	    get type() { return types.array_literal }

	    render() { return `[${this.exprs.map(a=>a.render()).join(",")}]` }
	}

	/** THIS LITERAL  **/

	class this_literal extends base {
	    constructor() {
	        super();
	        this.root = false;
	    }

	    get name() { return "this" }
	    get type() { return types.this_literal }

	    render() { return `this` }
	}

	/** PROPERTY BINDING DECLARATION **/
	class property_binding extends binding {
	    constructor(sym) {
	        super([sym[0], sym[2]]);
	    }
	    get type( ){return types.prop_bind}
	    render() { return `${this.id.type > 4 ? `[${this.id.render()}]` : this.id.render()} : ${this.init.render()}` }
	}

	class function_declaration extends base {
	    constructor(id, args, body) {
	        
	        args = (Array.isArray(args)) ? args : [args];

	        super(id, args || [], body || []);

	        //This is a declaration and id cannot be a closure variable. 
	        if (this.id)
	            this.id.root = false;
	    }

	    get id() { return this.vals[0] }
	    get args() { return this.vals[1] }
	    get body() { return this.vals[2] }

	    getRootIds(ids, closure) {
	        if (this.id)
	            this.id.getRootIds(ids, closure);
	        this.args.forEach(e => e.getRootIds(ids, closure));
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;

	        yield this;

	        if (this.id)
	            yield* this.id.traverseDepthFirst(this);

	        for (const arg of this.args)
	            yield* arg.traverseDepthFirst(this);

	        yield* this.body.traverseDepthFirst(this);

	    }

	    get name() { return this.id.name }

	    get type() { return types.function_declaration }

	    render() {
	        const
	            body_str = this.body.render(),
	            args_str = this.args.map(e => e.render()).join(","),
	            id = this.id ? this.id.render() : "";

	        return `function ${id}(${args_str}){${body_str}}`;
	    }
	}

	class arrow_function_declaration extends function_declaration {
	    constructor(...sym) {
	        super(...sym);
	    }

	    getRootIds(ids, closure) {
	        this.args.forEach(e => e.getRootIds(ids, closure));
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;

	        yield this;

	        if (this.id)
	            yield* this.id.traverseDepthFirst(this);

	        for (const arg of this.args)
	            yield* arg.traverseDepthFirst(this);

	        yield* this.body.traverseDepthFirst(this);

	    }

	    get name() { return null }

	    get type() { return types.arrow_function_declaration }

	    render() {
	        const
	            body_str = this.body.render(),
	            args_str = this.args.map(e => e.render()).join(",");
	        return `${this.args.length == 1 ? args_str : `(${args_str})`} => ${body_str}`;
	    }
	}

	/** EXPRESSION_LIST **/

	class expression_list extends base {
	    constructor(sym) {

	        if (sym[0].length == 1)
	            return sym[0][0];

	        super(sym[0]);
	    }

	    get expressions() { return this.vals[0] }

	    getRootIds(ids, closure) {
	        this.expressions.forEach(s => s.getRootIds(ids, closure));
	    }

	    replaceNode(original, _new = null) {
	        let index = -1;
	        if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
	            this.vals[0].splice(index, 1);
	        }
	    }

	    * traverseDepthFirst(p) {
	        yield * super.traverseDepthFirst(p, this.vals[0]);
	    }

	    get type() { return types.expression_list }

	    render() { return `(${this.expressions.map(s=>s.render()).join(",")})` }
	}

	/** STATEMENTS **/

	class if_stmt extends base {
	    constructor(sym) {
	        const expr = sym[2],
	            stmt = sym[4],
	            else_stmt = (sym.length > 5) ? sym[6] : null;

	        super(expr, stmt, else_stmt);
	    }

	    get expr() { return this.vals[0] }
	    get stmt() { return this.vals[1] }
	    get else_stmt() { return this.vals[2] }

	    getRootIds(ids, closure) {
	        this.expr.getRootIds(ids, closure);
	        this.stmt.getRootIds(ids, closure);
	        if (this.else_stmt)
	            this.else_stmt.getRootIds(ids, closure);
	    }

	    * traverseDepthFirst(p) {

	        this.parent = p;

	        yield this;

	        yield* this.expr.traverseDepthFirst(this);
	        yield* this.stmt.traverseDepthFirst(this);

	        if (this.else_stmt)
	            yield* this.else_stmt.traverseDepthFirst(this);
	    }

	    get type() { return types.if }

	    render() {
	        const
	            expr = this.expr.render(),
	            stmt = this.stmt.render(),
	            _else = (this.else_stmt) ? " else " + this.else_stmt.render() : "";
	        return `if(${expr})${stmt}${_else}`;
	    }
	}

	/** OPERATOR **/

	class unary_post extends base {

	    constructor(sym) {
	        super(sym[0]);
	        this.op = "";
	    }

	    get expr() { return this.vals[0] }
	    render() { return `${this.expr.render()}${this.op}` }
	}

	/** POSTFIX INCREMENT **/

	class post_increment_expression extends unary_post {

	    constructor(sym) {
	        super(sym);
	        this.op = "++";
	    }

	    get type() { return types.post_inc }

	}

	/** POSTFIX INCREMENT **/

	class post_decrement_expression extends unary_post {

	    constructor(sym) {
	        super(sym);
	        this.op = "--";
	    }

	    get type() { return types.post_dec }
	}

	/** EXPRESSION_LIST **/

	class expr_stmt extends base {

	    constructor(sym) {
	        super(sym[0]);
	    }

	    get expression() { return this.vals[0] }

	    getRootIds(ids, closure) {
	        this.expression.getRootIds(ids, closure);
	    }

	    replaceNode(original, _new = null) {
	        if(!super.replaceNode(original, _new, this.vals[0]))
	            this.replace();
	    }

	    * traverseDepthFirst(p) {
	        this.parent = p;
	        yield this;
	        yield* this.expression.traverseDepthFirst(this);

	    }

	    get type() { return types.expression_statement }

	    render() { return this.expression.render() + ";" }
	}

	/** OR **/
	class or_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "||";
	    }

	    get type() { return types.or }
	}

	/** AND **/
	class and_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "&&";
	    }

	    get type() { return types.and }
	}

	/** NOT **/

	class node extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "!";
	    }

	    get type() { return types.node }

	}

	/** MEMBER **/

	class mem$1 extends call {
	    constructor(sym) { super([sym[1], sym[2]]);  }

	    get id() { return this.vals[0] }
	    get args() { return this.vals[1] }

	    getRootIds(ids, closuere) {
	        this.id.getRootIds(ids, closuere);
	    }

	    get name() { return this.id.name }
	    get type() { return types.new_member }

	    render() { 
	        const
	            args_str = this.args.map(e => e.render()).join(",");

	        return `new ${this.id.render()}(${args_str})`;
	    }
	}

	/** SPREAD **/

	class node$1 extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "...";
	    }

	    get type() { return types.spread }

	}

	/** EQ **/
	class equality_expression extends operator {
	    constructor(sym) {super(sym); this.op = sym[1]; }
	    get type() { return types.equal }
	}

	/** GREATER **/
	class greater extends operator {
	    constructor(sym) {super(sym);this.op = ">";}
	    get type() { return types.greater }
	}

	/** GREATER THAN EQ **/
	class greater_eq extends operator {
	    constructor(sym) {super(sym);this.op = ">=";}
	    get type() { return types.greater_eq }
	}

	/** LESS **/
	class less extends operator {
	    constructor(sym) {super(sym);this.op = "<";}
	    get type() { return types.less }
	}

	/** LESS THAN EQUAL **/

	class less_eq extends operator {
	    constructor(sym) {super(sym);this.op = "<=";}
	    get type() { return types.less_eq }
	}

	let fn = {}; const 
	/************** Maps **************/

	    /* Symbols To Inject into the Lexer */
	    symbols = ["...","<",">","<=",">=","==","!=","===","!==","**","++","--","<<",">>",">>>","&&","||","+=","-=","*=","%=","/=","**=","<<=",">>=",">>>=","&=","|=","^=","=>"],

	    /* Goto lookup maps */
	    gt0 = [0,-1,1,-20,2,3,6,5,4,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-7,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt1 = [0,-24,118,-2,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-7,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt2 = [0,-24,6,5,119,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-7,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt3 = [0,-122,123],
	gt4 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,163,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt5 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,174,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt6 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,175,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt7 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,176,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt8 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,177,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt9 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,178,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt10 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,179,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt11 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,180,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt12 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,181,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt13 = [0,-104,183],
	gt14 = [0,-104,188],
	gt15 = [0,-68,66,172,-14,67,173,-11,189,190,61,62,86,-6,60,-1,167,-6,166,-20,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt16 = [0,-163,71,193],
	gt17 = [0,-151,196,194],
	gt18 = [0,-153,206,204],
	gt19 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,215,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt20 = [0,-104,220],
	gt21 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-17,221,164,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt22 = [0,-54,223],
	gt23 = [0,-62,225,226,-75,228,230,231,-19,227,229,71,70],
	gt24 = [0,-28,235,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt25 = [0,-159,241,-2,242,71,70],
	gt26 = [0,-159,244,-2,242,71,70],
	gt27 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,246,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt28 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,248,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt29 = [0,-33,249],
	gt30 = [0,-86,252,253,-73,251,229,71,70],
	gt31 = [0,-161,256,229,71,70],
	gt32 = [0,-66,258,259,-71,261,230,231,-19,260,229,71,70],
	gt33 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,263,-2,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt34 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,264,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt35 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,265,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt36 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,266,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt37 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-7,267,35,36,37,38,39,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt38 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-8,268,36,37,38,39,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt39 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-9,269,37,38,39,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt40 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-10,270,38,39,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt41 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-11,271,39,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt42 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-12,272,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt43 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-12,273,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt44 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-12,274,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt45 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-12,275,40,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt46 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-13,276,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt47 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-13,277,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt48 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-13,278,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt49 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-13,279,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt50 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-13,280,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt51 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-13,281,41,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt52 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-14,282,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt53 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-14,283,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt54 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-14,284,42,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt55 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-15,285,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt56 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-15,286,43,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt57 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-16,287,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt58 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-16,288,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt59 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-16,289,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt60 = [0,-68,66,172,-13,88,67,173,-10,165,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-16,290,44,45,53,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt61 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,291,292,295,294,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt62 = [0,-91,304,-17,298,-1,301,306,310,311,302,-39,312,313,-3,303,-1,169,71,307],
	gt63 = [0,-163,71,315],
	gt64 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,316,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt65 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-1,321,320,317,60,-1,167,-6,166,-3,322,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt66 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,324,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt67 = [0,-163,71,325],
	gt68 = [0,-104,326],
	gt69 = [0,-151,329],
	gt70 = [0,-153,331],
	gt71 = [0,-139,335,230,231,-19,334,229,71,70],
	gt72 = [0,-163,71,336],
	gt73 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,337,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt74 = [0,-68,66,172,-7,31,90,338,-3,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-8,166,-3,339,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt75 = [0,-28,342,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-1,341,22,-3,23,13,-6,66,343,-7,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt76 = [0,-116,346],
	gt77 = [0,-116,348],
	gt78 = [0,-112,355,310,311,-27,350,351,-2,353,-1,354,-6,312,313,-4,356,229,71,307],
	gt79 = [0,-119,358,-19,365,230,231,-2,360,362,-1,363,364,359,-11,356,229,71,70],
	gt80 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,366,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt81 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,368,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt82 = [0,-37,369,371,373,-1,378,-22,370,377,-2,66,172,-7,31,90,-4,88,67,173,-7,28,27,374,376,56,58,61,62,86,57,87,-4,60,-1,167,-10,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt83 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,380,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt84 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,384,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt85 = [0,-57,386,387],
	gt86 = [0,-86,390,253],
	gt87 = [0,-88,392,394,395,396,-20,399,310,311,-40,312,313,-6,71,400],
	gt88 = [0,-68,66,172,-13,88,67,173,-10,401,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-20,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt89 = [0,-71,403,406,405,408,-64,365,230,231,-5,409,364,407,-11,356,229,71,70],
	gt90 = [0,-116,412],
	gt91 = [0,-116,413],
	gt92 = [0,-119,415],
	gt93 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-2,420,419,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt94 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,422,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt95 = [0,-116,426],
	gt96 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,427,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt97 = [0,-112,430,310,311,-40,312,313,-6,71,400],
	gt98 = [0,-112,431,310,311,-40,312,313,-6,71,400],
	gt99 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,432,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt100 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,438,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt101 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-6,445,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt102 = [0,-63,447,-75,228,230,231,-19,227,229,71,70],
	gt103 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,448,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt104 = [0,-161,452,229,71,70],
	gt105 = [0,-116,454],
	gt106 = [0,-139,365,230,231,-5,457,364,455,-11,356,229,71,70],
	gt107 = [0,-139,462,230,231,-19,461,229,71,70],
	gt108 = [0,-116,463],
	gt109 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,468,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt110 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,471,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt111 = [0,-42,475,-19,474,226,-75,477,230,231,-19,476,229,71,70],
	gt112 = [0,-42,478,-23,258,259,-71,480,230,231,-19,479,229,71,70],
	gt113 = [0,-39,481,-1,484,-23,485,-2,66,172,-13,88,67,173,-10,482,56,58,61,62,86,57,87,-4,60,-1,167,-27,168,-11,65,-4,76,77,75,74,-1,64,-1,169,71,70],
	gt114 = [0,-58,488],
	gt115 = [0,-33,490],
	gt116 = [0,-88,491,394,395,396,-20,399,310,311,-40,312,313,-6,71,400],
	gt117 = [0,-90,494,396,-20,399,310,311,-40,312,313,-6,71,400],
	gt118 = [0,-91,495,-20,399,310,311,-40,312,313,-6,71,400],
	gt119 = [0,-71,496,406,405,408,-64,365,230,231,-5,409,364,407,-11,356,229,71,70],
	gt120 = [0,-67,501,-71,261,230,231,-19,260,229,71,70],
	gt121 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,502,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt122 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-1,506,505,504,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt123 = [0,-91,304,-19,508,306,310,311,302,-39,312,313,-3,303,-1,169,71,307],
	gt124 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,509,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt125 = [0,-70,510,511,406,405,408,-64,365,230,231,-5,409,364,407,-11,356,229,71,70],
	gt126 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-1,516,-2,60,-1,167,-6,166,-3,322,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt127 = [0,-139,518,230,231,-19,517,229,71,70],
	gt128 = [0,-112,355,310,311,-27,520,-3,522,-1,354,-6,312,313,-4,356,229,71,307],
	gt129 = [0,-139,365,230,231,-5,523,364,-12,356,229,71,70],
	gt130 = [0,-119,526,-19,365,230,231,-3,528,-1,363,364,527,-11,356,229,71,70],
	gt131 = [0,-28,529,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt132 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,530,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt133 = [0,-28,531,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt134 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,532,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt135 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,535,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt136 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,537,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt137 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,539,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt138 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,541,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt139 = [0,-42,543,-96,545,230,231,-19,544,229,71,70],
	gt140 = [0,-42,478,-96,545,230,231,-19,544,229,71,70],
	gt141 = [0,-49,546],
	gt142 = [0,-28,548,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt143 = [0,-59,549,-79,551,230,231,-19,550,229,71,70],
	gt144 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-5,556,558,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt145 = [0,-73,559,560,-64,365,230,231,-5,409,364,407,-11,356,229,71,70],
	gt146 = [0,-68,66,172,-7,31,90,-4,88,67,173,-10,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,561,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt147 = [0,-74,565,-17,564,-46,365,230,231,-5,409,364,-12,356,229,71,70],
	gt148 = [0,-139,365,230,231,-5,457,364,570,-11,356,229,71,70],
	gt149 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,575,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt150 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,577,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt151 = [0,-28,580,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt152 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,582,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt153 = [0,-28,585,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt154 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,587,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt155 = [0,-50,589,591,590],
	gt156 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-5,596,558,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt157 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-5,598,558,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt158 = [0,-28,605,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt159 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,607,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt160 = [0,-28,610,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt161 = [0,-28,612,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt162 = [0,-28,613,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt163 = [0,-28,614,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt164 = [0,-28,616,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt165 = [0,-28,617,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt166 = [0,-28,618,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt167 = [0,-51,622,620],
	gt168 = [0,-50,623,591],
	gt169 = [0,-68,66,172,-7,31,90,-4,88,67,173,-7,28,27,625,32,56,58,61,62,86,57,87,-4,60,-1,167,-6,166,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,-1,64,91,217,71,70],
	gt170 = [0,-33,627],
	gt171 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-5,628,558,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt172 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-5,632,558,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt173 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-5,633,558,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt174 = [0,-28,636,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt175 = [0,-28,637,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt176 = [0,-28,638,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt177 = [0,-28,639,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt178 = [0,-28,640,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt179 = [0,-51,641],
	gt180 = [0,-51,622],
	gt181 = [0,-24,6,5,645,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-7,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt182 = [0,-24,6,5,446,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-5,649,558,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt183 = [0,-28,650,-2,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-6,66,-8,31,90,-4,88,67,-8,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],
	gt184 = [0,-24,6,5,652,7,8,9,110,16,10,24,14,11,15,-3,96,-2,17,18,19,21,20,97,-4,12,-2,22,-3,23,13,-2,111,115,-2,66,113,-7,31,90,-4,88,67,109,-7,28,27,26,32,56,58,61,62,86,57,87,-4,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,76,77,75,74,92,64,91,69,71,70],

	    // State action lookup maps
	    sm0=[0,1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm1=[0,43,-3,0,-4,0],
	sm2=[0,44,-3,0,-4,0],
	sm3=[0,45,-3,0,-4,0],
	sm4=[0,46,-3,0,-4,0],
	sm5=[0,47,2,3,-1,0,-4,0,-8,4,47,-2,5,47,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,47,-1,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm6=[0,48,48,48,-1,0,-4,0,-8,48,48,-2,48,48,48,48,48,48,-1,48,48,-2,48,48,48,48,-1,48,-1,48,48,48,48,48,48,48,-1,48,-2,48,48,-5,48,-2,48,-2,48,-31,48,48,-3,48,48,48,48,48,48,48,-7,48,48,48,48,48,48],
	sm7=[0,49,49,49,-1,0,-4,0,-8,49,49,-2,49,49,49,49,49,49,-1,49,49,-2,49,49,49,49,-1,49,-1,49,49,49,49,49,49,49,-1,49,-2,49,49,-5,49,-2,49,-2,49,-31,49,49,-3,49,49,49,49,49,49,49,-7,49,49,49,49,49,49],
	sm8=[0,50,50,50,-1,0,-4,0,-8,50,50,-2,50,50,50,50,50,50,-1,50,50,-2,50,50,50,50,-1,50,-1,50,50,50,50,50,50,50,-1,50,-2,50,50,-5,50,-2,50,-2,50,-31,50,50,-3,50,50,50,50,50,50,50,-7,50,50,50,50,50,50],
	sm9=[0,51,51,51,-1,0,-4,0,-8,51,51,-2,51,51,51,51,51,51,-1,51,51,-1,51,51,51,51,51,-1,51,-1,51,51,51,51,51,51,51,-1,51,-2,51,51,-5,51,-2,51,-2,51,-31,51,51,-3,51,51,51,51,51,51,51,-7,51,51,51,51,51,51],
	sm10=[0,52,52,52,-1,0,-4,0,-8,52,52,-2,52,52,52,52,52,52,-1,52,52,-1,52,52,52,52,52,-1,52,-1,52,52,52,52,52,52,52,-1,52,-2,52,52,-5,52,-2,52,-2,52,-31,52,52,-3,52,52,52,52,52,52,52,-7,52,52,52,52,52,52],
	sm11=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm12=[0,-4,0,-4,0,-12,53],
	sm13=[0,-4,0,-4,0,-5,54,-6,55,-8,55,-15,55,-11,55],
	sm14=[0,-4,0,-4,0,-5,56,-6,56,-8,56,-15,56,-11,56],
	sm15=[0,-4,0,-4,0,-5,57,-6,57,-8,57,-15,57,-11,57],
	sm16=[0,-4,0,-4,0,-5,58,-3,58,-2,58,-8,58,-15,58,-11,58],
	sm17=[0,-4,0,-4,0,-5,59,59,-2,59,-2,59,-8,59,-5,59,-9,59,-11,59,-5,60,61,62,63,64,65,66,67,68,69,70,71,72,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
	sm18=[0,-4,0,-4,0,-5,75,-3,75,-2,75,-8,75,-15,75,-11,75,-18,76,77],
	sm19=[0,-4,0,-4,0,-5,78,-3,78,-2,78,-8,78,-15,78,-11,78,-18,78,78,79],
	sm20=[0,-4,0,-4,0,-5,80,-3,80,-2,80,-8,80,-15,80,-11,80,-18,80,80,80,81],
	sm21=[0,-4,0,-4,0,-5,82,-3,82,-2,82,-8,82,-15,82,-11,82,-18,82,82,82,82,83],
	sm22=[0,-4,0,-4,0,-5,84,-3,84,-2,84,-8,84,-15,84,-11,84,-18,84,84,84,84,84,85],
	sm23=[0,-4,0,-4,0,-5,86,-3,86,-2,86,-8,86,-15,86,-11,86,-18,86,86,86,86,86,86,87,88,89,90],
	sm24=[0,-4,0,-4,0,-5,91,-3,91,-2,91,-8,91,-5,92,-9,91,-11,91,-18,91,91,91,91,91,91,91,91,91,91,93,94,95,96,97],
	sm25=[0,-4,0,-4,0,-5,98,-3,98,-2,98,-8,98,-5,98,-9,98,-11,98,-18,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,99,100,101],
	sm26=[0,-4,0,-4,0,-5,102,-3,102,-2,102,-8,102,-5,102,-9,102,-11,102,-18,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,103,104],
	sm27=[0,-4,0,-4,0,-5,105,106,-2,105,-2,105,-8,105,-5,105,-9,105,-11,105,-18,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,107,108],
	sm28=[0,-4,0,-4,0,-5,109,109,-2,109,-2,109,-8,109,-5,109,-9,109,-11,109,-18,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109],
	sm29=[0,-4,0,-4,0,-5,110,110,-2,110,-2,110,-8,110,-5,110,-9,110,-11,110,-18,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110],
	sm30=[0,-4,0,-4,0,-5,111,111,-2,111,-2,111,-8,111,-5,111,-9,111,-11,111,-18,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,112],
	sm31=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm32=[0,-4,0,-4,0,-5,111,111,-2,111,-2,111,-8,111,-5,111,-9,111,-11,111,-18,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
	sm33=[0,-4,0,-4,0,-5,115,115,-1,115,115,-2,115,-8,115,-5,115,-1,115,-7,115,-11,115,-5,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,-5,115,115],
	sm34=[0,-4,0,-4,0,-5,115,115,-1,115,115,-2,115,-4,116,-2,117,115,-5,115,-1,115,-7,115,-11,115,118,-4,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,-5,115,115],
	sm35=[0,-4,0,-4,0,-5,119,119,-1,119,119,-2,119,-4,120,-2,117,119,-5,119,-1,119,-7,119,-11,119,121,-4,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,-5,119,119],
	sm36=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-27,25,-1,122,123,-2,27,-50,37,38,39,40,41,42],
	sm37=[0,-4,0,-4,0,-5,124,124,-1,124,124,-2,124,-4,124,-2,124,124,-5,124,-1,124,-7,124,-11,124,124,-4,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,-5,124,124],
	sm38=[0,-4,0,-4,0,-5,125,125,-1,125,125,-2,125,-4,125,-2,125,125,-5,125,-1,125,-7,125,-11,125,125,-4,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,-5,125,125],
	sm39=[0,-4,0,-4,0,-5,126,126,-1,126,126,-2,126,-4,126,-2,126,126,-5,126,-1,126,-7,126,-11,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-5,126,126],
	sm40=[0,-4,0,-4,0,-5,126,126,-2,126,-2,126,-4,126,-2,126,126,-5,126,-1,126,-7,126,-5,127,-5,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-5,126,126],
	sm41=[0,-4,0,-4,0,-5,128,128,-5,128,-4,128,-2,128,-6,128,-9,129,-5,130,-6,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
	sm42=[0,-4,0,-4,0,-5,131,131,-1,131,131,-2,131,-4,131,-2,131,131,-5,131,-1,131,-7,131,-5,131,131,-4,131,131,-4,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,-5,131,131],
	sm43=[0,-4,0,-4,0,-5,132,132,-1,132,132,-2,132,-4,132,-2,132,132,-5,132,-1,132,-7,132,-5,132,132,-4,132,132,-4,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,-5,132,132],
	sm44=[0,-4,0,-4,0,-5,133,133,-1,133,133,-2,133,-4,133,-2,133,133,-5,133,-1,133,-7,133,-5,133,133,-4,133,133,-4,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,-5,133,133],
	sm45=[0,-2,3,-1,0,-4,0,-5,134,134,-1,134,134,-2,134,-4,134,-2,134,134,-5,134,-1,134,-7,134,-5,134,134,-4,134,134,-4,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,-5,134,134,-12,42],
	sm46=[0,-4,0,-4,0,-5,135,135,-1,135,135,-2,135,-4,135,-2,135,135,-5,135,-1,135,-7,135,-11,135,135,-4,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,-5,135,135],
	sm47=[0,-4,0,-4,0,-5,136,136,-1,136,136,-2,136,-4,136,-2,136,136,-5,136,-1,136,-7,136,-11,136,136,-4,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,-5,136,136],
	sm48=[0,-4,0,-4,0,-5,137,137,-1,137,137,-2,137,-4,137,-2,137,137,-5,137,-1,137,-7,137,-11,137,137,-4,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,-5,137,137],
	sm49=[0,-1,138,139,-1,140,141,142,143,144,0,-105,145],
	sm50=[0,-1,146,147,-1,148,149,150,151,152,0,-106,153],
	sm51=[0,-4,0,-4,0,-5,154,154,-1,154,154,-2,154,-4,154,-2,154,154,-5,154,-1,154,-7,154,-11,154,154,-4,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,-5,154,154],
	sm52=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,155,-6,15,-19,25,-2,26,-1,156,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm53=[0,-4,0,-4,0,-17,157,-2,117,-29,158],
	sm54=[0,-4,0,-4,0,-5,159,159,-1,159,159,-2,159,-4,159,-2,159,159,-5,159,-1,159,-7,159,-11,159,159,-4,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,-5,159,159],
	sm55=[0,-4,0,-4,0,-5,160,160,-1,160,160,-2,160,-4,160,-2,160,160,-5,160,-1,160,-7,160,-11,160,160,-4,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,-5,160,160],
	sm56=[0,-4,0,-4,0,-43,161],
	sm57=[0,-4,0,-4,0,-43,127],
	sm58=[0,-4,0,-4,0,-37,162],
	sm59=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-92,42],
	sm60=[0,165,165,165,-1,0,-4,0,-8,165,165,-2,165,165,165,165,165,165,-1,165,165,-1,165,165,165,165,165,-1,165,-1,165,165,165,165,165,165,165,-1,165,-2,165,165,-5,165,-2,165,-2,165,-31,165,165,-3,165,165,165,165,165,165,165,-7,165,165,165,165,165,165],
	sm61=[0,-4,0,-4,0,-20,166],
	sm62=[0,167,167,167,-1,0,-4,0,-8,167,167,-2,167,167,167,167,167,167,-1,167,167,-1,167,167,167,167,167,-1,167,-1,167,167,167,167,167,167,167,-1,167,-2,167,167,-5,167,-2,167,-2,167,-31,167,167,-3,167,167,167,167,167,167,167,-7,167,167,167,167,167,167],
	sm63=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-6,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,-6,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm64=[0,-4,0,-4,0,-20,168],
	sm65=[0,-4,0,-4,0,-20,169,-7,170],
	sm66=[0,-4,0,-4,0,-20,171],
	sm67=[0,-2,3,-1,0,-4,0,-12,172,-97,42],
	sm68=[0,-2,3,-1,0,-4,0,-12,173,-97,42],
	sm69=[0,-1,2,3,-1,0,-4,0,-8,113,-3,174,-1,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm70=[0,-4,0,-4,0,-20,175],
	sm71=[0,-4,0,-4,0,-8,4],
	sm72=[0,-4,0,-4,0,-12,176],
	sm73=[0,177,177,177,-1,0,-4,0,-8,177,177,-2,177,177,177,177,177,177,-1,177,177,-2,177,177,177,177,-1,177,-1,177,177,177,177,177,177,177,-1,177,-2,177,177,-5,177,-2,177,-2,177,-31,177,177,-3,177,177,177,177,177,177,177,-7,177,177,177,177,177,177],
	sm74=[0,-2,3,-1,0,-4,0,-8,178,-35,179,-65,42],
	sm75=[0,180,180,180,-1,0,-4,0,-8,180,180,-2,180,180,180,180,180,180,-1,180,180,-2,180,180,180,180,-1,180,-1,180,180,180,180,180,180,180,-1,180,-2,180,180,-5,180,-2,180,-2,180,-31,180,180,-3,180,180,180,180,180,180,180,-7,180,180,180,180,180,180],
	sm76=[0,-2,3,-1,0,-4,0,-20,181,-89,42],
	sm77=[0,-2,182,-1,0,-4,0,-8,182,-8,182,-92,182],
	sm78=[0,-2,183,-1,0,-4,0,-8,183,-8,183,-92,183],
	sm79=[0,184,184,184,-1,0,-4,0,-8,184,184,-2,184,184,184,184,184,184,-1,184,184,-2,184,184,184,184,-1,184,-1,184,184,184,184,184,184,184,-1,184,-2,184,184,-5,184,-2,184,-2,184,-31,184,184,-3,184,184,184,184,184,184,184,-7,184,184,184,184,184,184],
	sm80=[0,-4,0,-4,0,-9,185],
	sm81=[0,186,186,186,-1,0,-4,0,-8,186,186,-2,186,186,186,186,186,186,-1,186,186,-1,186,186,186,186,186,-1,186,-1,186,186,186,186,186,186,186,-1,186,-2,186,186,-5,186,-2,186,-2,186,-31,186,186,-3,186,186,186,186,186,186,186,-7,186,186,186,186,186,186],
	sm82=[0,-4,0,-4,0,-5,187,187,-2,187,-2,187,-8,187,-5,187,-9,187,-11,187,-18,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187],
	sm83=[0,-4,0,-4,0,-5,188,188,-2,188,-2,188,-8,188,-5,188,-9,188,-11,188,-18,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188],
	sm84=[0,-1,189,189,-1,0,-4,0,-8,189,-5,189,189,-1,189,-2,189,-7,189,-19,189,-2,189,-2,189,-31,189,189,-3,189,189,189,189,189,189,189,-7,189,189,189,189,189,189],
	sm85=[0,-4,0,-4,0,-5,190,190,-2,190,-2,190,-8,190,-5,190,-9,190,-11,190,-18,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190],
	sm86=[0,-4,0,-4,0,-5,59,59,-2,59,-2,59,-8,59,-5,59,-9,59,-11,59,-18,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
	sm87=[0,-4,0,-4,0,-5,191,191,-1,191,191,-2,191,-4,191,-2,191,191,-5,191,-1,191,-7,191,-11,191,191,-4,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,-5,191,191],
	sm88=[0,-4,0,-4,0,-5,192,192,-1,192,192,-2,192,-4,192,-2,192,192,-5,192,-1,192,-7,192,-11,192,192,-4,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,-5,192,192],
	sm89=[0,-4,0,-4,0,-5,128,128,-1,128,128,-2,128,-4,128,-2,128,128,-5,128,-1,128,-7,128,-11,128,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
	sm90=[0,-1,2,3,-1,0,-4,0,-5,193,-2,113,-5,6,7,-1,114,-2,10,-7,15,-19,25,194,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm91=[0,-1,2,3,-1,0,-4,0,-5,196,-3,197,-7,198,-28,199,200,-5,201,-51,37,38,-3,42],
	sm92=[0,-4,0,-4,0,-5,202,202,-1,202,202,-2,202,-4,202,-2,202,202,-5,202,-1,202,-7,202,-11,202,202,-4,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,-5,202,202],
	sm93=[0,-4,0,-4,0,-5,203,203,-1,203,203,-2,203,-4,203,-2,203,203,-5,203,-1,203,-7,203,-11,203,203,-4,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,-5,203,203],
	sm94=[0,-4,0,-4,0,-5,204,204,-2,204,-2,204,-8,204,-5,204,-9,204,-11,204,-18,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204],
	sm95=[0,-4,0,-4,0,-5,205,205,-2,205,-2,205,-8,205,-5,205,-9,205,-11,205,-18,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205],
	sm96=[0,-4,0,-4,0,-5,206,206,-2,206,-2,206,-8,206,-5,206,-9,206,-11,206,-18,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206],
	sm97=[0,-4,0,-4,0,-5,207,207,-2,207,-2,207,-8,207,-5,207,-9,207,-11,207,-18,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207],
	sm98=[0,-4,0,-4,0,-5,208,208,-2,208,-2,208,-8,208,-5,208,-9,208,-11,208,-18,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208],
	sm99=[0,-4,0,-4,0,-5,209,209,-2,209,-2,209,-8,209,-5,209,-9,209,-11,209,-18,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209],
	sm100=[0,-4,0,-4,0,-5,210,210,-2,210,-2,210,-8,210,-5,210,-9,210,-11,210,-18,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210],
	sm101=[0,-4,0,-4,0,-5,211,211,-2,211,-2,211,-8,211,-5,211,-9,211,-11,211,-18,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211],
	sm102=[0,-2,3,-1,0,-4,0,-110,42],
	sm103=[0,-4,0,-4,0,-5,212,212,-1,212,212,-2,212,-4,212,-2,212,212,-5,212,-1,212,-7,212,-11,212,212,-4,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,-5,212,212],
	sm104=[0,-1,2,3,-1,0,-4,0,-5,213,-2,113,-5,6,7,-1,114,-2,10,214,-6,15,-19,25,-2,26,-1,215,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm105=[0,-4,0,-4,0,-5,216,216,-1,216,216,-2,216,-4,216,-2,216,216,-5,216,-1,216,-7,216,-11,216,216,-4,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,-5,216,216],
	sm106=[0,-4,0,-4,0,-5,217,217,-1,217,217,-2,217,-8,217,-5,217,-1,217,-7,217,-11,217,-5,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,-5,217,217],
	sm107=[0,-4,0,-4,0,-52,218],
	sm108=[0,-4,0,-4,0,-17,157,-32,158],
	sm109=[0,-4,0,-4,0,-5,219,219,-1,219,219,-2,219,-4,219,-2,219,219,-5,219,-1,219,-7,219,-5,219,219,-4,219,219,-4,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,-5,219,219],
	sm110=[0,-1,138,139,-1,140,141,142,143,144,0,-105,220],
	sm111=[0,-4,0,-4,0,-5,221,221,-1,221,221,-2,221,-4,221,-2,221,221,-5,221,-1,221,-7,221,-11,221,221,-4,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,-5,221,221],
	sm112=[0,-1,222,222,-1,222,222,222,222,222,0,-105,222],
	sm113=[0,-1,223,223,-1,223,223,223,223,223,0,-105,223],
	sm114=[0,-1,146,147,-1,148,149,150,151,152,0,-106,224],
	sm115=[0,-1,225,225,-1,225,225,225,225,225,0,-106,225],
	sm116=[0,-1,226,226,-1,226,226,226,226,226,0,-106,226],
	sm117=[0,-4,0,-4,0,-5,227,227,-1,227,227,-2,227,-4,227,-2,227,227,-5,227,-1,227,-7,227,-5,227,-5,227,227,-4,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,-5,227,227],
	sm118=[0,-4,0,-4,0,-5,228,-15,229],
	sm119=[0,-4,0,-4,0,-5,128,128,-2,128,-2,128,-4,128,-2,128,128,-5,128,-1,128,-7,128,-5,130,-5,128,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
	sm120=[0,-4,0,-4,0,-5,230,230,-1,230,230,-2,230,-4,230,-2,230,230,-5,230,-1,230,-7,230,-11,230,230,-4,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,230,-5,230,230],
	sm121=[0,-4,0,-4,0,-5,231,231,-2,231,-2,231,-8,231,-5,231,-9,231,-11,231,-18,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231,231],
	sm122=[0,-1,2,3,-1,0,-4,0,-8,232,-5,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm123=[0,233,233,233,-1,0,-4,0,-8,233,233,-2,233,233,233,233,233,233,-1,233,233,-1,233,233,233,233,233,-1,233,-1,233,233,233,233,233,233,233,-1,233,-2,233,233,-5,233,-2,233,-2,233,-31,233,233,-3,233,233,233,233,233,233,233,-7,233,233,233,233,233,233],
	sm124=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,-4,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,-6,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm125=[0,-4,0,-4,0,-5,234,-6,235],
	sm126=[0,-4,0,-4,0,-5,236,-6,236],
	sm127=[0,-4,0,-4,0,-5,237,-6,237,-42,238],
	sm128=[0,-4,0,-4,0,-55,238],
	sm129=[0,-4,0,-4,0,-5,130,-2,130,130,-2,130,-7,130,130,-5,130,-1,130,-14,130,-4,130,-5,130],
	sm130=[0,-4,0,-4,0,-5,239,-3,239,-11,239,-5,239,-1,239,-19,239,-5,239],
	sm131=[0,-1,2,3,-1,0,-4,0,-9,240,-7,198,-35,241,-51,37,38,-3,42],
	sm132=[0,-2,3,-1,0,-4,0,-5,193,-2,163,-8,164,-31,242,-3,243,-56,42],
	sm133=[0,-4,0,-4,0,-25,244],
	sm134=[0,-1,2,3,-1,0,-4,0,-8,113,-3,245,-1,6,7,8,-3,10,-2,246,-4,15,-13,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm135=[0,-4,0,-4,0,-20,247],
	sm136=[0,248,248,248,-1,0,-4,0,-8,248,248,-2,248,248,248,248,248,248,-1,248,248,-1,248,248,248,248,248,-1,248,-1,248,248,248,248,248,248,248,-1,248,-2,248,248,-5,248,-2,248,-2,248,-31,248,248,-3,248,248,248,248,248,248,248,-7,248,248,248,248,248,248],
	sm137=[0,-4,0,-4,0,-12,249],
	sm138=[0,-4,0,-4,0,-12,129],
	sm139=[0,250,250,250,-1,0,-4,0,-8,250,250,-2,250,250,250,250,250,250,-1,250,250,-1,250,250,250,250,250,-1,250,-1,250,250,250,250,250,250,250,-1,250,-2,250,250,-5,250,-2,250,-2,250,-31,250,250,-3,250,250,250,250,250,250,250,-7,250,250,250,250,250,250],
	sm140=[0,-4,0,-4,0,-12,251],
	sm141=[0,252,252,252,-1,0,-4,0,-8,252,252,-2,252,252,252,252,252,252,-1,252,252,-1,252,252,252,252,252,-1,252,-1,252,252,252,252,252,252,252,-1,252,-2,252,252,-5,252,-2,252,-2,252,-31,252,252,-3,252,252,252,252,252,252,252,-7,252,252,252,252,252,252],
	sm142=[0,-4,0,-4,0,-12,253],
	sm143=[0,-4,0,-4,0,-12,254],
	sm144=[0,-4,0,-4,0,-39,255,256],
	sm145=[0,257,257,257,-1,0,-4,0,-8,257,257,-2,257,257,257,257,257,257,-1,257,257,-1,257,257,257,257,257,-1,257,-1,257,257,257,257,257,257,257,-1,257,-2,257,257,-5,257,-2,257,-2,257,-31,257,257,-3,257,257,257,257,257,257,257,-7,257,257,257,257,257,257],
	sm146=[0,-4,0,-4,0,-8,178,-35,179],
	sm147=[0,258,258,258,-1,0,-4,0,-5,258,258,-1,258,258,-2,258,258,258,258,258,258,-1,258,258,258,-1,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,-2,258,258,-5,258,258,258,258,-2,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,258,-7,258,258,258,258,258,258],
	sm148=[0,-4,0,-4,0,-8,259],
	sm149=[0,-1,2,3,-1,0,-4,0,-9,260,-2,261,-4,198,-27,262,199,200,-57,37,38,-3,42],
	sm150=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-27,25,-2,26,-2,27,-50,37,38,39,40,41,42],
	sm151=[0,-4,0,-4,0,-20,263],
	sm152=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-3,264,-31,243,-56,42],
	sm153=[0,-4,0,-4,0,-5,265,-6,266],
	sm154=[0,-4,0,-4,0,-5,267,-6,267],
	sm155=[0,268,268,268,-1,0,-4,0,-8,268,268,-2,268,268,268,268,268,268,-1,268,268,-1,268,268,268,268,268,-1,268,-1,268,268,268,268,268,268,268,-1,268,268,268,268,268,-5,268,-2,268,-2,268,-31,268,268,-3,268,268,268,268,268,268,268,-7,268,268,268,268,268,268],
	sm156=[0,-4,0,-4,0,-5,269,-6,269,-8,269,-15,269,-11,269],
	sm157=[0,-4,0,-4,0,-5,270,-3,270,-2,270,-8,270,-15,270,-11,270],
	sm158=[0,-4,0,-4,0,-37,271],
	sm159=[0,-4,0,-4,0,-5,272,-3,272,-2,272,-8,272,-15,272,-11,272,-18,272,272,79],
	sm160=[0,-4,0,-4,0,-5,273,-3,273,-2,273,-8,273,-15,273,-11,273,-18,273,273,273,81],
	sm161=[0,-4,0,-4,0,-5,274,-3,274,-2,274,-8,274,-15,274,-11,274,-18,274,274,274,274,83],
	sm162=[0,-4,0,-4,0,-5,275,-3,275,-2,275,-8,275,-15,275,-11,275,-18,275,275,275,275,275,85],
	sm163=[0,-4,0,-4,0,-5,276,-3,276,-2,276,-8,276,-15,276,-11,276,-18,276,276,276,276,276,276,87,88,89,90],
	sm164=[0,-4,0,-4,0,-5,277,-3,277,-2,277,-8,277,-5,92,-9,277,-11,277,-18,277,277,277,277,277,277,277,277,277,277,93,94,95,96,97],
	sm165=[0,-4,0,-4,0,-5,278,-3,278,-2,278,-8,278,-5,278,-9,278,-11,278,-18,278,278,278,278,278,278,278,278,278,278,278,278,278,278,278,99,100,101],
	sm166=[0,-4,0,-4,0,-5,279,-3,279,-2,279,-8,279,-5,279,-9,279,-11,279,-18,279,279,279,279,279,279,279,279,279,279,279,279,279,279,279,99,100,101],
	sm167=[0,-4,0,-4,0,-5,280,-3,280,-2,280,-8,280,-5,280,-9,280,-11,280,-18,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,99,100,101],
	sm168=[0,-4,0,-4,0,-5,281,-3,281,-2,281,-8,281,-5,281,-9,281,-11,281,-18,281,281,281,281,281,281,281,281,281,281,281,281,281,281,281,99,100,101],
	sm169=[0,-4,0,-4,0,-5,282,-3,282,-2,282,-8,282,-5,282,-9,282,-11,282,-18,282,282,282,282,282,282,282,282,282,282,282,282,282,282,282,99,100,101],
	sm170=[0,-4,0,-4,0,-5,283,-3,283,-2,283,-8,283,-5,283,-9,283,-11,283,-18,283,283,283,283,283,283,283,283,283,283,283,283,283,283,283,99,100,101],
	sm171=[0,-4,0,-4,0,-5,284,-3,284,-2,284,-8,284,-5,284,-9,284,-11,284,-18,284,284,284,284,284,284,284,284,284,284,284,284,284,284,284,284,284,284,103,104],
	sm172=[0,-4,0,-4,0,-5,285,-3,285,-2,285,-8,285,-5,285,-9,285,-11,285,-18,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,103,104],
	sm173=[0,-4,0,-4,0,-5,286,-3,286,-2,286,-8,286,-5,286,-9,286,-11,286,-18,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,103,104],
	sm174=[0,-4,0,-4,0,-5,287,106,-2,287,-2,287,-8,287,-5,287,-9,287,-11,287,-18,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,107,108],
	sm175=[0,-4,0,-4,0,-5,288,106,-2,288,-2,288,-8,288,-5,288,-9,288,-11,288,-18,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,107,108],
	sm176=[0,-4,0,-4,0,-5,289,289,-2,289,-2,289,-8,289,-5,289,-9,289,-11,289,-18,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289],
	sm177=[0,-4,0,-4,0,-5,290,290,-2,290,-2,290,-8,290,-5,290,-9,290,-11,290,-18,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290],
	sm178=[0,-4,0,-4,0,-5,291,291,-2,291,-2,291,-8,291,-5,291,-9,291,-11,291,-18,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291],
	sm179=[0,-4,0,-4,0,-5,292,292,-2,292,-2,292,-8,292,-5,292,-9,292,-11,292,-18,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292],
	sm180=[0,-4,0,-4,0,-5,293,-43,294],
	sm181=[0,-1,2,3,-1,0,-4,0,-5,295,-2,113,-5,6,7,-1,114,-2,10,-7,15,-19,25,296,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm182=[0,-4,0,-4,0,-5,297,297,-1,297,297,-2,297,-4,297,-2,297,297,-5,297,-1,297,-7,297,-11,297,297,-4,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,297,-5,297,297],
	sm183=[0,-4,0,-4,0,-5,298,-43,298],
	sm184=[0,-1,299,299,-1,0,-4,0,-5,299,-2,299,-5,299,299,-1,299,-2,299,-7,299,-19,299,299,-1,299,-1,299,299,-31,299,299,-3,299,299,299,299,299,299,299,-7,299,299,299,299,299,299],
	sm185=[0,-4,0,-4,0,-5,300,-3,301],
	sm186=[0,-4,0,-4,0,-9,302],
	sm187=[0,-4,0,-4,0,-5,303,303,-1,303,303,-2,303,-4,303,-2,303,303,-5,303,-1,303,-7,303,-11,303,303,-4,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,-5,303,303],
	sm188=[0,-4,0,-4,0,-5,304,-3,304],
	sm189=[0,-4,0,-4,0,-5,305,-3,305],
	sm190=[0,-4,0,-4,0,-5,305,-3,305,-45,238],
	sm191=[0,-4,0,-4,0,-20,306,-16,307],
	sm192=[0,-4,0,-4,0,-5,131,-3,131,-10,308,-16,308,-17,131],
	sm193=[0,-1,2,3,-1,0,-4,0,-17,198,-87,37,38,-3,42],
	sm194=[0,-4,0,-4,0,-20,309,-16,309],
	sm195=[0,-4,0,-4,0,-20,308,-16,308],
	sm196=[0,-4,0,-4,0,-5,310,310,-1,310,310,-2,310,-4,310,-2,310,310,-5,310,-1,310,-7,310,-11,310,310,-4,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,-5,310,310],
	sm197=[0,-4,0,-4,0,-49,311],
	sm198=[0,-4,0,-4,0,-5,312,-15,313],
	sm199=[0,-4,0,-4,0,-21,314],
	sm200=[0,-4,0,-4,0,-5,315,315,-1,315,315,-2,315,-4,315,-2,315,315,-5,315,-1,315,-7,315,-11,315,315,-4,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,315,-5,315,315],
	sm201=[0,-4,0,-4,0,-5,316,-15,317],
	sm202=[0,-4,0,-4,0,-5,318,-15,318],
	sm203=[0,-4,0,-4,0,-5,319,-15,319],
	sm204=[0,-4,0,-4,0,-49,320],
	sm205=[0,-4,0,-4,0,-5,321,321,-1,321,321,-2,321,-4,321,-2,321,321,-5,321,-1,321,-7,321,-11,321,321,-4,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,-5,321,321],
	sm206=[0,-4,0,-4,0,-5,322,322,-1,322,322,-2,322,-4,322,-2,322,322,-5,322,-1,322,-7,322,-11,322,322,-4,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,-5,322,322],
	sm207=[0,-4,0,-4,0,-5,323,323,-1,323,323,-2,323,-4,323,-2,323,323,-5,323,-1,323,-7,323,-11,323,323,-4,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,-5,323,323],
	sm208=[0,-4,0,-4,0,-5,324,324,-1,324,324,-2,324,-4,324,-2,324,324,-5,324,-1,324,-7,324,-11,324,324,-4,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,-5,324,324],
	sm209=[0,-1,325,325,-1,325,325,325,325,325,0,-105,325],
	sm210=[0,-1,326,326,-1,326,326,326,326,326,0,-106,326],
	sm211=[0,-4,0,-4,0,-5,327,327,-1,327,327,-2,327,-4,327,-2,327,327,-5,327,-1,327,-7,327,-5,327,-5,327,327,-4,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,-5,327,327],
	sm212=[0,-4,0,-4,0,-21,328,-31,329],
	sm213=[0,-4,0,-4,0,-21,330],
	sm214=[0,-4,0,-4,0,-21,331],
	sm215=[0,-4,0,-4,0,-5,332,332,-1,332,332,-2,332,-4,332,-2,332,332,-5,332,-1,332,-7,332,-11,332,332,-4,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,-5,332,332],
	sm216=[0,-4,0,-4,0,-49,333],
	sm217=[0,-4,0,-4,0,-5,334,-3,334,-2,334,-8,334,-15,334,-11,334],
	sm218=[0,-4,0,-4,0,-5,335,-3,335,-2,335,-8,335,-15,335,-11,335],
	sm219=[0,336,336,336,-1,0,-4,0,-8,336,336,-2,336,336,336,336,336,336,-1,336,336,-1,336,336,336,336,336,-1,336,-1,336,336,336,336,336,336,336,-1,336,-2,336,336,-5,336,-2,336,-2,336,-31,336,336,-3,336,336,336,336,336,336,336,-7,336,336,336,336,336,336],
	sm220=[0,337,337,337,-1,0,-4,0,-8,337,337,-2,337,337,337,337,337,337,-1,337,337,-1,337,337,337,337,337,-1,337,-1,337,337,337,337,337,337,337,-1,337,-2,337,337,-5,337,-2,337,-2,337,-31,337,337,-3,337,337,337,337,337,337,337,-7,337,337,337,337,337,337],
	sm221=[0,338,338,338,-1,0,-4,0,-8,338,338,-2,338,338,338,338,338,338,-1,338,338,-1,338,338,338,338,338,-1,338,-1,338,338,338,338,338,338,338,-1,338,-2,338,338,-5,338,-2,338,-2,338,-31,338,338,-3,338,338,338,338,338,338,338,-7,338,338,338,338,338,338],
	sm222=[0,-4,0,-4,0,-5,339,-6,339],
	sm223=[0,-4,0,-4,0,-5,340,-3,340,-11,340,-5,340,-1,340,-19,340,-5,340],
	sm224=[0,-4,0,-4,0,-9,341],
	sm225=[0,-4,0,-4,0,-5,342,-3,343],
	sm226=[0,-4,0,-4,0,-5,344,-3,344],
	sm227=[0,-4,0,-4,0,-5,345,-3,345],
	sm228=[0,-4,0,-4,0,-37,346],
	sm229=[0,-4,0,-4,0,-5,347,-3,347,-11,347,-27,347,-5,238],
	sm230=[0,-4,0,-4,0,-5,348,-3,348,-11,348,-5,348,-1,348,-19,348,-5,348],
	sm231=[0,-2,3,-1,0,-4,0,-5,295,-2,163,-8,164,-31,349,-3,243,-56,42],
	sm232=[0,-4,0,-4,0,-49,350],
	sm233=[0,-4,0,-4,0,-5,351,-43,352],
	sm234=[0,-4,0,-4,0,-5,353,-43,353],
	sm235=[0,-4,0,-4,0,-5,354,-43,354],
	sm236=[0,-4,0,-4,0,-5,355,-3,355,-11,355,-27,355],
	sm237=[0,-4,0,-4,0,-5,355,-3,355,-11,355,-27,355,-5,238],
	sm238=[0,-4,0,-4,0,-21,356],
	sm239=[0,-4,0,-4,0,-20,357],
	sm240=[0,-4,0,-4,0,-21,358],
	sm241=[0,-4,0,-4,0,-12,359],
	sm242=[0,-1,2,3,-1,0,-4,0,-8,113,-3,360,-1,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm243=[0,-4,0,-4,0,-27,361],
	sm244=[0,-1,2,3,-1,0,-4,0,-8,113,-3,362,-1,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm245=[0,-4,0,-4,0,-29,363],
	sm246=[0,-4,0,-4,0,-12,364],
	sm247=[0,-4,0,-4,0,-5,59,59,-5,59,-14,365,-1,366,-25,60,61,62,63,64,65,66,67,68,69,70,71,72,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
	sm248=[0,-4,0,-4,0,-27,365,-1,366],
	sm249=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,8,-3,10,-2,367,-18,24,-5,25,-2,26,-2,27,-50,37,38,39,40,41,42],
	sm250=[0,-4,0,-4,0,-21,368],
	sm251=[0,369,369,369,-1,0,-4,0,-8,369,369,-2,369,369,369,369,369,369,-1,369,369,-1,369,369,369,369,369,-1,369,-1,369,369,369,369,369,369,369,-1,369,-2,369,369,-5,369,-2,369,-2,369,-31,369,369,-3,369,369,369,369,369,369,369,-7,369,369,369,369,369,369],
	sm252=[0,370,370,370,-1,0,-4,0,-8,370,370,-2,370,370,370,370,370,370,-1,370,370,-1,370,370,370,370,370,-1,370,-1,370,370,370,370,370,370,370,-1,370,-2,370,370,-5,370,-2,370,-2,370,-31,370,370,-3,370,370,370,370,370,370,370,-7,370,370,370,370,370,370],
	sm253=[0,371,371,371,-1,0,-4,0,-8,371,371,-2,371,371,371,371,371,371,-1,371,371,-1,371,371,371,371,371,-1,371,-1,371,371,371,371,371,371,371,-1,371,-2,371,371,-5,371,-2,371,-2,371,-31,371,371,-3,371,371,371,371,371,371,371,-7,371,371,371,371,371,371],
	sm254=[0,-4,0,-4,0,-21,372],
	sm255=[0,373,373,373,-1,0,-4,0,-8,373,373,-2,373,373,373,373,373,373,-1,373,373,-1,373,373,373,373,373,-1,373,-1,373,373,373,373,373,373,373,-1,373,-2,373,373,-5,373,-2,373,-2,373,-31,373,373,-3,373,373,373,373,373,373,373,-7,373,373,373,373,373,373],
	sm256=[0,374,374,374,-1,0,-4,0,-8,374,374,-2,374,374,374,374,374,374,-1,374,374,-1,374,374,374,374,374,-1,374,-1,374,374,374,374,374,374,374,-1,374,-1,256,374,374,-5,374,-2,374,-2,374,-31,374,374,-3,374,374,374,374,374,374,374,-7,374,374,374,374,374,374],
	sm257=[0,375,375,375,-1,0,-4,0,-8,375,375,-2,375,375,375,375,375,375,-1,375,375,-1,375,375,375,375,375,-1,375,-1,375,375,375,375,375,375,375,-1,375,-2,375,375,-5,375,-2,375,-2,375,-31,375,375,-3,375,375,375,375,375,375,375,-7,375,375,375,375,375,375],
	sm258=[0,-4,0,-4,0,-20,376],
	sm259=[0,377,377,377,-1,0,-4,0,-5,377,377,-1,377,377,-2,377,377,377,377,377,377,-1,377,377,377,-1,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,-2,377,377,-5,377,377,377,377,-2,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,377,-7,377,377,377,377,377,377],
	sm260=[0,-1,2,3,-1,0,-4,0,-9,378,-2,261,-4,198,-27,262,199,200,-57,37,38,-3,42],
	sm261=[0,-4,0,-4,0,-9,379],
	sm262=[0,380,380,380,-1,0,-4,0,-5,380,380,-1,380,380,-2,380,380,380,380,380,380,-1,380,380,380,-1,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,-2,380,380,-5,380,380,380,380,-2,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,-7,380,380,380,380,380,380],
	sm263=[0,-1,2,3,-1,0,-4,0,-9,381,-2,261,-4,198,-27,262,199,200,-57,37,38,-3,42],
	sm264=[0,-1,382,382,-1,0,-4,0,-9,382,-2,382,-4,382,-27,382,382,382,-57,382,382,-3,382],
	sm265=[0,-1,383,383,-1,0,-4,0,-9,383,-2,383,-4,383,-27,383,383,383,-57,383,383,-3,383],
	sm266=[0,-1,2,3,-1,0,-4,0,-17,198,-28,199,200,-57,37,38,-3,42],
	sm267=[0,-4,0,-4,0,-20,306],
	sm268=[0,-4,0,-4,0,-20,308],
	sm269=[0,-4,0,-4,0,-8,384],
	sm270=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-3,385,-31,243,-56,42],
	sm271=[0,-4,0,-4,0,-21,386],
	sm272=[0,-4,0,-4,0,-8,387],
	sm273=[0,-4,0,-4,0,-21,388],
	sm274=[0,-4,0,-4,0,-5,389,-15,388],
	sm275=[0,-4,0,-4,0,-21,390],
	sm276=[0,-4,0,-4,0,-5,391,-15,391],
	sm277=[0,-4,0,-4,0,-5,392,-15,392],
	sm278=[0,393,393,393,-1,0,-4,0,-8,393,393,-2,393,393,393,393,393,393,-1,393,393,-2,393,393,393,393,-1,393,-1,393,393,393,393,393,393,393,-1,393,-2,393,393,-5,393,-2,393,-2,393,-31,393,393,-3,393,393,393,393,393,393,393,-7,393,393,393,393,393,393],
	sm279=[0,-4,0,-4,0,-5,394,-6,394],
	sm280=[0,-4,0,-4,0,-5,295,-43,395],
	sm281=[0,-4,0,-4,0,-5,396,396,-1,396,396,-2,396,-4,396,-2,396,396,-5,396,-1,396,-7,396,-11,396,396,-4,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,-5,396,396],
	sm282=[0,-1,2,3,-1,0,-4,0,-5,193,-2,113,-5,6,7,-1,114,-2,10,-7,15,-19,25,299,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm283=[0,-4,0,-4,0,-5,397,397,-1,397,397,-2,397,-4,397,-2,397,397,-5,397,-1,397,-7,397,-11,397,397,-4,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,397,-5,397,397],
	sm284=[0,-4,0,-4,0,-5,398,-43,398],
	sm285=[0,-1,399,399,-1,0,-4,0,-5,399,-2,399,-5,399,399,-1,399,-2,399,-7,399,-19,399,399,-1,399,-1,399,399,-31,399,399,-3,399,399,399,399,399,399,399,-7,399,399,399,399,399,399],
	sm286=[0,-4,0,-4,0,-5,400,-43,400],
	sm287=[0,-1,2,3,-1,0,-4,0,-9,401,-7,198,-28,199,200,-5,201,-51,37,38,-3,42],
	sm288=[0,-4,0,-4,0,-5,402,402,-1,402,402,-2,402,-4,402,-2,402,402,-5,402,-1,402,-7,402,-11,402,402,-4,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,-5,402,402],
	sm289=[0,-4,0,-4,0,-5,403,403,-1,403,403,-2,403,-4,403,-2,403,403,-5,403,-1,403,-7,403,-11,403,403,-4,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,403,-5,403,403],
	sm290=[0,-4,0,-4,0,-5,404,-3,404],
	sm291=[0,-4,0,-4,0,-5,405,-3,405],
	sm292=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-35,243,-56,42],
	sm293=[0,-4,0,-4,0,-20,406],
	sm294=[0,-4,0,-4,0,-20,407],
	sm295=[0,-4,0,-4,0,-49,408],
	sm296=[0,-4,0,-4,0,-5,409,409,-1,409,409,-2,409,-4,409,-2,409,409,-5,409,-1,409,-7,409,-11,409,409,-4,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,-5,409,409],
	sm297=[0,-4,0,-4,0,-21,410],
	sm298=[0,-4,0,-4,0,-5,411,411,-1,411,411,-2,411,-4,411,-2,411,411,-5,411,-1,411,-7,411,-11,411,411,-4,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,411,-5,411,411],
	sm299=[0,-4,0,-4,0,-5,412,412,-1,412,412,-2,412,-4,412,-2,412,412,-5,412,-1,412,-7,412,-11,412,412,-4,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,412,-5,412,412],
	sm300=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-1,215,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm301=[0,-4,0,-4,0,-5,413,-15,413],
	sm302=[0,-4,0,-4,0,-5,414,414,-1,414,414,-2,414,-4,414,-2,414,414,-5,414,-1,414,-7,414,-11,414,414,-4,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,414,-5,414,414],
	sm303=[0,-4,0,-4,0,-5,415,415,-1,415,415,-2,415,-4,415,-2,415,415,-5,415,-1,415,-7,415,-5,415,-5,415,415,-4,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,415,-5,415,415],
	sm304=[0,-4,0,-4,0,-5,416,416,-1,416,416,-2,416,-4,416,-2,416,416,-5,416,-1,416,-7,416,-5,416,-5,416,416,-4,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,416,-5,416,416],
	sm305=[0,-4,0,-4,0,-5,417,417,-1,417,417,-2,417,-4,417,-2,417,417,-5,417,-1,417,-7,417,-11,417,417,-4,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,-5,417,417],
	sm306=[0,-4,0,-4,0,-9,418],
	sm307=[0,-4,0,-4,0,-9,419],
	sm308=[0,-4,0,-4,0,-5,420,-6,420],
	sm309=[0,-4,0,-4,0,-5,421,-3,421,-2,421,-8,421,-27,421],
	sm310=[0,-4,0,-4,0,-5,422,-3,422,-11,422,-5,422,-1,422,-19,422,-5,422],
	sm311=[0,-1,2,3,-1,0,-4,0,-9,423,-7,198,-35,241,-51,37,38,-3,42],
	sm312=[0,-4,0,-4,0,-9,424],
	sm313=[0,-4,0,-4,0,-5,425,-3,425,-11,425,-27,425],
	sm314=[0,-4,0,-4,0,-49,426],
	sm315=[0,-4,0,-4,0,-5,427,-3,427,-11,427,-5,427,-1,427,-19,427,-5,427],
	sm316=[0,-4,0,-4,0,-5,428,-43,428],
	sm317=[0,-2,3,-1,0,-4,0,-5,193,-2,163,-8,164,-31,429,-3,243,-56,42],
	sm318=[0,-4,0,-4,0,-21,430,-27,430],
	sm319=[0,-4,0,-4,0,-5,431,-3,431,-11,431,-27,431],
	sm320=[0,-1,2,3,-1,0,-4,0,-8,113,-3,432,-1,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm321=[0,-4,0,-4,0,-12,433],
	sm322=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,434,-6,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm323=[0,-4,0,-4,0,-12,435],
	sm324=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,436,-6,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm325=[0,-4,0,-4,0,-5,234,-6,437],
	sm326=[0,-4,0,-4,0,-27,438,-1,439],
	sm327=[0,-4,0,-4,0,-5,237,-6,237,-14,440,-1,440,-25,238],
	sm328=[0,-4,0,-4,0,-27,440,-1,440,-25,238],
	sm329=[0,-4,0,-4,0,-27,441,-1,441],
	sm330=[0,-4,0,-4,0,-29,442],
	sm331=[0,-4,0,-4,0,-29,366],
	sm332=[0,-4,0,-4,0,-8,443],
	sm333=[0,444,444,444,-1,0,-4,0,-8,444,444,-2,444,444,444,444,444,444,-1,444,444,-1,444,444,444,444,444,-1,444,-1,444,444,444,444,444,444,444,-1,444,-2,444,444,-5,444,-2,444,-2,444,-31,444,444,-3,444,444,444,444,444,444,444,-7,444,444,444,444,444,444],
	sm334=[0,445,445,445,-1,0,-4,0,-8,445,445,-2,445,445,445,445,445,445,-1,445,445,-1,445,445,445,445,445,-1,445,-1,445,445,445,445,445,445,445,-1,445,-2,445,445,-5,445,-2,445,-2,445,-31,445,445,-3,445,445,445,445,445,445,445,-7,445,445,445,445,445,445],
	sm335=[0,-4,0,-4,0,-9,446],
	sm336=[0,447,447,447,-1,0,-4,0,-5,447,447,-1,447,447,-2,447,447,447,447,447,447,-1,447,447,447,-1,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,-2,447,447,-5,447,447,447,447,-2,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,447,-7,447,447,447,447,447,447],
	sm337=[0,448,448,448,-1,0,-4,0,-5,448,448,-1,448,448,-2,448,448,448,448,448,448,-1,448,448,448,-1,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,-2,448,448,-5,448,448,448,448,-2,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,448,-7,448,448,448,448,448,448],
	sm338=[0,-1,449,449,-1,0,-4,0,-9,449,-2,449,-4,449,-27,449,449,449,-57,449,449,-3,449],
	sm339=[0,-1,450,450,-1,0,-4,0,-9,450,-2,450,-4,450,-27,450,450,450,-57,450,450,-3,450],
	sm340=[0,-4,0,-4,0,-21,451],
	sm341=[0,-4,0,-4,0,-8,452],
	sm342=[0,-4,0,-4,0,-8,453],
	sm343=[0,-1,2,3,-1,0,-4,0,-8,4,454,-2,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm344=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-3,455,-31,243,-56,42],
	sm345=[0,-4,0,-4,0,-5,456,-6,456],
	sm346=[0,-4,0,-4,0,-5,457,-3,457,-2,457,-8,457,-15,457,-11,457],
	sm347=[0,-4,0,-4,0,-5,458,458,-1,458,458,-2,458,-4,458,-2,458,458,-5,458,-1,458,-7,458,-11,458,458,-4,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,-5,458,458],
	sm348=[0,-4,0,-4,0,-5,459,-43,459],
	sm349=[0,-1,2,3,-1,0,-4,0,-5,295,-2,113,-5,6,7,-1,114,-2,10,-7,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm350=[0,-4,0,-4,0,-5,460,460,-1,460,460,-2,460,-4,460,-2,460,460,-5,460,-1,460,-7,460,-11,460,460,-4,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,-5,460,460],
	sm351=[0,-4,0,-4,0,-5,461,-3,461],
	sm352=[0,-4,0,-4,0,-5,462,-3,462],
	sm353=[0,-4,0,-4,0,-21,463],
	sm354=[0,-4,0,-4,0,-21,464],
	sm355=[0,-4,0,-4,0,-21,465],
	sm356=[0,-4,0,-4,0,-20,466,-16,466],
	sm357=[0,-4,0,-4,0,-5,467,467,-1,467,467,-2,467,-4,467,-2,467,467,-5,467,-1,467,-7,467,-11,467,467,-4,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,467,-5,467,467],
	sm358=[0,-4,0,-4,0,-5,468,-15,468],
	sm359=[0,-4,0,-4,0,-21,469],
	sm360=[0,-4,0,-4,0,-21,470],
	sm361=[0,-4,0,-4,0,-5,471,-3,471,-2,471,-8,471,-15,471,-11,471],
	sm362=[0,-4,0,-4,0,-9,472],
	sm363=[0,-4,0,-4,0,-5,473,-3,473,-11,473,-5,473,-1,473,-19,473,-5,473],
	sm364=[0,-4,0,-4,0,-5,474,-3,474],
	sm365=[0,-4,0,-4,0,-5,475,-3,475],
	sm366=[0,-4,0,-4,0,-5,476,-3,476,-11,476,-5,476,-1,476,-19,476,-5,476],
	sm367=[0,-2,3,-1,0,-4,0,-5,295,-2,163,-8,164,-31,477,-3,243,-56,42],
	sm368=[0,-4,0,-4,0,-49,478],
	sm369=[0,-4,0,-4,0,-5,479,-43,479],
	sm370=[0,480,480,480,-1,0,-4,0,-8,480,480,-2,480,480,480,480,480,480,-1,480,480,-1,481,480,480,480,480,-1,480,-1,480,480,480,480,480,480,480,-1,480,-2,480,480,-5,480,-2,480,-2,480,-31,480,480,-3,480,480,480,480,480,480,480,-7,480,480,480,480,480,480],
	sm371=[0,-4,0,-4,0,-21,482],
	sm372=[0,483,483,483,-1,0,-4,0,-8,483,483,-2,483,483,483,483,483,483,-1,483,483,-1,483,483,483,483,483,-1,483,-1,483,483,483,483,483,483,483,-1,483,-2,483,483,-5,483,-2,483,-2,483,-31,483,483,-3,483,483,483,483,483,483,483,-7,483,483,483,483,483,483],
	sm373=[0,-4,0,-4,0,-12,484],
	sm374=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,485,-6,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm375=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,486,-6,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm376=[0,-4,0,-4,0,-21,487],
	sm377=[0,-4,0,-4,0,-21,488],
	sm378=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,489,-6,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm379=[0,-4,0,-4,0,-21,490],
	sm380=[0,-4,0,-4,0,-21,491],
	sm381=[0,-4,0,-4,0,-29,439],
	sm382=[0,-4,0,-4,0,-29,440],
	sm383=[0,492,492,492,-1,0,-4,0,-8,492,492,-2,492,492,492,492,492,492,-1,492,492,-1,492,492,492,492,492,-1,492,-1,492,492,492,492,492,492,492,-1,492,-2,492,492,-5,492,-2,492,-2,492,-31,492,492,-3,492,492,492,492,492,492,492,-7,492,492,492,492,492,492],
	sm384=[0,-4,0,-4,0,-9,493,-3,494,-22,495],
	sm385=[0,496,496,496,-1,0,-4,0,-8,496,496,-2,496,496,496,496,496,496,-1,496,496,-1,496,496,496,496,496,-1,496,-1,496,496,496,496,496,496,496,-1,496,-2,496,496,-5,496,-2,496,-2,496,-31,496,496,-3,496,496,496,496,496,496,496,-7,496,496,496,496,496,496],
	sm386=[0,-4,0,-4,0,-21,497],
	sm387=[0,-4,0,-4,0,-21,498],
	sm388=[0,499,499,499,-1,0,-4,0,-5,499,499,-1,499,499,-2,499,499,499,499,499,499,-1,499,499,499,-1,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,-2,499,499,-5,499,499,499,499,-2,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,499,-7,499,499,499,499,499,499],
	sm389=[0,-4,0,-4,0,-8,500],
	sm390=[0,-1,2,3,-1,0,-4,0,-8,4,501,-2,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm391=[0,-1,2,3,-1,0,-4,0,-8,4,502,-2,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm392=[0,-4,0,-4,0,-9,503],
	sm393=[0,504,504,504,-1,0,-4,0,-5,504,504,-1,504,504,-2,504,504,504,504,504,504,-1,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,-2,504,504,-5,504,504,504,504,-2,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,-7,504,504,504,504,504,504],
	sm394=[0,-4,0,-4,0,-9,505],
	sm395=[0,-4,0,-4,0,-21,506],
	sm396=[0,-4,0,-4,0,-5,507,-15,507],
	sm397=[0,-4,0,-4,0,-5,508,-43,508],
	sm398=[0,-4,0,-4,0,-8,509],
	sm399=[0,-4,0,-4,0,-8,510],
	sm400=[0,-4,0,-4,0,-21,511],
	sm401=[0,-4,0,-4,0,-21,512],
	sm402=[0,-4,0,-4,0,-5,513,513,-1,513,513,-2,513,-4,513,-2,513,513,-5,513,-1,513,-7,513,-5,513,-5,513,513,-4,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,513,-5,513,513],
	sm403=[0,-4,0,-4,0,-5,514,-3,514,-11,514,-5,514,-1,514,-19,514,-5,514],
	sm404=[0,-4,0,-4,0,-5,515,-3,515,-11,515,-5,515,-1,515,-19,515,-5,515],
	sm405=[0,-4,0,-4,0,-49,516],
	sm406=[0,-4,0,-4,0,-12,517],
	sm407=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,518,-6,15,-19,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm408=[0,-4,0,-4,0,-21,519],
	sm409=[0,-4,0,-4,0,-21,520],
	sm410=[0,521,521,521,-1,0,-4,0,-8,521,521,-2,521,521,521,521,521,521,-1,521,521,-1,521,521,521,521,521,-1,521,-1,521,521,521,521,521,521,521,-1,521,-2,521,521,-5,521,-2,521,-2,521,-31,521,521,-3,521,521,521,521,521,521,521,-7,521,521,521,521,521,521],
	sm411=[0,-4,0,-4,0,-21,522],
	sm412=[0,523,523,523,-1,0,-4,0,-8,523,523,-2,523,523,523,523,523,523,-1,523,523,-1,523,523,523,523,523,-1,523,-1,523,523,523,523,523,523,523,-1,523,-2,523,523,-5,523,-2,523,-2,523,-31,523,523,-3,523,523,523,523,523,523,523,-7,523,523,523,523,523,523],
	sm413=[0,-4,0,-4,0,-21,524],
	sm414=[0,525,525,525,-1,0,-4,0,-8,525,525,-2,525,525,525,525,525,525,-1,525,525,-1,525,525,525,525,525,-1,525,-1,525,525,525,525,525,525,525,-1,525,-2,525,525,-5,525,-2,525,-2,525,-31,525,525,-3,525,525,525,525,525,525,525,-7,525,525,525,525,525,525],
	sm415=[0,-4,0,-4,0,-9,526,-3,494,-22,495],
	sm416=[0,-4,0,-4,0,-9,527,-26,495],
	sm417=[0,-4,0,-4,0,-9,528,-3,528,-22,528],
	sm418=[0,-4,0,-4,0,-9,529,-26,529,530],
	sm419=[0,-1,2,3,-1,0,-4,0,-8,4,531,-2,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm420=[0,-4,0,-4,0,-9,532],
	sm421=[0,533,533,533,-1,0,-4,0,-5,533,533,-1,533,533,-2,533,533,533,533,533,533,-1,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,-2,533,533,-5,533,533,533,533,-2,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,533,-7,533,533,533,533,533,533],
	sm422=[0,-4,0,-4,0,-9,534],
	sm423=[0,535,535,535,-1,0,-4,0,-5,535,535,-1,535,535,-2,535,535,535,535,535,535,-1,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,-2,535,535,-5,535,535,535,535,-2,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,-7,535,535,535,535,535,535],
	sm424=[0,536,536,536,-1,0,-4,0,-5,536,536,-1,536,536,-2,536,536,536,536,536,536,-1,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,-2,536,536,-5,536,536,536,536,-2,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,-7,536,536,536,536,536,536],
	sm425=[0,-4,0,-4,0,-8,537],
	sm426=[0,-4,0,-4,0,-5,538,-3,538,-11,538,-5,538,-1,538,-19,538,-5,538],
	sm427=[0,539,539,539,-1,0,-4,0,-8,539,539,-2,539,539,539,539,539,539,-1,539,539,-1,539,539,539,539,539,-1,539,-1,539,539,539,539,539,539,539,-1,539,-2,539,539,-5,539,-2,539,-2,539,-31,539,539,-3,539,539,539,539,539,539,539,-7,539,539,539,539,539,539],
	sm428=[0,540,540,540,-1,0,-4,0,-8,540,540,-2,540,540,540,540,540,540,-1,540,540,-1,540,540,540,540,540,-1,540,-1,540,540,540,540,540,540,540,-1,540,-2,540,540,-5,540,-2,540,-2,540,-31,540,540,-3,540,540,540,540,540,540,540,-7,540,540,540,540,540,540],
	sm429=[0,-4,0,-4,0,-21,541],
	sm430=[0,542,542,542,-1,0,-4,0,-8,542,542,-2,542,542,542,542,542,542,-1,542,542,-1,542,542,542,542,542,-1,542,-1,542,542,542,542,542,542,542,-1,542,-2,542,542,-5,542,-2,542,-2,542,-31,542,542,-3,542,542,542,542,542,542,542,-7,542,542,542,542,542,542],
	sm431=[0,543,543,543,-1,0,-4,0,-8,543,543,-2,543,543,543,543,543,543,-1,543,543,-1,543,543,543,543,543,-1,543,-1,543,543,543,543,543,543,543,-1,543,-2,543,543,-5,543,-2,543,-2,543,-31,543,543,-3,543,543,543,543,543,543,543,-7,543,543,543,543,543,543],
	sm432=[0,544,544,544,-1,0,-4,0,-8,544,544,-2,544,544,544,544,544,544,-1,544,544,-1,544,544,544,544,544,-1,544,-1,544,544,544,544,544,544,544,-1,544,-2,544,544,-5,544,-2,544,-2,544,-31,544,544,-3,544,544,544,544,544,544,544,-7,544,544,544,544,544,544],
	sm433=[0,545,545,545,-1,0,-4,0,-8,545,545,-2,545,545,545,545,545,545,-1,545,545,-1,545,545,545,545,545,-1,545,-1,545,545,545,545,545,545,545,-1,545,-2,545,545,-5,545,-2,545,-2,545,-31,545,545,-3,545,545,545,545,545,545,545,-7,545,545,545,545,545,545],
	sm434=[0,546,546,546,-1,0,-4,0,-8,546,546,-2,546,546,546,546,546,546,-1,546,546,-1,546,546,546,546,546,-1,546,-1,546,546,546,546,546,546,546,-1,546,-2,546,546,-5,546,-2,546,-2,546,-31,546,546,-3,546,546,546,546,546,546,546,-7,546,546,546,546,546,546],
	sm435=[0,547,547,547,-1,0,-4,0,-8,547,547,-2,547,547,547,547,547,547,-1,547,547,-1,547,547,547,547,547,-1,547,-1,547,547,547,547,547,547,547,-1,547,-2,547,547,-5,547,-2,547,-2,547,-31,547,547,-3,547,547,547,547,547,547,547,-7,547,547,547,547,547,547],
	sm436=[0,548,548,548,-1,0,-4,0,-8,548,548,-2,548,548,548,548,548,548,-1,548,548,-1,548,548,548,548,548,-1,548,-1,548,548,548,548,548,548,548,-1,548,-2,548,548,-5,548,-2,548,-2,548,-31,548,548,-3,548,548,548,548,548,548,548,-7,548,548,548,548,548,548],
	sm437=[0,-4,0,-4,0,-9,549,-26,495],
	sm438=[0,550,550,550,-1,0,-4,0,-8,550,550,-2,550,550,550,550,550,550,-1,550,550,-1,550,550,550,550,550,-1,550,-1,550,550,550,550,550,550,550,-1,550,-2,550,550,-5,550,-2,550,-2,550,-31,550,550,-3,550,550,550,550,550,550,550,-7,550,550,550,550,550,550],
	sm439=[0,-4,0,-4,0,-9,551,-3,551,-22,551],
	sm440=[0,-4,0,-4,0,-9,552,-26,495],
	sm441=[0,-4,0,-4,0,-37,553],
	sm442=[0,554,554,554,-1,0,-4,0,-8,554,554,-2,554,554,554,554,554,554,-1,554,554,-1,554,554,554,554,554,-1,554,-1,554,554,554,554,554,554,554,-1,554,-1,554,554,554,-5,554,-2,554,-2,554,-31,554,554,-3,554,554,554,554,554,554,554,-7,554,554,554,554,554,554],
	sm443=[0,-4,0,-4,0,-9,555],
	sm444=[0,556,556,556,-1,0,-4,0,-5,556,556,-1,556,556,-2,556,556,556,556,556,556,-1,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,-2,556,556,-5,556,556,556,556,-2,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,-7,556,556,556,556,556,556],
	sm445=[0,557,557,557,-1,0,-4,0,-5,557,557,-1,557,557,-2,557,557,557,557,557,557,-1,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,-2,557,557,-5,557,557,557,557,-2,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,557,-7,557,557,557,557,557,557],
	sm446=[0,558,558,558,-1,0,-4,0,-5,558,558,-1,558,558,-2,558,558,558,558,558,558,-1,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,-2,558,558,-5,558,558,558,558,-2,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,558,-7,558,558,558,558,558,558],
	sm447=[0,-4,0,-4,0,-9,559],
	sm448=[0,-4,0,-4,0,-9,560],
	sm449=[0,561,561,561,-1,0,-4,0,-8,561,561,-2,561,561,561,561,561,561,-1,561,561,-1,561,561,561,561,561,-1,561,-1,561,561,561,561,561,561,561,-1,561,-2,561,561,-5,561,-2,561,-2,561,-31,561,561,-3,561,561,561,561,561,561,561,-7,561,561,561,561,561,561],
	sm450=[0,562,562,562,-1,0,-4,0,-8,562,562,-2,562,562,562,562,562,562,-1,562,562,-1,562,562,562,562,562,-1,562,-1,562,562,562,562,562,562,562,-1,562,-2,562,562,-5,562,-2,562,-2,562,-31,562,562,-3,562,562,562,562,562,562,562,-7,562,562,562,562,562,562],
	sm451=[0,563,563,563,-1,0,-4,0,-8,563,563,-2,563,563,563,563,563,563,-1,563,563,-1,563,563,563,563,563,-1,563,-1,563,563,563,563,563,563,563,-1,563,-2,563,563,-5,563,-2,563,-2,563,-31,563,563,-3,563,563,563,563,563,563,563,-7,563,563,563,563,563,563],
	sm452=[0,564,564,564,-1,0,-4,0,-8,564,564,-2,564,564,564,564,564,564,-1,564,564,-1,564,564,564,564,564,-1,564,-1,564,564,564,564,564,564,564,-1,564,-2,564,564,-5,564,-2,564,-2,564,-31,564,564,-3,564,564,564,564,564,564,564,-7,564,564,564,564,564,564],
	sm453=[0,-4,0,-4,0,-9,565],
	sm454=[0,566,566,566,-1,0,-4,0,-8,566,566,-2,566,566,566,566,566,566,-1,566,566,-1,566,566,566,566,566,-1,566,-1,566,566,566,566,566,566,566,-1,566,-2,566,566,-5,566,-2,566,-2,566,-31,566,566,-3,566,566,566,566,566,566,566,-7,566,566,566,566,566,566],
	sm455=[0,-1,2,3,-1,0,-4,0,-8,4,567,-2,5,567,6,7,8,-2,9,10,-2,11,12,13,14,-1,15,-1,16,17,18,19,20,21,567,-1,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
	sm456=[0,-4,0,-4,0,-9,568,-26,568],
	sm457=[0,569,569,569,-1,0,-4,0,-5,569,569,-1,569,569,-2,569,569,569,569,569,569,-1,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,-2,569,569,-5,569,569,569,569,-2,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,569,-7,569,569,569,569,569,569],
	sm458=[0,-1,570,570,-1,0,-4,0,-5,570,-3,570,-2,570,-4,570,-27,570,570,570,-57,570,570,-3,570],
	sm459=[0,-1,571,571,-1,0,-4,0,-5,571,-3,571,-2,571,-4,571,-27,571,571,571,-57,571,571,-3,571],
	sm460=[0,-4,0,-4,0,-9,572],
	sm461=[0,573,573,573,-1,0,-4,0,-8,573,573,-2,573,573,573,573,573,573,-1,573,573,-1,573,573,573,573,573,-1,573,-1,573,573,573,573,573,573,573,-1,573,-2,573,573,-5,573,-2,573,-2,573,-31,573,573,-3,573,573,573,573,573,573,573,-7,573,573,573,573,573,573],
	sm462=[0,574,574,574,-1,0,-4,0,-8,574,574,-2,574,574,574,574,574,574,-1,574,574,-1,574,574,574,574,574,-1,574,-1,574,574,574,574,574,574,574,-1,574,-2,574,574,-5,574,-2,574,-2,574,-31,574,574,-3,574,574,574,574,574,574,574,-7,574,574,574,574,574,574],
	sm463=[0,-4,0,-4,0,-9,575,-3,575,-22,575],
	sm464=[0,-1,576,576,-1,0,-4,0,-5,576,-3,576,-2,576,-4,576,-27,576,576,576,-57,576,576,-3,576],

	    // Symbol Lookup map
	    lu = new Map([[1,1],[2,2],[4,3],[8,4],[16,5],[32,6],[64,7],[128,8],[256,9],[512,10],[3,11],[264,11],[200,13],["import",14],[",",15],["*",16],["as",17],["{",18],["}",19],["from",20],["export",21],[";",22],["default",23],["function",24],["class",25],["let",26],["[",27],["async",28],["if",29],["(",30],[")",31],["else",32],["var",33],["do",34],["while",35],["for",36],["in",37],["await",38],["of",39],["continue",40],["break",41],["return",42],["throw",43],["with",44],["switch",45],["case",46],[":",47],["try",48],["catch",49],["finally",50],["debugger",51],["const",52],["=>",53],["extends",54],["static",55],["get",56],["set",57],["new",58],["]",59],[".",60],["super",61],["target",62],["...",63],["this",64],["=",65],["*=",66],["/=",67],["%=",68],["+=",69],["-=",70],["<<=",71],[">>=",72],[">>>=",73],["&=",74],["^=",75],["|=",76],["**=",77],["?",78],["||",79],["&&",80],["|",81],["^",82],["&",83],["==",84],["!=",85],["===",86],["!==",87],["<",88],[">",89],["<=",90],[">=",91],["instanceof",92],["<<",93],[">>",94],[">>>",95],["+",96],["-",97],["/",98],["%",99],["**",100],["delete",101],["void",102],["typeof",103],["~",104],["!",105],["++",106],["--",107],[null,6],["\"",115],["'",116],["null",117],["true",118],["false",119],["$",120]]),

	    //Reverse Symbol Lookup map
	    rlu = new Map([[1,1],[2,2],[3,4],[4,8],[5,16],[6,32],[7,64],[8,128],[9,256],[10,512],[11,3],[11,264],[13,200],[14,"import"],[15,","],[16,"*"],[17,"as"],[18,"{"],[19,"}"],[20,"from"],[21,"export"],[22,";"],[23,"default"],[24,"function"],[25,"class"],[26,"let"],[27,"["],[28,"async"],[29,"if"],[30,"("],[31,")"],[32,"else"],[33,"var"],[34,"do"],[35,"while"],[36,"for"],[37,"in"],[38,"await"],[39,"of"],[40,"continue"],[41,"break"],[42,"return"],[43,"throw"],[44,"with"],[45,"switch"],[46,"case"],[47,":"],[48,"try"],[49,"catch"],[50,"finally"],[51,"debugger"],[52,"const"],[53,"=>"],[54,"extends"],[55,"static"],[56,"get"],[57,"set"],[58,"new"],[59,"]"],[60,"."],[61,"super"],[62,"target"],[63,"..."],[64,"this"],[65,"="],[66,"*="],[67,"/="],[68,"%="],[69,"+="],[70,"-="],[71,"<<="],[72,">>="],[73,">>>="],[74,"&="],[75,"^="],[76,"|="],[77,"**="],[78,"?"],[79,"||"],[80,"&&"],[81,"|"],[82,"^"],[83,"&"],[84,"=="],[85,"!="],[86,"==="],[87,"!=="],[88,"<"],[89,">"],[90,"<="],[91,">="],[92,"instanceof"],[93,"<<"],[94,">>"],[95,">>>"],[96,"+"],[97,"-"],[98,"/"],[99,"%"],[100,"**"],[101,"delete"],[102,"void"],[103,"typeof"],[104,"~"],[105,"!"],[106,"++"],[107,"--"],[6,null],[115,"\""],[116,"'"],[117,"null"],[118,"true"],[119,"false"],[120,"$"]]),

	    // States 
	    state = [sm0,
	sm1,
	sm2,
	sm3,
	sm4,
	sm5,
	sm6,
	sm7,
	sm8,
	sm8,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm9,
	sm10,
	sm11,
	sm12,
	sm13,
	sm14,
	sm15,
	sm16,
	sm16,
	sm17,
	sm18,
	sm19,
	sm20,
	sm21,
	sm22,
	sm23,
	sm24,
	sm25,
	sm26,
	sm27,
	sm28,
	sm29,
	sm30,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm32,
	sm31,
	sm31,
	sm33,
	sm34,
	sm35,
	sm36,
	sm37,
	sm37,
	sm37,
	sm38,
	sm39,
	sm39,
	sm39,
	sm39,
	sm40,
	sm41,
	sm42,
	sm43,
	sm44,
	sm45,
	sm46,
	sm46,
	sm46,
	sm46,
	sm47,
	sm47,
	sm48,
	sm49,
	sm50,
	sm51,
	sm52,
	sm53,
	sm54,
	sm55,
	sm55,
	sm31,
	sm56,
	sm57,
	sm58,
	sm59,
	sm60,
	sm61,
	sm62,
	sm62,
	sm63,
	sm64,
	sm65,
	sm66,
	sm67,
	sm68,
	sm69,
	sm70,
	sm31,
	sm71,
	sm72,
	sm73,
	sm73,
	sm73,
	sm74,
	sm75,
	sm76,
	sm59,
	sm77,
	sm78,
	sm79,
	sm80,
	sm81,
	sm31,
	sm31,
	sm31,
	sm82,
	sm83,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm84,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm31,
	sm85,
	sm32,
	sm86,
	sm87,
	sm88,
	sm39,
	sm89,
	sm90,
	sm91,
	sm92,
	sm93,
	sm94,
	sm95,
	sm96,
	sm97,
	sm98,
	sm99,
	sm100,
	sm101,
	sm102,
	sm103,
	sm31,
	sm104,
	sm31,
	sm102,
	sm105,
	sm106,
	sm35,
	sm107,
	sm108,
	sm109,
	sm110,
	sm111,
	sm112,
	sm113,
	sm113,
	sm113,
	sm113,
	sm113,
	sm113,
	sm113,
	sm114,
	sm111,
	sm115,
	sm116,
	sm116,
	sm116,
	sm116,
	sm116,
	sm116,
	sm116,
	sm117,
	sm118,
	sm59,
	sm119,
	sm102,
	sm31,
	sm120,
	sm121,
	sm122,
	sm123,
	sm124,
	sm125,
	sm126,
	sm127,
	sm128,
	sm129,
	sm130,
	sm130,
	sm131,
	sm132,
	sm31,
	sm133,
	sm31,
	sm134,
	sm135,
	sm31,
	sm136,
	sm137,
	sm138,
	sm139,
	sm140,
	sm141,
	sm142,
	sm31,
	sm143,
	sm144,
	sm145,
	sm146,
	sm147,
	sm148,
	sm149,
	sm150,
	sm151,
	sm152,
	sm153,
	sm154,
	sm128,
	sm128,
	sm155,
	sm156,
	sm157,
	sm157,
	sm158,
	sm159,
	sm160,
	sm161,
	sm162,
	sm163,
	sm164,
	sm164,
	sm164,
	sm164,
	sm165,
	sm166,
	sm167,
	sm168,
	sm169,
	sm170,
	sm171,
	sm172,
	sm173,
	sm174,
	sm175,
	sm176,
	sm177,
	sm178,
	sm179,
	sm180,
	sm181,
	sm182,
	sm183,
	sm183,
	sm31,
	sm184,
	sm185,
	sm186,
	sm187,
	sm188,
	sm189,
	sm190,
	sm189,
	sm31,
	sm191,
	sm192,
	sm193,
	sm193,
	sm194,
	sm194,
	sm195,
	sm195,
	sm31,
	sm196,
	sm197,
	sm198,
	sm199,
	sm200,
	sm201,
	sm202,
	sm203,
	sm31,
	sm204,
	sm205,
	sm206,
	sm207,
	sm208,
	sm209,
	sm208,
	sm210,
	sm211,
	sm212,
	sm213,
	sm214,
	sm215,
	sm216,
	sm217,
	sm218,
	sm11,
	sm219,
	sm220,
	sm220,
	sm221,
	sm59,
	sm222,
	sm31,
	sm222,
	sm223,
	sm224,
	sm225,
	sm102,
	sm226,
	sm227,
	sm228,
	sm229,
	sm230,
	sm231,
	sm232,
	sm233,
	sm59,
	sm234,
	sm235,
	sm236,
	sm237,
	sm238,
	sm239,
	sm240,
	sm241,
	sm242,
	sm243,
	sm244,
	sm245,
	sm246,
	sm59,
	sm247,
	sm59,
	sm248,
	sm249,
	sm250,
	sm251,
	sm252,
	sm253,
	sm254,
	sm255,
	sm256,
	sm257,
	sm258,
	sm71,
	sm259,
	sm260,
	sm261,
	sm262,
	sm263,
	sm264,
	sm265,
	sm266,
	sm265,
	sm267,
	sm268,
	sm269,
	sm270,
	sm271,
	sm272,
	sm273,
	sm274,
	sm275,
	sm276,
	sm277,
	sm278,
	sm59,
	sm279,
	sm279,
	sm31,
	sm280,
	sm281,
	sm282,
	sm283,
	sm284,
	sm284,
	sm285,
	sm286,
	sm287,
	sm288,
	sm289,
	sm290,
	sm291,
	sm31,
	sm292,
	sm293,
	sm294,
	sm295,
	sm296,
	sm297,
	sm298,
	sm299,
	sm300,
	sm301,
	sm302,
	sm303,
	sm59,
	sm304,
	sm304,
	sm305,
	sm306,
	sm307,
	sm308,
	sm309,
	sm310,
	sm310,
	sm311,
	sm312,
	sm59,
	sm313,
	sm314,
	sm315,
	sm316,
	sm315,
	sm315,
	sm317,
	sm318,
	sm318,
	sm319,
	sm63,
	sm31,
	sm63,
	sm320,
	sm321,
	sm322,
	sm31,
	sm323,
	sm324,
	sm31,
	sm325,
	sm326,
	sm327,
	sm328,
	sm329,
	sm328,
	sm328,
	sm330,
	sm331,
	sm59,
	sm331,
	sm59,
	sm332,
	sm63,
	sm333,
	sm59,
	sm334,
	sm335,
	sm336,
	sm337,
	sm338,
	sm339,
	sm340,
	sm341,
	sm342,
	sm343,
	sm344,
	sm345,
	sm346,
	sm347,
	sm348,
	sm348,
	sm349,
	sm350,
	sm351,
	sm352,
	sm353,
	sm354,
	sm355,
	sm59,
	sm356,
	sm357,
	sm358,
	sm359,
	sm360,
	sm361,
	sm362,
	sm363,
	sm364,
	sm365,
	sm366,
	sm366,
	sm367,
	sm368,
	sm369,
	sm370,
	sm371,
	sm372,
	sm373,
	sm374,
	sm375,
	sm376,
	sm63,
	sm377,
	sm378,
	sm379,
	sm63,
	sm380,
	sm31,
	sm381,
	sm382,
	sm382,
	sm383,
	sm384,
	sm385,
	sm386,
	sm387,
	sm387,
	sm388,
	sm389,
	sm390,
	sm391,
	sm392,
	sm393,
	sm394,
	sm395,
	sm396,
	sm397,
	sm398,
	sm399,
	sm400,
	sm401,
	sm402,
	sm402,
	sm403,
	sm404,
	sm405,
	sm404,
	sm63,
	sm406,
	sm407,
	sm408,
	sm63,
	sm409,
	sm63,
	sm63,
	sm410,
	sm63,
	sm411,
	sm63,
	sm63,
	sm412,
	sm63,
	sm413,
	sm414,
	sm415,
	sm416,
	sm417,
	sm31,
	sm418,
	sm71,
	sm419,
	sm420,
	sm421,
	sm422,
	sm423,
	sm424,
	sm11,
	sm11,
	sm425,
	sm426,
	sm427,
	sm428,
	sm429,
	sm63,
	sm63,
	sm430,
	sm63,
	sm431,
	sm432,
	sm433,
	sm63,
	sm434,
	sm435,
	sm436,
	sm63,
	sm437,
	sm438,
	sm439,
	sm440,
	sm438,
	sm441,
	sm11,
	sm442,
	sm443,
	sm444,
	sm445,
	sm446,
	sm447,
	sm448,
	sm11,
	sm63,
	sm449,
	sm450,
	sm451,
	sm451,
	sm452,
	sm453,
	sm454,
	sm454,
	sm455,
	sm456,
	sm457,
	sm458,
	sm459,
	sm460,
	sm461,
	sm462,
	sm463,
	sm464],

	/************ Functions *************/

	    max = Math.max, min = Math.min,

	    //Error Functions
	    e = (...d)=>fn.defaultError(...d), 
	    eh = [e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e,
	e],

	    //Empty Function
	    nf = ()=>-1, 

	    //Environment Functions
	    
	redv = (ret, fn, plen, ln, t, e, o, l, s) => {        ln = max(o.length - plen, 0);        o[ln] = fn(o.slice(-plen), e, l, s, o, plen);        o.length = ln + 1;        return ret;    },
	rednv = (ret, Fn, plen, ln, t, e, o, l, s) => {        ln = max(o.length - plen, 0);        o[ln] = new Fn(o.slice(-plen), e, l, s, o, plen);        o.length = ln + 1;        return ret;    },
	redn = (ret, plen, t, e, o, l, s) => {        if(plen > 0){            let ln = max(o.length - plen, 0);            o[ln] = o[o.length -1];            o.length = ln + 1;        }        return ret;    },
	shftf = (ret, fn, t, e, o, l, s) => (fn(o, e, l, s), ret),
	R0_javascript=function (sym,env,lex,state,output,len) {return sym[0]},
	R0_named_imports1901_group_list=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[2]),sym[0])},
	R1_named_imports1901_group_list=function (sym,env,lex,state,output,len) {return [sym[0]]},
	R0_statement_list4101_group_list=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[1]),sym[0])},
	C0_empty_statement=function (sym,env,lex,state,output,len) {this.type = "empty";},
	R0_iteration_statement7412_group=function (sym,env,lex,state,output,len) {return sym[1]},
	R1_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[4],sym[6],sym[8])},
	I2_iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = false;},
	I3_iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = true;},
	R4_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[3],sym[5],sym[7])},
	R5_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_in_statement(sym[2],sym[4],sym[6])},
	R6_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_statement(sym[1],sym[3],sym[5],sym[7])},
	R7_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[4],sym[5],sym[7])},
	R8_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[4],sym[6],sym[7])},
	R9_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],null,sym[4],sym[6])},
	R10_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[3],null,sym[6])},
	R11_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_statement(null,sym[2],sym[4],sym[6])},
	R12_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[3],sym[4],sym[6])},
	R13_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[3],sym[5],sym[6])},
	R14_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[4],sym[5],sym[6])},
	R15_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],null,null,sym[5])},
	R16_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_statement(sym[2],sym[3],sym[4],sym[5])},
	R0_continue_statement=function (sym,env,lex,state,output,len) {return new env.functions.continue_statement(sym[1])},
	R0_break_statement=function (sym,env,lex,state,output,len) {return new env.functions.break_statement(sym[1])},
	R0_case_block=function (sym,env,lex,state,output,len) {return []},
	R1_case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2].concat(sym[3]))},
	R3_case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2])},
	R0_case_clauses=function (sym,env,lex,state,output,len) {return sym[0].concat(sym[1])},
	R0_case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_statement(sym[1],sym[3])},
	R1_case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_statement(sym[1])},
	R0_default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_statement(sym[2])},
	R1_default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_statement()},
	R0_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_statement(sym[1],sym[2])},
	R1_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_statement(sym[1],null,sym[2])},
	R3_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_statement(sym[1],sym[2],sym[3])},
	R0_variable_declaration_list=function (sym,env,lex,state,output,len) {return ($sym1.push(sym[2]),sym[0])},
	R0_let_or_const=function (sym,env,lex,state,output,len) {return "let"},
	R1_let_or_const=function (sym,env,lex,state,output,len) {return "const"},
	R0_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(sym[1],sym[3],sym[6])},
	R1_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(null,sym[2],sym[5])},
	R3_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(sym[1],null,sym[5])},
	R4_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(sym[1],sym[3],null)},
	R5_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(null,null,sym[4])},
	R6_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(null,sym[2],null)},
	R7_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(sym[1],null,null)},
	R8_function_declaration=function (sym,env,lex,state,output,len) {return new fn.function_declaration(null,null,null)},
	R0_arrow_function=function (sym,env,lex,state,output,len) {return new fn.arrow(null,sym[0],sym[2])},
	R0_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail(sym)},
	R1_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([null,...sym[0]])},
	R3_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([sym[0],null,null])},
	R4_class_tail=function (sym,env,lex,state,output,len) {return null},
	R0_class_element_list=function (sym,env,lex,state,output,len) {return sym[0].push(sym[1])},
	R0_class_element=function (sym,env,lex,state,output,len) {return (sym[1].static = true,sym[1])},
	R0_new_expression=function (sym,env,lex,state,output,len) {return new fn.new_expression(sym[1],null)},
	R1_member_expression=function (sym,env,lex,state,output,len) {return new fn.new_expression(sym[1],sym[2])},
	R0_arguments=function (sym,env,lex,state,output,len) {return new fn.argument_list(sym[1])},
	R1_arguments=function (sym,env,lex,state,output,len) {return new fn.argument_list(null)},
	R1_element_list=function (sym,env,lex,state,output,len) {return [sym[1]]},
	R1_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return new env.functions.spread_expr(env,sym.slice(1,3))},
	R2_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return Array.isArray(sym[0]) ? (sym[1].push(new env.functions.spread_expr(env,sym.slice(3,5))),sym[1]) : [sym[0],new env.functions.spread_expr(env,sym.slice(3,5))]},
	R0_string_literal35307_group_list=function (sym,env,lex,state,output,len) {return sym[0] + sym[1]},
	R1_string_literal35307_group_list=function (sym,env,lex,state,output,len) {return sym[0] + ""},

	    //Sparse Map Lookup
	    lsm = (index, map) => {    if (map[0] == 0xFFFFFFFF) return map[index+1];    for (let i = 1, ind = 0, l = map.length, n = 0; i < l && ind <= index; i++) {        if (ind !== index) {            if ((n = map[i]) > -1) ind++;            else ind += -n;        } else return map[i];    }    return -1;},

	    //State Action Functions
	    state_funct = [(...v)=>((redn(22531,0,...v))),
	()=>(334),
	()=>(290),
	()=>(102),
	()=>(378),
	()=>(458),
	()=>(450),
	()=>(466),
	()=>(382),
	()=>(338),
	()=>(374),
	()=>(394),
	()=>(398),
	()=>(402),
	()=>(358),
	()=>(410),
	()=>(414),
	()=>(418),
	()=>(426),
	()=>(422),
	()=>(406),
	()=>(430),
	()=>(434),
	()=>(470),
	()=>(238),
	()=>(342),
	()=>(254),
	()=>(198),
	()=>(202),
	()=>(186),
	()=>(190),
	()=>(194),
	()=>(206),
	()=>(210),
	()=>(218),
	()=>(222),
	()=>(326),
	()=>(330),
	()=>(322),
	()=>(314),
	()=>(318),
	()=>(294),
	(...v)=>(redv(5,R0_javascript,1,0,...v)),
	(...v)=>(redv(1031,R0_javascript,1,0,...v)),
	(...v)=>(redv(22535,R0_javascript,1,0,...v)),
	(...v)=>(redn(23559,1,...v)),
	(...v)=>(rednv(26631,fn.statements,1,0,...v)),
	(...v)=>(redv(25607,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redn(24583,1,...v)),
	(...v)=>(redn(27655,1,...v)),
	(...v)=>(redn(28679,1,...v)),
	(...v)=>(redn(32775,1,...v)),
	()=>(482),
	()=>(486),
	(...v)=>(rednv(97287,fn.expression_list,1,0,...v)),
	(...v)=>(redv(96263,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redn(95239,1,...v)),
	(...v)=>(redn(123911,1,...v)),
	(...v)=>(redn(139271,1,...v)),
	()=>(490),
	()=>(506),
	()=>(510),
	()=>(514),
	()=>(518),
	()=>(522),
	()=>(526),
	()=>(530),
	()=>(534),
	()=>(538),
	()=>(542),
	()=>(546),
	()=>(550),
	()=>(498),
	()=>(502),
	(...v)=>(redn(125959,1,...v)),
	()=>(554),
	()=>(558),
	(...v)=>(redn(126983,1,...v)),
	()=>(562),
	(...v)=>(redn(128007,1,...v)),
	()=>(566),
	(...v)=>(redn(129031,1,...v)),
	()=>(570),
	(...v)=>(redn(130055,1,...v)),
	()=>(574),
	(...v)=>(redn(131079,1,...v)),
	()=>(578),
	()=>(582),
	()=>(586),
	()=>(590),
	(...v)=>(redn(132103,1,...v)),
	()=>(614),
	()=>(594),
	()=>(598),
	()=>(602),
	()=>(606),
	()=>(610),
	(...v)=>(redn(133127,1,...v)),
	()=>(618),
	()=>(622),
	()=>(626),
	(...v)=>(redn(134151,1,...v)),
	()=>(630),
	()=>(634),
	(...v)=>(redn(135175,1,...v)),
	()=>(638),
	()=>(642),
	()=>(646),
	(...v)=>(redn(136199,1,...v)),
	(...v)=>(redn(137223,1,...v)),
	(...v)=>(redn(138247,1,...v)),
	()=>(650),
	()=>(686),
	()=>(682),
	(...v)=>(redn(98311,1,...v)),
	()=>(738),
	()=>(742),
	()=>(730),
	(...v)=>(redn(99335,1,...v)),
	()=>(746),
	()=>(750),
	()=>(766),
	()=>(770),
	(...v)=>(redn(100359,1,...v)),
	(...v)=>(rednv(110599,fn.this_literal,1,0,...v)),
	(...v)=>(redn(110599,1,...v)),
	(...v)=>(redn(79879,1,...v)),
	(...v)=>(redn(163847,1,...v)),
	(...v)=>(redn(162823,1,...v)),
	(...v)=>(redn(164871,1,...v)),
	(...v)=>(redn(165895,1,...v)),
	(...v)=>(rednv(167943,fn.identifier,1,0,...v)),
	(...v)=>(redn(166919,1,...v)),
	(...v)=>(redv(166919,R0_javascript,1,0,...v)),
	(...v)=>(redn(153607,1,...v)),
	(...v)=>(rednv(161799,fn.bool_literal,1,0,...v)),
	(...v)=>(rednv(160775,fn.null_literal,1,0,...v)),
	()=>(802),
	()=>(794),
	()=>(790),
	()=>(810),
	()=>(814),
	()=>(806),
	()=>(798),
	()=>(782),
	()=>(842),
	()=>(834),
	()=>(830),
	()=>(850),
	()=>(854),
	()=>(846),
	()=>(838),
	()=>(822),
	(...v)=>(rednv(159751,fn.numeric_literal,1,0,...v)),
	()=>(858),
	()=>(866),
	()=>(878),
	()=>(874),
	(...v)=>(redn(102407,1,...v)),
	(...v)=>(redn(104455,1,...v)),
	()=>(890),
	()=>(898),
	()=>(930),
	()=>(934),
	(...v)=>(rednv(34823,C0_empty_statement,1,0,...v)),
	()=>(938),
	(...v)=>(redn(31751,1,...v)),
	()=>(946),
	(...v)=>(shftf(950,I2_iteration_statement,...v)),
	()=>(954),
	()=>(958),
	()=>(962),
	()=>(974),
	()=>(982),
	()=>(990),
	()=>(1002),
	(...v)=>(redn(29703,1,...v)),
	()=>(1018),
	()=>(1022),
	(...v)=>(redn(30727,1,...v)),
	()=>(1030),
	(...v)=>(redv(66567,R0_let_or_const,1,0,...v)),
	(...v)=>(redv(66567,R1_let_or_const,1,0,...v)),
	(...v)=>(redv(25611,R0_statement_list4101_group_list,2,0,...v)),
	()=>(1050),
	(...v)=>(rednv(35851,fn.expression_statement,2,0,...v)),
	(...v)=>(rednv(139275,fn.post_increment_expression,2,0,...v)),
	(...v)=>(rednv(139275,fn.post_decrement_expression,2,0,...v)),
	(...v)=>(redn(124935,1,...v)),
	(...v)=>(rednv(138251,fn.delete_expression,2,0,...v)),
	(...v)=>(rednv(110599,fn.array_literal,1,0,...v)),
	(...v)=>(rednv(110599,fn.object_literal,1,0,...v)),
	()=>(1190),
	()=>(1174),
	()=>(1186),
	()=>(1198),
	()=>(1202),
	()=>(1258),
	()=>(1234),
	()=>(1238),
	()=>(1222),
	(...v)=>(redn(69639,1,...v)),
	(...v)=>(redn(86023,1,...v)),
	(...v)=>(rednv(138251,fn.void_expression,2,0,...v)),
	(...v)=>(rednv(138251,fn.typeof_expression,2,0,...v)),
	(...v)=>(rednv(138251,fn.plus_expression,2,0,...v)),
	(...v)=>(rednv(138251,fn.negate_expression,2,0,...v)),
	(...v)=>(rednv(138251,fn.unary_or_expression,2,0,...v)),
	(...v)=>(rednv(138251,fn.unary_not_expression,2,0,...v)),
	(...v)=>(rednv(139275,fn.pre_increment_expression,2,0,...v)),
	(...v)=>(rednv(139275,fn.pre_decrement_expression,2,0,...v)),
	(...v)=>(rednv(104459,fn.call_expression,2,0,...v)),
	()=>(1274),
	()=>(1278),
	()=>(1294),
	(...v)=>(rednv(85003,fn.call_expr,2,0,...v)),
	(...v)=>(redv(99339,R0_new_expression,2,0,...v)),
	()=>(1310),
	(...v)=>(redv(166923,R0_string_literal35307_group_list,2,0,...v)),
	()=>(1314),
	(...v)=>(rednv(158731,fn.string_literal,2,0,...v)),
	(...v)=>(redv(155655,R1_string_literal35307_group_list,1,0,...v)),
	(...v)=>(redn(154631,1,...v)),
	()=>(1322),
	(...v)=>(redv(157703,R1_string_literal35307_group_list,1,0,...v)),
	(...v)=>(redn(156679,1,...v)),
	(...v)=>(redv(141323,R4_class_tail,2,0,...v)),
	()=>(1334),
	()=>(1330),
	(...v)=>(redn(105483,2,...v)),
	(...v)=>(rednv(140299,fn.await_expression,2,0,...v)),
	()=>(1362),
	(...v)=>(rednv(54283,fn.label_statement,2,0,...v)),
	()=>(1382),
	()=>(1378),
	(...v)=>(redv(63495,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(rednv(64519,fn.binding,1,0,...v)),
	()=>(1390),
	(...v)=>(redn(142343,1,...v)),
	()=>(1398),
	()=>(1410),
	()=>(1430),
	()=>(1446),
	()=>(1470),
	()=>(1490),
	()=>(1502),
	()=>(1518),
	(...v)=>(rednv(44043,fn.continue_statement,2,0,...v)),
	()=>(1526),
	(...v)=>(rednv(45067,fn.break_statement,2,0,...v)),
	()=>(1530),
	(...v)=>(rednv(46091,fn.return_statement,2,0,...v)),
	()=>(1534),
	()=>(1542),
	()=>(1554),
	()=>(1558),
	(...v)=>(rednv(61451,fn.debugger_statement,2,0,...v)),
	(...v)=>(rednv(87051,fn.class_statement,2,0,...v)),
	()=>(1566),
	()=>(1574),
	()=>(1594),
	()=>(1590),
	()=>(1610),
	()=>(1618),
	()=>(1646),
	()=>(1642),
	(...v)=>(redv(67591,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(rednv(33807,fn.block_statement,3,0,...v)),
	(...v)=>(redv(96271,R0_named_imports1901_group_list,3,0,...v)),
	(...v)=>(rednv(123919,fn.assignment_expression,3,0,...v)),
	()=>(1658),
	(...v)=>(rednv(126991,fn.or_expression,3,0,...v)),
	(...v)=>(rednv(128015,fn.and_expression,3,0,...v)),
	(...v)=>(rednv(129039,fn.bit_or_expression,3,0,...v)),
	(...v)=>(rednv(130063,fn.bit_xor_expression,3,0,...v)),
	(...v)=>(rednv(131087,fn.bit_and_expression,3,0,...v)),
	(...v)=>(rednv(132111,fn.equality_expression,3,0,...v)),
	(...v)=>(rednv(133135,fn.less_than_expression,3,0,...v)),
	(...v)=>(rednv(133135,fn.greater_than_expression,3,0,...v)),
	(...v)=>(rednv(133135,fn.less_equal_expression,3,0,...v)),
	(...v)=>(rednv(133135,fn.greater_equal_expression,3,0,...v)),
	(...v)=>(rednv(133135,fn.instanceof_expression,3,0,...v)),
	(...v)=>(rednv(133135,fn.in_expression,3,0,...v)),
	(...v)=>(rednv(134159,fn.left_shift_expression,3,0,...v)),
	(...v)=>(rednv(134159,fn.right_shift_expression,3,0,...v)),
	(...v)=>(rednv(134159,fn.right_shift_fill_expression,3,0,...v)),
	(...v)=>(rednv(135183,fn.add_expression,3,0,...v)),
	(...v)=>(rednv(135183,fn.subtract_expression,3,0,...v)),
	(...v)=>(rednv(136207,fn.multiply_expression,3,0,...v)),
	(...v)=>(rednv(136207,fn.divide_expression,3,0,...v)),
	(...v)=>(rednv(136207,fn.modulo_expression,3,0,...v)),
	(...v)=>(rednv(137231,fn.exponent_expression,3,0,...v)),
	()=>(1670),
	()=>(1666),
	()=>(1686),
	()=>(1674),
	(...v)=>(redv(119819,R4_class_tail,2,0,...v)),
	(...v)=>(redv(120839,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redn(121863,1,...v)),
	()=>(1694),
	()=>(1698),
	()=>(1702),
	(...v)=>(redv(112651,R4_class_tail,2,0,...v)),
	(...v)=>(redv(111623,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redn(113671,1,...v)),
	()=>(1718),
	()=>(1714),
	(...v)=>(redn(115719,1,...v)),
	(...v)=>(redn(114695,1,...v)),
	(...v)=>(rednv(104463,fn.member_expression,3,0,...v)),
	()=>(1734),
	()=>(1738),
	()=>(1742),
	()=>(1746),
	(...v)=>(redv(106507,R1_arguments,2,0,...v)),
	()=>(1750),
	(...v)=>(redn(109575,1,...v)),
	(...v)=>(redv(108551,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redn(107527,1,...v)),
	()=>(1758),
	(...v)=>(rednv(100367,fn.member_expression,3,0,...v)),
	(...v)=>(redv(100367,R1_member_expression,3,0,...v)),
	(...v)=>(rednv(103439,fn.new_target_expr,3,0,...v)),
	(...v)=>(rednv(158735,fn.string_literal,3,0,...v)),
	(...v)=>(redv(155659,R0_string_literal35307_group_list,2,0,...v)),
	(...v)=>(redv(157707,R0_string_literal35307_group_list,2,0,...v)),
	(...v)=>(redv(141327,R0_iteration_statement7412_group,3,0,...v)),
	()=>(1762),
	()=>(1766),
	()=>(1770),
	()=>(1774),
	(...v)=>(rednv(101391,fn.supper_expression,3,0,...v)),
	()=>(1778),
	(...v)=>(redv(78863,R0_arrow_function,3,0,...v)),
	(...v)=>(redn(80903,1,...v)),
	(...v)=>(redv(55307,R0_iteration_statement7412_group,2,0,...v)),
	(...v)=>(redn(56327,1,...v)),
	(...v)=>(rednv(62479,fn.variable_statement,3,0,...v)),
	(...v)=>(rednv(64523,fn.binding,2,0,...v)),
	(...v)=>(redn(143371,2,...v)),
	()=>(1798),
	()=>(1806),
	()=>(1802),
	(...v)=>(redn(146439,1,...v)),
	(...v)=>(redn(149511,1,...v)),
	()=>(1814),
	(...v)=>(redn(151559,1,...v)),
	(...v)=>(redn(144395,2,...v)),
	()=>(1826),
	()=>(1834),
	()=>(1842),
	()=>(1838),
	(...v)=>(redn(147463,1,...v)),
	(...v)=>(redn(148487,1,...v)),
	(...v)=>(redn(150535,1,...v)),
	()=>(1858),
	()=>(1862),
	()=>(1866),
	()=>(1870),
	()=>(1878),
	()=>(1882),
	()=>(1890),
	()=>(1894),
	(...v)=>(redn(37895,1,...v)),
	(...v)=>(redn(38919,1,...v)),
	(...v)=>(redn(39943,1,...v)),
	()=>(1934),
	()=>(1946),
	(...v)=>(redv(44047,R0_continue_statement,3,0,...v)),
	(...v)=>(redv(45071,R0_break_statement,3,0,...v)),
	(...v)=>(rednv(46095,fn.return_statement,3,0,...v)),
	()=>(1950),
	(...v)=>(rednv(47119,fn.throw_statement,3,0,...v)),
	(...v)=>(redv(57359,R0_try_statement,3,0,...v)),
	(...v)=>(redv(57359,R1_try_statement,3,0,...v)),
	()=>(1958),
	(...v)=>(rednv(87055,fn.class_statement,3,0,...v)),
	()=>(1970),
	()=>(1974),
	(...v)=>(redv(88075,R4_class_tail,2,0,...v)),
	(...v)=>(redn(90119,1,...v)),
	(...v)=>(redv(91143,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redn(92167,1,...v)),
	(...v)=>(redv(89099,R0_iteration_statement7412_group,2,0,...v)),
	()=>(1990),
	()=>(1994),
	()=>(1998),
	(...v)=>(redn(72711,1,...v)),
	()=>(2002),
	(...v)=>(redn(74759,1,...v)),
	(...v)=>(redv(73735,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redn(75783,1,...v)),
	(...v)=>(rednv(65551,fn.lexical,3,0,...v)),
	(...v)=>(rednv(68619,fn.binding,2,0,...v)),
	()=>(2014),
	(...v)=>(redv(119823,R0_iteration_statement7412_group,3,0,...v)),
	(...v)=>(redv(119823,R4_class_tail,3,0,...v)),
	(...v)=>(redv(120843,R1_element_list,2,0,...v)),
	(...v)=>(redn(121867,2,...v)),
	(...v)=>(rednv(122891,fn.spread_element,2,0,...v)),
	()=>(2030),
	(...v)=>(redv(112655,R0_iteration_statement7412_group,3,0,...v)),
	(...v)=>(redv(112655,R4_class_tail,3,0,...v)),
	(...v)=>(rednv(117771,fn.binding,2,0,...v)),
	(...v)=>(rednv(113675,fn.spread_expr,2,0,...v)),
	()=>(2050),
	()=>(2054),
	()=>(2058),
	(...v)=>(rednv(104467,fn.call_expression,4,0,...v)),
	()=>(2062),
	(...v)=>(redv(106511,R0_arguments,3,0,...v)),
	(...v)=>(redv(106511,R1_arguments,3,0,...v)),
	(...v)=>(rednv(107531,fn.spread_operator,2,0,...v)),
	(...v)=>(rednv(100371,fn.member_expression,4,0,...v)),
	(...v)=>(redv(141331,R0_iteration_statement7412_group,4,0,...v)),
	(...v)=>(redv(141331,R1_cover_parenthesized_expression_and_arrow_parameter_list,4,0,...v)),
	(...v)=>(rednv(101395,fn.supper_expression,4,0,...v)),
	()=>(2078),
	(...v)=>(redn(77831,1,...v)),
	(...v)=>(redv(63503,R0_variable_declaration_list,3,0,...v)),
	(...v)=>(redv(118795,R0_iteration_statement7412_group,2,0,...v)),
	(...v)=>(redn(143375,3,...v)),
	()=>(2086),
	(...v)=>(redn(145419,2,...v)),
	(...v)=>(redn(151563,2,...v)),
	()=>(2098),
	(...v)=>(redn(144399,3,...v)),
	(...v)=>(redn(148491,2,...v)),
	()=>(2102),
	(...v)=>(redn(152587,2,...v)),
	(...v)=>(redn(150539,2,...v)),
	()=>(2134),
	()=>(2138),
	()=>(2146),
	()=>(2154),
	(...v)=>(shftf(2162,I3_iteration_statement,...v)),
	(...v)=>(redv(37899,R0_iteration_statement7412_group,2,0,...v)),
	(...v)=>(redv(38923,R0_iteration_statement7412_group,2,0,...v)),
	(...v)=>(redv(39947,R0_iteration_statement7412_group,2,0,...v)),
	(...v)=>(redn(43015,1,...v)),
	(...v)=>(redn(41995,2,...v)),
	()=>(2170),
	()=>(2190),
	(...v)=>(redv(57363,R3_try_statement,4,0,...v)),
	(...v)=>(rednv(59403,fn.finally_statement,2,0,...v)),
	()=>(2210),
	(...v)=>(redv(88079,R3_class_tail,3,0,...v)),
	(...v)=>(redv(88079,R1_class_tail,3,0,...v)),
	(...v)=>(redv(91147,R0_class_element_list,2,0,...v)),
	(...v)=>(redv(92171,R0_class_element,2,0,...v)),
	()=>(2214),
	()=>(2218),
	()=>(2222),
	()=>(2230),
	(...v)=>(redv(72715,R1_named_imports1901_group_list,2,0,...v)),
	(...v)=>(redv(67599,R0_variable_declaration_list,3,0,...v)),
	(...v)=>(rednv(125975,fn.condition_expression,5,0,...v)),
	(...v)=>(redv(119827,R0_iteration_statement7412_group,4,0,...v)),
	(...v)=>(redv(120847,R0_named_imports1901_group_list,3,0,...v)),
	(...v)=>(redv(112659,R0_iteration_statement7412_group,4,0,...v)),
	(...v)=>(redv(111631,R0_named_imports1901_group_list,3,0,...v)),
	(...v)=>(rednv(113679,fn.property_binding,3,0,...v)),
	()=>(2250),
	(...v)=>(redn(71687,1,...v)),
	()=>(2254),
	(...v)=>(redv(116751,R0_iteration_statement7412_group,3,0,...v)),
	(...v)=>(redv(106515,R0_arguments,4,0,...v)),
	(...v)=>(redv(108559,R0_named_imports1901_group_list,3,0,...v)),
	()=>(2266),
	()=>(2270),
	(...v)=>(redv(80911,R0_iteration_statement7412_group,3,0,...v)),
	()=>(2274),
	(...v)=>(redn(143379,4,...v)),
	(...v)=>(redn(146447,3,...v)),
	(...v)=>(redn(149519,3,...v)),
	(...v)=>(redn(144403,4,...v)),
	()=>(2278),
	()=>(2286),
	(...v)=>(redn(147471,3,...v)),
	(...v)=>(rednv(36887,fn.if_statement,5,0,...v)),
	()=>(2290),
	()=>(2294),
	(...v)=>(rednv(40983,fn.while_statement,5,0,...v)),
	()=>(2298),
	(...v)=>(shftf(2306,I3_iteration_statement,...v)),
	()=>(2314),
	()=>(2318),
	()=>(2326),
	(...v)=>(shftf(2334,I3_iteration_statement,...v)),
	(...v)=>(shftf(2338,I3_iteration_statement,...v)),
	()=>(2346),
	(...v)=>(rednv(49175,fn.switch_statement,5,0,...v)),
	()=>(2354),
	()=>(2374),
	()=>(2370),
	(...v)=>(rednv(48151,fn.with_statement,5,0,...v)),
	()=>(2378),
	(...v)=>(redn(60423,1,...v)),
	(...v)=>(redv(88083,R0_class_tail,4,0,...v)),
	()=>(2382),
	()=>(2390),
	()=>(2398),
	()=>(2402),
	(...v)=>(redv(70679,R8_function_declaration,5,0,...v)),
	(...v)=>(redn(76807,1,...v)),
	(...v)=>(redv(72719,R0_variable_declaration_list,3,0,...v)),
	(...v)=>(redv(73743,R0_variable_declaration_list,3,0,...v)),
	(...v)=>(redv(120851,R0_named_imports1901_group_list,4,0,...v)),
	()=>(2406),
	()=>(2410),
	()=>(2414),
	(...v)=>(redn(94215,1,...v)),
	(...v)=>(redv(141339,R2_cover_parenthesized_expression_and_arrow_parameter_list,6,0,...v)),
	(...v)=>(redn(143383,5,...v)),
	(...v)=>(redn(144407,5,...v)),
	()=>(2418),
	()=>(2426),
	(...v)=>(shftf(2434,I3_iteration_statement,...v)),
	(...v)=>(shftf(2438,I3_iteration_statement,...v)),
	()=>(2446),
	(...v)=>(redv(40987,R15_iteration_statement,6,0,...v)),
	(...v)=>(shftf(2462,I3_iteration_statement,...v)),
	(...v)=>(redv(40987,R16_iteration_statement,6,0,...v)),
	()=>(2478),
	(...v)=>(redv(50187,R0_case_block,2,0,...v)),
	()=>(2486),
	()=>(2498),
	(...v)=>(redv(51207,R1_named_imports1901_group_list,1,0,...v)),
	(...v)=>(redv(53255,R1_default_clause,1,0,...v)),
	()=>(2506),
	()=>(2518),
	()=>(2522),
	(...v)=>(redv(70683,R7_function_declaration,6,0,...v)),
	()=>(2526),
	(...v)=>(redv(70683,R6_function_declaration,6,0,...v)),
	(...v)=>(redv(70683,R5_function_declaration,6,0,...v)),
	()=>(2538),
	(...v)=>(redn(144411,6,...v)),
	(...v)=>(rednv(36895,fn.if_statement,7,0,...v)),
	(...v)=>(rednv(40991,fn.do_while_statement,7,0,...v)),
	(...v)=>(shftf(2542,I3_iteration_statement,...v)),
	(...v)=>(redv(40991,R14_iteration_statement,7,0,...v)),
	(...v)=>(redv(40991,R10_iteration_statement,7,0,...v)),
	(...v)=>(redv(40991,R9_iteration_statement,7,0,...v)),
	(...v)=>(redv(40991,R5_iteration_statement,7,0,...v)),
	(...v)=>(redv(40991,R13_iteration_statement,7,0,...v)),
	(...v)=>(redv(40991,R12_iteration_statement,7,0,...v)),
	(...v)=>(redv(40991,R11_iteration_statement,7,0,...v)),
	()=>(2570),
	(...v)=>(redv(50191,R0_iteration_statement7412_group,3,0,...v)),
	(...v)=>(redv(51211,R0_case_clauses,2,0,...v)),
	()=>(2574),
	()=>(2578),
	(...v)=>(rednv(58391,fn.catch_statement,5,0,...v)),
	()=>(2586),
	(...v)=>(redv(70687,R4_function_declaration,7,0,...v)),
	(...v)=>(redv(70687,R3_function_declaration,7,0,...v)),
	(...v)=>(redv(70687,R1_function_declaration,7,0,...v)),
	()=>(2590),
	()=>(2594),
	(...v)=>(redv(40995,R8_iteration_statement,8,0,...v)),
	(...v)=>(redv(40995,R7_iteration_statement,8,0,...v)),
	(...v)=>(redv(40995,R4_iteration_statement,8,0,...v)),
	(...v)=>(redv(40995,R6_iteration_statement,8,0,...v)),
	()=>(2606),
	(...v)=>(redv(50195,R3_case_block,4,0,...v)),
	(...v)=>(redv(52239,R1_case_clause,3,0,...v)),
	(...v)=>(redv(53263,R0_default_clause,3,0,...v)),
	(...v)=>(redv(70691,R0_function_declaration,8,0,...v)),
	(...v)=>(rednv(93215,fn.class_method,7,0,...v)),
	(...v)=>(rednv(93215,fn.class_get_method,7,0,...v)),
	()=>(2614),
	(...v)=>(redv(40999,R1_iteration_statement,9,0,...v)),
	(...v)=>(redv(50199,R1_case_block,5,0,...v)),
	(...v)=>(redv(52243,R0_case_clause,4,0,...v)),
	(...v)=>(rednv(93219,fn.class_set_method,8,0,...v))],

	    //Goto Lookup Functions
	    goto = [v=>lsm(v,gt0),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt1),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt2),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt3),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt4),
	v=>lsm(v,gt5),
	v=>lsm(v,gt6),
	v=>lsm(v,gt7),
	v=>lsm(v,gt8),
	v=>lsm(v,gt9),
	v=>lsm(v,gt10),
	nf,
	v=>lsm(v,gt11),
	v=>lsm(v,gt12),
	nf,
	v=>lsm(v,gt13),
	v=>lsm(v,gt14),
	v=>lsm(v,gt15),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt16),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt17),
	v=>lsm(v,gt18),
	nf,
	v=>lsm(v,gt19),
	v=>lsm(v,gt20),
	nf,
	nf,
	nf,
	v=>lsm(v,gt21),
	nf,
	nf,
	v=>lsm(v,gt22),
	v=>lsm(v,gt23),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt24),
	nf,
	nf,
	nf,
	v=>lsm(v,gt25),
	v=>lsm(v,gt26),
	v=>lsm(v,gt27),
	nf,
	v=>lsm(v,gt28),
	v=>lsm(v,gt29),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt30),
	nf,
	v=>lsm(v,gt31),
	v=>lsm(v,gt32),
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt33),
	v=>lsm(v,gt34),
	v=>lsm(v,gt35),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt36),
	v=>lsm(v,gt37),
	v=>lsm(v,gt38),
	v=>lsm(v,gt39),
	v=>lsm(v,gt40),
	v=>lsm(v,gt41),
	v=>lsm(v,gt42),
	v=>lsm(v,gt43),
	v=>lsm(v,gt44),
	v=>lsm(v,gt45),
	v=>lsm(v,gt46),
	v=>lsm(v,gt47),
	v=>lsm(v,gt48),
	v=>lsm(v,gt49),
	v=>lsm(v,gt50),
	v=>lsm(v,gt51),
	v=>lsm(v,gt52),
	v=>lsm(v,gt53),
	v=>lsm(v,gt54),
	v=>lsm(v,gt55),
	v=>lsm(v,gt56),
	v=>lsm(v,gt57),
	v=>lsm(v,gt58),
	v=>lsm(v,gt59),
	v=>lsm(v,gt60),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt61),
	v=>lsm(v,gt62),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt63),
	nf,
	v=>lsm(v,gt64),
	v=>lsm(v,gt65),
	v=>lsm(v,gt66),
	v=>lsm(v,gt67),
	nf,
	nf,
	v=>lsm(v,gt68),
	nf,
	nf,
	nf,
	v=>lsm(v,gt69),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt70),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt71),
	nf,
	v=>lsm(v,gt72),
	v=>lsm(v,gt73),
	nf,
	nf,
	v=>lsm(v,gt74),
	nf,
	v=>lsm(v,gt75),
	nf,
	nf,
	v=>lsm(v,gt76),
	v=>lsm(v,gt77),
	nf,
	nf,
	nf,
	v=>lsm(v,gt78),
	v=>lsm(v,gt79),
	v=>lsm(v,gt80),
	nf,
	v=>lsm(v,gt81),
	v=>lsm(v,gt82),
	nf,
	v=>lsm(v,gt83),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt84),
	nf,
	v=>lsm(v,gt85),
	nf,
	v=>lsm(v,gt86),
	nf,
	nf,
	v=>lsm(v,gt87),
	v=>lsm(v,gt88),
	nf,
	v=>lsm(v,gt89),
	nf,
	nf,
	v=>lsm(v,gt90),
	v=>lsm(v,gt91),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt92),
	v=>lsm(v,gt93),
	nf,
	nf,
	nf,
	v=>lsm(v,gt94),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt95),
	nf,
	v=>lsm(v,gt96),
	nf,
	nf,
	v=>lsm(v,gt97),
	v=>lsm(v,gt98),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt99),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt100),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt101),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt102),
	nf,
	v=>lsm(v,gt103),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt104),
	nf,
	nf,
	nf,
	v=>lsm(v,gt105),
	nf,
	v=>lsm(v,gt106),
	nf,
	nf,
	v=>lsm(v,gt107),
	nf,
	nf,
	nf,
	v=>lsm(v,gt108),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt109),
	nf,
	v=>lsm(v,gt110),
	nf,
	nf,
	v=>lsm(v,gt111),
	v=>lsm(v,gt3),
	v=>lsm(v,gt112),
	nf,
	v=>lsm(v,gt113),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt114),
	nf,
	nf,
	v=>lsm(v,gt115),
	nf,
	v=>lsm(v,gt116),
	nf,
	nf,
	v=>lsm(v,gt117),
	nf,
	nf,
	v=>lsm(v,gt118),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt119),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt120),
	nf,
	nf,
	v=>lsm(v,gt121),
	nf,
	nf,
	v=>lsm(v,gt122),
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt123),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt124),
	v=>lsm(v,gt125),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt126),
	nf,
	nf,
	nf,
	v=>lsm(v,gt127),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt128),
	nf,
	v=>lsm(v,gt129),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt130),
	nf,
	nf,
	nf,
	v=>lsm(v,gt131),
	v=>lsm(v,gt132),
	v=>lsm(v,gt133),
	v=>lsm(v,gt134),
	nf,
	v=>lsm(v,gt135),
	v=>lsm(v,gt136),
	nf,
	v=>lsm(v,gt137),
	v=>lsm(v,gt138),
	nf,
	nf,
	v=>lsm(v,gt76),
	v=>lsm(v,gt77),
	nf,
	v=>lsm(v,gt90),
	v=>lsm(v,gt91),
	nf,
	nf,
	v=>lsm(v,gt139),
	nf,
	v=>lsm(v,gt140),
	v=>lsm(v,gt141),
	v=>lsm(v,gt142),
	nf,
	v=>lsm(v,gt143),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt144),
	v=>lsm(v,gt145),
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt146),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt147),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt148),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt149),
	v=>lsm(v,gt150),
	nf,
	v=>lsm(v,gt151),
	nf,
	v=>lsm(v,gt152),
	nf,
	v=>lsm(v,gt153),
	nf,
	v=>lsm(v,gt154),
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt155),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt156),
	v=>lsm(v,gt157),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt158),
	nf,
	v=>lsm(v,gt159),
	nf,
	v=>lsm(v,gt160),
	nf,
	v=>lsm(v,gt161),
	v=>lsm(v,gt162),
	nf,
	v=>lsm(v,gt163),
	nf,
	v=>lsm(v,gt164),
	v=>lsm(v,gt165),
	nf,
	v=>lsm(v,gt166),
	nf,
	nf,
	v=>lsm(v,gt167),
	v=>lsm(v,gt168),
	nf,
	v=>lsm(v,gt169),
	nf,
	v=>lsm(v,gt170),
	v=>lsm(v,gt171),
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt172),
	v=>lsm(v,gt173),
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt174),
	v=>lsm(v,gt175),
	nf,
	v=>lsm(v,gt176),
	nf,
	nf,
	nf,
	v=>lsm(v,gt177),
	nf,
	nf,
	nf,
	v=>lsm(v,gt178),
	v=>lsm(v,gt179),
	nf,
	nf,
	v=>lsm(v,gt180),
	nf,
	nf,
	v=>lsm(v,gt181),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt182),
	v=>lsm(v,gt183),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	v=>lsm(v,gt184),
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf,
	nf];

	function getToken(l, SYM_LU) {
	    if (l.END) return 0; /*6*/

	    switch (l.ty) {
	        case 2:
	            if (SYM_LU.has(l.tx)) return SYM_LU.get(l.tx);
	            return 2;
	        case 1:
	            return 1;
	        case 4:
	            return 3;
	        case 256:
	            return 9;
	        case 8:
	            return 4;
	        case 512:
	            return 10;
	        default:
	            return SYM_LU.get(l.tx) || SYM_LU.get(l.ty);
	    }
	}

	/************ Parser *************/

	function parser(l, e = {}) {
	    
	    fn = e.functions;

	    l.IWS = false;
	    l.PARSE_STRING = true;

	    if (symbols.length > 0) {
	        symbols.forEach(s => { l.addSymbol(s); });
	        l.tl = 0;
	        l.next();
	    }

	    const o = [],
	        ss = [0, 0];

	    let time = 1000000,
	        RECOVERING = 100,
	        tk = getToken(l, lu),
	        p = l.copy(),
	        sp = 1,
	        len = 0,
	        off = 0;

	    outer:

	        while (time-- > 0) {

	            const fn = lsm(tk, state[ss[sp]]) || 0;

	            /*@*/// console.log({end:l.END, state:ss[sp], tx:l.tx, ty:l.ty, tk:tk, rev:rlu.get(tk), s_map:state[ss[sp]], res:lsm(tk, state[ss[sp]])});

	            let r,
	                gt = -1;

	            if (fn == 0) {
	                /*Ignore the token*/
	                l.next();
	                tk = getToken(l, lu);
	                continue;
	            }

	            if (fn > 0) {
	                r = state_funct[fn - 1](tk, e, o, l, ss[sp - 1]);
	            } else {
	                if (RECOVERING > 1 && !l.END) {
	                    if (tk !== lu.get(l.ty)) {
	                        //console.log("ABLE", rlu.get(tk), l.tx, tk )
	                        tk = lu.get(l.ty);
	                        continue;
	                    }

	                    if (tk !== 13) {
	                        //console.log("MABLE")
	                        tk = 13;
	                        RECOVERING = 1;
	                        continue;
	                    }
	                }

	                tk = getToken(l, lu);

	                const recovery_token = eh[ss[sp]](tk, e, o, l, p, ss[sp], lu);

	                if (RECOVERING > 0 && recovery_token) {
	                    RECOVERING = -1; /* To prevent infinite recursion */
	                    tk = recovery_token;
	                    l.tl = 0; /*reset current token */
	                    continue;
	                }
	            }

	            switch (r & 3) {
	                case 0:
	                    /* ERROR */

	                    if (tk == "$eof")
	                        l.throw("Unexpected end of input");
	                    l.throw(`Unexpected token [${RECOVERING ? l.next().tx : l.tx}]`);
	                    return [null];

	                case 1:
	                    /* ACCEPT */
	                    break outer;

	                case 2:
	                    /*SHIFT */
	                    o.push(l.tx);
	                    ss.push(off, r >> 2);
	                    sp += 2;
	                    p.sync(l);
	                    l.next();
	                    off = l.off;
	                    tk = getToken(l, lu);
	                    RECOVERING++;
	                    break;

	                case 3:
	                    /* REDUCE */

	                    len = (r & 0x3FC) >> 1;

	                    ss.length -= len;
	                    sp -= len;
	                    gt = goto[ss[sp]](r >> 10);

	                    if (gt < 0)
	                        l.throw("Invalid state reached!");

	                    ss.push(off, gt);
	                    sp += 2;
	                    break;
	            }
	        }
	    return o[0];
	}

	/** VOID **/

	class await_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "await";
	    }

	    get type() { return types.await_expression }
	}

	/** POSTFIX INCREMENT **/

	class delete_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "delete";
	    }

	    get type() { return types.delete_expression }
	}

	/** IN **/
	class in_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "in";
	    }

	    get type() { return types.in_expression }
	}

	/** INSTANCEOF **/
	class add_expression$1 extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "instanceof";
	    }

	    get type() { return types.instanceof_expression }
	}

	/** LEFT_SHIFT **/
	class left_shift_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "<<";
	    }

	    get type() { return types.left_shift_expression }
	}

	/** MODULO **/
	class modulo_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = "%";
	    }

	    get type() { return types.modulo_expression }
	}

	/** NEW EXPRESSION **/

	class new_expression extends call {
	    constructor(id, args) { 
	        super([id, args]);
	        this.root = false;
	        this.id.root = false;
	    }

	    get type(){return types.new_expression}

	    render() { 
	        const
	            args_str = this.args.map(e => e.render()).join(",");

	        return `new ${this.id.render()}(${args_str})`;
	    }
	}

	/** PLUS **/

	class plus_expression extends unary_pre {
	    constructor(sym) { super(sym);
	        this.op = "+";
	    }
	    get type() { return types.plus_expression }
	}

	/** UNARY NOT **/

	class pre_decrement_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "--";
	    }

	    get type() { return types.pre_decrement_expression }
	}

	/** UNARY NOT **/

	class pre_increment_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "--";
	    }

	    get type() { return types.pre_increment_expression }
	}

	/** RIGHT SHIFT **/
	class right_shift_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = ">>";
	    }

	    get type() { return types.right_shift_expression }
	}

	/** RIGHT SHIFT **/
	class right_shift_fill_expression extends operator {

	    constructor(sym) {
	        super(sym);
	        this.op = ">>>";
	    }

	    get type() { return types.right_shift_fill_expression }
	}

	/** TYPEOF **/

	class typeof_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "typeof";
	    }

	    get type() { return types.typeof_expression }
	}

	/** UNARY NOT **/

	class unary_not_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "!";
	    }

	    get type() { return types.unary_not_expression }
	}

	/** UNARY BIT OR **/

	class unary_or_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "|";
	    }

	    get type() { return types.unary_or_expression }
	}

	/** UNARY BIT XOR **/

	class unary_xor_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "~";
	    }

	    get type() { return types.unary_xor_expression }
	}

	/** VOID **/

	class void_expression extends unary_pre {

	    constructor(sym) {
	        super(sym);
	        this.op = "void";
	    }

	    get type() { return types.void_expression }
	}

	/** ARGUMENT_LIST **/
	class argument_list extends base {
	    constructor(sym) {

	        //if (sym && sym.length == 1)
	        //    return sym[0];
	        
	        super(sym || []);
	    }

	    get args() { return this.vals[0] }

	    getRootIds(ids, closure) {
	        this.args.forEach(s => s.getRootIds(ids, closure));
	    }

	    replaceNode(original, _new = null) {
	        let index = -1;
	        if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
	            this.vals[0].splice(index, 1);
	        }
	    }

	    * traverseDepthFirst(p) {
	        yield * super.traverseDepthFirst(p, this.vals[0]);
	    }

	    get type() { return types.argument_list }

	    render() { 
	        return this.args.map(s=>(s.render())).join(",") ;
	    }
	}

	//continue_statement
	//break_statement
	//return_statement
	//throw_statement
	//with_statement
	//switch_statement
	//label_statement
	//finally_statement
	//variable_statement
	//class_statement


	const env = {
	    table: {},
	    ASI: true,
	    functions: {

	        //JS
	        plus_expression,
	        add:add_expression,
	        add_expression,
	        and: and_expression,
	        and_expression,
	        array_literal,
	        arrow: arrow_function_declaration,
	        arrow_function_declaration,
	        assign: assignment_expression,
	        assignment_expression,
	        await_expression,
	        await_expression,
	        binding,
	        //bit_and_expression,
	        //bit_or_expression,
	        //bit_xor_expression,
	        block:block_statement,
	        block_statement,
	        bool_literal: bool,
	        call_expr: call,
	        call_expression: call,
	        catch_stmt:catch_statement,
	        catch_statement,
	        condition_expr: condition_expression,
	        condition_expression,
	        debugger_stmt:debugger_statement,
	        debugger_statement,
	        delete_expression,
	        div:divide_expression,
	        divide_expression,
	        eq: equality_expression,
	        equality_expression,
	        exp:exponent_expression,
	        exponent_expression,
	        expr_stmt:expr_stmt,
	        expression_list,
	        expression_statement: expr_stmt,
	        for_statement,
	        for_stmt: for_statement,
	        funct_decl: function_declaration,
	        function_declaration,
	        gt: greater,
	        gteq: greater_eq,
	        identifier: id,
	        if_statement: if_stmt,
	        if_stmt: if_stmt,
	        in_expression,
	        instanceof_expression: add_expression$1,
	        left_shift_expression,
	        lexical,
	        lt: less,
	        lteq: less_eq,
	        member:mem,
	        member_expression: mem,
	        modulo_expression,
	        mult:multiply_expression,
	        multiply_expression,
	        negate_expr: negate_expression,
	        negate_expression,
	        new_member_stmt:new_expression,
	        new_expression,
	        null_:null_literal,
	        null_literal,
	        numeric_literal: number,
	        object,
	        or: or_expression,
	        or_expression,
	        post_dec_expr: post_decrement_expression,
	        post_decrement_expression,
	        post_inc_expr: post_increment_expression,
	        post_increment_expression,
	        pre_decrement_expression,
	        pre_increment_expression,
	        property_binding,
	        return_statement: return_stmt,
	        return_stmt: return_stmt,
	        right_shift_expression,
	        right_shift_fill_expression,
	        spread_expr: node$1,
	        spread_element: node$1,
	        stmts: stmts,
	        statements: stmts,
	        string_literal: string,
	        sub:subtract_expression,
	        subtract_expression,
	        this_expr: this_literal,
	        this_literal,
	        try_stmt:try_statement,
	        try_statement,
	        typeof_expression,
	        unary_not_expr: unary_not_expression,
	        unary_not_expression,
	        unary_not_expression,
	        unary_or_expression,
	        void_expression,
	        argument_list,
	        while_stmt: function(sym) {
	            this.bool = sym[1];
	            this.body = sym[3];
	        },
	        var_stmt: function(sym) { this.declarations = sym[1]; },
	        mod_expr: function(sym) {
	            this.le = sym[0];
	            this.re = sym[2];
	            this.ty = "MOD";
	        },
	        seq_expr: function(sym) {
	            this.le = sym[0];
	            this.re = sym[2];
	            this.ty = "STRICT_EQ";
	        },
	        neq_expr: function(sym) {
	            this.le = sym[0];
	            this.re = sym[2];
	            this.ty = "NEQ";
	        },
	        sneq_expr: function(sym) {
	            this.le = sym[0];
	            this.re = sym[2];
	            this.ty = "STRICT_NEQ";
	        },
	        unary_plus: function(sym) {
	            this.expr = sym[1];
	            this.ty = "PRE INCR";
	        },
	        unary_minus: function(sym) {
	            this.expr = sym[1];
	            this.ty = "PRE INCR";
	        },
	        pre_inc_expr: function(sym) {
	            this.expr = sym[1];
	            this.ty = "PRE INCR";
	        },
	        pre_dec_expr: function(sym) {
	            this.expr = sym[1];
	            this.ty = "PRE DEC";
	        },

	        label_stmt: function(sym) {
	            this.label = sym[0];
	            this.stmt = sym[1];
	        },

	        defaultError: (tk, env, output, lex, prv_lex, ss, lu) => {
	            /*USED for ASI*/

	            if (env.ASI && lex.tx !== ")" && !lex.END) {

	                if (lex.tx == "</") // As in "<script> script body => (</)script>"
	                    return lu.get(";");

	                let ENCOUNTERED_END_CHAR = (lex.tx == "}" || lex.END || lex.tx == "</");

	                while (!ENCOUNTERED_END_CHAR && !prv_lex.END && prv_lex.off < lex.off) {
	                    prv_lex.next();
	                    if (prv_lex.ty == prv_lex.types.nl)
	                        ENCOUNTERED_END_CHAR = true;
	                }

	                if (ENCOUNTERED_END_CHAR)
	                    return lu.get(";");
	            }

	            if (lex.END)
	                return lu.get(";");
	        }
	    },

	    options: {
	        integrate: false,
	        onstart: () => {
	            env.table = {};
	            env.ASI = true;
	        }
	    }
	};

	const A = 65;
	const a = 97;
	const ACKNOWLEDGE = 6;
	const AMPERSAND = 38;
	const ASTERISK = 42;
	const AT = 64;
	const B = 66;
	const b = 98;
	const BACKSLASH = 92;
	const BACKSPACE = 8;
	const BELL = 7;
	const C = 67;
	const c = 99;
	const CANCEL = 24;
	const CARET = 94;
	const CARRIAGE_RETURN = 13;
	const CLOSE_CURLY = 125;
	const CLOSE_PARENTH = 41;
	const CLOSE_SQUARE = 93;
	const COLON = 58;
	const COMMA = 44;
	const d = 100;
	const D = 68;
	const DATA_LINK_ESCAPE = 16;
	const DELETE = 127;
	const DEVICE_CTRL_1 = 17;
	const DEVICE_CTRL_2 = 18;
	const DEVICE_CTRL_3 = 19;
	const DEVICE_CTRL_4 = 20;
	const DOLLAR = 36;
	const DOUBLE_QUOTE = 34;
	const e$1 = 101;
	const E = 69;
	const EIGHT = 56;
	const END_OF_MEDIUM = 25;
	const END_OF_TRANSMISSION = 4;
	const END_OF_TRANSMISSION_BLOCK = 23;
	const END_OF_TXT = 3;
	const ENQUIRY = 5;
	const EQUAL = 61;
	const ESCAPE = 27;
	const EXCLAMATION = 33;
	const f = 102;
	const F = 70;
	const FILE_SEPERATOR = 28;
	const FIVE = 53;
	const FORM_FEED = 12;
	const FORWARD_SLASH = 47;
	const FOUR = 52;
	const g = 103;
	const G = 71;
	const GRAVE = 96;
	const GREATER_THAN = 62;
	const GROUP_SEPERATOR = 29;
	const h = 104;
	const H = 72;
	const HASH = 35;
	const HORIZONTAL_TAB = 9;
	const HYPHEN = 45;
	const i = 105;
	const I = 73;
	const j = 106;
	const J = 74;
	const k = 107;
	const K = 75;
	const l = 108;
	const L = 76;
	const LESS_THAN = 60;
	const LINE_FEED = 10;
	const m = 109;
	const M = 77;
	const n = 110;
	const N = 78;
	const NEGATIVE_ACKNOWLEDGE = 21;
	const NINE = 57;
	const NULL = 0;
	const o = 111;
	const O = 79;
	const ONE = 49;
	const OPEN_CURLY = 123;
	const OPEN_PARENTH = 40;
	const OPEN_SQUARE = 91;
	const p = 112;
	const P = 80;
	const PERCENT = 37;
	const PERIOD = 46;
	const PLUS = 43;
	const q = 113;
	const Q = 81;
	const QMARK = 63;
	const QUOTE = 39;
	const r = 114;
	const R = 82;
	const RECORD_SEPERATOR = 30;
	const s = 115;
	const S = 83;
	const SEMICOLON = 59;
	const SEVEN = 55;
	const SHIFT_IN = 15;
	const SHIFT_OUT = 14;
	const SIX = 54;
	const SPACE = 32;
	const START_OF_HEADER = 1;
	const START_OF_TEXT = 2;
	const SUBSTITUTE = 26;
	const SYNCH_IDLE = 22;
	const t = 116;
	const T = 84;
	const THREE = 51;
	const TILDE = 126;
	const TWO = 50;
	const u = 117;
	const U = 85;
	const UNDER_SCORE = 95;
	const UNIT_SEPERATOR = 31;
	const v = 118;
	const V = 86;
	const VERTICAL_BAR = 124;
	const VERTICAL_TAB = 11;
	const w = 119;
	const W = 87;
	const x = 120;
	const X = 88;
	const y = 121;
	const Y = 89;
	const z = 122;
	const Z = 90;
	const ZERO = 48;

	/**
	 * Lexer Jump table reference 
	 * 0. NUMBER
	 * 1. IDENTIFIER
	 * 2. QUOTE STRING
	 * 3. SPACE SET
	 * 4. TAB SET
	 * 5. CARIAGE RETURN
	 * 6. LINEFEED
	 * 7. SYMBOL
	 * 8. OPERATOR
	 * 9. OPEN BRACKET
	 * 10. CLOSE BRACKET 
	 * 11. DATA_LINK
	 */ 
	const jump_table = [
	7, 	 	/* NULL */
	7, 	 	/* START_OF_HEADER */
	7, 	 	/* START_OF_TEXT */
	7, 	 	/* END_OF_TXT */
	7, 	 	/* END_OF_TRANSMISSION */
	7, 	 	/* ENQUIRY */
	7, 	 	/* ACKNOWLEDGE */
	7, 	 	/* BELL */
	7, 	 	/* BACKSPACE */
	4, 	 	/* HORIZONTAL_TAB */
	6, 	 	/* LINEFEED */
	7, 	 	/* VERTICAL_TAB */
	7, 	 	/* FORM_FEED */
	5, 	 	/* CARRIAGE_RETURN */
	7, 	 	/* SHIFT_OUT */
	7, 		/* SHIFT_IN */
	11,	 	/* DATA_LINK_ESCAPE */
	7, 	 	/* DEVICE_CTRL_1 */
	7, 	 	/* DEVICE_CTRL_2 */
	7, 	 	/* DEVICE_CTRL_3 */
	7, 	 	/* DEVICE_CTRL_4 */
	7, 	 	/* NEGATIVE_ACKNOWLEDGE */
	7, 	 	/* SYNCH_IDLE */
	7, 	 	/* END_OF_TRANSMISSION_BLOCK */
	7, 	 	/* CANCEL */
	7, 	 	/* END_OF_MEDIUM */
	7, 	 	/* SUBSTITUTE */
	7, 	 	/* ESCAPE */
	7, 	 	/* FILE_SEPERATOR */
	7, 	 	/* GROUP_SEPERATOR */
	7, 	 	/* RECORD_SEPERATOR */
	7, 	 	/* UNIT_SEPERATOR */
	3, 	 	/* SPACE */
	8, 	 	/* EXCLAMATION */
	2, 	 	/* DOUBLE_QUOTE */
	7, 	 	/* HASH */
	7, 	 	/* DOLLAR */
	8, 	 	/* PERCENT */
	8, 	 	/* AMPERSAND */
	2, 	 	/* QUOTE */
	9, 	 	/* OPEN_PARENTH */
	10, 	 /* CLOSE_PARENTH */
	8, 	 	/* ASTERISK */
	8, 	 	/* PLUS */
	7, 	 	/* COMMA */
	7, 	 	/* HYPHEN */
	7, 	 	/* PERIOD */
	7, 	 	/* FORWARD_SLASH */
	0, 	 	/* ZERO */
	0, 	 	/* ONE */
	0, 	 	/* TWO */
	0, 	 	/* THREE */
	0, 	 	/* FOUR */
	0, 	 	/* FIVE */
	0, 	 	/* SIX */
	0, 	 	/* SEVEN */
	0, 	 	/* EIGHT */
	0, 	 	/* NINE */
	8, 	 	/* COLON */
	7, 	 	/* SEMICOLON */
	8, 	 	/* LESS_THAN */
	8, 	 	/* EQUAL */
	8, 	 	/* GREATER_THAN */
	7, 	 	/* QMARK */
	7, 	 	/* AT */
	1, 	 	/* A*/
	1, 	 	/* B */
	1, 	 	/* C */
	1, 	 	/* D */
	1, 	 	/* E */
	1, 	 	/* F */
	1, 	 	/* G */
	1, 	 	/* H */
	1, 	 	/* I */
	1, 	 	/* J */
	1, 	 	/* K */
	1, 	 	/* L */
	1, 	 	/* M */
	1, 	 	/* N */
	1, 	 	/* O */
	1, 	 	/* P */
	1, 	 	/* Q */
	1, 	 	/* R */
	1, 	 	/* S */
	1, 	 	/* T */
	1, 	 	/* U */
	1, 	 	/* V */
	1, 	 	/* W */
	1, 	 	/* X */
	1, 	 	/* Y */
	1, 	 	/* Z */
	9, 	 	/* OPEN_SQUARE */
	7, 	 	/* TILDE */
	10, 	/* CLOSE_SQUARE */
	7, 	 	/* CARET */
	7, 	 	/* UNDER_SCORE */
	2, 	 	/* GRAVE */
	1, 	 	/* a */
	1, 	 	/* b */
	1, 	 	/* c */
	1, 	 	/* d */
	1, 	 	/* e */
	1, 	 	/* f */
	1, 	 	/* g */
	1, 	 	/* h */
	1, 	 	/* i */
	1, 	 	/* j */
	1, 	 	/* k */
	1, 	 	/* l */
	1, 	 	/* m */
	1, 	 	/* n */
	1, 	 	/* o */
	1, 	 	/* p */
	1, 	 	/* q */
	1, 	 	/* r */
	1, 	 	/* s */
	1, 	 	/* t */
	1, 	 	/* u */
	1, 	 	/* v */
	1, 	 	/* w */
	1, 	 	/* x */
	1, 	 	/* y */
	1, 	 	/* z */
	9, 	 	/* OPEN_CURLY */
	7, 	 	/* VERTICAL_BAR */
	10,  	/* CLOSE_CURLY */
	7,  	/* TILDE */
	7 		/* DELETE */
	];	

	/**
	 * LExer Number and Identifier jump table reference
	 * Number are masked by 12(4|8) and Identifiers are masked by 10(2|8)
	 * entries marked as `0` are not evaluated as either being in the number set or the identifier set.
	 * entries marked as `2` are in the identifier set but not the number set
	 * entries marked as `4` are in the number set but not the identifier set
	 * entries marked as `8` are in both number and identifier sets
	 */
	const number_and_identifier_table = [
	0, 		/* NULL */
	0, 		/* START_OF_HEADER */
	0, 		/* START_OF_TEXT */
	0, 		/* END_OF_TXT */
	0, 		/* END_OF_TRANSMISSION */
	0, 		/* ENQUIRY */
	0,		/* ACKNOWLEDGE */
	0,		/* BELL */
	0,		/* BACKSPACE */
	0,		/* HORIZONTAL_TAB */
	0,		/* LINEFEED */
	0,		/* VERTICAL_TAB */
	0,		/* FORM_FEED */
	0,		/* CARRIAGE_RETURN */
	0,		/* SHIFT_OUT */
	0,		/* SHIFT_IN */
	0,		/* DATA_LINK_ESCAPE */
	0,		/* DEVICE_CTRL_1 */
	0,		/* DEVICE_CTRL_2 */
	0,		/* DEVICE_CTRL_3 */
	0,		/* DEVICE_CTRL_4 */
	0,		/* NEGATIVE_ACKNOWLEDGE */
	0,		/* SYNCH_IDLE */
	0,		/* END_OF_TRANSMISSION_BLOCK */
	0,		/* CANCEL */
	0,		/* END_OF_MEDIUM */
	0,		/* SUBSTITUTE */
	0,		/* ESCAPE */
	0,		/* FILE_SEPERATOR */
	0,		/* GROUP_SEPERATOR */
	0,		/* RECORD_SEPERATOR */
	0,		/* UNIT_SEPERATOR */
	0,		/* SPACE */
	0,		/* EXCLAMATION */
	0,		/* DOUBLE_QUOTE */
	0,		/* HASH */
	8,		/* DOLLAR */
	0,		/* PERCENT */
	0,		/* AMPERSAND */
	2,		/* QUOTE */
	0,		/* OPEN_PARENTH */
	0,		 /* CLOSE_PARENTH */
	0,		/* ASTERISK */
	0,		/* PLUS */
	0,		/* COMMA */
	2,		/* HYPHEN */
	4,		/* PERIOD */
	0,		/* FORWARD_SLASH */
	8,		/* ZERO */
	8,		/* ONE */
	8,		/* TWO */
	8,		/* THREE */
	8,		/* FOUR */
	8,		/* FIVE */
	8,		/* SIX */
	8,		/* SEVEN */
	8,		/* EIGHT */
	8,		/* NINE */
	0,		/* COLON */
	0,		/* SEMICOLON */
	0,		/* LESS_THAN */
	0,		/* EQUAL */
	0,		/* GREATER_THAN */
	0,		/* QMARK */
	0,		/* AT */
	2,		/* A*/
	8,		/* B */
	2,		/* C */
	2,		/* D */
	8,		/* E */
	2,		/* F */
	2,		/* G */
	2,		/* H */
	2,		/* I */
	2,		/* J */
	2,		/* K */
	2,		/* L */
	2,		/* M */
	2,		/* N */
	8,		/* O */
	2,		/* P */
	2,		/* Q */
	2,		/* R */
	2,		/* S */
	2,		/* T */
	2,		/* U */
	2,		/* V */
	2,		/* W */
	8,		/* X */
	2,		/* Y */
	2,		/* Z */
	0,		/* OPEN_SQUARE */
	0,		/* TILDE */
	0,		/* CLOSE_SQUARE */
	0,		/* CARET */
	2,		/* UNDER_SCORE */
	0,		/* GRAVE */
	2,		/* a */
	8,		/* b */
	2,		/* c */
	2,		/* d */
	2,		/* e */
	2,		/* f */
	2,		/* g */
	2,		/* h */
	2,		/* i */
	2,		/* j */
	2,		/* k */
	2,		/* l */
	2,		/* m */
	2,		/* n */
	8,		/* o */
	2,		/* p */
	2,		/* q */
	2,		/* r */
	2,		/* s */
	2,		/* t */
	2,		/* u */
	2,		/* v */
	2,		/* w */
	8,		/* x */
	2,		/* y */
	2,		/* z */
	0,		/* OPEN_CURLY */
	0,		/* VERTICAL_BAR */
	0,		/* CLOSE_CURLY */
	0,		/* TILDE */
	0		/* DELETE */
	];

	const
	    number$1 = 1,
	    identifier = 2,
	    string$1 = 4,
	    white_space = 8,
	    open_bracket = 16,
	    close_bracket = 32,
	    operator$1 = 64,
	    symbol = 128,
	    new_line = 256,
	    data_link = 512,
	    alpha_numeric = (identifier | number$1),
	    white_space_new_line = (white_space | new_line),
	    Types = {
	        num: number$1,
	        number: number$1,
	        id: identifier,
	        identifier,
	        str: string$1,
	        string: string$1,
	        ws: white_space,
	        white_space,
	        ob: open_bracket,
	        open_bracket,
	        cb: close_bracket,
	        close_bracket,
	        op: operator$1,
	        operator: operator$1,
	        sym: symbol,
	        symbol,
	        nl: new_line,
	        new_line,
	        dl: data_link,
	        data_link,
	        alpha_numeric,
	        white_space_new_line,
	    },

	    /*** MASKS ***/

	    TYPE_MASK = 0xF,
	    PARSE_STRING_MASK = 0x10,
	    IGNORE_WHITESPACE_MASK = 0x20,
	    CHARACTERS_ONLY_MASK = 0x40,
	    TOKEN_LENGTH_MASK = 0xFFFFFF80,

	    //De Bruijn Sequence for finding index of right most bit set.
	    //http://supertech.csail.mit.edu/papers/debruijn.pdf
	    debruijnLUT = [
	        0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
	        31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9
	    ];

	const getNumbrOfTrailingZeroBitsFromPowerOf2 = (value) => debruijnLUT[(value * 0x077CB531) >>> 27];

	class Lexer {

	    constructor(string = "", INCLUDE_WHITE_SPACE_TOKENS = false, PEEKING = false) {

	        if (typeof(string) !== "string") throw new Error(`String value must be passed to Lexer. A ${typeof(string)} was passed as the \`string\` argument.`);

	        /**
	         * The string that the Lexer tokenizes.
	         */
	        this.str = string;

	        /**
	         * Reference to the peeking Lexer.
	         */
	        this.p = null;

	        /**
	         * The type id of the current token.
	         */
	        this.type = 32768; //Default "non-value" for types is 1<<15;

	        /**
	         * The offset in the string of the start of the current token.
	         */
	        this.off = 0;

	        this.masked_values = 0;

	        /**
	         * The character offset of the current token within a line.
	         */
	        this.char = 0;
	        /**
	         * The line position of the current token.
	         */
	        this.line = 0;
	        /**
	         * The length of the string being parsed
	         */
	        this.sl = string.length;
	        /**
	         * The length of the current token.
	         */
	        this.tl = 0;

	        /**
	         * Flag to ignore white spaced.
	         */
	        this.IWS = !INCLUDE_WHITE_SPACE_TOKENS;

	        /**
	         * Flag to force the lexer to parse string contents
	         */
	        this.PARSE_STRING = false;

	        if (!PEEKING) this.next();
	    }

	    /**
	     * Restricts max parse distance to the other Lexer's current position.
	     * @param      {Lexer}  Lexer   The Lexer to limit parse distance by.
	     */
	    fence(marker = this) {
	        if (marker.str !== this.str)
	            return;
	        this.sl = marker.off;
	        return this;
	    }

	    /**
	     * Copies the Lexer.
	     * @return     {Lexer}  Returns a new Lexer instance with the same property values.
	     */
	    copy(destination = new Lexer(this.str, false, true)) {
	        destination.off = this.off;
	        destination.char = this.char;
	        destination.line = this.line;
	        destination.sl = this.sl;
	        destination.masked_values = this.masked_values;
	        return destination;
	    }

	    /**
	     * Given another Lexer with the same `str` property value, it will copy the state of that Lexer.
	     * @param      {Lexer}  [marker=this.peek]  The Lexer to clone the state from. 
	     * @throws     {Error} Throws an error if the Lexers reference different strings.
	     * @public
	     */
	    sync(marker = this.p) {

	        if (marker instanceof Lexer) {
	            if (marker.str !== this.str) throw new Error("Cannot sync Lexers with different strings!");
	            this.off = marker.off;
	            this.char = marker.char;
	            this.line = marker.line;
	            this.masked_values = marker.masked_values;
	        }

	        return this;
	    }

	    /**
	    Creates and error message with a diagrame illustrating the location of the error. 
	    */
	    errorMessage(message = "") {
	        const pk = this.copy();

	        pk.IWS = false;

	        while (!pk.END && pk.ty !== Types.nl) { pk.next(); }

	        const end = (pk.END) ? this.str.length : pk.off,

	            nls = (this.line > 0) ? 2 : 0,

	            number_of_tabs =
	            this.str
	            .slice(this.off - this.char + nls, this.off + nls)
	            .split("")
	            .reduce((r$$1, v$$1) => (r$$1 + ((v$$1.charCodeAt(0) == HORIZONTAL_TAB) | 0)), 0),

	            arrow = String.fromCharCode(0x2b89),

	            line = String.fromCharCode(0x2500),

	            thick_line = String.fromCharCode(0x2501),

	            line_number = `    ${this.line}: `,

	            line_fill = line_number.length + number_of_tabs,

	            line_text = this.str.slice(this.off - this.char + (nls), end).replace(/\t/g, "  "),

	            error_border = thick_line.repeat(line_text.length + line_number.length + 2),

	            is_iws = (!this.IWS) ? "\n The Lexer produced whitespace tokens" : "",

	            msg =[ `${message} at ${this.line}:${this.char}` ,
	            `${error_border}` ,
	            `${line_number+line_text}` ,
	            `${line.repeat(this.char+line_fill-(nls))+arrow}` ,
	            `${error_border}` ,
	            `${is_iws}`].join("\n");

	        return msg
	    }

	    /**
	     * Will throw a new Error, appending the parsed string line and position information to the the error message passed into the function.
	     * @instance
	     * @public
	     * @param {String} message - The error message.
	     * @param {Bool} DEFER - if true, returns an Error object instead of throwing.
	     */
	    throw (message, DEFER = false) {
	        const error = new Error(this.errorMessage(message));
	        if (DEFER)
	            return error;
	        throw error;
	    }

	    /**
	     * Proxy for Lexer.prototype.reset
	     * @public
	     */
	    r() { return this.reset() }

	    /**
	     * Restore the Lexer back to it's initial state.
	     * @public
	     */
	    reset() {
	        this.p = null;
	        this.type = 32768;
	        this.off = 0;
	        this.tl = 0;
	        this.char = 0;
	        this.line = 0;
	        this.n;
	        return this;
	    }

	    resetHead() {
	        this.off = 0;
	        this.tl = 0;
	        this.char = 0;
	        this.line = 0;
	        this.p = null;
	        this.type = 32768;
	    }

	    /**
	     * Sets the internal state to point to the next token. Sets Lexer.prototype.END to `true` if the end of the string is hit.
	     * @public
	     * @param {Lexer} [marker=this] - If another Lexer is passed into this method, it will advance the token state of that Lexer.
	     */
	    next(marker = this) {

	        if (marker.sl < 1) {
	            marker.off = 0;
	            marker.type = 32768;
	            marker.tl = 0;
	            marker.line = 0;
	            marker.char = 0;
	            return marker;
	        }

	        //Token builder
	        const l$$1 = marker.sl,
	            str = marker.str,
	            IWS = marker.IWS;

	        let length = marker.tl,
	            off = marker.off + length,
	            type = symbol,
	            line = marker.line,
	            base = off,
	            char = marker.char,
	            root = marker.off;

	        if (off >= l$$1) {
	            length = 0;
	            base = l$$1;
	            //char -= base - off;
	            marker.char = char + (base - marker.off);
	            marker.type = type;
	            marker.off = base;
	            marker.tl = 0;
	            marker.line = line;
	            return marker;
	        }

	        const USE_CUSTOM_SYMBOLS = !!this.symbol_map;
	        let NORMAL_PARSE = true;

	        if (USE_CUSTOM_SYMBOLS) {

	            let code = str.charCodeAt(off);
	            let off2 = off;
	            let map = this.symbol_map,
	                m$$1;
	            let i$$1 = 0;

	            while (code == 32 && IWS)
	                (code = str.charCodeAt(++off2), off++);

	            while ((m$$1 = map.get(code))) {
	                map = m$$1;
	                off2 += 1;
	                code = str.charCodeAt(off2);
	            }

	            if (map.IS_SYM) {
	                NORMAL_PARSE = false;
	                base = off;
	                length = off2 - off;
	                //char += length;
	            }
	        }

	        if (NORMAL_PARSE) {

	            for (;;) {

	                base = off;

	                length = 1;

	                const code = str.charCodeAt(off);

	                if (code < 128) {

	                    switch (jump_table[code]) {
	                        case 0: //NUMBER
	                            while (++off < l$$1 && (12 & number_and_identifier_table[str.charCodeAt(off)]));

	                            if ((str[off] == "e" || str[off] == "E") && (12 & number_and_identifier_table[str.charCodeAt(off + 1)])) {
	                                off++;
	                                if (str[off] == "-") off++;
	                                marker.off = off;
	                                marker.tl = 0;
	                                marker.next();
	                                off = marker.off + marker.tl;
	                                //Add e to the number string
	                            }

	                            type = number$1;
	                            length = off - base;

	                            break;
	                        case 1: //IDENTIFIER
	                            while (++off < l$$1 && ((10 & number_and_identifier_table[str.charCodeAt(off)])));
	                            type = identifier;
	                            length = off - base;
	                            break;
	                        case 2: //QUOTED STRING
	                            if (this.PARSE_STRING) {
	                                type = symbol;
	                            } else {
	                                while (++off < l$$1 && str.charCodeAt(off) !== code);
	                                type = string$1;
	                                length = off - base + 1;
	                            }
	                            break;
	                        case 3: //SPACE SET
	                            while (++off < l$$1 && str.charCodeAt(off) === SPACE);
	                            type = white_space;
	                            length = off - base;
	                            break;
	                        case 4: //TAB SET
	                            while (++off < l$$1 && str[off] === HORIZONTAL_TAB);
	                            type = white_space;
	                            length = off - base;
	                            break;
	                        case 5: //CARIAGE RETURN
	                            length = 2;
	                            //intentional
	                        case 6: //LINEFEED
	                            type = new_line;
	                            line++;
	                            base = off;
	                            root = off;
	                            off += length;
	                            char = 0;
	                            break;
	                        case 7: //SYMBOL
	                            type = symbol;
	                            break;
	                        case 8: //OPERATOR
	                            type = operator$1;
	                            break;
	                        case 9: //OPEN BRACKET
	                            type = open_bracket;
	                            break;
	                        case 10: //CLOSE BRACKET
	                            type = close_bracket;
	                            break;
	                        case 11: //Data Link Escape
	                            type = data_link;
	                            length = 4; //Stores two UTF16 values and a data link sentinel
	                            break;
	                    }
	                } else {
	                    break;
	                }

	                if (IWS && (type & white_space_new_line)) {
	                    if (off < l$$1) {
	                        type = symbol;
	                        //off += length;
	                        continue;
	                    } else {
	                        //Trim white space from end of string
	                        //base = l - off;
	                        //marker.sl -= off;
	                        //length = 0;
	                    }
	                }
	                break;
	            }
	        }

	        marker.type = type;
	        marker.off = base;
	        marker.tl = (this.masked_values & CHARACTERS_ONLY_MASK) ? Math.min(1, length) : length;
	        marker.char = char + base - root;
	        marker.line = line;
	        return marker;
	    }


	    /**
	     * Proxy for Lexer.prototype.assert
	     * @public
	     */
	    a(text) {
	        return this.assert(text);
	    }

	    /**
	     * Compares the string value of the current token to the value passed in. Advances to next token if the two are equal.
	     * @public
	     * @throws {Error} - `Expecting "${text}" got "${this.text}"`
	     * @param {String} text - The string to compare.
	     */
	    assert(text) {

	        if (this.off < 0) this.throw(`Expecting ${text} got null`);

	        if (this.text == text)
	            this.next();
	        else
	            this.throw(`Expecting "${text}" got "${this.text}"`);

	        return this;
	    }

	    /**
	     * Proxy for Lexer.prototype.assertCharacter
	     * @public
	     */
	    aC(char) { return this.assertCharacter(char) }
	    /**
	     * Compares the character value of the current token to the value passed in. Advances to next token if the two are equal.
	     * @public
	     * @throws {Error} - `Expecting "${text}" got "${this.text}"`
	     * @param {String} text - The string to compare.
	     */
	    assertCharacter(char) {

	        if (this.off < 0) this.throw(`Expecting ${char[0]} got null`);

	        if (this.ch == char[0])
	            this.next();
	        else
	            this.throw(`Expecting "${char[0]}" got "${this.tx[this.off]}"`);

	        return this;
	    }

	    /**
	     * Returns the Lexer bound to Lexer.prototype.p, or creates and binds a new Lexer to Lexer.prototype.p. Advences the other Lexer to the token ahead of the calling Lexer.
	     * @public
	     * @type {Lexer}
	     * @param {Lexer} [marker=this] - The marker to originate the peek from. 
	     * @param {Lexer} [peek_marker=this.p] - The Lexer to set to the next token state.
	     * @return {Lexer} - The Lexer that contains the peeked at token.
	     */
	    peek(marker = this, peek_marker = this.p) {

	        if (!peek_marker) {
	            if (!marker) return null;
	            if (!this.p) {
	                this.p = new Lexer(this.str, false, true);
	                peek_marker = this.p;
	            }
	        }
	        peek_marker.masked_values = marker.masked_values;
	        peek_marker.type = marker.type;
	        peek_marker.off = marker.off;
	        peek_marker.tl = marker.tl;
	        peek_marker.char = marker.char;
	        peek_marker.line = marker.line;
	        this.next(peek_marker);
	        return peek_marker;
	    }


	    /**
	     * Proxy for Lexer.prototype.slice
	     * @public
	     */
	    s(start) { return this.slice(start) }

	    /**
	     * Returns a slice of the parsed string beginning at `start` and ending at the current token.
	     * @param {Number | LexerBeta} start - The offset in this.str to begin the slice. If this value is a LexerBeta, sets the start point to the value of start.off.
	     * @return {String} A substring of the parsed string.
	     * @public
	     */
	    slice(start = this.off) {

	        if (start instanceof Lexer) start = start.off;

	        return this.str.slice(start, (this.off <= start) ? this.sl : this.off);
	    }

	    /**
	     * Skips to the end of a comment section.
	     * @param {boolean} ASSERT - If set to true, will through an error if there is not a comment line or block to skip.
	     * @param {Lexer} [marker=this] - If another Lexer is passed into this method, it will advance the token state of that Lexer.
	     */
	    comment(ASSERT = false, marker = this) {

	        if (!(marker instanceof Lexer)) return marker;

	        if (marker.ch == "/") {
	            if (marker.pk.ch == "*") {
	                marker.sync();
	                while (!marker.END && (marker.next().ch != "*" || marker.pk.ch != "/")) { /* NO OP */ }
	                marker.sync().assert("/");
	            } else if (marker.pk.ch == "/") {
	                const IWS = marker.IWS;
	                while (marker.next().ty != Types.new_line && !marker.END) { /* NO OP */ }
	                marker.IWS = IWS;
	                marker.next();
	            } else
	            if (ASSERT) marker.throw("Expecting the start of a comment");
	        }

	        return marker;
	    }

	    setString(string, RESET = true) {
	        this.str = string;
	        this.sl = string.length;
	        if (RESET) this.resetHead();
	    }

	    toString() {
	        return this.slice();
	    }

	    /**
	     * Returns new Whind Lexer that has leading and trailing whitespace characters removed from input. 
	     * leave_leading_amount - Maximum amount of leading space caracters to leave behind. Default is zero
	     * leave_trailing_amount - Maximum amount of trailing space caracters to leave behind. Default is zero
	     */
	    trim(leave_leading_amount = 0, leave_trailing_amount = leave_leading_amount) {
	        const lex = this.copy();

	        let space_count = 0,
	            off = lex.off;

	        for (; lex.off < lex.sl; lex.off++) {
	            const c$$1 = jump_table[lex.string.charCodeAt(lex.off)];

	            if (c$$1 > 2 && c$$1 < 7) {

	                if (space_count >= leave_leading_amount) {
	                    off++;
	                } else {
	                    space_count++;
	                }
	                continue;
	            }

	            break;
	        }

	        lex.off = off;
	        space_count = 0;
	        off = lex.sl;

	        for (; lex.sl > lex.off; lex.sl--) {
	            const c$$1 = jump_table[lex.string.charCodeAt(lex.sl - 1)];

	            if (c$$1 > 2 && c$$1 < 7) {
	                if (space_count >= leave_trailing_amount) {
	                    off--;
	                } else {
	                    space_count++;
	                }
	                continue;
	            }

	            break;
	        }

	        lex.sl = off;

	        if (leave_leading_amount > 0)
	            lex.IWS = false;

	        lex.token_length = 0;

	        lex.next();

	        return lex;
	    }

	    /** Adds symbol to symbol_map. This allows custom symbols to be defined and tokenized by parser. **/
	    addSymbol(sym) {
	        if (!this.symbol_map)
	            this.symbol_map = new Map;


	        let map = this.symbol_map;

	        for (let i$$1 = 0; i$$1 < sym.length; i$$1++) {
	            let code = sym.charCodeAt(i$$1);
	            let m$$1 = map.get(code);
	            if (!m$$1) {
	                m$$1 = map.set(code, new Map).get(code);
	            }
	            map = m$$1;
	        }
	        map.IS_SYM = true;
	    }

	    /*** Getters and Setters ***/
	    get string() {
	        return this.str;
	    }

	    get string_length() {
	        return this.sl - this.off;
	    }

	    set string_length(s$$1) {}

	    /**
	     * The current token in the form of a new Lexer with the current state.
	     * Proxy property for Lexer.prototype.copy
	     * @type {Lexer}
	     * @public
	     * @readonly
	     */
	    get token() {
	        return this.copy();
	    }


	    get ch() {
	        return this.str[this.off];
	    }

	    /**
	     * Proxy for Lexer.prototype.text
	     * @public
	     * @type {String}
	     * @readonly
	     */
	    get tx() { return this.text }

	    /**
	     * The string value of the current token.
	     * @type {String}
	     * @public
	     * @readonly
	     */
	    get text() {
	        return (this.off < 0) ? "" : this.str.slice(this.off, this.off + this.tl);
	    }

	    /**
	     * The type id of the current token.
	     * @type {Number}
	     * @public
	     * @readonly
	     */
	    get ty() { return this.type }

	    /**
	     * The current token's offset position from the start of the string.
	     * @type {Number}
	     * @public
	     * @readonly
	     */
	    get pos() {
	        return this.off;
	    }

	    /**
	     * Proxy for Lexer.prototype.peek
	     * @public
	     * @readonly
	     * @type {Lexer}
	     */
	    get pk() { return this.peek() }

	    /**
	     * Proxy for Lexer.prototype.next
	     * @public
	     */
	    get n() { return this.next() }

	    get END() { return this.off >= this.sl }
	    set END(v$$1) {}

	    get type() {
	        return 1 << (this.masked_values & TYPE_MASK);
	    }

	    set type(value) {
	        //assuming power of 2 value.
	        this.masked_values = (this.masked_values & ~TYPE_MASK) | ((getNumbrOfTrailingZeroBitsFromPowerOf2(value)) & TYPE_MASK);
	    }

	    get tl() {
	        return this.token_length;
	    }

	    set tl(value) {
	        this.token_length = value;
	    }

	    get token_length() {
	        return ((this.masked_values & TOKEN_LENGTH_MASK) >> 7);
	    }

	    set token_length(value) {
	        this.masked_values = (this.masked_values & ~TOKEN_LENGTH_MASK) | (((value << 7) | 0) & TOKEN_LENGTH_MASK);
	    }

	    get IGNORE_WHITE_SPACE() {
	        return this.IWS;
	    }

	    set IGNORE_WHITE_SPACE(bool) {
	        this.iws = !!bool;
	    }

	    get CHARACTERS_ONLY() {
	        return !!(this.masked_values & CHARACTERS_ONLY_MASK);
	    }

	    set CHARACTERS_ONLY(boolean) {
	        this.masked_values = (this.masked_values & ~CHARACTERS_ONLY_MASK) | ((boolean | 0) << 6);
	    }

	    get IWS() {
	        return !!(this.masked_values & IGNORE_WHITESPACE_MASK);
	    }

	    set IWS(boolean) {
	        this.masked_values = (this.masked_values & ~IGNORE_WHITESPACE_MASK) | ((boolean | 0) << 5);
	    }

	    get PARSE_STRING() {
	        return !!(this.masked_values & PARSE_STRING_MASK);
	    }

	    set PARSE_STRING(boolean) {
	        this.masked_values = (this.masked_values & ~PARSE_STRING_MASK) | ((boolean | 0) << 4);
	    }

	    /**
	     * Reference to token id types.
	     */
	    get types() {
	        return Types;
	    }
	}

	Lexer.prototype.addCharacter = Lexer.prototype.addSymbol;

	function whind(string, INCLUDE_WHITE_SPACE_TOKENS = false) { return new Lexer(string, INCLUDE_WHITE_SPACE_TOKENS) }

	whind.constructor = Lexer;

	Lexer.types = Types;
	whind.types = Types;

	function parse(string$$1){
		return parser(whind(string$$1), env);
	}

	exports.types = types;
	exports.for_stmt = for_statement;
	exports.call_expr = call;
	exports.identifier = id;
	exports.catch_stmt = catch_statement;
	exports.try_stmt = try_statement;
	exports.stmts = stmts;
	exports.block = block_statement;
	exports.lexical = lexical;
	exports.binding = binding;
	exports.member = mem;
	exports.assign = assignment_expression;
	exports.add = add_expression;
	exports.exp = exponent_expression;
	exports.sub = subtract_expression;
	exports.div = divide_expression;
	exports.mult = multiply_expression;
	exports.object = object;
	exports.debugger_stmt = debugger_statement;
	exports.string = string;
	exports.null_ = null_literal;
	exports.number = number;
	exports.bool = bool;
	exports.negate = negate_expression;
	exports.rtrn = return_stmt;
	exports.condition = condition_expression;
	exports.array_literal = array_literal;
	exports.this_expr = this_literal;
	exports.property_binding = property_binding;
	exports.arrow = arrow_function_declaration;
	exports.funct_decl = function_declaration;
	exports.expression_list = expression_list;
	exports.if_stmt = if_stmt;
	exports.post_inc = post_increment_expression;
	exports.post_dec = post_decrement_expression;
	exports.expr_stmt = expr_stmt;
	exports._or = or_expression;
	exports._and = and_expression;
	exports.not = node;
	exports.new_member_stmt = mem$1;
	exports.spread = node$1;
	exports.equal = equality_expression;
	exports.greater = greater;
	exports.greater_eq = greater_eq;
	exports.less = less;
	exports.less_eq = less_eq;
	exports.parse = parse;

	return exports;

}({}));
