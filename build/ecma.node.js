'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
        yield this;

        for (let i = 0; i < vals.length; i++) {

            const expr = vals[i];

            if (!expr) continue;

            if(Array.isArray(expr)){
                yield* this.traverseDepthFirst(p, expr);
            }else
                yield* expr.traverseDepthFirst(this);

            if (vals[i] !== expr) // Check to see if expression has been replaced. 
                i--;
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
}

/** FOR **/
class for_stmt extends base {

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

class call_expr extends base {
    constructor(sym) {
        super(sym[0], (Array.isArray(sym[1])) ? sym[1] : [sym[1]]);
    }

    get id() { return this.vals[0] }
    get args() { return this.vals[1] }

    replaceNode(original, _new) {
        if (original == this.id)
            this.id = _new;
        else
            for (let i = 0; i < this.args.length; i++) {
                if (this.args[i] == original)
                    return this.args[i] = _new;
            }
    }

    getRootIds(ids, closure) {
        this.id.getRootIds(ids, closure);
        this.args.forEach(e => e.getRootIds(ids, closure));
    }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
        yield* this.id.traverseDepthFirst(this);
        yield* super.traverseDepthFirst(p, this.args);
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
class catch_stmt extends base {
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
class try_stmt extends base {
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
class block extends stmts {

    constructor(sym) {
        if (!(sym[1] instanceof stmts))
            return sym[1];

        super(sym[1].vals);
    }

    getRootIds(ids, closure) {
        super.getRootIds(ids, new Set([...closure.values()]));
    }

    get type() { return types.block }

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

class assign extends operator {
    constructor(sym) {
        super(sym);
        this.op = sym[1];
    }
    get id() { return this.vals[0] }
    get expr() { return this.vals[2] }
    get type() { return types.assign }
}

/** MULTIPLY **/
class add extends operator {

    constructor(sym) {
        super(sym);
        this.op = "+";
    }

    get type() { return types.add }
}

/** EXPONENT **/
class exp extends operator {

    constructor(sym) {
        super(sym);
        this.op = "**";
    }

    get type() { return types.exp }
}

/** SUBTRACT **/
class sub extends operator {

    constructor(sym) {
        super(sym);
        this.op = "-";
    }

    get type () { return types.sub }
}

/** MULTIPLY **/
class div extends operator {

    constructor(sym) {
        super(sym);
        this.op = "/";
    }

    get type () { return types.div }
}

/** MULTIPLY **/
class mult extends operator {

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

class debugger_stmt extends base {
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
class null_ extends base {
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

class negate extends unary_pre {
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
class condition extends base {
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
        super(sym[0]);
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

/** THIS EXPRESSION  **/



class this_expr extends base {
    constructor() {
        super();
        this.root = false;
    }

    getRootIds(ids, closure) {
        if (this.expr) this.expr.getRootIds(ids, closure);
    }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
    }
    get name() { return "this" }
    get type() { return types.this_expr }

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

class _function extends base {
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

class arrow extends _function {
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

class post_inc extends unary_post {

    constructor(sym) {
        super(sym);
        this.op = "++";
    }

    get type() { return types.post_inc }

}

/** POSTFIX INCREMENT **/

class post_dec extends unary_post {

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
class _or extends operator {

    constructor(sym) {
        super(sym);
        this.op = "||";
    }

