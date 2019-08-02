import add_expression from "../nodes/add.js";
import and_expression from "../nodes/and.js";
import throw_statement from "../nodes/throw_statement.js";
import script from "../nodes/script.js";
import module from "../nodes/module.js";
import bit_and_expression from "../nodes/bit_and.js";
import bit_or_expression from "../nodes/bit_or.js";
import bit_xor_expression from "../nodes/bit_xor.js";
import array_literal from "../nodes/array_literal.js";
import arrow_function_declaration from "../nodes/arrow_declaration.js";
import assignment_expression from "../nodes/assign.js";
import await_expression from "../nodes/await.js";
import binding from "../nodes/binding.js";
import block_statement from "../nodes/block.js";
import bool_literal from "../nodes/bool.js";
import call_expression from "../nodes/call.js";
import catch_statement from "../nodes/catch.js";
import condition_expression from "../nodes/condition.js";
import debugger_statement from "../nodes/debugger.js";
import delete_expression from "../nodes/delete.js";
import divide_expression from "../nodes/div.js";
import equality_expression from "../nodes/equal.js";
import exponent_expression from "../nodes/exp.js";
import expression_list from "../nodes/expression_list.js";
import expression_statement from "../nodes/expression_statement.js";
import for_statement from "../nodes/for.js";
import function_declaration from "../nodes/function_declaration.js";
import identifier from "../nodes/identifier.js";
import if_statement from "../nodes/if.js";
import in_expression from "../nodes/in.js";
import instanceof_expression from "../nodes/instanceof.js";
import left_shift_expression from "../nodes/left_shift.js"
import lexical from "../nodes/lexical.js";
import member_expression from "../nodes/member.js";
import modulo_expression from "../nodes/modulo.js";
import multiply_expression from "../nodes/mult.js";
import negate_expression from "../nodes/negate.js";
import new_expression from "../nodes/new_expression.js";
import null_literal from "../nodes/null.js";
import numeric_literal from "../nodes/number.js";
import object_literal from "../nodes/object.js";
import or_expression from "../nodes/or.js";
import plus_expression from "../nodes/plus.js"
import post_decrement_expression from "../nodes/post_dec.js";
import post_increment_expression from "../nodes/post_inc.js";
import pre_decrement_expression from "../nodes/pre_decr.js";
import pre_increment_expression from "../nodes/pre_incr.js";
import property_binding from "../nodes/property_binding.js";
import right_shift_expression from "../nodes/right_shift.js"
import right_shift_fill_expression from "../nodes/right_shift_fill.js"
import return_statement from "../nodes/return.js";
import spread_element from "../nodes/spread.js";
import statements from "../nodes/statements.js";
import string from "../nodes/string.js";
import subtract_expression from "../nodes/sub.js";
import this_literal from "../nodes/this.js";
import try_statement from "../nodes/try.js";
import typeof_expression from "../nodes/typeof.js";
import unary_not_expression from "../nodes/unary_not.js";
import unary_or_expression from "../nodes/unary_or.js";
import unary_xor_expression from "../nodes/unary_xor.js";
import void_expression from "../nodes/void.js";
import argument_list from "../nodes/argument_list.js";
import parenthasized from "../nodes/parenthasized.js";
import label_statement from "../nodes/label_statement.js";
import import_declaration from "../nodes/import_declaration.js"
import import_clause from "../nodes/import_clause.js"
import default_import from "../nodes/default_import.js"
import name_space_import from "../nodes/name_space_import.js"
import named_imports from "../nodes/named_imports.js"
import import_specifier from "../nodes/import_specifier.js"
import export_declaration from "../nodes/export_declaration.js"
import export_clause from "../nodes/export_clause.js"
import export_specifier from "../nodes/export_specifier.js"
import break_statement from "../nodes/break.js"
import continue_statement from "../nodes/continue.js"
import switch_statement from "../nodes/switch_statement.js";
import case_statement from "../nodes/case_statement.js"
import default_case_statement from "../nodes/default_case_statement.js"
import empty_statement from "../nodes/empty_statement.js";
import variable_statement from "../nodes/variable_statement.js";
import class_method from "../nodes/class_method.js";
import template from "../nodes/template.js";
import template_head from "../nodes/template_head.js";
import template_middle from "../nodes/template_middle.js";
import template_tail from "../nodes/template_tail.js";
import super_literal from "../nodes/super_literal.js";
import for_of_statement from "../nodes/for_of_statement.js";
import for_in_statement from "../nodes/for_of_statement.js";
import lexical_expression from "../nodes/lexical_expression.js";

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
        script,
        module,
        template,
        lexical_expression,
template_head,
template_middle,
template_tail,
super_literal,
for_of_statement,
        class_method,
        throw_statement,
        empty_statement,
        switch_statement,
        break_statement,
        case_statement,
        default_case_statement,
        continue_statement,
        import_declaration,
        import_clause,
        default_import,
        name_space_import,
        named_imports,
        import_specifier,
        export_declaration,
        export_clause,
        export_specifier,
        parenthasized,
        label_statement,
        plus_expression,
        add_expression,
        and_expression,
        array_literal,
        arrow_function_declaration,
        assignment_expression,
        await_expression,
        await_expression,
        binding,
        bit_and_expression,
        bit_or_expression,
        bit_xor_expression,
        block_statement,
        bool_literal,
        call_expression,
        catch_statement,
        condition_expression,
        debugger_statement,
        delete_expression,
        divide_expression,
        equality_expression,
        exponent_expression,
        expression_list,
        expression_statement,
        for_statement,
        function_declaration,
        identifier,
        if_statement,
        in_expression,
        instanceof_expression,
        left_shift_expression,
        lexical,
        member_expression,
        modulo_expression,
        multiply_expression,
        negate_expression,
        new_expression,
        null_literal,
        numeric_literal,
        object_literal,
        or_expression,
        post_decrement_expression,
        post_increment_expression,
        pre_decrement_expression,
        pre_increment_expression,
        property_binding,
        return_statement,
        right_shift_expression,
        right_shift_fill_expression,
        spread_element,
        statements,
        string_literal: string,
        subtract_expression,
        this_literal,
        try_statement,
        typeof_expression,
        unary_not_expression,
        unary_not_expression,
        unary_or_expression,
        void_expression,
        argument_list,
        variable_statement,
        while_stmt: function(sym) {
            this.bool = sym[1];
            this.body = sym[3];
        },
        var_stmt: function(sym) { this.declarations = sym[1] },
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

                let ENCOUNTERED_END_CHAR = (lex.tx == "}" || lex.END || lex.tx == "</");

                while (!ENCOUNTERED_END_CHAR && !prv_lex.END && prv_lex.off < lex.off) {
                    prv_lex.next();
                    if (prv_lex.ty == prv_lex.types.nl)
                        ENCOUNTERED_END_CHAR = true;
                }

                if (ENCOUNTERED_END_CHAR) {
                    lex.tl = 0;
                    return lu({ tx: ";" });
                }
            }

            if (lex.END) {
                lex.tl = 0;
                return lu({ tx: ";" });
            }
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
