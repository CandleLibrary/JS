import for_stmt from "../nodes/for.mjs";
import call_expr from "../nodes/call.mjs";
import identifier from "../nodes/identifier.mjs";
import catch_stmt from "../nodes/catch.mjs";
import try_stmt from "../nodes/try.mjs";
import stmts from "../nodes/stmts.mjs";
import block from "../nodes/block.mjs";
import lexical from "../nodes/lexical.mjs";
import binding from "../nodes/binding.mjs";
import member from "../nodes/member.mjs";
import assign from "../nodes/assign.mjs";
import add from "../nodes/add.mjs";
import exp from "../nodes/exp.mjs";
import sub from "../nodes/sub.mjs";
import div from "../nodes/div.mjs";
import mult from "../nodes/mult.mjs";
import object from "../nodes/object.mjs";
import debugger_stmt from "../nodes/debugger.mjs";
import string from "../nodes/string.mjs";
import null_ from "../nodes/null.mjs";
import number from "../nodes/number.mjs";
import bool from "../nodes/bool.mjs";
import negate from "../nodes/negate.mjs";
import rtrn from "../nodes/return.mjs";
import condition from "../nodes/condition.mjs";
import array_literal from "../nodes/array_literal.mjs";
import this_expr from "../nodes/this.mjs";
import property_binding from "../nodes/property_binding.mjs";
import arrow from "../nodes/arrow_declaration.mjs";
import funct_decl from "../nodes/function_declaration.mjs";
import expression_list from "../nodes/expression_list.mjs";
import if_stmt from "../nodes/if.mjs";
import post_inc from "../nodes/post_inc.mjs";
import post_dec from "../nodes/post_dec.mjs";
import expr_stmt from "../nodes/expression_statement.mjs";
import _or from "../nodes/or.mjs";
import _and from "../nodes/and.mjs";
import not from "../nodes/not.mjs";
import new_member_stmt from "../nodes/new_member_expression.mjs";
import spread from "../nodes/spread.mjs";
import equal from "../nodes/equal.mjs";
import greater from "../nodes/greater.mjs";
import greater_eq from "../nodes/greater_eq.mjs";
import less from "../nodes/less.mjs";
import less_eq from "../nodes/less_eq.mjs";

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
        funct_decl,
        gt: greater,
        gteq: greater_eq,
        identifier,
        if_stmt,
        lexical,
        lt: less,
        lteq: less_eq,
        member,
        mult,
        negate_expr: negate,
        null_literal: null_,
        numeric_literal: number,
        object,
        or: _or,
        post_dec_expr: post_dec,
        post_inc_expr: post_inc,
        property_binding,
        unary_not_expr:not,
        new_member_stmt,
        spread_expr:spread,
        return_stmt: rtrn,
        stmts,
        string_literal: string,
        sub,
        this_expr,
        try_stmt,
        while_stmt: function(sym) {
            this.bool = sym[1];
            this.body = sym[3];
        },
        var_stmt: function(sym) { this.declarations = sym[1] },
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

export default env;