    get type() { return types.or }
}

/** AND **/
class _and extends operator {

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

class mem$1 extends base {
    constructor(sym) { super(sym[1], sym[2]);
        this.root = false;
        this.id.root = false;
    }

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
class equal extends operator {
    constructor(sym) {super(sym); this.op = "=="; }
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
    gt0 = [0,-1,1,-18,2,3,6,5,4,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt1 = [0,-22,119,-2,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt2 = [0,-22,6,5,120,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt3 = [0,-115,124],
gt4 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,164,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt5 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,175,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt6 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,176,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt7 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,177,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt8 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,178,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt9 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,179,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt10 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,180,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt11 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,181,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt12 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,182,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt13 = [0,-99,184],
gt14 = [0,-99,189],
gt15 = [0,-63,66,173,-14,67,174,-11,190,191,61,62,87,-4,60,168,-7,167,-20,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt16 = [0,-156,194],
gt17 = [0,-144,197,195],
gt18 = [0,-146,207,205],
gt19 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,216,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt20 = [0,-99,221],
gt21 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,222,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt22 = [0,-49,224],
gt23 = [0,-57,226,227,-73,229,231,232,-19,228,230,72,71,70],
gt24 = [0,-26,236,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt25 = [0,-152,242,-2,243,72,71,70],
gt26 = [0,-152,245,-2,243,72,71,70],
gt27 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,247,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt28 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,249,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt29 = [0,-31,250],
gt30 = [0,-81,253,254,-71,252,230,72,71,70],
gt31 = [0,-154,258,230,72,71,70],
gt32 = [0,-61,259,260,-69,262,231,232,-19,261,230,72,71,70],
gt33 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,264,-2,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt34 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,265,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt35 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,266,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt36 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,267,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt37 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-7,268,35,36,37,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt38 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-8,269,36,37,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt39 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-9,270,37,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt40 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-10,271,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt41 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-11,272,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt42 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,273,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt43 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,274,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt44 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,275,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt45 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,276,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt46 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,277,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt47 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,278,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt48 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,279,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt49 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,280,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt50 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,281,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt51 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,282,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt52 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-14,283,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt53 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-14,284,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt54 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-14,285,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt55 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-15,286,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt56 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-15,287,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt57 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,288,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt58 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,289,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt59 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,290,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt60 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,291,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt61 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,294,293,297,296,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt62 = [0,-86,304,-16,300,301,306,310,311,302,-39,312,313,-3,303,-1,170,72,71,307],
gt63 = [0,-156,72,71,315],
gt64 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,316,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt65 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-1,318,60,168,-7,167,-3,319,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt66 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,321,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt67 = [0,-156,72,71,322],
gt68 = [0,-99,323],
gt69 = [0,-144,326],
gt70 = [0,-146,328],
gt71 = [0,-132,332,231,232,-19,331,230,72,71,70],
gt72 = [0,-156,72,71,333],
gt73 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,334,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt74 = [0,-63,66,173,-7,31,91,335,-3,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,-8,167,-3,336,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt75 = [0,-26,339,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-1,338,22,-3,23,13,-6,66,340,-7,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt76 = [0,-109,343],
gt77 = [0,-109,345],
gt78 = [0,-105,352,310,311,-27,347,348,-2,350,-1,351,-6,312,313,-4,353,230,72,71,307],
gt79 = [0,-112,355,-19,362,231,232,-2,357,359,-1,360,361,356,-11,353,230,72,71,70],
gt80 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,363,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt81 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,365,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt82 = [0,-36,371,-22,369,372,-2,66,173,-7,31,91,-4,89,67,174,-7,28,27,366,370,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt83 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,374,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt84 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,378,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt85 = [0,-52,380,381],
gt86 = [0,-81,384,254],
gt87 = [0,-83,386,388,389,390,-18,393,310,311,-40,312,313,-6,72,71,394],
gt88 = [0,-63,66,173,-13,89,67,174,-10,395,56,58,61,62,87,57,88,-2,60,168,-7,167,-20,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt89 = [0,-66,396,398,397,400,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
gt90 = [0,-109,405],
gt91 = [0,-109,406],
gt92 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-2,411,410,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt93 = [0,-112,413],
gt94 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,415,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt95 = [0,-109,418],
gt96 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,419,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt97 = [0,-105,422,310,311,-40,312,313,-6,72,71,394],
gt98 = [0,-105,423,310,311,-40,312,313,-6,72,71,394],
gt99 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,424,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt100 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,428,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt101 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-6,435,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt102 = [0,-58,437,-73,229,231,232,-19,228,230,72,71,70],
gt103 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,438,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt104 = [0,-154,442,230,72,71,70],
gt105 = [0,-109,444],
gt106 = [0,-132,362,231,232,-5,447,361,445,-11,353,230,72,71,70],
gt107 = [0,-132,452,231,232,-19,451,230,72,71,70],
gt108 = [0,-109,453],
gt109 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,458,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt110 = [0,-37,461,-19,460,227,-73,463,231,232,-19,462,230,72,71,70],
gt111 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,464,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt112 = [0,-37,470,-23,259,260,-69,472,231,232,-19,471,230,72,71,70],
gt113 = [0,-36,475,-23,476,-2,66,173,-13,89,67,174,-10,473,56,58,61,62,87,57,88,-2,60,168,-7,167,-20,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
gt114 = [0,-53,479],
gt115 = [0,-31,481],
gt116 = [0,-83,482,388,389,390,-18,393,310,311,-40,312,313,-6,72,71,394],
gt117 = [0,-85,485,390,-18,393,310,311,-40,312,313,-6,72,71,394],
gt118 = [0,-86,486,-18,393,310,311,-40,312,313,-6,72,71,394],
gt119 = [0,-66,489,398,397,400,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
gt120 = [0,-62,490,-69,262,231,232,-19,261,230,72,71,70],
gt121 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,491,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt122 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-1,495,494,493,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt123 = [0,-86,304,-17,497,306,310,311,302,-39,312,313,-3,303,-1,170,72,71,307],
gt124 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,498,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt125 = [0,-65,499,500,398,397,400,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
gt126 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,505,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt127 = [0,-132,508,231,232,-19,507,230,72,71,70],
gt128 = [0,-105,352,310,311,-27,510,-3,512,-1,351,-6,312,313,-4,353,230,72,71,307],
gt129 = [0,-132,362,231,232,-5,513,361,-12,353,230,72,71,70],
gt130 = [0,-112,516,-19,362,231,232,-3,518,-1,360,361,517,-11,353,230,72,71,70],
gt131 = [0,-26,519,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt132 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,520,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt133 = [0,-26,521,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt134 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,522,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt135 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,525,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt136 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,531,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt137 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,533,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt138 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,534,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt139 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,535,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt140 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,536,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt141 = [0,-37,538,-94,540,231,232,-19,539,230,72,71,70],
gt142 = [0,-37,470,-94,540,231,232,-19,539,230,72,71,70],
gt143 = [0,-44,542],
gt144 = [0,-26,544,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt145 = [0,-54,545,-77,547,231,232,-19,546,230,72,71,70],
gt146 = [0,-68,550,551,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
gt147 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,553,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt148 = [0,-69,557,-17,556,-44,362,231,232,-5,401,361,-12,353,230,72,71,70],
gt149 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,558,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt150 = [0,-132,362,231,232,-5,447,361,563,-11,353,230,72,71,70],
gt151 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,568,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt152 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,570,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt153 = [0,-26,572,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt154 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,573,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt155 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,575,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt156 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,576,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt157 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,577,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt158 = [0,-26,580,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt159 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,585,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt160 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,587,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt161 = [0,-45,589,591,590],
gt162 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,595,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt163 = [0,-26,602,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt164 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,604,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt165 = [0,-26,607,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt166 = [0,-26,609,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt167 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,611,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt168 = [0,-26,616,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt169 = [0,-26,617,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt170 = [0,-26,618,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt171 = [0,-26,619,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt172 = [0,-26,620,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt173 = [0,-26,621,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt174 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,623,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt175 = [0,-46,627,625],
gt176 = [0,-45,628,591],
gt177 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,630,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt178 = [0,-31,632],
gt179 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,634,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt180 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,635,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt181 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,636,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt182 = [0,-26,639,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt183 = [0,-26,640,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt184 = [0,-26,641,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt185 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,642,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
gt186 = [0,-26,645,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt187 = [0,-26,646,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt188 = [0,-26,647,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt189 = [0,-26,648,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt190 = [0,-26,649,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt191 = [0,-26,651,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt192 = [0,-46,652],
gt193 = [0,-46,627],
gt194 = [0,-22,6,5,656,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt195 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,660,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt196 = [0,-26,661,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt197 = [0,-26,663,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt198 = [0,-26,664,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt199 = [0,-26,665,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt200 = [0,-22,6,5,667,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
gt201 = [0,-26,669,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],

    // State action lookup maps
    sm0=[0,1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm1=[0,43,-3,0,-4,0],
sm2=[0,44,-3,0,-4,0],
sm3=[0,45,-3,0,-4,0],
sm4=[0,46,-3,0,-4,0],
sm5=[0,47,2,3,-1,0,-4,0,-8,4,47,-2,5,47,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,47,-1,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm6=[0,48,48,48,-1,0,-4,0,-8,48,48,-2,48,48,48,48,48,48,-1,48,48,-2,48,48,48,48,-2,48,48,48,48,48,48,48,48,-1,48,-2,48,48,-5,48,-2,48,-2,48,-31,48,48,-3,48,48,48,48,48,48,48,-7,48,48,48,48,48,48],
sm7=[0,49,49,49,-1,0,-4,0,-8,49,49,-2,49,49,49,49,49,49,-1,49,49,-2,49,49,49,49,-2,49,49,49,49,49,49,49,49,-1,49,-2,49,49,-5,49,-2,49,-2,49,-31,49,49,-3,49,49,49,49,49,49,49,-7,49,49,49,49,49,49],
sm8=[0,50,50,50,-1,0,-4,0,-8,50,50,-2,50,50,50,50,50,50,-1,50,50,-2,50,50,50,50,-2,50,50,50,50,50,50,50,50,-1,50,-2,50,50,-5,50,-2,50,-2,50,-31,50,50,-3,50,50,50,50,50,50,50,-7,50,50,50,50,50,50],
sm9=[0,51,51,51,-1,0,-4,0,-8,51,51,-2,51,51,51,51,51,51,-1,51,51,-1,51,51,51,51,51,-2,51,51,51,51,51,51,51,51,-1,51,-2,51,51,-5,51,-2,51,-2,51,-31,51,51,-3,51,51,51,51,51,51,51,-7,51,51,51,51,51,51],
sm10=[0,52,52,52,-1,0,-4,0,-8,52,52,-2,52,52,52,52,52,52,-1,52,52,-1,52,52,52,52,52,-2,52,52,52,52,52,52,52,52,-1,52,-2,52,52,-5,52,-2,52,-2,52,-31,52,52,-3,52,52,52,52,52,52,52,-7,52,52,52,52,52,52],
sm11=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
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
sm31=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm32=[0,-4,0,-4,0,-5,111,111,-2,111,-2,111,-8,111,-5,111,-9,111,-11,111,-18,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
sm33=[0,-4,0,-4,0,-5,115,115,-1,115,115,-2,115,-8,115,-5,115,115,-8,115,-11,115,-5,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,-5,115,115],
sm34=[0,-4,0,-4,0,-5,115,115,-1,115,115,-2,115,-4,116,-2,117,115,-5,115,115,-8,115,-11,115,118,-4,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,-5,115,115],
sm35=[0,-4,0,-4,0,-5,119,119,-1,119,119,-2,119,-4,120,-2,117,119,-5,119,119,-8,119,-11,119,121,-4,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,-5,119,119],
sm36=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-27,25,-1,122,123,-2,27,-50,37,38,39,40,41,42],
sm37=[0,-4,0,-4,0,-5,124,124,-1,124,124,-2,124,-4,124,-2,124,124,-5,124,124,-8,124,-11,124,124,-4,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,-5,124,124],
sm38=[0,-4,0,-4,0,-5,125,125,-1,125,125,-2,125,-4,125,-2,125,125,-5,125,125,-8,125,-11,125,125,-4,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,-5,125,125],
sm39=[0,-4,0,-4,0,-5,126,126,-1,126,126,-2,126,-4,126,-2,126,126,-5,126,126,-8,126,-11,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-5,126,126],
sm40=[0,-4,0,-4,0,-5,126,126,-2,126,-2,126,-4,126,-2,126,126,-5,126,126,-8,126,-5,127,-5,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-5,126,126],
sm41=[0,-4,0,-4,0,-5,128,128,-5,128,-4,128,-2,128,-6,128,-9,129,-5,130,-6,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
sm42=[0,-4,0,-4,0,-5,131,131,-1,131,131,-2,131,-4,131,-2,131,131,-5,131,131,-8,131,-5,131,131,-4,131,131,-4,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,-5,131,131],
sm43=[0,-2,3,-1,0,-4,0,-5,132,132,-1,132,132,-2,132,-4,132,-2,132,132,-5,132,132,-8,132,-5,132,132,-4,132,132,-4,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,-5,132,132,-12,42],
sm44=[0,-2,133,-1,0,-4,0,-5,133,133,-1,133,133,-2,133,-4,133,-2,133,133,-5,133,133,-8,133,-5,133,133,-4,133,133,-4,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,-5,133,133,-12,133],
sm45=[0,-2,134,-1,0,-4,0,-5,134,134,-1,134,134,-2,134,-4,134,-2,134,134,-5,134,134,-8,134,-5,134,134,-4,134,134,-4,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,-5,134,134,-12,134],
sm46=[0,-4,0,-4,0,-5,135,135,-1,135,135,-2,135,-4,135,-2,135,135,-5,135,135,-8,135,-11,135,135,-4,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,-5,135,135],
sm47=[0,-4,0,-4,0,-5,136,136,-1,136,136,-2,136,-4,136,-2,136,136,-5,136,136,-8,136,-11,136,136,-4,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,-5,136,136],
sm48=[0,-4,0,-4,0,-5,137,137,-1,137,137,-2,137,-4,137,-2,137,137,-5,137,137,-8,137,-11,137,137,-4,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,-5,137,137],
sm49=[0,-1,138,139,-1,140,141,142,143,144,0,-105,145],
sm50=[0,-1,146,147,-1,148,149,150,151,152,0,-106,153],
sm51=[0,-4,0,-4,0,-5,154,154,-1,154,154,-2,154,-4,154,-2,154,154,-5,154,154,-8,154,-11,154,154,-4,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,-5,154,154],
sm52=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,155,-7,15,-18,25,-2,26,-1,156,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm53=[0,-4,0,-4,0,-17,157,-2,117,-29,158],
sm54=[0,-4,0,-4,0,-5,159,159,-1,159,159,-2,159,-4,159,-2,159,159,-5,159,159,-8,159,-11,159,159,-4,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,-5,159,159],
sm55=[0,-4,0,-4,0,-5,160,160,-1,160,160,-2,160,-4,160,-2,160,160,-5,160,160,-8,160,-11,160,160,-4,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,-5,160,160],
sm56=[0,-4,0,-4,0,-43,161],
sm57=[0,-4,0,-4,0,-43,127],
sm58=[0,-4,0,-4,0,-37,162],
sm59=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-92,42],
sm60=[0,165,165,165,-1,0,-4,0,-8,165,165,-2,165,165,165,165,165,165,-1,165,165,-1,165,165,165,165,165,-2,165,165,165,165,165,165,165,165,-1,165,-2,165,165,-5,165,-2,165,-2,165,-31,165,165,-3,165,165,165,165,165,165,165,-7,165,165,165,165,165,165],
sm61=[0,-4,0,-4,0,-20,166],
sm62=[0,167,167,167,-1,0,-4,0,-8,167,167,-2,167,167,167,167,167,167,-1,167,167,-1,167,167,167,167,167,-2,167,167,167,167,167,167,167,167,-1,167,-2,167,167,-5,167,-2,167,-2,167,-31,167,167,-3,167,167,167,167,167,167,167,-7,167,167,167,167,167,167],
sm63=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-6,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,-6,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm64=[0,-4,0,-4,0,-20,168],
sm65=[0,-4,0,-4,0,-20,169,-8,170],
sm66=[0,-4,0,-4,0,-20,171],
sm67=[0,-2,3,-1,0,-4,0,-12,172,-97,42],
sm68=[0,-2,3,-1,0,-4,0,-12,173,-97,42],
sm69=[0,-1,2,3,-1,0,-4,0,-8,113,-3,174,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm70=[0,-4,0,-4,0,-20,175],
sm71=[0,-4,0,-4,0,-8,4],
sm72=[0,-4,0,-4,0,-12,176],
sm73=[0,177,177,177,-1,0,-4,0,-8,177,177,-2,177,177,177,177,177,177,-1,177,177,-2,177,177,177,177,-2,177,177,177,177,177,177,177,177,-1,177,-2,177,177,-5,177,-2,177,-2,177,-31,177,177,-3,177,177,177,177,177,177,177,-7,177,177,177,177,177,177],
sm74=[0,-2,3,-1,0,-4,0,-8,178,-35,179,-65,42],
sm75=[0,180,180,180,-1,0,-4,0,-8,180,180,-2,180,180,180,180,180,180,-1,180,180,-2,180,180,180,180,-2,180,180,180,180,180,180,180,180,-1,180,-2,180,180,-5,180,-2,180,-2,180,-31,180,180,-3,180,180,180,180,180,180,180,-7,180,180,180,180,180,180],
sm76=[0,-2,3,-1,0,-4,0,-20,181,-89,42],
sm77=[0,-2,182,-1,0,-4,0,-8,182,-8,182,-92,182],
sm78=[0,-2,183,-1,0,-4,0,-8,183,-8,183,-92,183],
sm79=[0,184,184,184,-1,0,-4,0,-8,184,184,-2,184,184,184,184,184,184,-1,184,184,-2,184,184,184,184,-2,184,184,184,184,184,184,184,184,-1,184,-2,184,184,-5,184,-2,184,-2,184,-31,184,184,-3,184,184,184,184,184,184,184,-7,184,184,184,184,184,184],
sm80=[0,-4,0,-4,0,-9,185],
sm81=[0,186,186,186,-1,0,-4,0,-8,186,186,-2,186,186,186,186,186,186,-1,186,186,-1,186,186,186,186,186,-2,186,186,186,186,186,186,186,186,-1,186,-2,186,186,-5,186,-2,186,-2,186,-31,186,186,-3,186,186,186,186,186,186,186,-7,186,186,186,186,186,186],
sm82=[0,-4,0,-4,0,-5,187,187,-2,187,-2,187,-8,187,-5,187,-9,187,-11,187,-18,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187],
sm83=[0,-4,0,-4,0,-5,188,188,-2,188,-2,188,-8,188,-5,188,-9,188,-11,188,-18,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188],
sm84=[0,-1,189,189,-1,0,-4,0,-8,189,-5,189,189,-1,189,-2,189,-8,189,-18,189,-2,189,-2,189,-31,189,189,-3,189,189,189,189,189,189,189,-7,189,189,189,189,189,189],
sm85=[0,-4,0,-4,0,-5,190,190,-2,190,-2,190,-8,190,-5,190,-9,190,-11,190,-18,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190],
sm86=[0,-4,0,-4,0,-5,59,59,-2,59,-2,59,-8,59,-5,59,-9,59,-11,59,-18,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
sm87=[0,-4,0,-4,0,-5,191,191,-1,191,191,-2,191,-4,191,-2,191,191,-5,191,191,-8,191,-11,191,191,-4,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,-5,191,191],
sm88=[0,-4,0,-4,0,-5,192,192,-1,192,192,-2,192,-4,192,-2,192,192,-5,192,192,-8,192,-11,192,192,-4,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,-5,192,192],
sm89=[0,-4,0,-4,0,-5,128,128,-1,128,128,-2,128,-4,128,-2,128,128,-5,128,128,-8,128,-11,128,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
sm90=[0,-1,2,3,-1,0,-4,0,-5,193,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,194,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm91=[0,-1,2,3,-1,0,-4,0,-9,196,-7,197,-28,198,199,-5,200,-51,37,38,-3,42],
sm92=[0,-4,0,-4,0,-5,201,201,-1,201,201,-2,201,-4,201,-2,201,201,-5,201,201,-8,201,-11,201,201,-4,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,-5,201,201],
sm93=[0,-4,0,-4,0,-5,202,202,-1,202,202,-2,202,-4,202,-2,202,202,-5,202,202,-8,202,-11,202,202,-4,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,-5,202,202],
sm94=[0,-4,0,-4,0,-5,203,203,-2,203,-2,203,-8,203,-5,203,-9,203,-11,203,-18,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203],
sm95=[0,-4,0,-4,0,-5,204,204,-2,204,-2,204,-8,204,-5,204,-9,204,-11,204,-18,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204],
sm96=[0,-4,0,-4,0,-5,205,205,-2,205,-2,205,-8,205,-5,205,-9,205,-11,205,-18,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205],
sm97=[0,-4,0,-4,0,-5,206,206,-2,206,-2,206,-8,206,-5,206,-9,206,-11,206,-18,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206],
sm98=[0,-4,0,-4,0,-5,207,207,-2,207,-2,207,-8,207,-5,207,-9,207,-11,207,-18,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207],
sm99=[0,-4,0,-4,0,-5,208,208,-2,208,-2,208,-8,208,-5,208,-9,208,-11,208,-18,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208],
sm100=[0,-4,0,-4,0,-5,209,209,-2,209,-2,209,-8,209,-5,209,-9,209,-11,209,-18,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209],
sm101=[0,-4,0,-4,0,-5,210,210,-2,210,-2,210,-8,210,-5,210,-9,210,-11,210,-18,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210],
sm102=[0,-2,3,-1,0,-4,0,-110,42],
sm103=[0,-4,0,-4,0,-5,211,211,-1,211,211,-2,211,-4,211,-2,211,211,-5,211,211,-8,211,-11,211,211,-4,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,-5,211,211],
sm104=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,212,-7,15,-18,25,-2,26,-1,213,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm105=[0,-4,0,-4,0,-5,214,214,-1,214,214,-2,214,-4,214,-2,214,214,-5,214,214,-8,214,-11,214,214,-4,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,-5,214,214],
sm106=[0,-4,0,-4,0,-5,215,215,-1,215,215,-2,215,-8,215,-5,215,215,-8,215,-11,215,-5,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,-5,215,215],
sm107=[0,-4,0,-4,0,-52,216],
sm108=[0,-4,0,-4,0,-17,157,-32,158],
sm109=[0,-2,217,-1,0,-4,0,-5,217,217,-1,217,217,-2,217,-4,217,-2,217,217,-5,217,217,-8,217,-5,217,217,-4,217,217,-4,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,-5,217,217,-12,217],
sm110=[0,-1,138,139,-1,140,141,142,143,144,0,-105,218],
sm111=[0,-4,0,-4,0,-5,219,219,-1,219,219,-2,219,-4,219,-2,219,219,-5,219,219,-8,219,-11,219,219,-4,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,-5,219,219],
sm112=[0,-1,220,220,-1,220,220,220,220,220,0,-105,220],
sm113=[0,-1,221,221,-1,221,221,221,221,221,0,-105,221],
sm114=[0,-1,146,147,-1,148,149,150,151,152,0,-106,222],
sm115=[0,-1,223,223,-1,223,223,223,223,223,0,-106,223],
sm116=[0,-1,224,224,-1,224,224,224,224,224,0,-106,224],
sm117=[0,-4,0,-4,0,-5,225,225,-1,225,225,-2,225,-4,225,-2,225,225,-5,225,225,-8,225,-5,225,-5,225,225,-4,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,-5,225,225],
sm118=[0,-4,0,-4,0,-5,226,-15,227],
sm119=[0,-4,0,-4,0,-5,128,128,-2,128,-2,128,-4,128,-2,128,128,-5,128,128,-8,128,-5,130,-5,128,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
sm120=[0,-4,0,-4,0,-5,228,228,-1,228,228,-2,228,-4,228,-2,228,228,-5,228,228,-8,228,-11,228,228,-4,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,-5,228,228],
sm121=[0,-4,0,-4,0,-5,229,229,-2,229,-2,229,-8,229,-5,229,-9,229,-11,229,-18,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229],
sm122=[0,-1,2,3,-1,0,-4,0,-8,230,-5,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm123=[0,231,231,231,-1,0,-4,0,-8,231,231,-2,231,231,231,231,231,231,-1,231,231,-1,231,231,231,231,231,-2,231,231,231,231,231,231,231,231,-1,231,-2,231,231,-5,231,-2,231,-2,231,-31,231,231,-3,231,231,231,231,231,231,231,-7,231,231,231,231,231,231],
sm124=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,-4,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,-6,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm125=[0,-4,0,-4,0,-5,232,-6,233],
sm126=[0,-4,0,-4,0,-5,234,-6,234],
sm127=[0,-4,0,-4,0,-5,235,-6,235,-42,236],
sm128=[0,-4,0,-4,0,-55,236],
sm129=[0,-4,0,-4,0,-5,130,-2,130,130,-2,130,-7,130,130,-5,130,130,-15,130,-4,130,-5,130],
sm130=[0,-4,0,-4,0,-5,237,-3,237,-11,237,-5,237,237,-20,237,-5,237],
sm131=[0,-1,2,3,-1,0,-4,0,-9,238,-7,197,-35,239,-51,37,38,-3,42],
sm132=[0,-2,3,-1,0,-4,0,-5,193,-2,163,-8,164,-31,240,-3,241,-56,42],
sm133=[0,-4,0,-4,0,-24,242],
sm134=[0,-1,2,3,-1,0,-4,0,-8,113,-3,243,-1,6,7,8,114,-2,10,-5,244,-2,15,-12,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm135=[0,-4,0,-4,0,-20,245],
sm136=[0,246,246,246,-1,0,-4,0,-8,246,246,-2,246,246,246,246,246,246,-1,246,246,-1,246,246,246,246,246,-2,246,246,246,246,246,246,246,246,-1,246,-2,246,246,-5,246,-2,246,-2,246,-31,246,246,-3,246,246,246,246,246,246,246,-7,246,246,246,246,246,246],
sm137=[0,-4,0,-4,0,-12,247],
sm138=[0,-4,0,-4,0,-12,129],
sm139=[0,248,248,248,-1,0,-4,0,-8,248,248,-2,248,248,248,248,248,248,-1,248,248,-1,248,248,248,248,248,-2,248,248,248,248,248,248,248,248,-1,248,-2,248,248,-5,248,-2,248,-2,248,-31,248,248,-3,248,248,248,248,248,248,248,-7,248,248,248,248,248,248],
sm140=[0,-4,0,-4,0,-12,249],
sm141=[0,250,250,250,-1,0,-4,0,-8,250,250,-2,250,250,250,250,250,250,-1,250,250,-1,250,250,250,250,250,-2,250,250,250,250,250,250,250,250,-1,250,-2,250,250,-5,250,-2,250,-2,250,-31,250,250,-3,250,250,250,250,250,250,250,-7,250,250,250,250,250,250],
sm142=[0,-4,0,-4,0,-12,251],
sm143=[0,-4,0,-4,0,-12,252],
sm144=[0,-4,0,-4,0,-39,253,254],
sm145=[0,255,255,255,-1,0,-4,0,-8,255,255,-2,255,255,255,255,255,255,-1,255,255,-1,255,255,255,255,255,-2,255,255,255,255,255,255,255,255,-1,255,-2,255,255,-5,255,-2,255,-2,255,-31,255,255,-3,255,255,255,255,255,255,255,-7,255,255,255,255,255,255],
sm146=[0,-4,0,-4,0,-8,178,-35,179],
sm147=[0,256,256,256,-1,0,-4,0,-5,256,256,-1,256,256,-2,256,256,256,256,256,256,-1,256,256,256,-1,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,-2,256,256,-5,256,256,256,256,-2,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,-7,256,256,256,256,256,256],
sm148=[0,-4,0,-4,0,-8,257],
sm149=[0,-1,2,3,-1,0,-4,0,-9,258,-2,259,-4,197,-27,260,198,199,-57,37,38,-3,42],
sm150=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-27,25,-2,26,-2,27,-50,37,38,39,40,41,42],
sm151=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-3,261,-31,241,-56,42],
sm152=[0,-4,0,-4,0,-20,262],
sm153=[0,-4,0,-4,0,-5,263,-6,264],
sm154=[0,-4,0,-4,0,-5,265,-6,265],
sm155=[0,266,266,266,-1,0,-4,0,-8,266,266,-2,266,266,266,266,266,266,-1,266,266,-1,266,266,266,266,266,-2,266,266,266,266,266,266,266,266,-1,266,266,266,266,266,-5,266,-2,266,-2,266,-31,266,266,-3,266,266,266,266,266,266,266,-7,266,266,266,266,266,266],
sm156=[0,-4,0,-4,0,-5,267,-6,267,-8,267,-15,267,-11,267],
sm157=[0,-4,0,-4,0,-5,268,-3,268,-2,268,-8,268,-15,268,-11,268],
sm158=[0,-4,0,-4,0,-37,269],
sm159=[0,-4,0,-4,0,-5,270,-3,270,-2,270,-8,270,-15,270,-11,270,-18,270,270,79],
sm160=[0,-4,0,-4,0,-5,271,-3,271,-2,271,-8,271,-15,271,-11,271,-18,271,271,271,81],
sm161=[0,-4,0,-4,0,-5,272,-3,272,-2,272,-8,272,-15,272,-11,272,-18,272,272,272,272,83],
sm162=[0,-4,0,-4,0,-5,273,-3,273,-2,273,-8,273,-15,273,-11,273,-18,273,273,273,273,273,85],
sm163=[0,-4,0,-4,0,-5,274,-3,274,-2,274,-8,274,-15,274,-11,274,-18,274,274,274,274,274,274,87,88,89,90],
sm164=[0,-4,0,-4,0,-5,275,-3,275,-2,275,-8,275,-5,92,-9,275,-11,275,-18,275,275,275,275,275,275,275,275,275,275,93,94,95,96,97],
sm165=[0,-4,0,-4,0,-5,276,-3,276,-2,276,-8,276,-5,92,-9,276,-11,276,-18,276,276,276,276,276,276,276,276,276,276,93,94,95,96,97],
sm166=[0,-4,0,-4,0,-5,277,-3,277,-2,277,-8,277,-5,92,-9,277,-11,277,-18,277,277,277,277,277,277,277,277,277,277,93,94,95,96,97],
sm167=[0,-4,0,-4,0,-5,278,-3,278,-2,278,-8,278,-5,92,-9,278,-11,278,-18,278,278,278,278,278,278,278,278,278,278,93,94,95,96,97],
sm168=[0,-4,0,-4,0,-5,279,-3,279,-2,279,-8,279,-5,279,-9,279,-11,279,-18,279,279,279,279,279,279,279,279,279,279,279,279,279,279,279,99,100,101],
sm169=[0,-4,0,-4,0,-5,280,-3,280,-2,280,-8,280,-5,280,-9,280,-11,280,-18,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,99,100,101],
sm170=[0,-4,0,-4,0,-5,281,-3,281,-2,281,-8,281,-5,281,-9,281,-11,281,-18,281,281,281,281,281,281,281,281,281,281,281,281,281,281,281,99,100,101],
sm171=[0,-4,0,-4,0,-5,282,-3,282,-2,282,-8,282,-5,282,-9,282,-11,282,-18,282,282,282,282,282,282,282,282,282,282,282,282,282,282,282,99,100,101],
sm172=[0,-4,0,-4,0,-5,283,-3,283,-2,283,-8,283,-5,283,-9,283,-11,283,-18,283,283,283,283,283,283,283,283,283,283,283,283,283,283,283,99,100,101],
sm173=[0,-4,0,-4,0,-5,284,-3,284,-2,284,-8,284,-5,284,-9,284,-11,284,-18,284,284,284,284,284,284,284,284,284,284,284,284,284,284,284,99,100,101],
sm174=[0,-4,0,-4,0,-5,285,-3,285,-2,285,-8,285,-5,285,-9,285,-11,285,-18,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,103,104],
sm175=[0,-4,0,-4,0,-5,286,-3,286,-2,286,-8,286,-5,286,-9,286,-11,286,-18,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,103,104],
sm176=[0,-4,0,-4,0,-5,287,-3,287,-2,287,-8,287,-5,287,-9,287,-11,287,-18,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,103,104],
sm177=[0,-4,0,-4,0,-5,288,106,-2,288,-2,288,-8,288,-5,288,-9,288,-11,288,-18,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,107,108],
sm178=[0,-4,0,-4,0,-5,289,106,-2,289,-2,289,-8,289,-5,289,-9,289,-11,289,-18,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,107,108],
sm179=[0,-4,0,-4,0,-5,290,290,-2,290,-2,290,-8,290,-5,290,-9,290,-11,290,-18,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290],
sm180=[0,-4,0,-4,0,-5,291,291,-2,291,-2,291,-8,291,-5,291,-9,291,-11,291,-18,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291],
sm181=[0,-4,0,-4,0,-5,292,292,-2,292,-2,292,-8,292,-5,292,-9,292,-11,292,-18,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292],
sm182=[0,-4,0,-4,0,-5,293,293,-2,293,-2,293,-8,293,-5,293,-9,293,-11,293,-18,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293],
sm183=[0,-4,0,-4,0,-5,294,294,-1,294,294,-2,294,-4,294,-2,294,294,-5,294,294,-8,294,-11,294,294,-4,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,-5,294,294],
sm184=[0,-1,2,3,-1,0,-4,0,-5,295,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,296,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm185=[0,-4,0,-4,0,-5,297,-43,298],
sm186=[0,-1,299,299,-1,0,-4,0,-5,299,-2,299,-5,299,299,-1,299,-2,299,-8,299,-18,299,299,-1,299,-1,299,299,-31,299,299,-3,299,299,299,299,299,299,299,-7,299,299,299,299,299,299],
sm187=[0,-4,0,-4,0,-5,300,-43,300],
sm188=[0,-4,0,-4,0,-5,301,301,-1,301,301,-2,301,-4,301,-2,301,301,-5,301,301,-8,301,-11,301,301,-4,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,-5,301,301],
sm189=[0,-4,0,-4,0,-5,302,-3,303],
sm190=[0,-4,0,-4,0,-5,304,-3,304],
sm191=[0,-4,0,-4,0,-5,305,-3,305],
sm192=[0,-4,0,-4,0,-5,305,-3,305,-45,236],
sm193=[0,-4,0,-4,0,-20,306,-16,307],
sm194=[0,-4,0,-4,0,-5,131,-3,131,-10,308,-16,308,-17,131],
sm195=[0,-1,2,3,-1,0,-4,0,-17,197,-87,37,38,-3,42],
sm196=[0,-4,0,-4,0,-20,309,-16,309],
sm197=[0,-4,0,-4,0,-20,308,-16,308],
sm198=[0,-4,0,-4,0,-5,310,310,-1,310,310,-2,310,-4,310,-2,310,310,-5,310,310,-8,310,-11,310,310,-4,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,-5,310,310],
sm199=[0,-4,0,-4,0,-49,311],
sm200=[0,-4,0,-4,0,-5,312,312,-1,312,312,-2,312,-4,312,-2,312,312,-5,312,312,-8,312,-11,312,312,-4,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,-5,312,312],
sm201=[0,-4,0,-4,0,-5,313,-15,314],
sm202=[0,-4,0,-4,0,-5,315,-15,315],
sm203=[0,-4,0,-4,0,-49,316],
sm204=[0,-4,0,-4,0,-5,317,317,-1,317,317,-2,317,-4,317,-2,317,317,-5,317,317,-8,317,-11,317,317,-4,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,-5,317,317],
sm205=[0,-4,0,-4,0,-5,318,318,-1,318,318,-2,318,-4,318,-2,318,318,-5,318,318,-8,318,-11,318,318,-4,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,-5,318,318],
sm206=[0,-4,0,-4,0,-5,319,319,-1,319,319,-2,319,-4,319,-2,319,319,-5,319,319,-8,319,-11,319,319,-4,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,-5,319,319],
sm207=[0,-4,0,-4,0,-5,320,320,-1,320,320,-2,320,-4,320,-2,320,320,-5,320,320,-8,320,-11,320,320,-4,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,-5,320,320],
sm208=[0,-1,321,321,-1,321,321,321,321,321,0,-105,321],
sm209=[0,-1,322,322,-1,322,322,322,322,322,0,-106,322],
sm210=[0,-4,0,-4,0,-5,323,323,-1,323,323,-2,323,-4,323,-2,323,323,-5,323,323,-8,323,-5,323,-5,323,323,-4,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,-5,323,323],
sm211=[0,-4,0,-4,0,-21,324,-31,325],
sm212=[0,-4,0,-4,0,-21,326],
sm213=[0,-4,0,-4,0,-21,327],
sm214=[0,-4,0,-4,0,-5,328,328,-1,328,328,-2,328,-4,328,-2,328,328,-5,328,328,-8,328,-11,328,328,-4,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,-5,328,328],
sm215=[0,-4,0,-4,0,-49,329],
sm216=[0,-4,0,-4,0,-5,330,-3,330,-2,330,-8,330,-15,330,-11,330],
sm217=[0,-4,0,-4,0,-5,331,-3,331,-2,331,-8,331,-15,331,-11,331],
sm218=[0,332,332,332,-1,0,-4,0,-8,332,332,-2,332,332,332,332,332,332,-1,332,332,-1,332,332,332,332,332,-2,332,332,332,332,332,332,332,332,-1,332,-2,332,332,-5,332,-2,332,-2,332,-31,332,332,-3,332,332,332,332,332,332,332,-7,332,332,332,332,332,332],
sm219=[0,333,333,333,-1,0,-4,0,-8,333,333,-2,333,333,333,333,333,333,-1,333,333,-1,333,333,333,333,333,-2,333,333,333,333,333,333,333,333,-1,333,-2,333,333,-5,333,-2,333,-2,333,-31,333,333,-3,333,333,333,333,333,333,333,-7,333,333,333,333,333,333],
sm220=[0,334,334,334,-1,0,-4,0,-8,334,334,-2,334,334,334,334,334,334,-1,334,334,-1,334,334,334,334,334,-2,334,334,334,334,334,334,334,334,-1,334,-2,334,334,-5,334,-2,334,-2,334,-31,334,334,-3,334,334,334,334,334,334,334,-7,334,334,334,334,334,334],
sm221=[0,-4,0,-4,0,-5,335,-6,335],
sm222=[0,-4,0,-4,0,-5,336,-3,336,-11,336,-5,336,336,-20,336,-5,336],
sm223=[0,-4,0,-4,0,-9,337],
sm224=[0,-4,0,-4,0,-5,338,-3,339],
sm225=[0,-4,0,-4,0,-5,340,-3,340],
sm226=[0,-4,0,-4,0,-5,341,-3,341],
sm227=[0,-4,0,-4,0,-37,342],
sm228=[0,-4,0,-4,0,-5,343,-3,343,-11,343,-27,343,-5,236],
sm229=[0,-4,0,-4,0,-5,344,-3,344,-11,344,-5,344,344,-20,344,-5,344],
sm230=[0,-2,3,-1,0,-4,0,-5,295,-2,163,-8,164,-31,345,-3,241,-56,42],
sm231=[0,-4,0,-4,0,-49,346],
sm232=[0,-4,0,-4,0,-5,347,-43,348],
sm233=[0,-4,0,-4,0,-5,349,-43,349],
sm234=[0,-4,0,-4,0,-5,350,-43,350],
sm235=[0,-4,0,-4,0,-5,351,-3,351,-11,351,-27,351],
sm236=[0,-4,0,-4,0,-5,351,-3,351,-11,351,-27,351,-5,236],
sm237=[0,-4,0,-4,0,-21,352],
sm238=[0,-4,0,-4,0,-20,353],
sm239=[0,-4,0,-4,0,-21,354],
sm240=[0,-4,0,-4,0,-12,355],
sm241=[0,-1,2,3,-1,0,-4,0,-8,113,-3,356,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm242=[0,-1,2,3,-1,0,-4,0,-8,113,-3,357,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm243=[0,-4,0,-4,0,-5,59,59,-5,59,-14,358,359,-26,60,61,62,63,64,65,66,67,68,69,70,71,72,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
sm244=[0,-4,0,-4,0,-27,360,361],
sm245=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,8,114,-2,10,-5,362,-15,24,-5,25,-2,26,-2,27,-50,37,38,39,40,41,42],
sm246=[0,-4,0,-4,0,-21,363],
sm247=[0,364,364,364,-1,0,-4,0,-8,364,364,-2,364,364,364,364,364,364,-1,364,364,-1,364,364,364,364,364,-2,364,364,364,364,364,364,364,364,-1,364,-2,364,364,-5,364,-2,364,-2,364,-31,364,364,-3,364,364,364,364,364,364,364,-7,364,364,364,364,364,364],
sm248=[0,365,365,365,-1,0,-4,0,-8,365,365,-2,365,365,365,365,365,365,-1,365,365,-1,365,365,365,365,365,-2,365,365,365,365,365,365,365,365,-1,365,-2,365,365,-5,365,-2,365,-2,365,-31,365,365,-3,365,365,365,365,365,365,365,-7,365,365,365,365,365,365],
sm249=[0,366,366,366,-1,0,-4,0,-8,366,366,-2,366,366,366,366,366,366,-1,366,366,-1,366,366,366,366,366,-2,366,366,366,366,366,366,366,366,-1,366,-2,366,366,-5,366,-2,366,-2,366,-31,366,366,-3,366,366,366,366,366,366,366,-7,366,366,366,366,366,366],
sm250=[0,-4,0,-4,0,-21,367],
sm251=[0,368,368,368,-1,0,-4,0,-8,368,368,-2,368,368,368,368,368,368,-1,368,368,-1,368,368,368,368,368,-2,368,368,368,368,368,368,368,368,-1,368,-2,368,368,-5,368,-2,368,-2,368,-31,368,368,-3,368,368,368,368,368,368,368,-7,368,368,368,368,368,368],
sm252=[0,369,369,369,-1,0,-4,0,-8,369,369,-2,369,369,369,369,369,369,-1,369,369,-1,369,369,369,369,369,-2,369,369,369,369,369,369,369,369,-1,369,-1,254,369,369,-5,369,-2,369,-2,369,-31,369,369,-3,369,369,369,369,369,369,369,-7,369,369,369,369,369,369],
sm253=[0,370,370,370,-1,0,-4,0,-8,370,370,-2,370,370,370,370,370,370,-1,370,370,-1,370,370,370,370,370,-2,370,370,370,370,370,370,370,370,-1,370,-2,370,370,-5,370,-2,370,-2,370,-31,370,370,-3,370,370,370,370,370,370,370,-7,370,370,370,370,370,370],
sm254=[0,-4,0,-4,0,-20,371],
sm255=[0,372,372,372,-1,0,-4,0,-5,372,372,-1,372,372,-2,372,372,372,372,372,372,-1,372,372,372,-1,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,-2,372,372,-5,372,372,372,372,-2,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,-7,372,372,372,372,372,372],
sm256=[0,-1,2,3,-1,0,-4,0,-9,373,-2,259,-4,197,-27,260,198,199,-57,37,38,-3,42],
sm257=[0,-4,0,-4,0,-9,374],
sm258=[0,375,375,375,-1,0,-4,0,-5,375,375,-1,375,375,-2,375,375,375,375,375,375,-1,375,375,375,-1,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,-2,375,375,-5,375,375,375,375,-2,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,-7,375,375,375,375,375,375],
sm259=[0,-1,2,3,-1,0,-4,0,-9,376,-2,259,-4,197,-27,260,198,199,-57,37,38,-3,42],
sm260=[0,-1,377,377,-1,0,-4,0,-9,377,-2,377,-4,377,-27,377,377,377,-57,377,377,-3,377],
sm261=[0,-1,378,378,-1,0,-4,0,-9,378,-2,378,-4,378,-27,378,378,378,-57,378,378,-3,378],
sm262=[0,-1,2,3,-1,0,-4,0,-17,197,-28,198,199,-57,37,38,-3,42],
sm263=[0,-4,0,-4,0,-20,306],
sm264=[0,-4,0,-4,0,-20,308],
sm265=[0,-4,0,-4,0,-8,379],
sm266=[0,-4,0,-4,0,-21,380],
sm267=[0,-4,0,-4,0,-21,381],
sm268=[0,-4,0,-4,0,-5,382,-15,381],
sm269=[0,-4,0,-4,0,-21,383],
sm270=[0,-4,0,-4,0,-5,384,-15,384],
sm271=[0,-4,0,-4,0,-5,385,-15,385],
sm272=[0,386,386,386,-1,0,-4,0,-8,386,386,-2,386,386,386,386,386,386,-1,386,386,-2,386,386,386,386,-2,386,386,386,386,386,386,386,386,-1,386,-2,386,386,-5,386,-2,386,-2,386,-31,386,386,-3,386,386,386,386,386,386,386,-7,386,386,386,386,386,386],
sm273=[0,-4,0,-4,0,-5,387,-6,387],
sm274=[0,-4,0,-4,0,-5,388,388,-1,388,388,-2,388,-4,388,-2,388,388,-5,388,388,-8,388,-11,388,388,-4,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,-5,388,388],
sm275=[0,-1,389,389,-1,0,-4,0,-5,389,-2,389,-5,389,389,-1,389,-2,389,-8,389,-18,389,389,-1,389,-1,389,389,-31,389,389,-3,389,389,389,389,389,389,389,-7,389,389,389,389,389,389],
sm276=[0,-4,0,-4,0,-5,390,-43,390],
sm277=[0,-4,0,-4,0,-5,391,391,-1,391,391,-2,391,-4,391,-2,391,391,-5,391,391,-8,391,-11,391,391,-4,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,-5,391,391],
sm278=[0,-4,0,-4,0,-5,295,-43,392],
sm279=[0,-1,2,3,-1,0,-4,0,-5,193,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,299,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm280=[0,-4,0,-4,0,-5,393,-43,393],
sm281=[0,-4,0,-4,0,-5,394,394,-1,394,394,-2,394,-4,394,-2,394,394,-5,394,394,-8,394,-11,394,394,-4,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,-5,394,394],
sm282=[0,-1,2,3,-1,0,-4,0,-9,395,-7,197,-28,198,199,-5,200,-51,37,38,-3,42],
sm283=[0,-4,0,-4,0,-5,396,-3,396],
sm284=[0,-4,0,-4,0,-5,397,-3,397],
sm285=[0,-4,0,-4,0,-20,398],
sm286=[0,-4,0,-4,0,-20,399],
sm287=[0,-4,0,-4,0,-49,400],
sm288=[0,-4,0,-4,0,-5,401,401,-1,401,401,-2,401,-4,401,-2,401,401,-5,401,401,-8,401,-11,401,401,-4,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,-5,401,401],
sm289=[0,-4,0,-4,0,-5,402,402,-1,402,402,-2,402,-4,402,-2,402,402,-5,402,402,-8,402,-11,402,402,-4,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,-5,402,402],
sm290=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,403,-7,15,-18,25,-2,26,-1,404,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm291=[0,-4,0,-4,0,-5,405,-15,405],
sm292=[0,-4,0,-4,0,-5,406,406,-1,406,406,-2,406,-4,406,-2,406,406,-5,406,406,-8,406,-11,406,406,-4,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,-5,406,406],
sm293=[0,-4,0,-4,0,-5,407,407,-1,407,407,-2,407,-4,407,-2,407,407,-5,407,407,-8,407,-5,407,-5,407,407,-4,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,-5,407,407],
sm294=[0,-4,0,-4,0,-5,408,408,-1,408,408,-2,408,-4,408,-2,408,408,-5,408,408,-8,408,-5,408,-5,408,408,-4,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,-5,408,408],
sm295=[0,-4,0,-4,0,-5,409,409,-1,409,409,-2,409,-4,409,-2,409,409,-5,409,409,-8,409,-11,409,409,-4,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,-5,409,409],
sm296=[0,-4,0,-4,0,-9,410],
sm297=[0,-4,0,-4,0,-9,411],
sm298=[0,-4,0,-4,0,-5,412,-6,412],
sm299=[0,-4,0,-4,0,-5,413,-3,413,-2,413,-8,413,-27,413],
sm300=[0,-4,0,-4,0,-5,414,-3,414,-11,414,-5,414,414,-20,414,-5,414],
sm301=[0,-1,2,3,-1,0,-4,0,-9,415,-7,197,-35,239,-51,37,38,-3,42],
sm302=[0,-4,0,-4,0,-9,416],
sm303=[0,-4,0,-4,0,-5,417,-3,417,-11,417,-27,417],
sm304=[0,-4,0,-4,0,-49,418],
sm305=[0,-4,0,-4,0,-5,419,-3,419,-11,419,-5,419,419,-20,419,-5,419],
sm306=[0,-4,0,-4,0,-5,420,-43,420],
sm307=[0,-2,3,-1,0,-4,0,-5,193,-2,163,-8,164,-31,421,-3,241,-56,42],
sm308=[0,-4,0,-4,0,-21,422,-27,422],
sm309=[0,-4,0,-4,0,-5,423,-3,423,-11,423,-27,423],
sm310=[0,-1,2,3,-1,0,-4,0,-8,113,-3,424,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm311=[0,-4,0,-4,0,-12,425],
sm312=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,426,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm313=[0,-4,0,-4,0,-5,232,-6,427],
sm314=[0,-4,0,-4,0,-27,428,429],
sm315=[0,-4,0,-4,0,-5,235,-6,235,-14,430,430,-26,236],
sm316=[0,-4,0,-4,0,-27,430,430,-26,236],
sm317=[0,-4,0,-4,0,-12,431],
sm318=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,432,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm319=[0,-4,0,-4,0,-27,433,433],
sm320=[0,-4,0,-4,0,-28,434],
sm321=[0,-4,0,-4,0,-28,435],
sm322=[0,-4,0,-4,0,-8,436],
sm323=[0,437,437,437,-1,0,-4,0,-8,437,437,-2,437,437,437,437,437,437,-1,437,437,-1,437,437,437,437,437,-2,437,437,437,437,437,437,437,437,-1,437,-2,437,437,-5,437,-2,437,-2,437,-31,437,437,-3,437,437,437,437,437,437,437,-7,437,437,437,437,437,437],
sm324=[0,438,438,438,-1,0,-4,0,-8,438,438,-2,438,438,438,438,438,438,-1,438,438,-1,438,438,438,438,438,-2,438,438,438,438,438,438,438,438,-1,438,-2,438,438,-5,438,-2,438,-2,438,-31,438,438,-3,438,438,438,438,438,438,438,-7,438,438,438,438,438,438],
sm325=[0,-4,0,-4,0,-9,439],
sm326=[0,440,440,440,-1,0,-4,0,-5,440,440,-1,440,440,-2,440,440,440,440,440,440,-1,440,440,440,-1,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,-2,440,440,-5,440,440,440,440,-2,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,-7,440,440,440,440,440,440],
sm327=[0,441,441,441,-1,0,-4,0,-5,441,441,-1,441,441,-2,441,441,441,441,441,441,-1,441,441,441,-1,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,-2,441,441,-5,441,441,441,441,-2,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,-7,441,441,441,441,441,441],
sm328=[0,-1,442,442,-1,0,-4,0,-9,442,-2,442,-4,442,-27,442,442,442,-57,442,442,-3,442],
sm329=[0,-1,443,443,-1,0,-4,0,-9,443,-2,443,-4,443,-27,443,443,443,-57,443,443,-3,443],
sm330=[0,-4,0,-4,0,-8,444],
sm331=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-3,445,-31,241,-56,42],
sm332=[0,-4,0,-4,0,-21,446],
sm333=[0,-4,0,-4,0,-5,447,-6,447],
sm334=[0,-4,0,-4,0,-5,448,-3,448,-2,448,-8,448,-15,448,-11,448],
sm335=[0,-4,0,-4,0,-5,449,449,-1,449,449,-2,449,-4,449,-2,449,449,-5,449,449,-8,449,-11,449,449,-4,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,-5,449,449],
sm336=[0,-4,0,-4,0,-5,450,-43,450],
sm337=[0,-1,2,3,-1,0,-4,0,-5,295,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm338=[0,-4,0,-4,0,-5,451,451,-1,451,451,-2,451,-4,451,-2,451,451,-5,451,451,-8,451,-11,451,451,-4,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,-5,451,451],
sm339=[0,-4,0,-4,0,-5,452,-3,452],
sm340=[0,-4,0,-4,0,-5,453,-3,453],
sm341=[0,-4,0,-4,0,-21,454],
sm342=[0,-4,0,-4,0,-21,455],
sm343=[0,-4,0,-4,0,-21,456],
sm344=[0,-4,0,-4,0,-20,457,-16,457],
sm345=[0,-4,0,-4,0,-5,458,458,-1,458,458,-2,458,-4,458,-2,458,458,-5,458,458,-8,458,-11,458,458,-4,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,-5,458,458],
sm346=[0,-4,0,-4,0,-5,459,-15,459],
sm347=[0,-4,0,-4,0,-21,460],
sm348=[0,-4,0,-4,0,-21,461],
sm349=[0,-4,0,-4,0,-5,462,-3,462,-2,462,-8,462,-15,462,-11,462],
sm350=[0,-4,0,-4,0,-9,463],
sm351=[0,-4,0,-4,0,-5,464,-3,464,-11,464,-5,464,464,-20,464,-5,464],
sm352=[0,-4,0,-4,0,-5,465,-3,465],
sm353=[0,-4,0,-4,0,-5,466,-3,466],
sm354=[0,-4,0,-4,0,-5,467,-3,467,-11,467,-5,467,467,-20,467,-5,467],
sm355=[0,-2,3,-1,0,-4,0,-5,295,-2,163,-8,164,-31,468,-3,241,-56,42],
sm356=[0,-4,0,-4,0,-49,469],
sm357=[0,-4,0,-4,0,-5,470,-43,470],
sm358=[0,471,471,471,-1,0,-4,0,-8,471,471,-2,471,471,471,471,471,471,-1,471,471,-1,472,471,471,471,471,-2,471,471,471,471,471,471,471,471,-1,471,-2,471,471,-5,471,-2,471,-2,471,-31,471,471,-3,471,471,471,471,471,471,471,-7,471,471,471,471,471,471],
sm359=[0,-4,0,-4,0,-21,473],
sm360=[0,474,474,474,-1,0,-4,0,-8,474,474,-2,474,474,474,474,474,474,-1,474,474,-1,474,474,474,474,474,-2,474,474,474,474,474,474,474,474,-1,474,-2,474,474,-5,474,-2,474,-2,474,-31,474,474,-3,474,474,474,474,474,474,474,-7,474,474,474,474,474,474],
sm361=[0,-4,0,-4,0,-12,475],
sm362=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,476,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm363=[0,-4,0,-4,0,-21,477],
sm364=[0,-1,2,3,-1,0,-4,0,-8,113,-3,478,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm365=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,479,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm366=[0,-4,0,-4,0,-21,480],
sm367=[0,-4,0,-4,0,-21,481],
sm368=[0,-4,0,-4,0,-21,482],
sm369=[0,-4,0,-4,0,-21,483],
sm370=[0,-4,0,-4,0,-21,484],
sm371=[0,-4,0,-4,0,-28,485],
sm372=[0,-4,0,-4,0,-28,430],
sm373=[0,486,486,486,-1,0,-4,0,-8,486,486,-2,486,486,486,486,486,486,-1,486,486,-1,486,486,486,486,486,-2,486,486,486,486,486,486,486,486,-1,486,-2,486,486,-5,486,-2,486,-2,486,-31,486,486,-3,486,486,486,486,486,486,486,-7,486,486,486,486,486,486],
sm374=[0,-4,0,-4,0,-9,487,-3,488,-22,489],
sm375=[0,490,490,490,-1,0,-4,0,-8,490,490,-2,490,490,490,490,490,490,-1,490,490,-1,490,490,490,490,490,-2,490,490,490,490,490,490,490,490,-1,490,-2,490,490,-5,490,-2,490,-2,490,-31,490,490,-3,490,490,490,490,490,490,490,-7,490,490,490,490,490,490],
sm376=[0,-4,0,-4,0,-21,491],
sm377=[0,-4,0,-4,0,-21,492],
sm378=[0,493,493,493,-1,0,-4,0,-5,493,493,-1,493,493,-2,493,493,493,493,493,493,-1,493,493,493,-1,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,-2,493,493,-5,493,493,493,493,-2,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,-7,493,493,493,493,493,493],
sm379=[0,-1,2,3,-1,0,-4,0,-8,4,494,-2,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm380=[0,-4,0,-4,0,-21,495],
sm381=[0,-4,0,-4,0,-5,496,-15,496],
sm382=[0,-4,0,-4,0,-8,497],
sm383=[0,-4,0,-4,0,-5,498,-43,498],
sm384=[0,-4,0,-4,0,-8,499],
sm385=[0,-4,0,-4,0,-8,500],
sm386=[0,-4,0,-4,0,-21,501],
sm387=[0,-4,0,-4,0,-21,502],
sm388=[0,-4,0,-4,0,-5,503,-15,503],
sm389=[0,-4,0,-4,0,-5,504,504,-1,504,504,-2,504,-4,504,-2,504,504,-5,504,504,-8,504,-5,504,-5,504,504,-4,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,-5,504,504],
sm390=[0,-4,0,-4,0,-5,505,-3,505,-11,505,-5,505,505,-20,505,-5,505],
sm391=[0,-4,0,-4,0,-5,506,-3,506,-11,506,-5,506,506,-20,506,-5,506],
sm392=[0,-4,0,-4,0,-49,507],
sm393=[0,-4,0,-4,0,-12,508],
sm394=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,509,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm395=[0,-4,0,-4,0,-21,510],
sm396=[0,-4,0,-4,0,-21,511],
sm397=[0,512,512,512,-1,0,-4,0,-8,512,512,-2,512,512,512,512,512,512,-1,512,512,-1,512,512,512,512,512,-2,512,512,512,512,512,512,512,512,-1,512,-2,512,512,-5,512,-2,512,-2,512,-31,512,512,-3,512,512,512,512,512,512,512,-7,512,512,512,512,512,512],
sm398=[0,-4,0,-4,0,-12,513],
sm399=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,514,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm400=[0,-4,0,-4,0,-21,515],
sm401=[0,-4,0,-4,0,-21,516],
sm402=[0,-4,0,-4,0,-21,517],
sm403=[0,518,518,518,-1,0,-4,0,-8,518,518,-2,518,518,518,518,518,518,-1,518,518,-1,518,518,518,518,518,-2,518,518,518,518,518,518,518,518,-1,518,-2,518,518,-5,518,-2,518,-2,518,-31,518,518,-3,518,518,518,518,518,518,518,-7,518,518,518,518,518,518],
sm404=[0,-4,0,-4,0,-21,519],
sm405=[0,-4,0,-4,0,-21,520],
sm406=[0,521,521,521,-1,0,-4,0,-8,521,521,-2,521,521,521,521,521,521,-1,521,521,-1,521,521,521,521,521,-2,521,521,521,521,521,521,521,521,-1,521,-2,521,521,-5,521,-2,521,-2,521,-31,521,521,-3,521,521,521,521,521,521,521,-7,521,521,521,521,521,521],
sm407=[0,-4,0,-4,0,-9,522,-3,488,-22,489],
sm408=[0,-4,0,-4,0,-9,523,-26,489],
sm409=[0,-4,0,-4,0,-9,524,-3,524,-22,524],
sm410=[0,-4,0,-4,0,-9,525,-26,525,526],
sm411=[0,-4,0,-4,0,-9,527],
sm412=[0,-4,0,-4,0,-9,528],
sm413=[0,-4,0,-4,0,-8,529],
sm414=[0,-4,0,-4,0,-5,530,-3,530,-11,530,-5,530,530,-20,530,-5,530],
sm415=[0,531,531,531,-1,0,-4,0,-8,531,531,-2,531,531,531,531,531,531,-1,531,531,-1,531,531,531,531,531,-2,531,531,531,531,531,531,531,531,-1,531,-2,531,531,-5,531,-2,531,-2,531,-31,531,531,-3,531,531,531,531,531,531,531,-7,531,531,531,531,531,531],
sm416=[0,532,532,532,-1,0,-4,0,-8,532,532,-2,532,532,532,532,532,532,-1,532,532,-1,532,532,532,532,532,-2,532,532,532,532,532,532,532,532,-1,532,-2,532,532,-5,532,-2,532,-2,532,-31,532,532,-3,532,532,532,532,532,532,532,-7,532,532,532,532,532,532],
sm417=[0,-4,0,-4,0,-21,533],
sm418=[0,534,534,534,-1,0,-4,0,-8,534,534,-2,534,534,534,534,534,534,-1,534,534,-1,534,534,534,534,534,-2,534,534,534,534,534,534,534,534,-1,534,-2,534,534,-5,534,-2,534,-2,534,-31,534,534,-3,534,534,534,534,534,534,534,-7,534,534,534,534,534,534],
sm419=[0,535,535,535,-1,0,-4,0,-8,535,535,-2,535,535,535,535,535,535,-1,535,535,-1,535,535,535,535,535,-2,535,535,535,535,535,535,535,535,-1,535,-2,535,535,-5,535,-2,535,-2,535,-31,535,535,-3,535,535,535,535,535,535,535,-7,535,535,535,535,535,535],
sm420=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,536,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm421=[0,-4,0,-4,0,-21,537],
sm422=[0,538,538,538,-1,0,-4,0,-8,538,538,-2,538,538,538,538,538,538,-1,538,538,-1,538,538,538,538,538,-2,538,538,538,538,538,538,538,538,-1,538,-2,538,538,-5,538,-2,538,-2,538,-31,538,538,-3,538,538,538,538,538,538,538,-7,538,538,538,538,538,538],
sm423=[0,539,539,539,-1,0,-4,0,-8,539,539,-2,539,539,539,539,539,539,-1,539,539,-1,539,539,539,539,539,-2,539,539,539,539,539,539,539,539,-1,539,-2,539,539,-5,539,-2,539,-2,539,-31,539,539,-3,539,539,539,539,539,539,539,-7,539,539,539,539,539,539],
sm424=[0,540,540,540,-1,0,-4,0,-8,540,540,-2,540,540,540,540,540,540,-1,540,540,-1,540,540,540,540,540,-2,540,540,540,540,540,540,540,540,-1,540,-2,540,540,-5,540,-2,540,-2,540,-31,540,540,-3,540,540,540,540,540,540,540,-7,540,540,540,540,540,540],
sm425=[0,541,541,541,-1,0,-4,0,-8,541,541,-2,541,541,541,541,541,541,-1,541,541,-1,541,541,541,541,541,-2,541,541,541,541,541,541,541,541,-1,541,-2,541,541,-5,541,-2,541,-2,541,-31,541,541,-3,541,541,541,541,541,541,541,-7,541,541,541,541,541,541],
sm426=[0,-4,0,-4,0,-21,542],
sm427=[0,-4,0,-4,0,-9,543,-26,489],
sm428=[0,544,544,544,-1,0,-4,0,-8,544,544,-2,544,544,544,544,544,544,-1,544,544,-1,544,544,544,544,544,-2,544,544,544,544,544,544,544,544,-1,544,-2,544,544,-5,544,-2,544,-2,544,-31,544,544,-3,544,544,544,544,544,544,544,-7,544,544,544,544,544,544],
sm429=[0,-4,0,-4,0,-9,545,-3,545,-22,545],
sm430=[0,-4,0,-4,0,-9,546,-26,489],
sm431=[0,-4,0,-4,0,-37,547],
sm432=[0,548,548,548,-1,0,-4,0,-8,548,548,-2,548,548,548,548,548,548,-1,548,548,-1,548,548,548,548,548,-2,548,548,548,548,548,548,548,548,-1,548,-1,548,548,548,-5,548,-2,548,-2,548,-31,548,548,-3,548,548,548,548,548,548,548,-7,548,548,548,548,548,548],
sm433=[0,549,549,549,-1,0,-4,0,-5,549,549,-1,549,549,-2,549,549,549,549,549,549,-1,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,-2,549,549,-5,549,549,549,549,-2,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,-7,549,549,549,549,549,549],
sm434=[0,-4,0,-4,0,-9,550],
sm435=[0,-4,0,-4,0,-9,551],
sm436=[0,-4,0,-4,0,-9,552],
sm437=[0,553,553,553,-1,0,-4,0,-8,553,553,-2,553,553,553,553,553,553,-1,553,553,-1,553,553,553,553,553,-2,553,553,553,553,553,553,553,553,-1,553,-2,553,553,-5,553,-2,553,-2,553,-31,553,553,-3,553,553,553,553,553,553,553,-7,553,553,553,553,553,553],
sm438=[0,554,554,554,-1,0,-4,0,-8,554,554,-2,554,554,554,554,554,554,-1,554,554,-1,554,554,554,554,554,-2,554,554,554,554,554,554,554,554,-1,554,-2,554,554,-5,554,-2,554,-2,554,-31,554,554,-3,554,554,554,554,554,554,554,-7,554,554,554,554,554,554],
sm439=[0,555,555,555,-1,0,-4,0,-8,555,555,-2,555,555,555,555,555,555,-1,555,555,-1,555,555,555,555,555,-2,555,555,555,555,555,555,555,555,-1,555,-2,555,555,-5,555,-2,555,-2,555,-31,555,555,-3,555,555,555,555,555,555,555,-7,555,555,555,555,555,555],
sm440=[0,-4,0,-4,0,-21,556],
sm441=[0,557,557,557,-1,0,-4,0,-8,557,557,-2,557,557,557,557,557,557,-1,557,557,-1,557,557,557,557,557,-2,557,557,557,557,557,557,557,557,-1,557,-2,557,557,-5,557,-2,557,-2,557,-31,557,557,-3,557,557,557,557,557,557,557,-7,557,557,557,557,557,557],
sm442=[0,558,558,558,-1,0,-4,0,-8,558,558,-2,558,558,558,558,558,558,-1,558,558,-1,558,558,558,558,558,-2,558,558,558,558,558,558,558,558,-1,558,-2,558,558,-5,558,-2,558,-2,558,-31,558,558,-3,558,558,558,558,558,558,558,-7,558,558,558,558,558,558],
sm443=[0,559,559,559,-1,0,-4,0,-8,559,559,-2,559,559,559,559,559,559,-1,559,559,-1,559,559,559,559,559,-2,559,559,559,559,559,559,559,559,-1,559,-2,559,559,-5,559,-2,559,-2,559,-31,559,559,-3,559,559,559,559,559,559,559,-7,559,559,559,559,559,559],
sm444=[0,560,560,560,-1,0,-4,0,-8,560,560,-2,560,560,560,560,560,560,-1,560,560,-1,560,560,560,560,560,-2,560,560,560,560,560,560,560,560,-1,560,-2,560,560,-5,560,-2,560,-2,560,-31,560,560,-3,560,560,560,560,560,560,560,-7,560,560,560,560,560,560],
sm445=[0,561,561,561,-1,0,-4,0,-8,561,561,-2,561,561,561,561,561,561,-1,561,561,-1,561,561,561,561,561,-2,561,561,561,561,561,561,561,561,-1,561,-2,561,561,-5,561,-2,561,-2,561,-31,561,561,-3,561,561,561,561,561,561,561,-7,561,561,561,561,561,561],
sm446=[0,-4,0,-4,0,-9,562],
sm447=[0,563,563,563,-1,0,-4,0,-8,563,563,-2,563,563,563,563,563,563,-1,563,563,-1,563,563,563,563,563,-2,563,563,563,563,563,563,563,563,-1,563,-2,563,563,-5,563,-2,563,-2,563,-31,563,563,-3,563,563,563,563,563,563,563,-7,563,563,563,563,563,563],
sm448=[0,-1,2,3,-1,0,-4,0,-8,4,564,-2,5,564,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,564,-1,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
sm449=[0,-4,0,-4,0,-9,565,-26,565],
sm450=[0,566,566,566,-1,0,-4,0,-5,566,566,-1,566,566,-2,566,566,566,566,566,566,-1,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,-2,566,566,-5,566,566,566,566,-2,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,-7,566,566,566,566,566,566],
sm451=[0,-1,567,567,-1,0,-4,0,-5,567,-3,567,-2,567,-4,567,-27,567,567,567,-57,567,567,-3,567],
sm452=[0,-1,568,568,-1,0,-4,0,-5,568,-3,568,-2,568,-4,568,-27,568,568,568,-57,568,568,-3,568],
sm453=[0,-4,0,-4,0,-9,569],
sm454=[0,570,570,570,-1,0,-4,0,-8,570,570,-2,570,570,570,570,570,570,-1,570,570,-1,570,570,570,570,570,-2,570,570,570,570,570,570,570,570,-1,570,-2,570,570,-5,570,-2,570,-2,570,-31,570,570,-3,570,570,570,570,570,570,570,-7,570,570,570,570,570,570],
sm455=[0,571,571,571,-1,0,-4,0,-8,571,571,-2,571,571,571,571,571,571,-1,571,571,-1,571,571,571,571,571,-2,571,571,571,571,571,571,571,571,-1,571,-2,571,571,-5,571,-2,571,-2,571,-31,571,571,-3,571,571,571,571,571,571,571,-7,571,571,571,571,571,571],
sm456=[0,572,572,572,-1,0,-4,0,-8,572,572,-2,572,572,572,572,572,572,-1,572,572,-1,572,572,572,572,572,-2,572,572,572,572,572,572,572,572,-1,572,-2,572,572,-5,572,-2,572,-2,572,-31,572,572,-3,572,572,572,572,572,572,572,-7,572,572,572,572,572,572],
sm457=[0,573,573,573,-1,0,-4,0,-8,573,573,-2,573,573,573,573,573,573,-1,573,573,-1,573,573,573,573,573,-2,573,573,573,573,573,573,573,573,-1,573,-2,573,573,-5,573,-2,573,-2,573,-31,573,573,-3,573,573,573,573,573,573,573,-7,573,573,573,573,573,573],
sm458=[0,574,574,574,-1,0,-4,0,-8,574,574,-2,574,574,574,574,574,574,-1,574,574,-1,574,574,574,574,574,-2,574,574,574,574,574,574,574,574,-1,574,-2,574,574,-5,574,-2,574,-2,574,-31,574,574,-3,574,574,574,574,574,574,574,-7,574,574,574,574,574,574],
sm459=[0,-4,0,-4,0,-9,575,-3,575,-22,575],
sm460=[0,-1,576,576,-1,0,-4,0,-5,576,-3,576,-2,576,-4,576,-27,576,576,576,-57,576,576,-3,576],
sm461=[0,577,577,577,-1,0,-4,0,-8,577,577,-2,577,577,577,577,577,577,-1,577,577,-1,577,577,577,577,577,-2,577,577,577,577,577,577,577,577,-1,577,-2,577,577,-5,577,-2,577,-2,577,-31,577,577,-3,577,577,577,577,577,577,577,-7,577,577,577,577,577,577],

    // Symbol Lookup map
    lu = new Map([[1,1],[2,2],[4,3],[8,4],[16,5],[32,6],[64,7],[128,8],[256,9],[512,10],[3,11],[264,11],[200,13],["import",14],[",",15],["*",16],["as",17],["{",18],["}",19],["from",20],["export",21],[";",22],["default",23],["function",24],["class",25],["let",26],["[",27],["async",28],["if",29],["(",30],[")",31],["else",32],["do",33],["while",34],["for",35],["var",36],["in",37],["of",38],["await",39],["continue",40],["break",41],["return",42],["throw",43],["with",44],["switch",45],["case",46],[":",47],["try",48],["catch",49],["finally",50],["debugger",51],["const",52],["=>",53],["extends",54],["static",55],["get",56],["set",57],["new",58],["]",59],[".",60],["super",61],["target",62],["...",63],["this",64],["=",65],["*=",66],["/=",67],["%=",68],["+=",69],["-=",70],["<<=",71],[">>=",72],[">>>=",73],["&=",74],["^=",75],["|=",76],["**=",77],["?",78],["||",79],["&&",80],["|",81],["^",82],["&",83],["==",84],["!=",85],["===",86],["!==",87],["<",88],[">",89],["<=",90],[">=",91],["instanceof",92],["<<",93],[">>",94],[">>>",95],["+",96],["-",97],["/",98],["%",99],["**",100],["delete",101],["void",102],["typeof",103],["~",104],["!",105],["++",106],["--",107],[null,6],["\"",115],["'",116],["null",117],["true",118],["false",119],["$",120]]),

    //Reverse Symbol Lookup map
    rlu = new Map([[1,1],[2,2],[3,4],[4,8],[5,16],[6,32],[7,64],[8,128],[9,256],[10,512],[11,3],[11,264],[13,200],[14,"import"],[15,","],[16,"*"],[17,"as"],[18,"{"],[19,"}"],[20,"from"],[21,"export"],[22,";"],[23,"default"],[24,"function"],[25,"class"],[26,"let"],[27,"["],[28,"async"],[29,"if"],[30,"("],[31,")"],[32,"else"],[33,"do"],[34,"while"],[35,"for"],[36,"var"],[37,"in"],[38,"of"],[39,"await"],[40,"continue"],[41,"break"],[42,"return"],[43,"throw"],[44,"with"],[45,"switch"],[46,"case"],[47,":"],[48,"try"],[49,"catch"],[50,"finally"],[51,"debugger"],[52,"const"],[53,"=>"],[54,"extends"],[55,"static"],[56,"get"],[57,"set"],[58,"new"],[59,"]"],[60,"."],[61,"super"],[62,"target"],[63,"..."],[64,"this"],[65,"="],[66,"*="],[67,"/="],[68,"%="],[69,"+="],[70,"-="],[71,"<<="],[72,">>="],[73,">>>="],[74,"&="],[75,"^="],[76,"|="],[77,"**="],[78,"?"],[79,"||"],[80,"&&"],[81,"|"],[82,"^"],[83,"&"],[84,"=="],[85,"!="],[86,"==="],[87,"!=="],[88,"<"],[89,">"],[90,"<="],[91,">="],[92,"instanceof"],[93,"<<"],[94,">>"],[95,">>>"],[96,"+"],[97,"-"],[98,"/"],[99,"%"],[100,"**"],[101,"delete"],[102,"void"],[103,"typeof"],[104,"~"],[105,"!"],[106,"++"],[107,"--"],[6,null],[115,"\""],[116,"'"],[117,"null"],[118,"true"],[119,"false"],[120,"$"]]),

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
sm184,
sm185,
sm186,
sm187,
sm187,
sm31,
sm188,
sm189,
sm190,
sm191,
sm192,
sm191,
sm31,
sm193,
sm194,
sm195,
sm195,
sm196,
sm196,
sm197,
sm197,
sm31,
sm198,
sm199,
sm200,
sm201,
sm202,
sm31,
sm203,
sm204,
sm205,
sm206,
sm207,
sm208,
sm207,
sm209,
sm210,
sm211,
sm212,
sm213,
sm214,
sm215,
sm216,
sm217,
sm11,
sm218,
sm219,
sm219,
sm220,
sm59,
sm221,
sm31,
sm221,
sm222,
sm223,
sm224,
sm102,
sm225,
sm226,
sm227,
sm228,
sm229,
sm230,
sm231,
sm232,
sm59,
sm233,
sm234,
sm235,
sm236,
sm237,
sm238,
sm239,
sm240,
sm241,
sm59,
sm242,
sm243,
sm244,
sm59,
sm245,
sm246,
sm247,
sm248,
sm249,
sm250,
sm251,
sm252,
sm253,
sm254,
sm71,
sm255,
sm256,
sm257,
sm258,
sm259,
sm260,
sm261,
sm262,
sm261,
sm263,
sm264,
sm265,
sm266,
sm267,
sm268,
sm269,
sm270,
sm271,
sm151,
sm272,
sm59,
sm273,
sm273,
sm31,
sm274,
sm275,
sm276,
sm276,
sm277,
sm278,
sm279,
sm280,
sm281,
sm282,
sm283,
sm284,
sm31,
sm151,
sm285,
sm286,
sm287,
sm288,
sm289,
sm290,
sm291,
sm292,
sm293,
sm59,
sm294,
sm294,
sm295,
sm296,
sm297,
sm298,
sm299,
sm300,
sm300,
sm301,
sm302,
sm59,
sm303,
sm304,
sm305,
sm306,
sm305,
sm305,
sm307,
sm308,
sm308,
sm309,
sm63,
sm31,
sm63,
sm310,
sm311,
sm312,
sm313,
sm314,
sm315,
sm316,
sm317,
sm318,
sm31,
sm31,
sm31,
sm31,
sm319,
sm316,
sm316,
sm320,
sm59,
sm321,
sm59,
sm322,
sm63,
sm323,
sm59,
sm324,
sm325,
sm326,
sm327,
sm328,
sm329,
sm330,
sm331,
sm332,
sm333,
sm334,
sm335,
sm336,
sm336,
sm337,
sm338,
sm339,
sm340,
sm341,
sm342,
sm343,
sm59,
sm344,
sm345,
sm346,
sm31,
sm347,
sm348,
sm349,
sm350,
sm351,
sm352,
sm353,
sm354,
sm354,
sm355,
sm356,
sm357,
sm358,
sm359,
sm360,
sm361,
sm362,
sm31,
sm363,
sm63,
sm364,
sm31,
sm31,
sm365,
sm366,
sm63,
sm367,
sm368,
sm369,
sm370,
sm31,
sm371,
sm372,
sm372,
sm31,
sm373,
sm374,
sm375,
sm376,
sm377,
sm377,
sm378,
sm379,
sm380,
sm381,
sm382,
sm383,
sm384,
sm385,
sm386,
sm387,
sm388,
sm389,
sm389,
sm390,
sm391,
sm392,
sm391,
sm63,
sm393,
sm394,
sm395,
sm63,
sm396,
sm63,
sm397,
sm398,
sm399,
sm400,
sm401,
sm402,
sm63,
sm63,
sm403,
sm63,
sm63,
sm63,
sm63,
sm404,
sm31,
sm405,
sm406,
sm407,
sm408,
sm409,
sm31,
sm410,
sm71,
sm411,
sm412,
sm379,
sm379,
sm379,
sm413,
sm414,
sm415,
sm416,
sm417,
sm63,
sm63,
sm418,
sm63,
sm419,
sm420,
sm421,
sm63,
sm63,
sm63,
sm63,
sm422,
sm423,
sm424,
sm425,
sm424,
sm425,
sm63,
sm426,
sm63,
sm427,
sm428,
sm429,
sm430,
sm428,
sm431,
sm11,
sm432,
sm433,
sm434,
sm435,
sm436,
sm379,
sm63,
sm437,
sm438,
sm439,
sm440,
sm63,
sm63,
sm441,
sm442,
sm443,
sm444,
sm445,
sm63,
sm445,
sm446,
sm447,
sm447,
sm448,
sm449,
sm450,
sm451,
sm452,
sm453,
sm454,
sm63,
sm455,
sm456,
sm457,
sm458,
sm459,
sm460,
sm461],

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
e,
e,
e,
e,
e,
e,
e,
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
R0_statement_list4701_group_list=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[1]),sym[0])},
R1_statement_list4701_group_list=function (sym,env,lex,state,output,len) {return [sym[0]]},
C0_empty_statement=function (sym,env,lex,state,output,len) {this.type = "empty";},
R0_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[4],sym[6],sym[8])},
I1_iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = false;},
I2_iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = true;},
R3_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,sym[4],sym[6],sym[8])},
R4_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,sym[6],sym[8])},
R5_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[4],null,sym[8])},
R6_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,null,sym[4],sym[6])},
R7_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,null,sym[8])},
R8_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,null,null,sym[5])},
R9_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],sym[5],sym[7],sym[9])},
R10_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],sym[5],null,sym[9])},
R11_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],null,sym[7],sym[9])},
R12_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],null,null,sym[9])},
R13_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[3],null,sym[6])},
R14_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,sym[5],sym[6])},
R15_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,null,sym[5])},
R16_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_in_stmt(sym[2],sym[4],sym[6])},
R17_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_in_stmt(sym[3],sym[5],sym[7])},
R18_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[2],sym[4],sym[6])},
R19_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[3],sym[5],sym[7],true)},
R20_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[4],sym[6],sym[8],true)},
R0_continue_statement=function (sym,env,lex,state,output,len) {return new env.functions.continue_stmt(sym[1])},
R0_break_statement=function (sym,env,lex,state,output,len) {return new env.functions.break_stmt(sym[1])},
R0_case_block=function (sym,env,lex,state,output,len) {return []},
R1_case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2].concat(sym[3]))},
R2_case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2])},
R3_case_block=function (sym,env,lex,state,output,len) {return sym[1]},
R0_case_clauses=function (sym,env,lex,state,output,len) {return sym[0].concat(sym[1])},
R0_case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_stmt(sym[1],sym[3])},
R1_case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_stmt(sym[1])},
R0_default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_stmt(sym[2])},
R1_default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_stmt()},
R0_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],sym[2])},
R1_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],null,sym[2])},
R2_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],sym[2],sym[3])},
R0_variable_declaration_list=function (sym,env,lex,state,output,len) {return sym[0].push(sym[2])},
R0_let_or_const=function (sym,env,lex,state,output,len) {return "let"},
R1_let_or_const=function (sym,env,lex,state,output,len) {return "const"},
R0_function_declaration=function (sym,env,lex,state,output,len) {return new env.functions.funct_decl(null,sym[2],sym[5])},
R1_function_declaration=function (sym,env,lex,state,output,len) {return new env.functions.funct_decl(sym[1],sym[3],sym[6])},
R0_formal_parameters=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[2]),sym[0])},
R0_arrow_function=function (sym,env,lex,state,output,len) {return new env.functions.arrow(null,sym[0],sym[2])},
R0_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail(sym)},
R1_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([null,...sym[0]])},
R2_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([sym[0],null,null])},
R3_class_tail=function (sym,env,lex,state,output,len) {return null},
R0_class_element_list=function (sym,env,lex,state,output,len) {return sym[0].push(sym[1])},
R0_class_element=function (sym,env,lex,state,output,len) {return (sym[1].static = true,sym[1])},
R0_argument_list=function (sym,env,lex,state,output,len) {return (sym[0].push(new env.functions.spread_expr(env,sym.slice(2,4))),env[0])},
R0_element_list=function (sym,env,lex,state,output,len) {return [sym[1]]},
R0_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return new env.functions.spread_expr(env,sym.slice(1,3))},
R1_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return Array.isArray(sym[0]) ? (sym[1].push(new env.functions.spread_expr(env,sym.slice(3,5))),sym[1]) : [sym[0],new env.functions.spread_expr(env,sym.slice(3,5))]},
R0_string_literal38407_group_list=function (sym,env,lex,state,output,len) {return sym[0] + sym[1]},
R1_string_literal38407_group_list=function (sym,env,lex,state,output,len) {return sym[0] + ""},

