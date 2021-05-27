import { JSNodeTypeLU, parser, exp, stmt, renderCompressed, ext } from "../build/library/javascript.js";
import { traverse, bit_filter } from "@candlelib/conflagrate";

"@candlelib/js test spec";

const JSNodeType = JSNodeTypeLU;

const r = (...str) => renderCompressed(parser(...str), null, []);

let b = null;

const s = (...str) => (b = stmt(...str), renderCompressed(b, null, []));
const e = (...str) => renderCompressed(exp(...str), null, []);

const id = (...str) => {
    const n = exp(...str);

    for (const { node } of traverse(n, "nodes")
        .then(bit_filter("type", 1 << 15))
    )
        return node;

    return null;
};


{
    "Parsing and Rendering JS";

    "#";

    {
        "STATEMENTS"; "#";

        ((s("for await(const e of g){}") == "for await(const e of g){}"));

        ((s("for(var i = 0; i < 1; i++){}") == "for(var i=0;i<1;i++){}"));

        ((s("for (const e in g){}") == "for(const e in g){}"));
    }

    {
        "Unary Expression"; "#";

        {
            "Increment / Decrement"; "#";

            ((e("++i") == "++i"));

            ((e("i++") == "i++"));

            ((e("i--") == "i--"));

            ((e("--i") == "--i"));
        }


        {
            "Prefixed"; "#";

            ((e("+i") == "+i"));

            ((e("!i") == "!i"));

            ((e("~i") == "~i"));

            ((e("-i") == "-i"));
        }
    }

    {
        "Elision"; "#";

        ((s("let [,,a,,id]=a;") == "let [,,a,,id]=a;"));
        ((e("[,,2,,1,...d,]") == "[,,2,,1,...d]"));
        ((e("[1,,1]") == "[1,,1]"));
        ((e("[,,2,,1,...d,,,,,d]") == "[,,2,,1,...d,,,,,d]"));
    }
}

