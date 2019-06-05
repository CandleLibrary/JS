import add_expression from "../nodes/add.mjs";
import and_expression from "../nodes/and.mjs";
import array_literal from "../nodes/array_literal.mjs";
import arrow_function_declaration from "../nodes/arrow_declaration.mjs";
import assignment_expression from "../nodes/assign.mjs";
import await_expression from "../nodes/await.mjs";
import binding from "../nodes/binding.mjs";
import block_statement from "../nodes/block.mjs";
import bool_literal from "../nodes/bool.mjs";
import call_expression from "../nodes/call.mjs";
import catch_statement from "../nodes/catch.mjs";
import condition_expression from "../nodes/condition.mjs";
import debugger_statement from "../nodes/debugger.mjs";
import delete_expression from "../nodes/delete.mjs";
import divide_expression from "../nodes/div.mjs";
import equality_expression from "../nodes/equal.mjs";
import exponent_expression from "../nodes/exp.mjs";
import expression_list from "../nodes/expression_list.mjs";
import expression_statement from "../nodes/expression_statement.mjs";
import for_statement from "../nodes/for.mjs";
import function_declaration from "../nodes/function_declaration.mjs";
import greater from "../nodes/greater.mjs";
import greater_eq from "../nodes/greater_eq.mjs";
import identifier from "../nodes/identifier.mjs";
import if_statement from "../nodes/if.mjs";
import in_expression from "../nodes/in.mjs";
import instanceof_expression from "../nodes/instanceof.mjs";
import left_shift_expression from "../nodes/left_shift.mjs"
import less from "../nodes/less.mjs";
import less_eq from "../nodes/less_eq.mjs";
import lexical from "../nodes/lexical.mjs";
import member_expression from "../nodes/member.mjs";
import modulo_expression from "../nodes/modulo.mjs";
import multiply_expression from "../nodes/mult.mjs";
import negate_expression from "../nodes/negate.mjs";
import new_expression from "../nodes/new_expression.mjs";
import null_literal from "../nodes/null.mjs";
import number from "../nodes/number.mjs";
import object from "../nodes/object.mjs";
import or_expression from "../nodes/or.mjs";
import plus_expression from "../nodes/plus.mjs"
import post_decrement_expression from "../nodes/post_dec.mjs";
import post_increment_expression from "../nodes/post_inc.mjs";
import pre_decrement_expression from "../nodes/pre_decr.mjs";
import pre_increment_expression from "../nodes/pre_incr.mjs";
import property_binding from "../nodes/property_binding.mjs";
import right_shift_expression from "../nodes/right_shift.mjs"
import right_shift_fill_expression from "../nodes/right_shift_fill.mjs"
import return_statement from "../nodes/return.mjs";
import spread_element from "../nodes/spread.mjs";
import statements from "../nodes/statements.mjs";
import string from "../nodes/string.mjs";
import subtract_expression from "../nodes/sub.mjs";
import this_literal from "../nodes/this.mjs";
import try_statement from "../nodes/try.mjs";
import typeof_expression from "../nodes/typeof.mjs";
import unary_not_expression from "../nodes/unary_not.mjs";
import unary_or_expression from "../nodes/unary_or.mjs";
import unary_xor_expression from "../nodes/unary_xor.mjs";
import void_expression from "../nodes/void.mjs";
import argument_list from "../nodes/argument_list.mjs";

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
        bool_literal,
        call_expr: call_expression,
        call_expression,
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
        expr_stmt:expression_statement,
        expression_list,
        expression_statement,
        for_statement,
        for_stmt: for_statement,
        funct_decl: function_declaration,
        function_declaration,
        gt: greater,
        gteq: greater_eq,
        identifier,
        if_statement,
        if_stmt: if_statement,
        in_expression,
        instanceof_expression,
        left_shift_expression,
        lexical,
        lt: less,
        lteq: less_eq,
        member:member_expression,
        member_expression,
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
        return_statement,
        return_stmt: return_statement,
        right_shift_expression,
        right_shift_fill_expression,
        spread_expr: spread_element,
        spread_element,
        stmts: statements,
        statements,
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
