import { renderCompressed } from "@candlefw/js";
import { javascript_parser_new } from "../build/library/parser/parse.js";

assert_group("Identifiers and Members", () => {

    assert("Parse simple identifier [test]",
        renderCompressed(javascript_parser_new("test;").ast) == "test;");

    assert("Parse complex identifier [te_Ast.$test.test$_]",
        renderCompressed(javascript_parser_new("te_Ast.$test.test$_;").ast) == "te_Ast.$test.test$_;");

    assert("Parse simple member_expression [test.test]",
        renderCompressed(javascript_parser_new("test.test;").ast) == "test.test;");

    assert("Parse simple computed member_expression [test[2+1]]",
        renderCompressed(javascript_parser_new("test[2+1];").ast) == "test[2+1];");

    assert("Parse simple computed member_expression [test['test']]",
        renderCompressed(javascript_parser_new("test['test'];").ast) == "test['test'];");

    assert("Import is not an identifier", !javascript_parser_new("import;"));

    assert("Export is not an identifier", !javascript_parser_new("export;"));
});

assert_group(solo, "Binding declarations", () => {

    assert("Simple variable statement [var a;]",
        renderCompressed(javascript_parser_new("var a;").ast) == "var a;");

    assert("Simple lexical statement [let a;]",
        renderCompressed(javascript_parser_new("let a;").ast) == "let a;");

    assert("Simple lexical statement with assignment [let a = 0]",
        renderCompressed(javascript_parser_new("let a =0").ast) == "let a=0;");

    assert("Lexical statement with multiple assignment [const a = a, b = b, c = c, d = d]",
        renderCompressed(javascript_parser_new("const a = a, b = b, c = c, d = d").ast) == "const a=a,b=b,c=c,d=d;");

    assert("Simple lexical statement [const a;]",
        renderCompressed(javascript_parser_new("const a;").ast) == "const a;");

    assert("Simple lexical statement with assignment [const a = 0]",
        renderCompressed(javascript_parser_new("const a =0").ast) == "const a=0;");

    assert("Lexical statement with multiple assignment [const a = a, b = b]",
        renderCompressed(javascript_parser_new("const a = a, b = b").ast) == "const a=a,b=b;");

});

assert_group("Expressions", () => {

    assert("Parse additive expression: add",
        renderCompressed(javascript_parser_new("2 + 1;").ast) == "2+1;");

    assert("Parse additive expression: subtract",
        renderCompressed(javascript_parser_new("2 - 1;").ast) == "2-1;");

    assert("Parse multiplicative expression: multiply",
        renderCompressed(javascript_parser_new("2 * 1;").ast) == "2*1;");

    assert("Parse multiplicative expression: divide",
        renderCompressed(javascript_parser_new("2 / 1;").ast) == "2/1;");

    assert("Parse multiplicative expression: modulo",
        renderCompressed(javascript_parser_new("2 % 1;").ast) == "2%1;");

    assert("Parse multiplicative expression: modulo",
        renderCompressed(javascript_parser_new("2 % 1;").ast) == "2%1;");

    assert("Parse multiplicative expression",
        renderCompressed(javascript_parser_new("2 * 1;").ast) == "2*1;");
});

