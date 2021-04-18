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

assert_group("Binding declarations", () => {

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

    assert("Simple lexical declaration with object destructuring [const { a } = a]",
        renderCompressed(javascript_parser_new("const { a } = a").ast) == "const {a}=a;");

    assert("Simple lexical declaration with object destructuring and rename [const { a: test } = a]",
        renderCompressed(javascript_parser_new("const { a: test } = a").ast) == "const {a:test}=a;");

    assert("Simple lexical declaration with object destructuring and rename [let { a: test } = a]",
        renderCompressed(javascript_parser_new("let { a: test } = a").ast) == "let {a:test}=a;");

    assert("Lexical declaration with array destructuring  [const [test] = a]",
        renderCompressed(javascript_parser_new("const [test] = a").ast) == "const [test]=a;");

    assert("Lexical declaration with array destructuring  [let [test] = a]",
        renderCompressed(javascript_parser_new("let [test] = a").ast) == "let [test]=a;");

    assert("Lexical declaration with array destructuring and elisions [let [test,,,,test] = a]",
        renderCompressed(javascript_parser_new("let [test,,,,test] = a").ast) == "let [test,,,,test]=a;");

    assert("Lexical declaration with array destructuring and elisions [const [test,,,,test] = a]",
        renderCompressed(javascript_parser_new("const [test,,,,test] = a").ast) == "const [test,,,,test]=a;");


    assert("let Lexical declaration with mixture of array & object destructuring & regular primitive assignments",
        renderCompressed(
            javascript_parser_new("const [test,,,,test] = a, d = 0, r = null, {test:g, b:[test,,test] } = g;").ast)
        == "const [test,,,,test]=a,d=0,r=null,{test:g,b:[test,,test]}=g;"
    );

    assert("const Lexical declaration with mixture of array & object destructuring & regular primitive assignments",
        renderCompressed(
            javascript_parser_new("const [test,,,,test] = a, d = 0, r = null, {test:g, b:[test,,test] } = g;").ast)
        == "const [test,,,,test]=a,d=0,r=null,{test:g,b:[test,,test]}=g;"
    );
});

assert_group("Ternary Expression", () => {

    assert("Conditional expression with basic identifier references [a?b:c]",
        renderCompressed(javascript_parser_new("a?b:c").ast) == "a?b:c;");

    assert("Conditional expression with logical and [a&&b?c:d]",
        renderCompressed(javascript_parser_new("a&&b?c:d;").ast) == "a&&b?c:d;");

    assert("Conditional expression with logical or [a||b?c:d]",
        renderCompressed(javascript_parser_new("a||b?c:d").ast) == "a||b?c:d;");

    assert("Conditional expression with coalesce [a??a?c:d]",
        renderCompressed(javascript_parser_new("a??a?c:d").ast) == "a??a?c:d;");
});

assert_group("Arrow Function", () => {

    assert("Simple arrow function expression [_=>_]",
        renderCompressed(javascript_parser_new("_=>_").ast) == "_=>_");

    assert("Simple arrow function expression with no arguments [()=>a]",
        renderCompressed(javascript_parser_new("()=>a").ast) == "()=>a");

    assert("Simple arrow function expression with two arguments [(a,b)=>a+b]",
        renderCompressed(javascript_parser_new("(a,b)=>a+b").ast) == "(a,b)=>a+b");

    assert("Simple arrow function expression with block body [(a,b)=>{ a+b }]",
        renderCompressed(javascript_parser_new("(a,b)=>{ a+b }").ast) == "(a,b)=>{ a+b }");
});

assert_group("Import Call", () => {

    assert("Simple arrow function expression [_=>_]",
        renderCompressed(javascript_parser_new("_=>_").ast) == "_=>_");

    assert("Simple arrow function expression with no arguments [()=>a]",
        renderCompressed(javascript_parser_new("()=>a").ast) == "()=>a");

    assert("Simple arrow function expression with two arguments [(a,b)=>a+b]",
        renderCompressed(javascript_parser_new("(a,b)=>a+b").ast) == "(a,b)=>a+b");

    assert("Simple arrow function expression with block body [(a,b)=>{ a+b }]",
        renderCompressed(javascript_parser_new("(a,b)=>{ a+b }").ast) == "(a,b)=>{ a+b }");
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