{
    "JSNodeType Assertions"; "#";

    {
        "AdditiveExpression"; "#";

        ((exp("1+2").type == JSNodeType.AdditiveExpression));

        ((exp("1-2").type == JSNodeType.AdditiveExpression));

    }

    "Arguments";
    ((exp("d(1)").nodes[1].type == JSNodeType.Arguments));

    "ArrayLiteral";
    ((exp("[1,2,3]").type == JSNodeType.ArrayLiteral));

    "ArrowFunction";
    ((exp("()=>2").type == JSNodeType.ArrowFunction));

    "AsyncArrowFunction";
    ((exp("async ()=>2").type == JSNodeType.ArrowFunction));

    "AssignmentExpression";
    ((exp("a=2").type == JSNodeType.AssignmentExpression));

    "BlockStatement";
    ((stmt("{}").type == JSNodeType.BlockStatement));

    "AwaitExpression";
    ((exp("await call()").type == JSNodeType.AwaitExpression));

    "BindingExpression";
    ((stmt("var i=2").nodes[0].type == JSNodeType.BindingExpression));

    {
        "BitwiseExpression"; "#";
        ((exp("1 | 1").type == JSNodeType.BitwiseExpression));
        ((exp("1 & 1").type == JSNodeType.BitwiseExpression));
        ((exp("1 ^ 1").type == JSNodeType.BitwiseExpression));
    }

    {
        "BooleanLiteral"; "#";
        ((exp("true").type == JSNodeType.BooleanLiteral));
        ((exp("false").type == JSNodeType.BooleanLiteral));
    }

    "BreakStatement";
    ((stmt("break").type == JSNodeType.BreakStatement));

    "CallExpression";
    ((exp("call()").type == JSNodeType.CallExpression));

    "CaseBlock";
    ((stmt("switch(1){}").nodes[1].type == JSNodeType.CaseBlock));

    "CaseClause";
    ((stmt("switch(1){case 2: 2; break;}").nodes[1].nodes[0].type == JSNodeType.CaseClause));

    "DefaultClause";
    ((stmt("switch(1){default: 2; break;}").nodes[1].nodes[0].type == JSNodeType.DefaultClause));

    "CatchClause";
    ((stmt("try{}catch(e){}").nodes[1].type == JSNodeType.CatchClause));

    "Class";
    ((stmt("class id extends me{constructor(a,b){1;} method(a){} get get(){}}").type == JSNodeType.Class));

    "ComputedProperty";
    ((exp("({['test']:2})").nodes[0].nodes[0].nodes[0].type == JSNodeType.ComputedProperty));

    "ContinueStatement";
    ((stmt("continue label;").type == JSNodeType.ContinueStatement));

    "ConditionalExpression";
    ((exp("e ? 1 : 2").type == JSNodeType.ConditionalExpression));

    "DebuggerStatement";
    ((stmt("debugger;").type == JSNodeType.DebuggerStatement));

    "DeleteExpression";
    ((exp("delete me").type == JSNodeType.DeleteExpression));

    "DoStatement";
    ((stmt("do{1;}while(2)").type == JSNodeType.DoStatement));

    "Elision";
    ((exp("[,,,]").nodes[0].type == JSNodeType.Elision));

    "EmptyStatement";
    ((stmt(";").type == JSNodeType.EmptyStatement));

    {
        "EqualityExpression"; "#";

        ((exp("1==1").type == JSNodeType.EqualityExpression));
        ((exp("1===1").type == JSNodeType.EqualityExpression));
        ((exp("1!=1").type == JSNodeType.EqualityExpression));
        ((exp("1!==1").type == JSNodeType.EqualityExpression));
    }


    "ExponentiationExpression";
    ((exp("a**2").type == JSNodeType.ExponentiationExpression));

    "ExportClause";
    ((stmt("export {a};").nodes[0].type == JSNodeType.ExportClause));

    "ExportDeclaration";
    ((stmt("export {a} from 'module';").type == JSNodeType.ExportDeclaration));

    "ExpressionList";
    ((exp("1,2,3,4;").type == JSNodeType.ExpressionList));

    "ExpressionStatement";
    ((stmt("1;").type == JSNodeType.ExpressionStatement));

    "FinallyClause";
    ((stmt("try{}finally{}").nodes[2].type == JSNodeType.FinallyClause));

    "ForInStatement";
    ((stmt("for(const i in d){}").type == JSNodeType.ForInStatement));

    "ForOfStatement";
    ((stmt("for(const u of a){}").type == JSNodeType.ForOfStatement));


    {
        "ForStatement"; "#";

        ((stmt("for (var i = 0; i < 1; i++){}").type == JSNodeType.ForStatement));

        ((stmt("for (;;){}").type == JSNodeType.ForStatement));

        ((stmt("for (let i = 1, b; i < b;){b++;}").type == JSNodeType.ForStatement));

        ((stmt("for(a;i < b;){b++;}").type == JSNodeType.ForStatement));
    }

    "FormalParameters: a,b,c";
    ((stmt("function d(a,b,c){}").nodes[1].type == JSNodeType.FormalParameters));

    "FromClause";
    ((stmt("import d from 'module';").nodes[1].type == JSNodeType.FromClause));

    "FunctionDeclaration";
    ((stmt("async function * d (a,b,c) {const d = a; return d;}").type == JSNodeType.FunctionDeclaration));

    "FunctionExpression";
    ((exp("(async function * d (a,b,c) {const d = a; return d;})").nodes[0].type == JSNodeType.FunctionExpression));

    "FunctionBody";
    ((stmt("function d(){a}").nodes[2].type == JSNodeType.FunctionBody));

    "GetterMethod";
    ((exp("({get d(){a}})").nodes[0].nodes[0].type == JSNodeType.GetterMethod));

    "IdentifierDefault";
    ((id("import a from 'test'").type == JSNodeType.IdentifierDefault));

    "IdentifierProperty";
    ((exp("m.a").nodes[1].type == JSNodeType.IdentifierProperty));

    "IdentifierModule";
    ((id("import {a } from 'a'").type == JSNodeType.IdentifierModule));

    {
        "IdentifierLabel"; "#";

        ((id("continue label;").type == JSNodeType.IdentifierLabel));

        ((id("label : {}").type == JSNodeType.IdentifierLabel));

        ((id("break label;").type == JSNodeType.IdentifierLabel));

    }

    "IdentifierBinding";
    ((id("var a = b;").type == JSNodeType.IdentifierBinding));

    "IdentifierReference";
    ((id("id").type == JSNodeType.IdentifierReference));

    "IfStatement";
    ((stmt("if(true){}").type == JSNodeType.IfStatement));

    "ImportClause";
    ((stmt("import {a as d} from 'm'").nodes[0].type == JSNodeType.ImportClause));

    "ImportDeclaration";
    ((stmt("import {a as d} from 'm'").type == JSNodeType.ImportDeclaration));

    "InExpression";
    ((exp("a in b").type == JSNodeType.InExpression));

    "InstanceOfExpression";
    ((exp("a instanceof b").type == JSNodeType.InstanceOfExpression));

    "LabeledStatement";
    ((stmt("label: {} ").type == JSNodeType.LabeledStatement));

    {
        "LexicalBinding"; "#";

        ((stmt("for(const d of a){}").nodes[0].type == JSNodeType.LexicalBinding));

        ((stmt("for(let d in a){}").nodes[0].type == JSNodeType.LexicalBinding));
    }

    {
        "LexicalDeclaration"; "#";

        ((stmt("let d = 0, i = [...d];").type == JSNodeType.LexicalDeclaration));

        ((stmt("const d = 0, i = [...d];").type == JSNodeType.LexicalDeclaration));
    }

    {
        "LogicalExpression"; "#";

        ((exp("a || b").type == JSNodeType.LogicalExpression));

        ((exp("1 && 2").type == JSNodeType.LogicalExpression));
    }

    "MemberExpression";
    ((exp("a.b['dd']").type == JSNodeType.MemberExpression));

    {
        "Method"; "#";

        ((exp("({d(){a;}})").nodes[0].nodes[0].type == JSNodeType.Method));

        ((exp("({async d(){a;}})").nodes[0].nodes[0].type == JSNodeType.Method));

        ((exp("({async * d(){a;}})").nodes[0].nodes[0].type == JSNodeType.Method));

        ((exp("({* d(){a;}})").nodes[0].nodes[0].type == JSNodeType.Method));
    }

    {
        "MultiplicativeExpression"; "#";

        ((exp("1/1").type == JSNodeType.MultiplicativeExpression));
        ((exp("1*1").type == JSNodeType.MultiplicativeExpression));;
    }

    "NameSpaceImport";
    ((stmt("import * as d from 'm'").nodes[0].nodes[0].type == JSNodeType.NameSpaceImport));

    "NamedImports";
    ((stmt("import {a as d} from 'm'").nodes[0].nodes[0].type == JSNodeType.NamedImports));

    "NewExpression";
    ((exp("new d").type == JSNodeType.NewExpression));

    "NewInstanceExpression";
    ((exp("new d()").type == JSNodeType.NewInstanceExpression));

    "NewTarget";
    ((exp("new.target").type == JSNodeType.NewTarget));

    "NullLiteral";
    ((exp("null").type == JSNodeType.NullLiteral));


    {
        "NumericLiteral"; "#";

        ((exp(1).type == JSNodeType.NumericLiteral));

        ((exp("0o1234").type == JSNodeType.NumericLiteral));

        ((exp("-0x1").type == JSNodeType.NumericLiteral));

        ((exp("0X1").type == JSNodeType.NumericLiteral));

        ((exp("0b11001").type == JSNodeType.NumericLiteral));

        ((exp("0B11001").type == JSNodeType.NumericLiteral));

        ((exp("-0.256").type == JSNodeType.NumericLiteral));

        ((exp("0.256").type == JSNodeType.NumericLiteral));

        ((exp("256.25e123").type == JSNodeType.NumericLiteral));
    }

    "ObjectLiteral";
    ((exp("({})").nodes[0].type == JSNodeType.ObjectLiteral));

    "Parameters";
    ((exp("(a,b,c)=>{;};").nodes[0].type == JSNodeType.FormalParameters));

    "Parenthesized";
    ((exp("(a)").type == JSNodeType.Parenthesized));

    {
        "PostExpression"; "#";
        ((exp("p++").type == JSNodeType.PostExpression));
        ((exp("p++").type == JSNodeType.PostExpression));
    }

    {
        "PreExpression"; "#";
        ((exp("++p").type == JSNodeType.PreExpression));
        ((exp("--p").type == JSNodeType.PreExpression));
    }

    "PropertyBinding";
    ((exp("({b:2})").nodes[0].nodes[0].type == JSNodeType.PropertyBinding));

    "RegexLiteral";
    ((exp("/#\\d\\d/g").type == JSNodeType.RegexLiteral));

    {
        "RelationalExpression"; "#";

        ((exp("a<b").type == JSNodeType.RelationalExpression));

        ((exp("a>b").type == JSNodeType.RelationalExpression));

        ((exp("a<=b").type == JSNodeType.RelationalExpression));

        ((exp("a>=b").type == JSNodeType.RelationalExpression));
    }

    "ReturnStatement";
    ((stmt("return true;").type == JSNodeType.ReturnStatement));

    "Script";
    ((parser("var i = 0; i++; return 0;").type == JSNodeType.Script));

    "Module";
    ((parser("import a from 's'; var i = 0; i++; return 0;").type == JSNodeType.Module));

    "SetterMethod";
    ((exp("({set a(a){test;}})").nodes[0].nodes[0].type == JSNodeType.SetterMethod));

    {
        "ShiftExpression"; "#";

        ((exp("1<<b").type == JSNodeType.ShiftExpression));
        ((exp("1>>b").type == JSNodeType.ShiftExpression));
        ((exp("1>>>b").type == JSNodeType.ShiftExpression));

    }

    "Specifier";
    ((stmt("import {a as b} from 'g'").nodes[0].nodes[0].nodes[0].type == JSNodeType.Specifier));

    "Spread";
    ((exp("[...a]").nodes[0].type == JSNodeType.Spread));

    "StringLiteral";
    ((exp('"a"').type == JSNodeType.StringLiteral));

    "SuperCall";
    ((exp("super(a,b,c)").type == JSNodeType.SuperCall));

    "SuperExpression";
    ((exp("super.member").type == JSNodeType.SuperExpression));

    "SwitchStatement";
    ((stmt("switch(a){default:2;}").type == JSNodeType.SwitchStatement));

    "Template";
    ((exp("\`This is a template\`").type == JSNodeType.Template));

    "TemplateHead";
    ((exp("\`This ${is} a template\`").nodes[0].type == JSNodeType.TemplateHead));

    "TemplateMiddle";
    ((exp("\`This is \${0} \${0} a template\`").nodes[2].type == JSNodeType.TemplateMiddle));

    "TemplateTail";
    ((exp("\`This is ${is} a template\`").nodes[2].type == JSNodeType.TemplateTail));

    "ThisLiteral";
    ((exp("this").type == JSNodeType.ThisLiteral));

    "ThrowStatement";
    ((stmt("throw new Error('I\\'ve been thrown!');").type == JSNodeType.ThrowStatement));

    "TryStatement";
    ((stmt("try{1;}catch(e){1;}finally{1;}").type == JSNodeType.TryStatement));

    "TypeofExpression";
    ((exp("typeof a").type == JSNodeType.TypeofExpression));

    "UnaryExpression";
    ((exp("+1").type == JSNodeType.UnaryExpression));

    "VariableDeclaration";
    ((stmt("for(var i =0;;)1;").nodes[0].type == JSNodeType.VariableDeclaration));

    "VariableStatement";
    ((stmt("var d = 2;").type == JSNodeType.VariableStatement));

    "VoidExpression";
    ((exp("void 2;").type == JSNodeType.VoidExpression));

    "WhileStatement";
    ((stmt("while(2)1;").type == JSNodeType.WhileStatement));

    "WithStatement";
    ((stmt("with(1)2;").type == JSNodeType.WithStatement));

    "YieldExpression";
    ((exp("yield 2").type == JSNodeType.YieldExpression));
}

