import { experimentalRender } from "@candlelib/conflagrate";
import { assert } from "console";
import { ext, parser } from "../build/library/javascript.js";
import { javascript_mappings, renderers } from "../build/library/render/mappings.js";
function parseAndRender(str) {
    return experimentalRender(parser(str).ast, javascript_mappings, renderers);
}

assert_group("Should parse statements", () => {

    assert_group("IMPORT", () => {

        assert("default", parseAndRender("import d from 'temp';") == "import d from 'temp';");

        assert("default ASI", parseAndRender("import d from 'temp'") == "import d from 'temp';");

        assert("namespace", parseAndRender("import * as d from 'temp';") == "import * as d from 'temp';");

        assert("namespace ASI", parseAndRender("import * as d from 'temp'") == "import * as d from 'temp';");

        assert("named imports single", parseAndRender("import { A } from 'temp';") == "import {A} from 'temp';");

        assert("named imports renamed single", parseAndRender("import { A as B } from 'temp';") == "import {A as B} from 'temp';");

        assert("named imports renamed multiple", parseAndRender("import { A as B, C as D, G as M } from 'temp';") == "import {A as B, C as D, G as M} from 'temp';");

        assert("default with namespace", parseAndRender("import g, * as n from 'temp';") == "import g, * as n from 'temp';");

        assert("default with named", parseAndRender("import g, { A as B} from 'temp';") == "import g, {A as B} from 'temp';");
    });


    assert_group("EXPORT", () => {

        assert("default reference", parseAndRender("export default A") == "export default A;");

        assert("export const statement", parseAndRender("export const d = 1") == "export const d = 1;");

        assert("export function statement", parseAndRender("export function A(){}") == "export function A(){}");

        assert("namespace re-export", parseAndRender("export * from \'test\'") == "export * from 'test';");

        assert("named re-export", parseAndRender("export { A  as B, C } from \'test\'") == "export {A as B, C} from 'test';");
    });


    assert_group("FUNCTION", () => {

        assert("basic", parseAndRender("function A(){}") == "function A(){};");

        assert("basic \\w arg", parseAndRender("function A(b){}") == "function A(b){};");

        assert("basic \\w arg & default val", parseAndRender("function A(b = c){}") == "function A(b = c){};");

        assert("async", parseAndRender("async function A(){}") == "async function A(){};");

        assert("generator", parseAndRender("function * A(){}") == "function * A(){};");

        assert("async generator", parseAndRender("async function * A(){}") == "async function * A(){};");

        assert("expression - basic", parseAndRender("function (){}") == "function (){};");

        assert("expression - basic \\w arg", parseAndRender("function(b){}") == "function (b){};");

        assert("expression - basic \\w arg & default val", parseAndRender("function(b=c){}") == "function (b = c){};");

        assert("expression - async", parseAndRender("async function(){}") == "async function (){};");

        assert("expression - generator", parseAndRender("function *(){}") == "function * (){};");

        assert("expression - async generator", parseAndRender("async function *(){}") == "async function * (){};");

    });

    assert_group("CLASS", () => {

        assert("basic", parseAndRender("class A{}") == "class A{};");

        assert("basic \\w constructor", parseAndRender("class A{ constructor(){} }") == "class A{constructor (){}};");

        assert("basic \\w method", parseAndRender("class A{ D(){} }") == "class A{D (){}};");

        assert("extends", parseAndRender("class A extends B{}") == "class A extends B{};");

        assert("expression", parseAndRender("class extends B{}") == "class extends B{};");

        assert("assignment expression", parseAndRender("var d = class extends B{}") == "var d = class extends B{};");
    });

    assert_group("ITERATOR", () => {

        assert("for", parseAndRender("for(a;b;c){}") == "for(a; b; c){}");

        assert("for-in var", parseAndRender("for(var a in b){}") == "for(var a in b){}");

        assert("for-in const", parseAndRender("for(const a in b){}") == "for(const a in b){}");

        assert("for-in let", parseAndRender("for(let a in b){}") == "for(let a in b){}");

        assert("for-of var", parseAndRender("for(var a of b){}") == "for(var a of b){}");

        assert("for-of const", parseAndRender("for(const a of b){}") == "for(const a of b){}");

        assert("for-of let", parseAndRender("for(let a of b){}") == "for(let a of b){}");

        assert("await for-of  var", parseAndRender("for await(var a of b){}") == "for await(var a of b){}");

        assert("await for-of  const", parseAndRender("for await(const a of b){}") == "for await(const a of b){}");

        assert("await for-of  let", parseAndRender("for await(let a of b){}") == "for await(let a of b){}");


        assert("while", parseAndRender("while(x){}") == "while(x){}");

        assert("do-while", parseAndRender("do {} while(x)") == "do {} while(x);");

    });


    assert_group("LABELED", () => {

        assert("labeled const", parseAndRender("test: a = 0") == "test:a = 0;");

    });

    assert_group("TRY CATCH", () => {

        assert("basic", parseAndRender("try{}catch(e){}") == "try{}catch(e){}");

    });

    assert_group("EMPTY", () => {

        assert("basic", parseAndRender(";") == ";");

    });

    assert_group("IF", () => {

        assert("basic", parseAndRender("if(a)b") == "if(a)b;");

        assert("basic - block", parseAndRender("if(a){}") == "if(a){}");

        assert("basic - else", parseAndRender("if(a)b; else c") == "if(a)b;else c;");

    });

    assert_group("SWITCH", () => {

        assert("basic", parseAndRender("switch(x){}") == "switch(x){}");

        assert("basic - default", parseAndRender("switch(x){default:r}") == "switch(x){default:r;}");

        assert("basic - case", parseAndRender("switch(x){case 2:r}") == "switch(x){case 2:r;}");

        assert("basic - case & default", parseAndRender("switch(x){default:r;case 2:r}") == "switch(x){default:r; case 2:r;}");

    });
    assert_group("BREAK", () => {

        assert("basic", parseAndRender("break;") == "break;");

        assert("labeled", parseAndRender("break label;") == "break label;");

    });

    assert_group("CONTINUE", () => {

        assert("basic", parseAndRender("continue;") == "continue;");

        assert("labeled", parseAndRender("continue label;") == "continue label;");

    });

    assert_group("VARIABLES", () => {

        assert("basic", parseAndRender("var a;") == "var a;");

        assert("basic multiple", parseAndRender("var a,b,c;") == "var a, b, c;");

    });

    assert_group("LEXICAL", () => {

        assert("basic", parseAndRender("let a;") == "let a;");

        assert("basic multiple", parseAndRender("let a,b,c;") == "let a, b, c;");

    });


    assert_group("EXPRESSION", sequence, () => {

        assert("identifier", parseAndRender("test;") == "test;");

        assert("identifier with $ and _", parseAndRender("$test_$test;") == "$test_$test;");

        assert("member", parseAndRender("$test.$test") == "$test.$test;");

        assert("member optional", parseAndRender("$test?.$test") == "$test?.$test;");

        assert("member dynamic", parseAndRender("$test[$test+1]") == "$test[$test + 1];");

        assert("member optional dynamic", parseAndRender("$test?.[$test+1]?.[0]") == "$test?.[$test + 1]?.[0];");

        assert("new", parseAndRender("new $test.$test()") == "new $test.$test();");

        assert("yield", parseAndRender("yield $test + $test;") == "yield $test + $test;");

        assert("yield generator", parseAndRender("yield * $test + $test;") == "yield * $test + $test;");

        assert("await", parseAndRender("await $test + $test;") == "await $test + $test;");

        assert("import meta", parseAndRender("import.meta;") == "import.meta;");

        assert("new target", parseAndRender("new.target;") == "new.target;");

        assert("super call", parseAndRender("super();") == "super();");

        assert("super property", parseAndRender("super.member;") == "super.member;");

        assert("super computed", parseAndRender("super[member]") == "super[member];");

        assert("unary !", parseAndRender("! $test;") == "!$test;");

        assert("unary +", parseAndRender("+$test;") == "+$test;");

        assert("unary ~", parseAndRender("~$test;") == "~$test;");

        assert("unary ~", parseAndRender("~$test;") == "~$test;");

        assert("unary pre ++", parseAndRender("++$test;") == "++$test;");

        assert("unary post ++", parseAndRender("$test++;") == "$test++;");

        assert("unary pre --", parseAndRender("--$test;") == "--$test;");

        assert("unary post --", parseAndRender("$test--;") == "$test--;");

        assert("unary delete", parseAndRender("delete $test;") == "delete $test;");

        assert("unary void", parseAndRender("void $test;") == "void $test;");

        assert("unary typeof", parseAndRender("typeof $test;") == "typeof $test;");

        assert("logical ||", parseAndRender("$test || $test;") == "$test || $test;");

        assert("logical ^", parseAndRender("$test ^ $test;") == "$test ^ $test;");

        assert("logical &&", parseAndRender("$test && $test;") == "$test && $test;");

        assert("coalesce ??", parseAndRender("$test ?? $test;") == "$test ?? $test;");

        assert("bitwise |", parseAndRender("$test | $test;") == "$test | $test;");

        assert("bitwise ^", parseAndRender("$test ^ $test;") == "$test ^ $test;");

        assert("bitwise &", parseAndRender("$test & $test;") == "$test & $test;");

        assert("equality ==", parseAndRender("$test == $test;") == "$test == $test;");

        assert("equality !=", parseAndRender("$test != $test;") == "$test != $test;");

        assert("equality ===", parseAndRender("$test === $test;") == "$test === $test;");

        assert("equality !==", parseAndRender("$test !== $test;") == "$test !== $test;");

        assert("relational <", parseAndRender("$test < $test;") == "$test < $test;");

        assert("relational >", parseAndRender("$test > $test;") == "$test > $test;");

        assert("relational <=", parseAndRender("$test <= $test;") == "$test <= $test;");

        assert("relational >=", parseAndRender("$test >= $test;") == "$test >= $test;");

        assert("relational instanceof", parseAndRender("$test instanceof $test;") == "$test instanceof $test;");

        assert("relational in", parseAndRender("$test in $test;") == "$test in $test;");

        assert("relational <", parseAndRender("$test < $test;") == "$test < $test;");

        assert("shift <<", parseAndRender("$test << $test;") == "$test << $test;");

        assert("shift >>", parseAndRender("$test >> $test;") == "$test >> $test;");

        assert("shift >>>", parseAndRender("$test >>> $test;") == "$test >>> $test;");

        assert("additive +", parseAndRender("$test + $test;") == "$test + $test;");

        assert("additive -", parseAndRender("$test - $test;") == "$test - $test;");

        assert("multiplicative *", parseAndRender("$test * $test;") == "$test * $test;");

        assert("multiplicative /", parseAndRender("$test / $test;") == "$test / $test;");

        assert("multiplicative %", parseAndRender("$test % $test;") == "$test % $test;");

        assert("exponentiation **", parseAndRender("$test ** $test;") == "$test ** $test;");

        assert("assignment =", parseAndRender("$test = $test;") == "$test = $test;");

        assert("assignment *=", parseAndRender("$test *= $test;") == "$test *= $test;");

        assert("assignment /=", parseAndRender("$test /= $test;") == "$test /= $test;");

        assert("assignment %=", parseAndRender("$test %= $test;") == "$test %= $test;");

        assert("assignment +=", parseAndRender("$test += $test;") == "$test += $test;");

        assert("assignment -=", parseAndRender("$test -= $test;") == "$test -= $test;");

        assert("assignment <<=", parseAndRender("$test <<= $test;") == "$test <<= $test;");

        assert("assignment >>=", parseAndRender("$test >>= $test;") == "$test >>= $test;");

        assert("assignment >>>=", parseAndRender("$test >>>= $test;") == "$test >>>= $test;");

        assert("assignment &=", parseAndRender("$test &= $test;") == "$test &= $test;");

        assert("assignment ^=", parseAndRender("$test ^= $test;") == "$test ^= $test;");

        assert("assignment |=", parseAndRender("$test |= $test;") == "$test |= $test;");

        assert("assignment **=", parseAndRender("$test **= $test;") == "$test **= $test;");

        assert("assignment ??", parseAndRender("$test ?? $test;") == "$test ?? $test;");

        assert("assignment &&=", parseAndRender("$test &&= $test;") == "$test &&= $test;");

        assert("assignment ||=", parseAndRender("$test ||= $test;") == "$test ||= $test;");

        assert("tenerery", parseAndRender("a ? b : c;") == "a ? b : c;");

        assert("parenthesized", parseAndRender("( a+ b )") == "(a + b);");

        assert("arrow basic", parseAndRender("_=>_") == "_=>_;");

        assert("arrow param list", parseAndRender("(x,y,[z,w],t=0)=>_") == "(x,y,[z, w],t = 0)=>_;");

        assert("arrow param list with block expression", parseAndRender("(x,y,[z,w],t=0)=>{ return true }") == "(x,y,[z, w],t = 0)=>{return true;};");

    });

    assert_group("PRIMITIVES", () => {

        assert("identifier", parseAndRender("$raggedy_man;") == "$raggedy_man;");

        assert("boolean true", parseAndRender("true;") == "true;");

        assert("boolean false", parseAndRender("false;") == "false;");

        assert("integer", parseAndRender("12345;") == "12345;");

        assert("integer with underscore", parseAndRender("1_234_5;") == "1_234_5;");

        assert("big int", parseAndRender("12345n;") == "12345n;");

        assert("big int with underscore", parseAndRender("12_345n;") == "12_345n;");

        assert("float", parseAndRender("12345.002354") == "12345.002354;");

        assert("float with underscore", parseAndRender("1_234_5;") == "1_234_5;");

        assert("hexidecimal", parseAndRender("0xFF") == "0xFF;");

        assert("hexidecimal with underscore", parseAndRender("0xFF_A1") == "0xFF_A1;");

        assert("Octal", parseAndRender("0o71") == "0o71;");

        assert("Octal with underscore", parseAndRender("0o71_11") == "0o71_11;");

        assert("Binary", parseAndRender("0b1100110011") == "0b1100110011;");

        assert("Binary with underscore", parseAndRender("0b01_11") == "0b01_11;");

        assert("scientific", parseAndRender("12345.002354e34") == "12345.002354e34;");

        assert("scientific with underscore", parseAndRender("12_345.002_354e3_4") == "12_345.002_354e3_4;");

        assert("double quote string", parseAndRender('" some string "') == '" some string ";');

        assert("single quote string", parseAndRender("' some string '") == "' some string ';");

        assert("template string basic", parseAndRender("` some string `") == "` some string `;");

        assert("template string with expression", parseAndRender("` some ${test + 2} string `") == "` some ${test + 2} string `;");

        assert("regular expression", parseAndRender("/[^1234]*\\d/ig") == "/[^1234]*\\d/ig;");

        assert("Array literal", parseAndRender("[1,,,2,,3,,2+3]") == "[1, ,, 2, , 3, , 2 + 3];");

        assert("Object literal", parseAndRender('({"d":1,get r(){},set r(s){} , m(){}, [2+3]:[2] })') == '({"d":1, get r (){}, set r (s){}, m (){}, [2 + 3]:[2]});');

    });
});
