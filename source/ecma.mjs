import add_expression from "./nodes/add.mjs";
import and_expression from "./nodes/and.mjs";
import argument_list from "./nodes/argument_list.mjs";
import array_literal from "./nodes/array_literal.mjs";
import arrow_function_declaration from "./nodes/arrow_declaration.mjs";
import assignment_expression from "./nodes/assign.mjs";
import await_expression from "./nodes/await.mjs";
import binding from "./nodes/binding.mjs";
import bit_and_expression from "./nodes/bit_and.mjs";
import bit_or_expression from "./nodes/bit_or.mjs";
import bit_xor_expression from "./nodes/bit_xor.mjs";
import block_statement from "./nodes/block.mjs";
import bool_literal from "./nodes/bool.mjs";
import break_statement from "./nodes/break.mjs"
import call_expression from "./nodes/call.mjs";
import case_statement from "./nodes/case_statement.mjs"
import catch_statement from "./nodes/catch.mjs";
import class_declaration from "./nodes/class_declaration.mjs";
import class_method from "./nodes/class_method.mjs";
import condition_expression from "./nodes/condition.mjs";
import continue_statement from "./nodes/continue.mjs"
import debugger_statement from "./nodes/debugger.mjs";
import default_case_statement from "./nodes/default_case_statement.mjs"
import default_import from "./nodes/default_import.mjs"
import delete_expression from "./nodes/delete.mjs";
import divide_expression from "./nodes/div.mjs";
import empty_statement from "./nodes/empty_statement.mjs";
import equality_expression from "./nodes/equal.mjs";
import exponent_expression from "./nodes/exp.mjs";
import export_clause from "./nodes/export_clause.mjs"
import export_declaration from "./nodes/export_declaration.mjs"
import export_specifier from "./nodes/export_specifier.mjs"
import expression_list from "./nodes/expression_list.mjs";
import expression_statement from "./nodes/expression_statement.mjs";
import for_statement from "./nodes/for.mjs";
import function_declaration from "./nodes/function_declaration.mjs";
import identifier from "./nodes/identifier.mjs";
import if_statement from "./nodes/if.mjs";
import import_clause from "./nodes/import_clause.mjs"
import import_declaration from "./nodes/import_declaration.mjs"
import import_specifier from "./nodes/import_specifier.mjs"
import in_expression from "./nodes/in.mjs";
import instanceof_expression from "./nodes/instanceof.mjs";
import label_statement from "./nodes/label_statement.mjs";
import left_shift_expression from "./nodes/left_shift.mjs";
import lexical_declaration from "./nodes/lexical.mjs";
import member_expression from "./nodes/member.mjs";
import module from "./nodes/module.mjs";
import modulo_expression from "./nodes/modulo.mjs";
import multiply_expression from "./nodes/mult.mjs";
import name_space_import from "./nodes/name_space_import.mjs"
import named_imports from "./nodes/named_imports.mjs"
import negate_expression from "./nodes/negate.mjs";
import new_expression from "./nodes/new_expression.mjs";
import null_literal from "./nodes/null.mjs";
import numeric_literal from "./nodes/number.mjs";
import object_literal from "./nodes/object.mjs";
import or_expression from "./nodes/or.mjs";
import parenthasized from "./nodes/parenthasized.mjs";
import plus_expression from "./nodes/plus.mjs"
import post_decrement_expression from "./nodes/post_dec.mjs";
import post_increment_expression from "./nodes/post_inc.mjs";
import pre_decrement_expression from "./nodes/pre_decr.mjs";
import pre_increment_expression from "./nodes/pre_incr.mjs";
import property_binding from "./nodes/property_binding.mjs";
import return_statement from "./nodes/return.mjs";
import right_shift_expression from "./nodes/right_shift.mjs"
import right_shift_fill_expression from "./nodes/right_shift_fill.mjs"
import script from "./nodes/script.mjs";
import spread_element from "./nodes/spread.mjs";
import statements from "./nodes/statements.mjs";
import string from "./nodes/string.mjs";
import subtract_expression from "./nodes/sub.mjs";
import switch_statement from "./nodes/switch_statement.mjs";
import template from "./nodes/template.mjs";
import template_head from "./nodes/template.mjs";
import template_middle from "./nodes/template.mjs";
import template_tail from "./nodes/template.mjs";
import this_literal from "./nodes/this.mjs";
import throw_statement from "./nodes/throw_statement.mjs";
import try_statement from "./nodes/try.mjs";
import typeof_expression from "./nodes/typeof.mjs";
import unary_not_expression from "./nodes/unary_not.mjs";
import unary_or_expression from "./nodes/unary_or.mjs";
import unary_xor_expression from "./nodes/unary_xor.mjs";
import variable_statement from "./nodes/variable_statement.mjs";
import void_expression from "./nodes/void.mjs";
import super_literal from "./nodes/super_literal.mjs";
import for_of_statement from "./nodes/for_of_statement.mjs";

import types from "./nodes/types.mjs";
import env from "./parser/env.mjs";
import ecmascript_parser from "./parser/ecmascript.mjs";
import whind from "@candlefw/whind";

export {
    types,
    env,
    template,
template_head,
template_middle,
template_tail,
super_literal,
    script,
    class_method,
    class_declaration,
    module,
    variable_statement,
    case_statement,
    switch_statement,
    empty_statement,
	default_case_statement,
    break_statement,
	continue_statement,
    import_declaration,
    import_clause,
    throw_statement,
    default_import,
    name_space_import,
    named_imports,
    for_of_statement,
    import_specifier,
    export_declaration,
    export_clause,
    export_specifier,
    parenthasized,
    add_expression,
    and_expression,
    array_literal,
    arrow_function_declaration,
    assignment_expression,
    await_expression,
    binding,
    block_statement,
    bit_and_expression,
    bit_or_expression,
    bit_xor_expression,
    bool_literal,
    call_expression,
    label_statement,
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
    lexical_declaration,
    member_expression,
    modulo_expression,
    multiply_expression,
    negate_expression,
    new_expression,
    null_literal,
    numeric_literal,
    object_literal,
    or_expression,
    plus_expression,
    post_decrement_expression,
    post_increment_expression,
    pre_decrement_expression,
    pre_increment_expression,
    property_binding,
    right_shift_expression,
    right_shift_fill_expression,
    return_statement,
    spread_element,
    statements,
    string,
    subtract_expression,
    this_literal,
    try_statement,
    typeof_expression,
    unary_not_expression,
    unary_or_expression,
    unary_xor_expression,
    void_expression,
    argument_list
}

export function parse(string) {
    return ecmascript_parser(whind(string), env);
}