{
    "Extending Does Not Throw"; "#";
    {
        "AdditiveExpression"; "#";

        ((ext(exp("1+2"), true)));

        ((ext(exp("1-2"), true)));

    }

    "Arguments";
    ((ext(exp("d(1)"), true)));

    "ArrayLiteral";
    ((ext(exp("[1,2,3]"), true)));

    "ArrowFunction";
    ((ext(exp("()=>2"), true)));

    "AssignmentExpression";
    ((ext(exp("a=2"), true)));

    "BlockStatement";
    ((ext(stmt("{}"), true)));

    "AwaitExpression";
    ((ext(exp("await call()"), true)));

    "BindingExpression";
    ((ext(stmt("var i=2"), true)));

    {
        "BitwiseExpression"; "#";
        ((ext(exp("1 | 1"), true)));
        ((ext(exp("1 & 1"), true)));
        ((ext(exp("1 ^ 1"), true)));
    }

    {
        "BooleanLiteral"; "#";
        ((ext(exp("true"), true)));
        ((ext(exp("false"), true)));
    }

    "BreakStatement";
    ((ext(stmt("break"), true)));

    "CallExpression";
    ((ext(exp("call()"), true)));

    "CaseBlock";
    ((ext(stmt("switch(1){}"), true)));

    "CaseClause";
    ((ext(stmt("switch(1){case 2: 2; break;}"), true)));

    "DefaultClause";
    ((ext(stmt("switch(1){default: 2; break;}"), true)));

    "CatchClause";
    ((ext(stmt("try{}catch(e){}"), true)));

    "Class";
    ((ext(stmt("class id extends me{constructor(a,b){1;} method(a){} get get(){}}"), true)));

    "ComputedProperty";
    ((ext(exp("({['test']:2})"), true)));

    "ContinueStatement";
    ((ext(stmt("continue label;"), true)));

    "ConditionalExpression";
    ((ext(exp("e ? 1 : 2"), true)));

    "DebuggerStatement";
    ((ext(stmt("debugger;"), true)));

    "DeleteExpression";
    ((ext(exp("delete me"), true)));

    "DoStatement";
    ((ext(stmt("do{1;}while(2)"), true)));

    "Elision";
    ((ext(exp("[,,,]"), true)));

    "EmptyStatement";
    ((ext(stmt(";"), true)));

    {
        "EqualityExpression"; "#";

        ((ext(exp("1==1"), true)));
        ((ext(exp("1===1"), true)));
        ((ext(exp("1!=1"), true)));
        ((ext(exp("1!==1"), true)));
    }


    "ExponentiationExpression";
    ((ext(exp("a**2"), true)));

    "ExportClause";
    ((ext(stmt("export {a};"), true)));

    "ExportDeclaration";
    ((ext(stmt("export {a} from 'module';"), true)));

    "ExpressionList";
    ((ext(exp("1,2,3,4;"), true)));

    "ExpressionStatement";
    ((ext(stmt("1;"), true)));

    "FinallyClause";
    ((ext(stmt("try{}finally{}"), true)));

    "ForInStatement";
    ((ext(stmt("for(const i in d){}"), true)));

    "ForOfStatement";
    ((ext(stmt("for(const u of a){}"), true)));


    {
        "ForStatement"; "#";

        ((ext(stmt("for (var i = 0; i < 1; i++){}"), true)));

        ((ext(stmt("for (;;){}"), true)));

        ((ext(stmt("for (let i = 1, b; i < b;){b++;}"), true)));

        ((ext(stmt("for(a;i < b;){b++;}"), true)));
    }

    "FormalParameters: a,b,c";
    ((ext(stmt("function d(a,b,c){}"), true)));

    "FromClause";
    ((ext(stmt("import d from 'module';"), true)));

    "FunctionDeclaration";
    ((ext(stmt("async function * d (a,b,c) {const d = a; return d;}"), true)));

    "FunctionExpression";
    ((ext(exp("(async function * d (a,b,c) {const d = a; return d;})"), true)));

    "FunctionBody";
    ((ext(stmt("function d(){a}"), true)));

    "GetterMethod";
    ((ext(exp("({get d(){a}})"), true)));

    "IdentifierDefault";
    ((ext(id("import a from 'test'"), true)));

    "IdentifierProperty";
    ((ext(exp("m.a"), true)));

    "IdentifierModule";
    ((ext(id("import {a } from 'a'"), true)));

    {
        "IdentifierLabel"; "#";

        ((ext(id("continue label;"), true)));

        ((ext(id("label : {}"), true)));

        ((ext(id("break label;"), true)));

    }

    "IdentifierBinding";
    ((ext(id("var a = b;"), true)));

    "IdentifierReference";
    ((ext(id("id"), true)));

    "IfStatement";
    ((ext(stmt("if(true){}"), true)));

    "ImportClause";
    ((ext(stmt("import {a as d} from 'm'"), true)));

    "ImportDeclaration";
    ((ext(stmt("import {a as d} from 'm'"), true)));

    "InExpression";
    ((ext(exp("a in b"), true)));

    "InstanceOfExpression";
    ((ext(exp("a instanceof b"), true)));

    "LabeledStatement";
    ((ext(stmt("label: {} "), true)));

    {
        "LexicalBinding"; "#";

        ((ext(stmt("for(const d of a){}"), true)));

        ((ext(stmt("for(let d in a){}"), true)));
    }

    {
        "LexicalDeclaration"; "#";

        ((ext(stmt("let d = 0, i = [...d];"), true)));

        ((ext(stmt("const d = 0, i = [...d];"), true)));
    }

    {
        "LogicalExpression"; "#";

        ((ext(exp("a || b"), true)));

        ((ext(exp("1 && 2"), true)));
    }

    "MemberExpression";
    ((ext(exp("a.b['dd']"), true)));

    {
        "Method"; "#";

        ((ext(exp("({d(){a;}})"), true)));

        ((ext(exp("({async d(){a;}})"), true)));

        ((ext(exp("({async * d(){a;}})"), true)));

        ((ext(exp("({* d(){a;}})"), true)));
    }

    {
        "MultiplicativeExpression"; "#";

        ((ext(exp("1/1"), true)));
        ((ext(exp("1*1"), true)));
    }

    "NameSpaceImport";
    ((ext(stmt("import * as d from 'm'"), true)));
    ((ext(stmt("import * as d from 'm'"), true)));

    "NamedImports";
    ((ext(stmt("import {a as d} from 'm'"), true)));

    "NewExpression";
    ((ext(exp("new d"), true)));

    "NewInstanceExpression";
    ((ext(exp("new d()"), true)));

    "NewTarget";
    ((ext(exp("new.target"), true)));

    "NullLiteral";
    ((ext(exp("null"), true)));


    {
        "NumericLiteral"; "#";

        ((ext(exp(1), true)));

        ((ext(exp("0o1234"), true)));

        ((ext(exp("-0x1"), true)));

        ((ext(exp("0X1"), true)));

        ((ext(exp("0b11001"), true)));

        ((ext(exp("0B11001"), true)));

        ((ext(exp("-0.256"), true)));

        ((ext(exp("0.256"), true)));

        ((ext(exp("256.25e123"), true)));
    }

    "ObjectLiteral";
    ((ext(exp("({})"), true)));

    "Parameters";
    ((ext(exp("(a,b,c)=>{;};"), true)));

    "Parenthesized";
    ((ext(exp("(a)"), true)));

    {
        "PostExpression"; "#";
        ((ext(exp("p++"), true)));
        ((ext(exp("p++"), true)));
    }

    {
        "PreExpression"; "#";
        ((ext(exp("++p"), true)));
        ((ext(exp("--p"), true)));
    }

    "PropertyBinding";
    ((ext(exp("({b:2})"), true)));

    "RegexLiteral";
    ((ext(exp("/#\\d\\d/g"), true)));

    {
        "RelationalExpression"; "#";

        ((ext(exp("a<b"), true)));

        ((ext(exp("a>b"), true)));

        ((ext(exp("a<=b"), true)));

        ((ext(exp("a>=b"), true)));
    }

    "ReturnStatement";
    ((ext(stmt("return true;"), true)));

    "Script";
    ((ext(parser("var i = 0; i++; return 0;"), true)));

    "Module";
    ((ext(parser("import a from 's'; var i = 0; i++; return 0;"), true)));

    "SetterMethod";
    ((ext(exp("({set a(a){test;}})"), true)));

    {
        "ShiftExpression"; "#";

        ((ext(exp("1<<b"), true)));
        ((ext(exp("1>>b"), true)));
        ((ext(exp("1>>>b"), true)));

    }

    "Specifier";
    ((ext(stmt("import {a as b} from 'g'"), true)));

    "Spread";
    ((ext(exp("[...a]"), true)));

    "StringLiteral";
    ((ext(exp('"a"'), true)));

    "SuperCall";
    ((ext(exp("super(a,b,c)"), true)));

    "SuperExpression";
    ((ext(exp("super.member"), true)));

    "SwitchStatement";
    ((ext(stmt("switch(a){default:2;}"), true)));

    "Template";
    ((ext(exp("\`This is a template\`"), true)));

    "TemplateHead";
    ((ext(exp("\`This ${is} a template\`"), true)));

    "TemplateMiddle";
    ((ext(exp("\`This is \${0} \${0} a template\`"), true)));

    "TemplateTail";
    ((ext(exp("\`This is ${is} a template\`"), true)));

    "ThisLiteral";
    ((ext(exp("this"), true)));

    "ThrowStatement";
    ((ext(stmt("throw new Error('I\\'ve been thrown!');"), true)));

    "TryStatement";
    ((ext(stmt("try{1;}catch(e){1;}finally{1;}"), true)));

    "TypeofExpression";
    ((ext(exp("typeof a"), true)));

    "UnaryExpression";
    ((ext(exp("+1"), true)));

    "VariableDeclaration";
    ((ext(stmt("for(var i =0;;)1;"), true)));

    "VariableStatement";
    ((ext(stmt("var d = 2;"), true)));

    "VoidExpression";
    ((ext(exp("void 2;"), true)));

    "WhileStatement";
    ((ext(stmt("while(2)1;"), true)));

    "WithStatement";
    ((ext(stmt("with(1)2;"), true)));

    "YieldExpression";
    ((ext(exp("yield 2"), true)));
}