    //Sparse Map Lookup
    lsm = (index, map) => {    if (map[0] == 0xFFFFFFFF) return map[index+1];    for (let i = 1, ind = 0, l = map.length, n = 0; i < l && ind <= index; i++) {        if (ind !== index) {            if ((n = map[i]) > -1) ind++;            else ind += -n;        } else return map[i];    }    return -1;},

    //State Action Functions
    state_funct = [(...v)=>((redn(20483,0,...v))),
()=>(338),
()=>(294),
()=>(102),
()=>(382),
()=>(462),
()=>(454),
()=>(470),
()=>(386),
()=>(342),
()=>(398),
()=>(402),
()=>(406),
()=>(378),
()=>(362),
()=>(414),
()=>(418),
()=>(422),
()=>(430),
()=>(426),
()=>(410),
()=>(434),
()=>(438),
()=>(474),
()=>(238),
()=>(346),
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
()=>(330),
()=>(334),
()=>(326),
()=>(318),
()=>(322),
()=>(298),
(...v)=>(redv(5,R0_javascript,1,0,...v)),
(...v)=>(redv(1031,R0_javascript,1,0,...v)),
(...v)=>(redv(20487,R0_javascript,1,0,...v)),
(...v)=>(redn(21511,1,...v)),
(...v)=>(rednv(24583,fn.stmts,1,0,...v)),
(...v)=>(redv(23559,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(redn(22535,1,...v)),
(...v)=>(redn(25607,1,...v)),
(...v)=>(redn(26631,1,...v)),
(...v)=>(redn(30727,1,...v)),
()=>(486),
()=>(490),
(...v)=>(rednv(92167,fn.expression_list,1,0,...v)),
(...v)=>(redv(91143,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(redn(90119,1,...v)),
(...v)=>(redn(116743,1,...v)),
(...v)=>(redn(132103,1,...v)),
()=>(494),
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
()=>(554),
()=>(502),
()=>(506),
(...v)=>(redn(118791,1,...v)),
()=>(558),
()=>(562),
(...v)=>(redn(119815,1,...v)),
()=>(566),
(...v)=>(redn(120839,1,...v)),
()=>(570),
(...v)=>(redn(121863,1,...v)),
()=>(574),
(...v)=>(redn(122887,1,...v)),
()=>(578),
(...v)=>(redn(123911,1,...v)),
()=>(582),
()=>(586),
()=>(590),
()=>(594),
(...v)=>(redn(124935,1,...v)),
()=>(618),
()=>(598),
()=>(602),
()=>(606),
()=>(610),
()=>(614),
(...v)=>(redn(125959,1,...v)),
()=>(622),
()=>(626),
()=>(630),
(...v)=>(redn(126983,1,...v)),
()=>(634),
()=>(638),
(...v)=>(redn(128007,1,...v)),
()=>(642),
()=>(646),
()=>(650),
(...v)=>(redn(129031,1,...v)),
(...v)=>(redn(130055,1,...v)),
(...v)=>(redn(131079,1,...v)),
()=>(654),
()=>(690),
()=>(686),
(...v)=>(redn(93191,1,...v)),
()=>(742),
()=>(746),
()=>(734),
(...v)=>(redn(94215,1,...v)),
()=>(750),
()=>(754),
()=>(770),
()=>(774),
(...v)=>(redn(95239,1,...v)),
(...v)=>(rednv(103431,fn.this_expr,1,0,...v)),
(...v)=>(redn(103431,1,...v)),
(...v)=>(redn(74759,1,...v)),
(...v)=>(redn(156679,1,...v)),
(...v)=>(redn(155655,1,...v)),
(...v)=>(redn(157703,1,...v)),
(...v)=>(redn(158727,1,...v)),
(...v)=>(rednv(161799,fn.identifier,1,0,...v)),
(...v)=>(redv(160775,R1_string_literal38407_group_list,1,0,...v)),
(...v)=>(redn(159751,1,...v)),
(...v)=>(redn(146439,1,...v)),
(...v)=>(rednv(154631,fn.bool_literal,1,0,...v)),
(...v)=>(rednv(153607,fn.null_literal,1,0,...v)),
()=>(806),
()=>(798),
()=>(794),
()=>(814),
()=>(818),
()=>(810),
()=>(802),
()=>(786),
()=>(846),
()=>(838),
()=>(834),
()=>(854),
()=>(858),
()=>(850),
()=>(842),
()=>(826),
(...v)=>(rednv(152583,fn.numeric_literal,1,0,...v)),
()=>(862),
()=>(870),
()=>(882),
()=>(878),
(...v)=>(redn(97287,1,...v)),
(...v)=>(redn(99335,1,...v)),
()=>(894),
()=>(902),
()=>(934),
()=>(938),
(...v)=>(rednv(32775,C0_empty_statement,1,0,...v)),
()=>(942),
(...v)=>(redn(29703,1,...v)),
()=>(950),
(...v)=>(shftf(954,I1_iteration_statement,...v)),
()=>(958),
()=>(962),
()=>(966),
()=>(978),
()=>(986),
()=>(994),
()=>(1006),
(...v)=>(redn(27655,1,...v)),
()=>(1022),
()=>(1026),
(...v)=>(redn(28679,1,...v)),
()=>(1030),
(...v)=>(redv(61447,R0_let_or_const,1,0,...v)),
(...v)=>(redv(61447,R1_let_or_const,1,0,...v)),
(...v)=>(redv(23563,R0_statement_list4701_group_list,2,0,...v)),
()=>(1054),
(...v)=>(rednv(33803,fn.expr_stmt,2,0,...v)),
(...v)=>(rednv(132107,fn.post_inc_expr,2,0,...v)),
(...v)=>(rednv(132107,fn.post_dec_expr,2,0,...v)),
(...v)=>(redn(117767,1,...v)),
(...v)=>(rednv(131083,fn.delete_expr,2,0,...v)),
(...v)=>(rednv(103431,fn.array_literal,1,0,...v)),
(...v)=>(rednv(103431,fn.object,1,0,...v)),
()=>(1182),
()=>(1170),
()=>(1194),
()=>(1198),
()=>(1258),
()=>(1234),
()=>(1238),
()=>(1222),
(...v)=>(redn(64519,1,...v)),
(...v)=>(redn(80903,1,...v)),
(...v)=>(rednv(131083,fn.void_expr,2,0,...v)),
(...v)=>(rednv(131083,fn.typeof_expr,2,0,...v)),
(...v)=>(rednv(131083,fn.plus_expr,2,0,...v)),
(...v)=>(rednv(131083,fn.negate_expr,2,0,...v)),
(...v)=>(rednv(131083,fn.unary_or_expr,2,0,...v)),
(...v)=>(rednv(131083,fn.unary_not_expr,2,0,...v)),
(...v)=>(rednv(132107,fn.pre_inc_expr,2,0,...v)),
(...v)=>(rednv(132107,fn.pre_dec_expr,2,0,...v)),
(...v)=>(rednv(99339,fn.call_expr,2,0,...v)),
()=>(1270),
()=>(1282),
(...v)=>(rednv(79883,fn.call_expr,2,0,...v)),
(...v)=>(rednv(94219,fn.new_expr,2,0,...v)),
()=>(1298),
(...v)=>(redv(160779,R0_string_literal38407_group_list,2,0,...v)),
()=>(1302),
(...v)=>(rednv(151563,fn.string_literal,2,0,...v)),
(...v)=>(redv(148487,R1_string_literal38407_group_list,1,0,...v)),
(...v)=>(redn(147463,1,...v)),
()=>(1310),
(...v)=>(redv(150535,R1_string_literal38407_group_list,1,0,...v)),
(...v)=>(redn(149511,1,...v)),
(...v)=>(redv(134155,R3_class_tail,2,0,...v)),
()=>(1322),
()=>(1318),
(...v)=>(redn(100363,2,...v)),
(...v)=>(rednv(133131,fn.await_expr,2,0,...v)),
()=>(1350),
(...v)=>(rednv(49163,fn.label_stmt,2,0,...v)),
()=>(1370),
()=>(1366),
(...v)=>(redv(58375,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(rednv(59399,fn.binding,1,0,...v)),
()=>(1378),
(...v)=>(redn(135175,1,...v)),
()=>(1386),
()=>(1398),
()=>(1418),
()=>(1434),
()=>(1458),
()=>(1470),
()=>(1474),
()=>(1494),
(...v)=>(rednv(38923,fn.continue_stmt,2,0,...v)),
()=>(1502),
(...v)=>(rednv(39947,fn.break_stmt,2,0,...v)),
()=>(1506),
(...v)=>(rednv(40971,fn.return_stmt,2,0,...v)),
()=>(1510),
()=>(1518),
()=>(1530),
()=>(1534),
(...v)=>(rednv(56331,fn.debugger_stmt,2,0,...v)),
(...v)=>(rednv(81931,fn.class_stmt,2,0,...v)),
()=>(1542),
()=>(1550),
()=>(1570),
()=>(1566),
(...v)=>((redn(67587,0,...v))),
()=>(1610),
()=>(1618),
()=>(1614),
(...v)=>(redv(62471,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(rednv(31759,fn.block,3,0,...v)),
(...v)=>(redv(91151,R0_formal_parameters,3,0,...v)),
(...v)=>(rednv(116751,fn.assign,3,0,...v)),
()=>(1630),
(...v)=>(rednv(119823,fn.or,3,0,...v)),
(...v)=>(rednv(120847,fn.and,3,0,...v)),
(...v)=>(rednv(121871,fn.bit_or,3,0,...v)),
(...v)=>(rednv(122895,fn.bit_xor,3,0,...v)),
(...v)=>(rednv(123919,fn.bit_and,3,0,...v)),
(...v)=>(rednv(124943,fn.eq,3,0,...v)),
(...v)=>(rednv(124943,fn.neq,3,0,...v)),
(...v)=>(rednv(124943,fn.strict_eq,3,0,...v)),
(...v)=>(rednv(124943,fn.strict_neq,3,0,...v)),
(...v)=>(rednv(125967,fn.lt,3,0,...v)),
(...v)=>(rednv(125967,fn.gt,3,0,...v)),
(...v)=>(rednv(125967,fn.lteq,3,0,...v)),
(...v)=>(rednv(125967,fn.gteq,3,0,...v)),
(...v)=>(rednv(125967,fn.instanceof_expr,3,0,...v)),
(...v)=>(rednv(125967,fn.in,3,0,...v)),
(...v)=>(rednv(126991,fn.l_shift,3,0,...v)),
(...v)=>(rednv(126991,fn.r_shift,3,0,...v)),
(...v)=>(rednv(126991,fn.r_shift_fill,3,0,...v)),
(...v)=>(rednv(128015,fn.add,3,0,...v)),
(...v)=>(rednv(128015,fn.sub,3,0,...v)),
(...v)=>(rednv(129039,fn.mult,3,0,...v)),
(...v)=>(rednv(129039,fn.div,3,0,...v)),
(...v)=>(rednv(129039,fn.mod,3,0,...v)),
(...v)=>(rednv(130063,fn.exp,3,0,...v)),
(...v)=>(redv(112651,R0_case_block,2,0,...v)),
()=>(1638),
()=>(1634),
()=>(1658),
()=>(1650),
(...v)=>(redn(114695,1,...v)),
(...v)=>(redv(113671,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(redv(104459,R3_class_tail,2,0,...v)),
()=>(1670),
()=>(1666),
(...v)=>(redv(105479,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(redn(106503,1,...v)),
()=>(1686),
()=>(1682),
(...v)=>(redn(108551,1,...v)),
(...v)=>(redn(107527,1,...v)),
(...v)=>(rednv(99343,fn.call_expr,3,0,...v)),
()=>(1702),
(...v)=>(redv(101387,R0_case_block,2,0,...v)),
()=>(1710),
()=>(1706),
(...v)=>(redv(102407,R1_statement_list4701_group_list,1,0,...v)),
()=>(1718),
(...v)=>(rednv(95247,fn.member,3,0,...v)),
(...v)=>(rednv(95247,fn.new_member_stmt,3,0,...v)),
(...v)=>(rednv(98319,fn.new_target_expr,3,0,...v)),
(...v)=>(rednv(151567,fn.string_literal,3,0,...v)),
(...v)=>(redv(148491,R0_string_literal38407_group_list,2,0,...v)),
(...v)=>(redv(150539,R0_string_literal38407_group_list,2,0,...v)),
(...v)=>(redv(134159,R3_case_block,3,0,...v)),
()=>(1722),
()=>(1726),
()=>(1730),
()=>(1734),
(...v)=>(rednv(96271,fn.supper_expr,3,0,...v)),
()=>(1738),
(...v)=>(redv(73743,R0_arrow_function,3,0,...v)),
(...v)=>(redn(75783,1,...v)),
(...v)=>(redv(50187,R3_case_block,2,0,...v)),
(...v)=>(redn(51207,1,...v)),
(...v)=>(rednv(57359,fn.var_stmt,3,0,...v)),
(...v)=>(rednv(59403,fn.binding,2,0,...v)),
(...v)=>(redn(136203,2,...v)),
()=>(1758),
()=>(1766),
()=>(1762),
(...v)=>(redn(139271,1,...v)),
(...v)=>(redn(142343,1,...v)),
()=>(1774),
(...v)=>(redn(144391,1,...v)),
(...v)=>(redn(137227,2,...v)),
()=>(1786),
()=>(1794),
()=>(1802),
()=>(1798),
(...v)=>(redn(140295,1,...v)),
(...v)=>(redn(141319,1,...v)),
(...v)=>(redn(143367,1,...v)),
()=>(1818),
()=>(1822),
()=>(1826),
()=>(1830),
()=>(1838),
()=>(1862),
()=>(1866),
()=>(1870),
()=>(1874),
()=>(1878),
()=>(1898),
()=>(1910),
(...v)=>(redv(38927,R0_continue_statement,3,0,...v)),
(...v)=>(redv(39951,R0_break_statement,3,0,...v)),
(...v)=>(rednv(40975,fn.return_stmt,3,0,...v)),
()=>(1914),
(...v)=>(rednv(41999,fn.throw_stmt,3,0,...v)),
(...v)=>(redv(52239,R0_try_statement,3,0,...v)),
(...v)=>(redv(52239,R1_try_statement,3,0,...v)),
()=>(1922),
(...v)=>(rednv(81935,fn.class_stmt,3,0,...v)),
()=>(1934),
()=>(1938),
(...v)=>(redv(82955,R3_class_tail,2,0,...v)),
(...v)=>(redn(84999,1,...v)),
(...v)=>(redv(86023,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(redn(87047,1,...v)),
(...v)=>(redv(83979,R3_case_block,2,0,...v)),
()=>(1950),
(...v)=>(redn(67591,1,...v)),
()=>(1954),
(...v)=>(redn(69639,1,...v)),
(...v)=>(redv(68615,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(redn(70663,1,...v)),
(...v)=>(rednv(60431,fn.lexical,3,0,...v)),
(...v)=>(rednv(63499,fn.binding,2,0,...v)),
(...v)=>(redv(112655,R0_case_block,3,0,...v)),
(...v)=>(redn(114699,2,...v)),
(...v)=>(redv(113675,R0_element_list,2,0,...v)),
(...v)=>(redv(112655,R3_case_block,3,0,...v)),
()=>(1970),
(...v)=>(rednv(115723,fn.spread_expr,2,0,...v)),
(...v)=>(redv(104463,R3_case_block,3,0,...v)),
()=>(1986),
(...v)=>(rednv(110603,fn.binding,2,0,...v)),
(...v)=>(rednv(106507,fn.spread_expr,2,0,...v)),
()=>(2006),
()=>(2010),
()=>(2014),
(...v)=>(rednv(99347,fn.call_expr,4,0,...v)),
(...v)=>(redv(101391,R3_case_block,3,0,...v)),
()=>(2018),
()=>(2026),
(...v)=>(rednv(102411,fn.spread_expr,2,0,...v)),
(...v)=>(rednv(95251,fn.member,4,0,...v)),
(...v)=>(redv(134163,R3_case_block,4,0,...v)),
(...v)=>(redv(134163,R0_cover_parenthesized_expression_and_arrow_parameter_list,4,0,...v)),
(...v)=>(rednv(96275,fn.supper_expr,4,0,...v)),
()=>(2038),
(...v)=>(redn(72711,1,...v)),
(...v)=>(redv(58383,R0_variable_declaration_list,3,0,...v)),
(...v)=>(redv(111627,R3_case_block,2,0,...v)),
(...v)=>(redn(136207,3,...v)),
()=>(2046),
(...v)=>(redn(138251,2,...v)),
(...v)=>(redn(144395,2,...v)),
()=>(2058),
(...v)=>(redn(137231,3,...v)),
(...v)=>(redn(141323,2,...v)),
()=>(2062),
(...v)=>(redn(145419,2,...v)),
(...v)=>(redn(143371,2,...v)),
()=>(2094),
()=>(2098),
()=>(2106),
()=>(2110),
()=>(2114),
()=>(2118),
(...v)=>(redn(37895,1,...v)),
()=>(2122),
()=>(2130),
(...v)=>(redn(36875,2,...v)),
()=>(2150),
()=>(2166),
()=>(2174),
(...v)=>(redv(52243,R2_try_statement,4,0,...v)),
(...v)=>(rednv(54283,fn.finally_stmt,2,0,...v)),
()=>(2194),
(...v)=>(redv(82959,R2_class_tail,3,0,...v)),
(...v)=>(redv(82959,R1_class_tail,3,0,...v)),
(...v)=>(redv(86027,R0_class_element_list,2,0,...v)),
(...v)=>(redv(87051,R0_class_element,2,0,...v)),
()=>(2198),
(...v)=>(redv(67595,R0_javascript,2,0,...v)),
()=>(2210),
(...v)=>(redv(62479,R0_variable_declaration_list,3,0,...v)),
(...v)=>(rednv(118807,fn.condition_expr,5,0,...v)),
(...v)=>(redv(112659,R3_case_block,4,0,...v)),
(...v)=>(redv(113679,R0_formal_parameters,3,0,...v)),
(...v)=>(redv(104467,R3_case_block,4,0,...v)),
(...v)=>(redv(105487,R0_formal_parameters,3,0,...v)),
(...v)=>(rednv(106511,fn.property_binding,3,0,...v)),
()=>(2218),
(...v)=>(redn(66567,1,...v)),
()=>(2222),
(...v)=>(redv(109583,R3_case_block,3,0,...v)),
(...v)=>(redv(101395,R3_case_block,4,0,...v)),
(...v)=>(redv(102415,R0_formal_parameters,3,0,...v)),
()=>(2238),
()=>(2242),
(...v)=>(redv(75791,R3_case_block,3,0,...v)),
()=>(2246),
(...v)=>(redn(136211,4,...v)),
(...v)=>(redn(139279,3,...v)),
(...v)=>(redn(142351,3,...v)),
(...v)=>(redn(137235,4,...v)),
()=>(2250),
()=>(2258),
(...v)=>(redn(140303,3,...v)),
(...v)=>(rednv(34839,fn.if_stmt,5,0,...v)),
()=>(2262),
()=>(2266),
(...v)=>(rednv(35863,fn.while_stmt,5,0,...v)),
()=>(2270),
()=>(2278),
()=>(2286),
()=>(2298),
()=>(2314),
()=>(2318),
()=>(2326),
()=>(2330),
()=>(2334),
()=>(2338),
()=>(2346),
(...v)=>(rednv(44055,fn.switch_stmt,5,0,...v)),
()=>(2354),
()=>(2374),
()=>(2370),
(...v)=>(rednv(43031,fn.with_stmt,5,0,...v)),
()=>(2378),
(...v)=>(redn(55303,1,...v)),
(...v)=>(redv(82963,R0_class_tail,4,0,...v)),
(...v)=>((redn(71683,0,...v))),
(...v)=>(redv(67599,R0_formal_parameters,3,0,...v)),
(...v)=>(redv(68623,R0_formal_parameters,3,0,...v)),
()=>(2390),
(...v)=>(redv(113683,R0_formal_parameters,4,0,...v)),
()=>(2394),
()=>(2398),
()=>(2402),
(...v)=>(redn(89095,1,...v)),
(...v)=>(redv(102419,R0_argument_list,4,0,...v)),
(...v)=>(redv(134171,R1_cover_parenthesized_expression_and_arrow_parameter_list,6,0,...v)),
(...v)=>(redn(136215,5,...v)),
(...v)=>(redn(137239,5,...v)),
()=>(2406),
()=>(2414),
()=>(2422),
()=>(2426),
()=>(2434),
(...v)=>(redv(35867,R8_iteration_statement,6,0,...v)),
()=>(2442),
()=>(2450),
()=>(2454),
()=>(2458),
()=>(2462),
(...v)=>(redv(35867,R15_iteration_statement,6,0,...v)),
()=>(2490),
()=>(2498),
(...v)=>(redv(45067,R0_case_block,2,0,...v)),
()=>(2506),
()=>(2518),
(...v)=>(redv(46087,R1_statement_list4701_group_list,1,0,...v)),
(...v)=>(redv(48135,R1_default_clause,1,0,...v)),
()=>(2526),
()=>(2534),
(...v)=>(redn(71687,1,...v)),
()=>(2550),
(...v)=>(redn(137243,6,...v)),
(...v)=>(rednv(34847,fn.if_stmt,7,0,...v)),
(...v)=>(rednv(35871,fn.do_while_stmt,7,0,...v)),
(...v)=>(shftf(2554,I2_iteration_statement,...v)),
(...v)=>(redv(35871,R7_iteration_statement,7,0,...v)),
(...v)=>(redv(35871,R6_iteration_statement,7,0,...v)),
()=>(2574),
()=>(2578),
(...v)=>(redv(35871,R13_iteration_statement,7,0,...v)),
(...v)=>(redv(35871,R14_iteration_statement,7,0,...v)),
(...v)=>(redv(35871,R16_iteration_statement,7,0,...v)),
(...v)=>(redv(35871,R18_iteration_statement,7,0,...v)),
()=>(2602),
()=>(2614),
(...v)=>(redv(45071,R3_case_block,3,0,...v)),
(...v)=>(redv(46091,R0_case_clauses,2,0,...v)),
()=>(2618),
()=>(2622),
(...v)=>(rednv(53271,fn.catch_stmt,5,0,...v)),
(...v)=>(redv(65567,R0_function_declaration,7,0,...v)),
()=>(2630),
()=>(2634),
()=>(2638),
(...v)=>(redv(35875,R5_iteration_statement,8,0,...v)),
(...v)=>(redv(35875,R4_iteration_statement,8,0,...v)),
(...v)=>(redv(35875,R3_iteration_statement,8,0,...v)),
()=>(2650),
(...v)=>(redv(35875,R12_iteration_statement,8,0,...v)),
(...v)=>(redv(35875,R17_iteration_statement,8,0,...v)),
(...v)=>(redv(35875,R18_iteration_statement,8,0,...v)),
(...v)=>(redv(35875,R0_iteration_statement,8,0,...v)),
(...v)=>(redv(35875,R19_iteration_statement,8,0,...v)),
()=>(2666),
(...v)=>(redv(45075,R2_case_block,4,0,...v)),
(...v)=>(redv(47119,R1_case_clause,3,0,...v)),
(...v)=>(redv(48143,R0_default_clause,3,0,...v)),
(...v)=>(redv(65571,R1_function_declaration,8,0,...v)),
(...v)=>(rednv(88095,fn.class_method,7,0,...v)),
(...v)=>(rednv(88095,fn.class_get_method,7,0,...v)),
()=>(2674),
(...v)=>(redv(35879,R0_iteration_statement,9,0,...v)),
(...v)=>(redv(35879,R10_iteration_statement,9,0,...v)),
(...v)=>(redv(35879,R11_iteration_statement,9,0,...v)),
(...v)=>(redv(35879,R20_iteration_statement,9,0,...v)),
(...v)=>(redv(45079,R1_case_block,5,0,...v)),
(...v)=>(redv(47123,R0_case_clause,4,0,...v)),
(...v)=>(rednv(88099,fn.class_set_method,8,0,...v)),
(...v)=>(redv(35883,R9_iteration_statement,10,0,...v))],

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
v=>lsm(v,gt16),
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
v=>lsm(v,gt89),
nf,
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
v=>lsm(v,gt110),
v=>lsm(v,gt111),
v=>lsm(v,gt3),
nf,
v=>lsm(v,gt112),
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
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt119),
nf,
v=>lsm(v,gt120),
nf,
nf,
v=>lsm(v,gt121),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt122),
nf,
nf,
v=>lsm(v,gt123),
nf,
nf,
v=>lsm(v,gt124),
v=>lsm(v,gt125),
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
nf,
nf,
v=>lsm(v,gt76),
v=>lsm(v,gt77),
nf,
v=>lsm(v,gt136),
v=>lsm(v,gt137),
v=>lsm(v,gt138),
v=>lsm(v,gt139),
v=>lsm(v,gt140),
nf,
v=>lsm(v,gt90),
v=>lsm(v,gt91),
nf,
v=>lsm(v,gt141),
nf,
v=>lsm(v,gt142),
v=>lsm(v,gt143),
v=>lsm(v,gt144),
nf,
v=>lsm(v,gt145),
nf,
nf,
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
v=>lsm(v,gt148),
nf,
nf,
nf,
v=>lsm(v,gt149),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt150),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt151),
v=>lsm(v,gt152),
nf,
v=>lsm(v,gt153),
v=>lsm(v,gt154),
v=>lsm(v,gt155),
v=>lsm(v,gt156),
v=>lsm(v,gt157),
nf,
v=>lsm(v,gt158),
nf,
nf,
nf,
nf,
v=>lsm(v,gt159),
nf,
nf,
nf,
v=>lsm(v,gt160),
nf,
v=>lsm(v,gt161),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt162),
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
v=>lsm(v,gt163),
nf,
v=>lsm(v,gt164),
nf,
v=>lsm(v,gt165),
nf,
v=>lsm(v,gt166),
nf,
nf,
v=>lsm(v,gt167),
nf,
nf,
nf,
v=>lsm(v,gt168),
v=>lsm(v,gt169),
nf,
v=>lsm(v,gt170),
v=>lsm(v,gt171),
v=>lsm(v,gt172),
v=>lsm(v,gt173),
nf,
v=>lsm(v,gt174),
nf,
nf,
v=>lsm(v,gt175),
v=>lsm(v,gt176),
nf,
v=>lsm(v,gt177),
nf,
v=>lsm(v,gt178),
nf,
nf,
v=>lsm(v,gt179),
v=>lsm(v,gt180),
v=>lsm(v,gt181),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt182),
v=>lsm(v,gt183),
nf,
v=>lsm(v,gt184),
nf,
v=>lsm(v,gt185),
nf,
v=>lsm(v,gt186),
v=>lsm(v,gt187),
v=>lsm(v,gt188),
v=>lsm(v,gt189),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt190),
nf,
v=>lsm(v,gt191),
v=>lsm(v,gt192),
nf,
nf,
v=>lsm(v,gt193),
nf,
nf,
v=>lsm(v,gt194),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt195),
v=>lsm(v,gt196),
nf,
nf,
nf,
nf,
v=>lsm(v,gt197),
v=>lsm(v,gt198),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt199),
nf,
nf,
nf,
nf,
v=>lsm(v,gt200),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt201),
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

const env = {
    table: {},
    ASI: true,
    functions: {

        //JS
        add,
        and: _and,
        array_literal,
        arrow,
        assign,
        binding,
        block,
        bool_literal: bool,
        call_expr,
        catch_stmt,
        condition_expr: condition,
        debugger_stmt,  
        div,
        eq: equal,
        exp,
        expr_stmt,
        expression_list,
        for_stmt,
        funct_decl: _function,
        gt: greater,
        gteq: greater_eq,
        identifier: id,
        if_stmt,
        lexical,
        lt: less,
        lteq: less_eq,
        member: mem,
        mult,
        negate_expr: negate,
        null_literal: null_,
        numeric_literal: number,
        object,
        or: _or,
        post_dec_expr: post_dec,
        post_inc_expr: post_inc,
        property_binding,
        unary_not_expr:node,
        new_member_stmt: mem$1,
        spread_expr:node$1,
        return_stmt: return_stmt,
        stmts,
        string_literal: string,
        sub,
        this_expr,
        try_stmt,
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

const number$1 = 1,
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

const  getNumbrOfTrailingZeroBitsFromPowerOf2 = (value) => debruijnLUT[(value * 0x077CB531) >>> 27];

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
        const arrow = String.fromCharCode(0x2b89),
            trs = String.fromCharCode(0x2500),
            line = String.fromCharCode(0x2500),
            thick_line = String.fromCharCode(0x2501),
            line_number = "    " + this.line + ": ",
            line_fill = line_number.length,
            t$$1 = thick_line.repeat(line_fill + 48),
            is_iws = (!this.IWS) ? "\n The Lexer produced whitespace tokens" : "";
        const pk = this.copy();
        pk.IWS = false;
        while (!pk.END && pk.ty !== Types.nl) { pk.next(); }
        const end = (pk.END) ? this.str.length : pk.off ;

    //console.log(`"${this.str.slice(this.off-this.char+((this.line > 0) ? 2 :2), end).split("").map((e,i,s)=>e.charCodeAt(0))}"`)
    let v$$1 = "", length = 0;
    v$$1 = this.str.slice(this.off-this.char+((this.line > 0) ? 2 :1), end);
    length = this.char;
    return `${message} at ${this.line}:${this.char}
${t$$1}
${line_number+v$$1}
${line.repeat(length+line_fill-((this.line > 0) ? 2 :1))+arrow}
${t$$1}
${is_iws}`;
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
                        case 6: //LINEFEED
                            //Intentional
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
                }else{
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
exports.for_stmt = for_stmt;
exports.call_expr = call_expr;
exports.identifier = id;
exports.catch_stmt = catch_stmt;
exports.try_stmt = try_stmt;
exports.stmts = stmts;
exports.block = block;
exports.lexical = lexical;
exports.binding = binding;
exports.member = mem;
exports.assign = assign;
exports.add = add;
exports.exp = exp;
exports.sub = sub;
exports.div = div;
exports.mult = mult;
exports.object = object;
exports.debugger_stmt = debugger_stmt;
exports.string = string;
exports.null_ = null_;
exports.number = number;
exports.bool = bool;
exports.negate = negate;
exports.rtrn = return_stmt;
exports.condition = condition;
exports.array_literal = array_literal;
exports.this_expr = this_expr;
exports.property_binding = property_binding;
exports.arrow = arrow;
exports.funct_decl = _function;
exports.expression_list = expression_list;
exports.if_stmt = if_stmt;
exports.post_inc = post_inc;
exports.post_dec = post_dec;
exports.expr_stmt = expr_stmt;
exports._or = _or;
exports._and = _and;
exports.not = node;
exports.new_member_stmt = mem$1;
exports.spread = node$1;
exports.equal = equal;
exports.greater = greater;
exports.greater_eq = greater_eq;
exports.less = less;
exports.less_eq = less_eq;
exports.parse = parse;
