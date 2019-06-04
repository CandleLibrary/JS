import for_stmt from "./nodes/for.mjs";
import call_expr from "./nodes/call.mjs";
import identifier from "./nodes/identifier.mjs";
import catch_stmt from "./nodes/catch.mjs";
import try_stmt from "./nodes/try.mjs";
import stmts from "./nodes/stmts.mjs";
import block from "./nodes/block.mjs";
import lexical from "./nodes/lexical.mjs";
import binding from "./nodes/binding.mjs";
import member from "./nodes/member.mjs";
import assign from "./nodes/assign.mjs";
import add from "./nodes/add.mjs";
import exp from "./nodes/exp.mjs";
import sub from "./nodes/sub.mjs";
import div from "./nodes/div.mjs";
import mult from "./nodes/mult.mjs";
import object from "./nodes/object.mjs";
import debugger_stmt from "./nodes/debugger.mjs";
import string from "./nodes/string.mjs";
import null_ from "./nodes/null.mjs";
import number from "./nodes/number.mjs";
import bool from "./nodes/bool.mjs";
import negate from "./nodes/negate.mjs";
import rtrn from "./nodes/return.mjs";
import condition from "./nodes/condition.mjs";
import array_literal from "./nodes/array_literal.mjs";
import this_expr from "./nodes/this.mjs";
import property_binding from "./nodes/property_binding.mjs";
import arrow from "./nodes/arrow_declaration.mjs";
import funct_decl from "./nodes/function_declaration.mjs";
import expression_list from "./nodes/expression_list.mjs";
import if_stmt from "./nodes/if.mjs";
import post_inc from "./nodes/post_inc.mjs";
import post_dec from "./nodes/post_dec.mjs";
import expr_stmt from "./nodes/expression_statement.mjs";
import _or from "./nodes/or.mjs";
import _and from "./nodes/and.mjs";
import not from "./nodes/not.mjs";
import new_member_stmt from "./nodes/new_member_expression.mjs";
import spread from "./nodes/spread.mjs";
import equal from "./nodes/equal.mjs";
import greater from "./nodes/greater.mjs";
import greater_eq from "./nodes/greater_eq.mjs";
import less from "./nodes/less.mjs";
import less_eq from "./nodes/less_eq.mjs";
import types from "./nodes/types.mjs";
import ecmascript_parser from "./parser/ecmascript.mjs";
import env from "./parser/env.mjs";
import whind from "@candlefw/whind";

export {
	types,
	for_stmt,
	call_expr,
	identifier,
	catch_stmt,
	try_stmt,
	stmts,
	block,
	lexical,
	binding,
	member,
	assign,
	add,
	exp,
	sub,
	div,
	mult,
	object,
	debugger_stmt,
	string,
	null_,
	number,
	bool,
	negate,
	rtrn,
	condition,
	array_literal,
	this_expr,
	property_binding,
	arrow,
	funct_decl,
	expression_list,
	if_stmt,
	post_inc,
	post_dec,
	expr_stmt,
	_or,
	_and,
	not,
	new_member_stmt,
	spread,
	equal,
	greater,
	greater_eq,
	less,
	less_eq
}

export function parse(string){
	return ecmascript_parser(whind(string), env);
}