{
    "Renders Unformatted JS String"; "#";
    {
        "AdditiveExpression"; "#";

        ((renderCompressed(exp("1+2")) == "1+2"));

        ((renderCompressed(exp("1-2")) == "1-2"));

    }

    "Arguments";
    ((renderCompressed(exp("d(1)")) == "d(1)"));

    "ArrayLiteral";
    ((renderCompressed(exp("[1,2,3]")) == "[1,2,3]"));

    "ArrowFunction";
    ((renderCompressed(exp("()=>2")) == "()=>2"));

    "AsyncArrowFunction";
    ((renderCompressed(exp("async ()=>2")) == "async ()=>2"));

    "AssignmentExpression";
    ((renderCompressed(exp("a=2")) == "a=2"));

    "BlockStatement";
    ((renderCompressed(stmt("{}")) == "{}"));

    "AwaitExpression";
    ((renderCompressed(exp("await call()")) == "await call()"));

    "BindingExpression";
    ((renderCompressed(stmt("var i=2")) == "var i=2;"));

    {
        "BitwiseExpression"; "#";
        ((renderCompressed(exp("1 | 1")) == "1|1"));
        ((renderCompressed(exp("1 & 1")) == "1&1"));
        ((renderCompressed(exp("1 ^ 1")) == "1^1"));
    }

    {
        "BooleanLiteral"; "#";
        ((renderCompressed(exp("true")) == "true"));
        ((renderCompressed(exp("false")) == "false"));
    }

    "BreakStatement";
    ((renderCompressed(stmt("break")) == "break;"));

    "CallExpression";
    ((renderCompressed(exp("call()")) == "call()"));

    "CaseBlock";
    ((renderCompressed(stmt("switch(1){}")) == "switch(1){}"));

    "CaseClause";
    ((renderCompressed(stmt("switch(1){case 2: 2; break;}")) == "switch(1){case 2:2;break;}"));

    "DefaultClause";
    ((renderCompressed(stmt("switch(1){default: 2; break;}")) == "switch(1){default:2;break;}"));

    "CatchClause";
    ((renderCompressed(stmt("try{}catch(e){}")) == "try{}catch(e){}"));

    "Class";
    ((renderCompressed(stmt("class id extends me{constructor(a,b){1;} method(a){} get get(){}}")) == "class id extends me{constructor(a,b){1;}method(a){}get get(){}}"));

    "CoalesceExpression";
    ((renderCompressed(exp("a??b")) == "a??b"));

    "ComputedProperty";
    ((renderCompressed(exp("({['test']:2})")) == "({['test']:2})"));

    "ContinueStatement";
    ((renderCompressed(stmt("continue label;")) == "continue label;"));

    "ConditionalExpression";
    ((renderCompressed(exp("e ? 1 : 2")) == "e?1:2"));

    "DebuggerStatement";
    ((renderCompressed(stmt("debugger;")) == "debugger;"));

    "DeleteExpression";
    ((renderCompressed(exp("delete me")) == "delete me"));

    "DoStatement";
    ((renderCompressed(stmt("do{1;}while(2)")) == "do {1;} while(2)"));

    "Elision";
    ((renderCompressed(exp("[,,,]")) == "[,,]"));

    "EmptyStatement";
    ((renderCompressed(stmt(";")) == ";"));

    {
        "EqualityExpression"; "#";

        ((renderCompressed(exp("1==1")) == "1==1"));
        ((renderCompressed(exp("1===1")) == "1===1"));
        ((renderCompressed(exp("1!=1")) == "1!=1"));
        ((renderCompressed(exp("1!==1")) == "1!==1"));
    }


    "ExponentiationExpression";
    ((renderCompressed(exp("a**2")) == "a**2"));

    "ExportClause";
    ((renderCompressed(stmt("export {a};")) == "export {a};"));

    "ExportDeclaration";
    ((renderCompressed(stmt("export {a} from 'module';")) == "export {a} from'module';"));

    "ExpressionList";
    ((renderCompressed(exp("1,2,3,4;")) == "1,2,3,4"));

    "ExpressionStatement";
    ((renderCompressed(stmt("1;")) == "1;"));

    "FinallyClause";
    ((renderCompressed(stmt("try{}finally{}")) == "try{}finally{}"));

    "ForInStatement";
    ((renderCompressed(stmt("for(const i in d){}")) == "for(const i in d){}"));

    "ForOfStatement";
    ((renderCompressed(stmt("for(const u of a){}")) == "for(const u of a){}"));


    {
        "ForStatement"; "#";

        ((renderCompressed(stmt("for (var i = 0; i < 1; i++){}")) == "for(var i=0;i<1;i++){}"));

        ((renderCompressed(stmt("for (;;){}")) == "for(;;){}"));

        ((renderCompressed(stmt("for (let i = 1, b; i < b;){b++;}")) == "for(let i=1,b;i<b;){b++;}"));

        ((renderCompressed(stmt("for(a;i < b;){b++;}")) == "for(a;i<b;){b++;}"));
    }

    "FormalParameters: a,b,c";
    ((renderCompressed(stmt("function d(a,b,c){}")) == "function d(a,b,c){}"));

    "FromClause";
    ((renderCompressed(stmt("import d from 'module';")) == "import d from'module';"));

    "FunctionDeclaration";
    ((renderCompressed(stmt("async function * d (a,b,c) {const d = a; return d;}")) == "async function* d(a,b,c){const d=a;return d;}"));

    "FunctionExpression";
    ((renderCompressed(exp("(async function * d (a,b,c) {const d = a; return d;})")) == "(async function* d(a,b,c){const d=a;return d;})"));

    "FunctionBody";
    ((renderCompressed(stmt("function d(){a}")) == "function d(){a;}"));

    "GetterMethod";
    ((renderCompressed(exp("({get d(){a}})")) == "({get d(){a;}})"));

    "IfStatement";
    ((renderCompressed(stmt("if(true){}")) == "if(true){}"));

    "ImportClause";
    ((renderCompressed(stmt("import {a as d} from 'm'")) == "import {a as d} from'm';"));

    "ImportDeclaration";
    ((renderCompressed(stmt("import {a as d} from 'm'")) == "import {a as d} from'm';"));

    "InExpression";
    ((renderCompressed(exp("a in b")) == "a in b"));

    "InstanceOfExpression";
    ((renderCompressed(exp("a instanceof b")) == "a instanceof b"));

    "LabeledStatement";
    ((renderCompressed(stmt("label: {} ")) == "label:{}"));

    {
        "LexicalBinding"; "#";

        ((renderCompressed(stmt("for(const d of a){}")) == "for(const d of a){}"));

        ((renderCompressed(stmt("for(let d in a){}")) == "for(let d in a){}"));
    }

    {
        "LexicalDeclaration"; "#";

        ((renderCompressed(stmt("let d = 0, i = [...d];")) == "let d=0,i=[...d];"));

        ((renderCompressed(stmt("const d = 0, i = [...d];")) == "const d=0,i=[...d];"));
    }

    {
        "LogicalExpression"; "#";

        ((renderCompressed(exp("a || b")) == "a||b"));

        ((renderCompressed(exp("1 && 2")) == "1&&2"));
    }

    "MemberExpression";
    ((renderCompressed(exp("a.b['dd']")) == "a.b['dd']"));

    {
        "Method"; "#";

        ((renderCompressed(exp("({d(){a;}})")) == "({d(){a;}})"));

        ((renderCompressed(exp("({async d(){a;}})")) == "({async d(){a;}})"));

        ((renderCompressed(exp("({async * d(){a;}})")) == "({async *d(){a;}})"));

        ((renderCompressed(exp("({* d(){a;}})")) == "({*d(){a;}})"));
    }

    {
        "MultiplicativeExpression"; "#";

        ((renderCompressed(exp("1/1")) == "1/1"));
        ((renderCompressed(exp("1*1")) == "1*1"));
    }

    "NameSpaceImport";
    ((renderCompressed(stmt("import * as d from 'm'")) == "import * as d from'm';"));

    "NamedImports";
    ((renderCompressed(stmt("import {a as d} from 'm'")) == "import {a as d} from'm';"));

    "NewExpression";
    ((renderCompressed(exp("new d")) == "new d"));

    "NewInstanceExpression";
    ((renderCompressed(exp("new d()")) == "new d()"));

    "NewTarget";
    ((renderCompressed(exp("new.target")) == "new.target"));

    "NullLiteral";
    ((renderCompressed(exp("null")) == "null"));


    {
        "NumericLiteral"; "#";

        ((renderCompressed(exp(1)) == 1));

        ((renderCompressed(exp("0o1234")) == "0o1234"));

        ((renderCompressed(exp("-0x1")) == "-0x1"));

        ((renderCompressed(exp("0X1")) == "0X1"));

        ((renderCompressed(exp("0b11001")) == "0b11001"));

        ((renderCompressed(exp("0B11001")) == "0B11001"));

        ((renderCompressed(exp("-0.256")) == "-0.256"));

        ((renderCompressed(exp("0.256")) == "0.256"));

        ((renderCompressed(exp("256.25e123")) == "256.25e123"));
    }

    "ObjectLiteral";
    ((renderCompressed(exp("({})")) == "({})"));

    "OptionalChaining";
    ((renderCompressed(exp("a?.b['c']?.d.e?.f()?.g()?.h?.j.k()")) == "a?.b['c']?.d.e?.f()?.g()?.h?.j.k()"));

    "Parameters";
    ((renderCompressed(exp("(a,b,c)=>{;};")) == "(a,b,c)=>{;}"));

    "Parenthesized";
    ((renderCompressed(exp("(a)")) == "(a)"));

    {
        "PostExpression"; "#";
        ((renderCompressed(exp("p++")) == "p++"));
        ((renderCompressed(exp("p++")) == "p++"));
    }

    {
        "PreExpression"; "#";
        ((renderCompressed(exp("++p")) == "++p"));
        ((renderCompressed(exp("--p")) == "--p"));
    }

    "PropertyBinding";
    ((renderCompressed(exp("({b:2})")) == "({b:2})"));

    {
        "ObjectDestructuring"; "#";

        ((renderCompressed(stmt("const {b:{test: {px, py = 2}, } } = d;")) == "const {b:{test:{px,py=2}}}=d;"));
        ((renderCompressed(stmt("const {b , } = d;")) == "const {b}=d;"));
        ((renderCompressed(stmt("const {b , ...d } = d;")) == "const {b,...d}=d;"));
    }

    {
        "ArrayDestructuring"; "#";

        ((renderCompressed(stmt("const [a,,,a,]= d;")) == "const [a,,,a]=d;"));
        ((renderCompressed(stmt("const [a,,,a,...c] = d;")) == "const [a,,,a,...c]=d;"));
        ((renderCompressed(stmt("const [a=d,...c] = d;")) == "const [a=d,...c]=d;"));
    }

    {
        "RegexLiteral"; "#";
        ((renderCompressed(exp("/#\\d\\d/g")) == "/#\\d\\d/g"));
        ((renderCompressed(parser("/\\ /g == 2; a = 22")) == "/\\ /g==2;a=22;"));
    }

    {
        "RelationalExpression"; "#";

        ((renderCompressed(exp("a<b")) == "a<b"));

        ((renderCompressed(exp("a>b")) == "a>b"));

        ((renderCompressed(exp("a<=b")) == "a<=b"));

        ((renderCompressed(exp("a>=b")) == "a>=b"));
    }

    "ReturnStatement";
    ((renderCompressed(stmt("return true;")) == "return true;"));

    "Script";
    ((renderCompressed(parser("var i = 0; i++; return 0;")) == "var i=0;i++;return 0;"));

    "Module";
    ((renderCompressed(parser("import a from 's'; var i = 0; i++; return 0;")) == "import a from's';var i=0;i++;return 0;"));

    "SetterMethod";
    ((renderCompressed(exp("({set a(a){test;}})")) == "({set a(a){test;}})"));

    {
        "ShiftExpression"; "#";

        ((renderCompressed(exp("1<<b")) == "1<<b"));
        ((renderCompressed(exp("1>>b")) == "1>>b"));
        ((renderCompressed(exp("1>>>b")) == "1>>>b"));

    }

    "Specifier";
    ((renderCompressed(stmt("import {a as b} from 'g'")) == "import {a as b} from'g';"));

    "Spread";
    ((renderCompressed(exp("[...a]")) == "[...a]"));

    "StringLiteral";
    ((renderCompressed(exp('"a"')) == '"a"'));

    "SuperCall";
    ((renderCompressed(exp("super(a,b,c)")) == "super(a,b,c)"));

    "SuperExpression";
    ((renderCompressed(exp("super.member")) == "super.member"));

    "SwitchStatement";
    ((renderCompressed(stmt("switch(a){default:2;}")) == "switch(a){default:2;}"));

    "Template";
    ((renderCompressed(exp("\`This is a template\`")) == "\`This is a template\`"));

    "TemplateHead";
    ((renderCompressed(exp("\`This ${is} a template\`")) == "\`This ${is} a template\`"));

    "TemplateMiddle";
    ((renderCompressed(exp("\`This is \${0} \${0} a template\`")) == "\`This is \${0} \${0} a template\`"));

    "TemplateTail";
    ((renderCompressed(exp("\`This is ${is} a template\`")) == "\`This is ${is} a template\`"));

    "ThisLiteral";
    ((renderCompressed(exp("this")) == "this"));

    "ThrowStatement";
    ((renderCompressed(stmt("throw new Error('I\\'ve been thrown!');")) == "throw new Error('I\\'ve been thrown!');"));

    "TryStatement";
    ((renderCompressed(stmt("try{1;}catch(e){1;}finally{1;}")) == "try{1;}catch(e){1;}finally{1;}"));

    "TypeofExpression";
    ((renderCompressed(exp("typeof a")) == "typeof a"));

    "UnaryExpression";
    ((renderCompressed(exp("+1")) == "+1"));

    "VariableDeclaration";
    ((renderCompressed(stmt("for(var i =0;;)1;")) == "for(var i=0;;)1;"));

    "VariableStatement";
    ((renderCompressed(stmt("var d = 2;")) == "var d=2;"));

    "VoidExpression";
    ((renderCompressed(exp("void 2;")) == "void 2"));

    "WhileStatement";
    ((renderCompressed(stmt("while(2)1;")) == "while(2)1;"));

    "WithStatement";
    ((renderCompressed(stmt("with(1)2;")) == "with(1)2;"));

    "YieldExpression";
    ((renderCompressed(exp("yield 2")) == "yield 2"));
}