import { MinTreeNodeClass, getIdentifierName, MinTreeNodeType, MinTreeNodeDefinition, MinTreeNodeDefinitions, parser, exp, stmt, renderCompressed, ext } from "../build/library/ecma.js";
import { traverse, bit_filter } from "@candlefw/conflagrate";
import { MinTreeNodeRenderClass } from "../build/library/nodes/mintree_node_extensions.js";
import utils from "util";
"@candlefw/js test spec";

const r = (...str) => renderCompressed(parser(...str), null, []);
const s = (...str) => renderCompressed(stmt(...str), null, []);
const e = (...str) => renderCompressed(exp(...str), null, []);

const id = (...str) => {
    const n = exp(...str);

    for (const { node } of traverse(n, "nodes")
        .then(bit_filter("type", MinTreeNodeClass.IDENTIFIER))
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

        ((e("[,,1,,id]") == "[,,1,,id]"));

        ((e("[,,2,,1,...d,]") == "[,,2,,1,...d]"));

        ((e("[1,,1]") == "[1,,1]"));

        ((e("[,,2,,1,...d,,]") == "[,,2,,1,...d,,]"));
    }
}

{
    "MinTreeType Assertions"; "#";

    {
        "AdditiveExpression"; "#";

        ((exp("1+2").type == MinTreeNodeType.AdditiveExpression));

        ((exp("1-2").type == MinTreeNodeType.AdditiveExpression));

    }

    "Arguments";
    ((exp("d(1)").nodes[1].type == MinTreeNodeType.Arguments));

    "ArrayLiteral";
    ((exp("[1,2,3]").type == MinTreeNodeType.ArrayLiteral));

    "ArrowFunction";
    ((exp("()=>2").type == MinTreeNodeType.ArrowFunction));

    "AssignmentExpression";
    ((exp("a=2").type == MinTreeNodeType.AssignmentExpression));

    "BlockStatement";
    ((stmt("{}").type == MinTreeNodeType.BlockStatement));

    "AwaitExpression";
    ((exp("await call()").type == MinTreeNodeType.AwaitExpression));

    "BindingExpression";
    ((stmt("var i=2").nodes[0].type == MinTreeNodeType.BindingExpression));

    {
        "BitwiseExpression"; "#";
        ((exp("1 | 1").type == MinTreeNodeType.BitwiseExpression));
        ((exp("1 & 1").type == MinTreeNodeType.BitwiseExpression));
        ((exp("1 ^ 1").type == MinTreeNodeType.BitwiseExpression));
    }

    {
        "BooleanLiteral"; "#";
        ((exp("true").type == MinTreeNodeType.BooleanLiteral));
        ((exp("false").type == MinTreeNodeType.BooleanLiteral));
    }

    "BreakStatement";
    ((stmt("break").type == MinTreeNodeType.BreakStatement));

    "CallExpression";
    ((exp("call()").type == MinTreeNodeType.CallExpression));

    "CaseBlock";
    ((stmt("switch(1){}").nodes[1].type == MinTreeNodeType.CaseBlock));

    "CaseClause";
    ((stmt("switch(1){case 2: 2; break;}").nodes[1].nodes[0].type == MinTreeNodeType.CaseClause));

    "DefaultClause";
    ((stmt("switch(1){default: 2; break;}").nodes[1].nodes[0].type == MinTreeNodeType.DefaultClause));

    "CatchClause";
    ((stmt("try{}catch(e){}").nodes[1].type == MinTreeNodeType.CatchClause));

    "Class";
    ((stmt("class id extends me{constructor(a,b){1;} method(a){} get get(){}}").type == MinTreeNodeType.Class));

    "ComputedProperty";
    ((exp("({['test']:2})").nodes[0].nodes[0].nodes[0].type == MinTreeNodeType.ComputedProperty));

    "ContinueStatement";
    ((stmt("continue label;").type == MinTreeNodeType.ContinueStatement));

    "ConditionalExpression";
    ((exp("e ? 1 : 2").type == MinTreeNodeType.ConditionalExpression));

    "DebuggerStatement";
    ((stmt("debugger;").type == MinTreeNodeType.DebuggerStatement));

    "DeleteExpression";
    ((exp("delete me").type == MinTreeNodeType.DeleteExpression));

    "DoStatement";
    ((stmt("do{1;}while(2)").type == MinTreeNodeType.DoStatement));

    "Elision";
    ((exp("[,,,]").nodes[0].type == MinTreeNodeType.Elision));

    "EmptyStatement";
    ((stmt(";").type == MinTreeNodeType.EmptyStatement));

    {
        "EqualityExpression"; "#";

        ((exp("1==1").type == MinTreeNodeType.EqualityExpression));
        ((exp("1===1").type == MinTreeNodeType.EqualityExpression));
        ((exp("1!=1").type == MinTreeNodeType.EqualityExpression));
        ((exp("1!==1").type == MinTreeNodeType.EqualityExpression));
    }


    "ExponentiationExpression";
    ((exp("a**2").type == MinTreeNodeType.ExponentiationExpression));

    "ExportClause";
    ((stmt("export {a};").nodes[0].type == MinTreeNodeType.ExportClause));

    "ExportDeclaration";
    ((stmt("export {a} from 'module';").type == MinTreeNodeType.ExportDeclaration));

    "ExpressionList";
    ((exp("1,2,3,4;").type == MinTreeNodeType.ExpressionList));

    "ExpressionStatement";
    ((stmt("1;").type == MinTreeNodeType.ExpressionStatement));

    "FinallyClause";
    ((stmt("try{}finally{}").nodes[2].type == MinTreeNodeType.FinallyClause));

    "ForInStatement";
    ((stmt("for(const i in d){}").type == MinTreeNodeType.ForInStatement));

    "ForOfStatement";
    ((stmt("for(const u of a){}").type == MinTreeNodeType.ForOfStatement));


    {
        "ForStatement"; "#";

        ((stmt("for (var i = 0; i < 1; i++){}").type == MinTreeNodeType.ForStatement));

        ((stmt("for (;;){}").type == MinTreeNodeType.ForStatement));

        ((stmt("for (let i = 1, b; i < b;){b++;}").type == MinTreeNodeType.ForStatement));

        ((stmt("for(a;i < b;){b++;}").type == MinTreeNodeType.ForStatement));
    }

    "FormalParameters: a,b,c";
    ((stmt("function d(a,b,c){}").nodes[1].type == MinTreeNodeType.FormalParameters));

    "FromClause";
    ((stmt("import d from 'module';").nodes[1].type == MinTreeNodeType.FromClause));

    "FunctionDeclaration";
    ((stmt("async function * d (a,b,c) {const d = a; return d;}").type == MinTreeNodeType.FunctionDeclaration));

    "FunctionExpression";
    ((exp("(async function * d (a,b,c) {const d = a; return d;})").nodes[0].type == MinTreeNodeType.FunctionExpression));

    "FunctionBody";
    ((stmt("function d(){a}").nodes[2].type == MinTreeNodeType.FunctionBody));

    "GetterMethod";
    ((exp("({get d(){a}})").nodes[0].nodes[0].type == MinTreeNodeType.GetterMethod));

    "IdentifierDefault";
    ((id("import a from 'test'").type == MinTreeNodeType.IdentifierDefault));

    "IdentifierProperty";
    ((exp("m.a").nodes[1].type == MinTreeNodeType.IdentifierProperty));

    "IdentifierModule";
    ((id("import {a } from 'a'").type == MinTreeNodeType.IdentifierModule));

    {
        "IdentifierLabel"; "#";

        ((id("continue label;").type == MinTreeNodeType.IdentifierLabel));

        ((id("label : {}").type == MinTreeNodeType.IdentifierLabel));

        ((id("break label;").type == MinTreeNodeType.IdentifierLabel));

    }

    "IdentifierBinding";
    ((id("var a = b;").type == MinTreeNodeType.IdentifierBinding));

    "IdentifierReference";
    ((id("id").type == MinTreeNodeType.IdentifierReference));

    "IfStatement";
    ((stmt("if(true){}").type == MinTreeNodeType.IfStatement));

    "ImportClause";
    ((stmt("import {a as d} from 'm'").nodes[0].type == MinTreeNodeType.ImportClause));

    "ImportDeclaration";
    ((stmt("import {a as d} from 'm'").type == MinTreeNodeType.ImportDeclaration));

    "InExpression";
    ((exp("a in b").type == MinTreeNodeType.InExpression));

    "InstanceOfExpression";
    ((exp("a instanceof b").type == MinTreeNodeType.InstanceOfExpression));

    "LabeledStatement";
    ((stmt("label: {} ").type == MinTreeNodeType.LabeledStatement));

    {
        "LexicalBinding"; "#";

        ((stmt("for(const d of a){}").nodes[0].type == MinTreeNodeType.LexicalBinding));

        ((stmt("for(let d in a){}").nodes[0].type == MinTreeNodeType.LexicalBinding));
    }

    {
        "LexicalDeclaration"; "#";

        ((stmt("let d = 0, i = [...d];").type == MinTreeNodeType.LexicalDeclaration));

        ((stmt("const d = 0, i = [...d];").type == MinTreeNodeType.LexicalDeclaration));
    }

    {
        "LogicalExpression"; "#";

        ((exp("a || b").type == MinTreeNodeType.LogicalExpression));

        ((exp("1 && 2").type == MinTreeNodeType.LogicalExpression));
    }

    "MemberExpression";
    ((exp("a.b['dd']").type == MinTreeNodeType.MemberExpression));

    {
        "Method"; "#";

        ((exp("({d(){a;}})").nodes[0].nodes[0].type == MinTreeNodeType.Method));

        ((exp("({async d(){a;}})").nodes[0].nodes[0].type == MinTreeNodeType.Method));

        ((exp("({async * d(){a;}})").nodes[0].nodes[0].type == MinTreeNodeType.Method));

        ((exp("({* d(){a;}})").nodes[0].nodes[0].type == MinTreeNodeType.Method));
    }

    {
        "MultiplicativeExpression"; "#";

        ((exp("1/1").type == MinTreeNodeType.MultiplicativeExpression));
        ((exp("1*1").type == MinTreeNodeType.MultiplicativeExpression));;
    }

    "NameSpaceImport";
    ((stmt("import * as d from 'm'").nodes[0].nodes[0].type == MinTreeNodeType.NameSpaceImport));

    "NamedImports";
    ((stmt("import {a as d} from 'm'").nodes[0].nodes[0].type == MinTreeNodeType.NamedImports));

    "NewExpression";
    ((exp("new d").type == MinTreeNodeType.NewExpression));

    "NewInstanceExpression";
    ((exp("new d()").type == MinTreeNodeType.NewInstanceExpression));

    "NewTarget";
    ((exp("new.target").type == MinTreeNodeType.NewTarget));

    "NullLiteral";
    ((exp("null").type == MinTreeNodeType.NullLiteral));


    {
        "NumericLiteral"; "#";

        ((exp(1).type == MinTreeNodeType.NumericLiteral));

        ((exp("0o1234").type == MinTreeNodeType.NumericLiteral));

        ((exp("-0x1").type == MinTreeNodeType.NumericLiteral));

        ((exp("0X1").type == MinTreeNodeType.NumericLiteral));

        ((exp("0b11001").type == MinTreeNodeType.NumericLiteral));

        ((exp("0B11001").type == MinTreeNodeType.NumericLiteral));

        ((exp("-0.256").type == MinTreeNodeType.NumericLiteral));

        ((exp("0.256").type == MinTreeNodeType.NumericLiteral));

        ((exp("256.25e123").type == MinTreeNodeType.NumericLiteral));
    }

    "ObjectLiteral";
    ((exp("({})").nodes[0].type == MinTreeNodeType.ObjectLiteral));

    "Parameters";
    ((exp("(a,b,c)=>{;};").nodes[0].type == MinTreeNodeType.FormalParameters));

    "Parenthesized";
    ((exp("(a)").type == MinTreeNodeType.Parenthesized));

    {
        "PostExpression"; "#";
        ((exp("p++").type == MinTreeNodeType.PostExpression));
        ((exp("p++").type == MinTreeNodeType.PostExpression));
    }

    {
        "PreExpression"; "#";
        ((exp("++p").type == MinTreeNodeType.PreExpression));
        ((exp("--p").type == MinTreeNodeType.PreExpression));
    }

    "PropertyBinding";
    ((exp("({b:2})").nodes[0].nodes[0].type == MinTreeNodeType.PropertyBinding));

    "RegexLiteral";
    ((exp("/#\\d\\d/g").type == MinTreeNodeType.RegexLiteral));

    {
        "RelationalExpression"; "#";

        ((exp("a<b").type == MinTreeNodeType.RelationalExpression));

        ((exp("a>b").type == MinTreeNodeType.RelationalExpression));

        ((exp("a<=b").type == MinTreeNodeType.RelationalExpression));

        ((exp("a>=b").type == MinTreeNodeType.RelationalExpression));
    }

    "ReturnStatement";
    ((stmt("return true;").type == MinTreeNodeType.ReturnStatement));

    "Script";
    ((parser("var i = 0; i++; return 0;").type == MinTreeNodeType.Script));

    "Module";
    ((parser("import a from 's'; var i = 0; i++; return 0;").type == MinTreeNodeType.Module));

    "SetterMethod";
    ((exp("({set a(a){test;}})").nodes[0].nodes[0].type == MinTreeNodeType.SetterMethod));

    {
        "ShiftExpression"; "#";

        ((exp("1<<b").type == MinTreeNodeType.ShiftExpression));
        ((exp("1>>b").type == MinTreeNodeType.ShiftExpression));
        ((exp("1>>>b").type == MinTreeNodeType.ShiftExpression));

    }

    "Specifier";
    ((stmt("import {a as b} from 'g'").nodes[0].nodes[0].nodes[0].type == MinTreeNodeType.Specifier));

    "Spread";
    ((exp("[...a]").nodes[0].type == MinTreeNodeType.Spread));

    "StringLiteral";
    ((exp('"a"').type == MinTreeNodeType.StringLiteral));

    "SuperCall";
    ((exp("super(a,b,c)").type == MinTreeNodeType.SuperCall));

    "SuperExpression";
    ((exp("super.member").type == MinTreeNodeType.SuperExpression));

    "SwitchStatement";
    ((stmt("switch(a){default:2;}").type == MinTreeNodeType.SwitchStatement));

    "Template";
    ((exp("\`This is a template\`").type == MinTreeNodeType.Template));

    "TemplateHead";
    ((exp("\`This ${is} a template\`").nodes[0].type == MinTreeNodeType.TemplateHead));

    "TemplateMiddle";
    ((exp("\`This is \${0} \${0} a template\`").nodes[2].type == MinTreeNodeType.TemplateMiddle));

    "TemplateTail";
    ((exp("\`This is ${is} a template\`").nodes[2].type == MinTreeNodeType.TemplateTail));

    "ThisLiteral";
    ((exp("this").type == MinTreeNodeType.ThisLiteral));

    "ThrowStatement";
    ((stmt("throw new Error('I\\'ve been thrown!');").type == MinTreeNodeType.ThrowStatement));

    "TryStatement";
    ((stmt("try{1;}catch(e){1;}finally{1;}").type == MinTreeNodeType.TryStatement));

    "TypeofExpression";
    ((exp("typeof a").type == MinTreeNodeType.TypeofExpression));

    "UnaryExpression";
    ((exp("+1").type == MinTreeNodeType.UnaryExpression));

    "VariableDeclaration";
    ((stmt("for(var i =0;;)1;").nodes[0].type == MinTreeNodeType.VariableDeclaration));

    "VariableStatement";
    ((stmt("var d = 2;").type == MinTreeNodeType.VariableStatement));

    "VoidExpression";
    ((exp("void 2;").type == MinTreeNodeType.VoidExpression));

    "WhileStatement";
    ((stmt("while(2)1;").type == MinTreeNodeType.WhileStatement));

    "WithStatement";
    ((stmt("with(1)2;").type == MinTreeNodeType.WithStatement));

    "YieldExpression";
    ((exp("yield 2").type == MinTreeNodeType.YieldExpression));
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
    ((renderCompressed(exp("[,,,]")) == "[,,,]"));

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

    "RegexLiteral";
    ((renderCompressed(exp("/#\\d\\d/g")) == "/#\\d\\d/g"));

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