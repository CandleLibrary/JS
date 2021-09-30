import { experimentalConstructRenderers, NodeMapping, NodeMappings } from "@candlelib/conflagrate";
import { JSClassDeclaration } from "../types/JSClass.js";
import { JSArguments, JSArrowFunction, JSFormalParameters, JSFunctionBody, JSFunctionDeclaration, JSFunctionExpression, JSGetterMethod, JSMethod, JSSetterMethod } from "../types/JSFunction.js";
import { JSIdentifier, JSIdentifierBinding, JSIdentifierDefault, JSIdentifierLabel, JSIdentifierModule, JSIdentifierName, JSIdentifierReference } from "../types/JSIdentifier.js";
import { JSExportClause, JSExportDeclaration, JSFromClause, JSImportClause, JSImportDeclaration, JSImportMeta, JSModuleSpecifier, JSNamedImports, JSNameSpaceImport } from "../types/JSModule.js";
import { JSNode } from "../types/JSNode";
import { JSArrayBinding, JSArrayLiteral, JSBindingProperty, JSComputedProperty, JSElision, JSObjectBinding, JSObjectLiteral } from "../types/JSObject.js";
import {
    JSAdditiveExpression,
    JSAssignmentExpression,
    JSAwaitExpression,
    JSBindingExpression,
    JSBitwiseExpression,
    JSCallExpression,
    JSCoalesceExpression,
    JSConditionalExpression,
    JSDeleteExpression,
    JSEqualityExpression,
    JSExponentiationExpression,
    JSExpressionList,
    JSImportCallExpression,
    JSInExpression,
    JSInstanceOfExpression,
    JSLogicalExpression,
    JSMemberExpression,
    JSMultiplicativeExpression,
    JSNewExpression,
    JSNewInstanceExpression,
    JSOptionalMemberExpression,
    JSParenthesized,
    JSPostExpression,
    JSPreExpression,
    JSRelationalExpression,
    JSShiftExpression,
    JSSpread,
    JSSuperCall,
    JSSuperExpression,
    JSTypeofExpression, JSUnaryExpression, JSVoidExpression, JSYieldExpression
} from "../types/JSOperator.js";
import { JSBigIntLiteral, JSBooleanLiteral, JSNewTarget, JSNullLiteral, JSNumericLiteral, JSRegexLiteral, JSStringLiteral, JSThisLiteral } from "../types/JSPrimitive.js";
import { JSScript } from "../types/JSScript.js";
import { JSBlockStatement, JSBreakStatement, JSCaseBlock, JSCaseClause, JSCatchClause, JSContinueStatement, JSDebuggerStatement, JSDefaultClause, JSDoStatement, JSEmptyStatement, JSExpressionStatement, JSFinallyClause, JSForInStatement, JSForOfStatement, JSForStatement, JSIfStatement, JSLabeledStatement, JSLexicalBinding, JSLexicalDeclaration, JSReturnStatement, JSSwitchStatement, JSTryStatement, JSVariableDeclaration, JSVariableStatement, JSWhileStatement } from "../types/JSStatement.js";
import { JSTemplate, JSTemplateHead, JSTemplateMiddle, JSTemplateTail } from "../types/JSTemplate.js";
import { JSNodeClass } from "../types/node_class_type.js";
import { JSNodeType } from "../types/node_type.js";

export const javascript_mappings: NodeMappings<JSNode, "type"> = <NodeMappings<JSNode, "type">>{
    typename: "type",
    type_lookup: null,
    mappings: [


        <NodeMapping<JSScript>>{
            type: JSNodeType.Script,
            template: "@nodes...[o:n]"
        },
        //Module

        //Import
        <NodeMapping<JSExpressionStatement>>{
            type: JSNodeType.ExpressionStatement,
            template: "@nodes... \; "
        },

        <NodeMapping<JSImportDeclaration>>{
            type: JSNodeType.ImportDeclaration,
            template: "import m:s @nodes...[m:s]"
        },

        <NodeMapping<JSImportClause>>{
            type: JSNodeType.ImportClause,
            template: "@nodes...[\\, o:s]"
        },

        <NodeMapping<JSModuleSpecifier>>{
            type: JSNodeType.Specifier,
            template: "@nodes[0] { nodes[1] : m:s as m:s @nodes[1] }",
        },

        <NodeMapping<JSFromClause>>{
            type: JSNodeType.FromClause,
            template: "\\from m:s @nodes[0] ;"
        },

        <NodeMapping<JSNameSpaceImport>>{
            type: JSNodeType.NameSpace,
            template: "\\* m:s as m:s @nodes[0]"
        },

        <NodeMapping<JSNamedImports>>{
            type: JSNodeType.Specifiers,
            template: "\\{ @nodes...[, o:s] \\}"
        },

        //Export
        <NodeMapping<JSExportDeclaration>>{
            type: JSNodeType.ExportDeclaration,
            template: "export {DEFAULT: m:s default} m:s {not nodes[0]: \\* } @nodes...[m:s] {DEFAULT: ;}"
        },
        <NodeMapping<JSExportClause>>{
            type: JSNodeType.ExportClause,
            template: "\\{ @nodes...[, o:s] \\}"
        },

        //Declarations

        <NodeMapping<JSLexicalDeclaration>>{
            type: JSNodeType.LexicalDeclaration,
            template: "@symbol m:s @nodes...[, o:s];"
        },

        <NodeMapping<JSLexicalBinding>>{
            type: JSNodeType.LexicalBinding,
            template: "@symbol m:s @nodes...[, o:s]"
        },

        <NodeMapping<JSVariableStatement>>{
            type: JSNodeType.VariableStatement,
            template: "var m:s @nodes...[, o:s];"
        },

        <NodeMapping<JSVariableDeclaration>>{
            type: JSNodeType.VariableDeclaration,
            template: "var m:s @nodes...[, o:s]"
        },

        //Functions
        <NodeMapping<JSFunctionDeclaration>>{
            type: JSNodeType.FunctionDeclaration,
            template: "{ASYNC: async m:s} function {GENERATOR: m:s \\* } m:s @nodes[0]? \\(  @nodes[1]? \\) \\{ @nodes[2]? \\} "
        },

        <NodeMapping<JSFunctionExpression>>{
            type: JSNodeType.FunctionExpression,
            template: "{ASYNC: async m:s} function {GENERATOR: m:s \\* } m:s @nodes[0]? \\(  @nodes[1]? \\) \\{ @nodes[2]? \\} "
        },

        <NodeMapping<JSFunctionBody>>{
            type: JSNodeType.FunctionBody,
            template: "i:s o:n @nodes...[o:n] i:e o:n"
        },

        <NodeMapping<JSFormalParameters>>{
            type: JSNodeType.FormalParameters,
            template: "@nodes...[, o:s]"
        },


        //Classes
        <NodeMapping<JSClassDeclaration>>{
            type: JSNodeType.ClassDeclaration,
            template: "class {nodes[0] : m:s @nodes[0] } { nodes[1] : m:s extends m:s @nodes[1] } \\{ i:s o:n @nodes...[2, o:n] i:e o:n \\}"
        },

        //Statements

        <NodeMapping<JSEmptyStatement>>{
            type: JSNodeType.EmptyStatement,
            template: "\\; "
        },
        <NodeMapping<JSBlockStatement>>{
            type: JSNodeType.BlockStatement,
            template: "\\{ i:s o:n @nodes...[o:n] i:e o:n \\} "
        },

        //Iterators
        <NodeMapping<JSForStatement>>{
            type: JSNodeType.ForStatement,
            template: "for(@nodes[0] o:s @nodes[1]; o:s @nodes[2]) i:s o:n @nodes[3] i:e o:n"
        },

        <NodeMapping<JSForOfStatement>>{
            type: JSNodeType.ForOfStatement,
            template: "for {AWAIT: m:s await} \\( @nodes[0] m:s of m:s @nodes[1] \\) i:s o:n @nodes[2] i:e o:n"
        },

        <NodeMapping<JSForInStatement>>{
            type: JSNodeType.ForInStatement,
            template: "for  (@nodes[0] m:s in m:s @nodes[1])  i:s o:n @nodes[2] i:e o:n"
        },

        <NodeMapping<JSWhileStatement>>{
            type: JSNodeType.WhileStatement,
            template: "while ( @nodes[0] )  i:s o:n @nodes[1] i:e o:n"
        },

        <NodeMapping<JSDoStatement>>{
            type: JSNodeType.DoStatement,
            template: "do m:s @nodes[0] m:s while ( @nodes[1] );"
        },

        //Unary Statements

        <NodeMapping<JSReturnStatement>>{
            type: JSNodeType.ReturnStatement,
            template: "\\return { nodes[0] : m:s @nodes[0] } \\;"
        },

        <NodeMapping<JSContinueStatement>>{
            type: JSNodeType.ContinueStatement,
            template: "\\continue { nodes[0] : m:s @nodes[0] } \\;"
        },

        <NodeMapping<JSBreakStatement>>{
            type: JSNodeType.BreakStatement,
            template: "\\break { nodes[0] : m:s @nodes[0] } \\;"
        },

        <NodeMapping<JSLabeledStatement>>{
            type: JSNodeType.LabeledStatement,
            template: "@nodes[0] : o:n @nodes[1]"
        },


        //If Statement
        <NodeMapping<JSIfStatement>>{
            type: JSNodeType.IfStatement,
            template: "if ( @nodes[0] ) i:s o:n @nodes[1] i:e { nodes[2] : o:n else i:s o:n @nodes[2] i:e } "
        },

        //Try Statement
        <NodeMapping<JSTryStatement>>{
            type: JSNodeType.TryStatement,
            template: "try  @nodes[0]  @nodes[1]?  @nodes[2]?",
        },
        <NodeMapping<JSCatchClause>>{
            type: JSNodeType.CatchClause,
            template: "catch ( @nodes[0] ) i:s @nodes[1] i:e"
        },
        <NodeMapping<JSFinallyClause>>{
            type: JSNodeType.FinallyClause,
            template: "finally i:s @nodes[1] i:e"
        },




        //Switch Statement

        <NodeMapping<JSSwitchStatement>>{
            type: JSNodeType.SwitchStatement,
            template: "switch (@nodes[0]) @nodes[1]"
        },

        <NodeMapping<JSCaseBlock>>{
            type: JSNodeType.CaseBlock,
            template: "\\{ i:s o:n @nodes...[ o:s o:n ] i:e o:n  \\}"
        },

        <NodeMapping<JSDefaultClause>>{
            type: JSNodeType.DefaultClause,
            template: "default : i:s o:n @nodes[0] i:e "
        },

        <NodeMapping<JSCaseClause>>{
            type: JSNodeType.CaseClause,
            template: "case m:s @nodes[0] : i:s o:n @nodes[1] i:e "
        },



        //Expressions

        <NodeMapping<JSSpread>>{
            type: JSNodeType.Spread,
            template: "\\... @nodes[0]"
        },

        <NodeMapping<JSDebuggerStatement>>{
            type: JSNodeType.DebuggerStatement,
            template: "debugger;"
        },

        <NodeMapping<JSArguments>>{
            type: JSNodeType.Arguments,
            template: "( @nodes...[, o:s] )"
        },

        <NodeMapping<JSSuperCall>>{
            type: JSNodeType.SuperCall,
            template: "super @nodes[0]"
        },

        <NodeMapping<JSImportCallExpression>>{
            type: JSNodeType.ImportCall,
            template: "import \( @nodes[0] \)"
        },


        <NodeMapping<JSCallExpression>>{
            type: JSNodeType.CallExpression,
            template: "@nodes[0] @nodes[1]"
        },
        <NodeMapping<JSAwaitExpression>>{
            type: JSNodeType.AwaitExpression,
            template: "await m:s @nodes[0]"
        },


        <NodeMapping<JSNewTarget>>{
            type: JSNodeType.NewTarget,
            template: "\\new \\. \\target"
        },

        <NodeMapping<JSNewInstanceExpression>>{
            type: JSNodeType.NewInstanceExpression,
            template: "\\new m:s @nodes[0] @nodes[1]"
        },

        <NodeMapping<JSNewExpression>>{
            type: JSNodeType.NewExpression,
            template: "\\new m:s @nodes[0]"
        },

        <NodeMapping<JSImportMeta>>{
            type: JSNodeType.ImportMeta,
            template: "import \\. meta"
        },

        <NodeMapping<JSSuperExpression>>{
            type: JSNodeType.SuperExpression,
            template: "super {COMPUTED: \[  @nodes[0] \] or . @nodes[0] }"
        },

        <NodeMapping<JSMemberExpression>>{
            type: JSNodeType.MemberExpression,
            template: "@nodes[0] {COMPUTED: \[  @nodes[1] \] or \\. @nodes[1] }"
        },

        <NodeMapping<JSBindingExpression>>{
            type: JSNodeType.BindingExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },

        <NodeMapping<JSAssignmentExpression>>{
            type: JSNodeType.AssignmentExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },

        <NodeMapping<JSAdditiveExpression>>{
            type: JSNodeType.AdditiveExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },

        <NodeMapping<JSExponentiationExpression>>{
            type: JSNodeType.ExponentiationExpression,
            template: "@nodes[0] o:s ** o:s @nodes[1] "
        },
        <NodeMapping<JSCoalesceExpression>>{
            type: JSNodeType.CoalesceExpression,
            template: "@nodes[0] o:s ?? o:s @nodes[1] "
        },

        <NodeMapping<JSMultiplicativeExpression>>{
            type: JSNodeType.MultiplicativeExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },
        <NodeMapping<JSShiftExpression>>{
            type: JSNodeType.ShiftExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },
        <NodeMapping<JSRelationalExpression>>{
            type: JSNodeType.RelationalExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },

        <NodeMapping<JSEqualityExpression>>{
            type: JSNodeType.EqualityExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },

        <NodeMapping<JSBitwiseExpression>>{
            type: JSNodeType.BitwiseExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },

        <NodeMapping<JSLogicalExpression>>{
            type: JSNodeType.LogicalExpression,
            template: "@nodes[0] o:s @symbol o:s @nodes[1] "
        },

        <NodeMapping<JSInstanceOfExpression>>{
            type: JSNodeType.InstanceOfExpression,
            template: "@nodes[0] m:s instanceof m:s @nodes[1] "
        },

        <NodeMapping<JSInExpression>>{
            type: JSNodeType.InExpression,
            template: "@nodes[0] m:s in m:s @nodes[1] "
        },

        <NodeMapping<JSYieldExpression>>{
            type: JSNodeType.YieldExpression,
            template: "\\yield {GENERATOR: m:s * } m:s @nodes[0]"
        },

        <NodeMapping<JSParenthesized>>{
            type: JSNodeType.Parenthesized,
            template: "\\( i:s @nodes[0] i:e \\) "
        },

        <NodeMapping<JSTypeofExpression>>{
            type: JSNodeType.TypeofExpression,
            template: "typeof m:s @nodes[0]"
        },

        <NodeMapping<JSVoidExpression>>{
            type: JSNodeType.VoidExpression,
            template: "void m:s @nodes[0]"
        },

        <NodeMapping<JSDeleteExpression>>{
            type: JSNodeType.DeleteExpression,
            template: "delete m:s @nodes[0]"
        },

        <NodeMapping<JSUnaryExpression>>{
            type: JSNodeType.UnaryExpression,
            template: "@symbol @nodes[0]"
        },

        <NodeMapping<JSPostExpression>>{
            type: JSNodeType.PostExpression,
            template: "@nodes[0] @symbol"
        },

        <NodeMapping<JSPreExpression>>{
            type: JSNodeType.PreExpression,
            template: "@symbol @nodes[0]"
        },

        <NodeMapping<JSGetterMethod>>{
            type: JSNodeType.GetterMethod,
            template: "get m:s @nodes[0] o:s \\( \\)  \\{ @nodes[1]? \\} "
        },

        <NodeMapping<JSSetterMethod>>{
            type: JSNodeType.SetterMethod,
            template: "set m:s @nodes[0] o:s \\( @nodes[1]? \\)  \\{ @nodes[2]? \\} "
        },

        <NodeMapping<JSMethod>>{
            type: JSNodeType.Method,
            template: "{ASYNC: async m:s} @nodes[0] {GENERATOR: m:s \\* } o:s \\( @nodes[1]? \\)  \\{ @nodes[2]? \\} "
        },

        <NodeMapping<JSBindingProperty>>{
            type: JSNodeType.PropertyBinding,
            template: "@nodes[0] \\: @nodes[1]"
        },

        <NodeMapping<JSComputedProperty>>{
            type: JSNodeType.ComputedProperty,
            template: "\\[ @nodes... \\] "
        },

        <NodeMapping<JSArrowFunction>>{
            type: JSNodeType.ArrowFunction,
            template: "{ASYNC: \\async o:s } \\( @nodes[0]? \\)  \\=> @nodes[1]",
        },

        <NodeMapping<JSConditionalExpression>>{
            type: JSNodeType.ConditionalExpression,
            template: "@nodes[0] o:s ? o:s i:s  @nodes[1] o:s : o:s @nodes[2] i:e "
        },

        <NodeMapping<JSExpressionList>>{
            type: JSNodeType.ExpressionList,
            template: "@nodes...[\\, ]"
        },

        //

        <NodeMapping<JSOptionalMemberExpression>>{
            type: JSNodeType.OptionalMemberExpression,
            template: "@nodes[0] \\? \\. {COMPUTED: \[  @nodes[1] \] or @nodes[1] }"
        },


        //Primitives
        <NodeMapping<JSBooleanLiteral>>{
            type: JSNodeType.BooleanLiteral,
            template: "@value"
        },
        <NodeMapping<JSNumericLiteral>>{
            type: JSNodeType.NumericLiteral,
            template: "@value"
        },
        <NodeMapping<JSBigIntLiteral>>{
            type: JSNodeType.BigIntLiteral,
            template: "@value \\n "
        },
        <NodeMapping<JSNullLiteral>>{
            type: JSNodeType.NullLiteral,
            template: "null"
        },

        //Strings & Templates
        <NodeMapping<JSStringLiteral>>{
            type: JSNodeType.StringLiteral,
            template: '@quote_type @value @quote_type'
        },
        <NodeMapping<JSStringLiteral>>{
            type: JSNodeType.StringLiteral | JSNodeClass.PROPERTY_NAME,
            template: '@quote_type @value @quote_type'
        },

        <NodeMapping<JSTemplate>>{
            type: JSNodeType.Template,
            template: '{NO_SUBSTITUTE: `} @nodes... {NO_SUBSTITUTE: `}'
        },
        <NodeMapping<JSTemplateHead>>{
            type: JSNodeType.TemplateHead,
            template: '\\` @value \\$ \\{'
        },
        <NodeMapping<JSTemplateMiddle>>{
            type: JSNodeType.TemplateMiddle,
            template: '\\} @value \\$ \\{ '
        },
        <NodeMapping<JSTemplateTail>>{
            type: JSNodeType.TemplateTail,
            template: '\\} @value \\` '
        },
        <NodeMapping<JSRegexLiteral>>{
            type: JSNodeType.RegexLiteral,
            template: '/ @value / @flags? '
        },

        // Objects and Arrays
        <NodeMapping<JSArrayLiteral>>{
            type: JSNodeType.ArrayLiteral,
            template: '\\[  @nodes...[ \\, o:s]  \\]'
        },

        <NodeMapping<JSObjectLiteral>>{
            type: JSNodeType.ObjectLiteral,
            template: '\\{  @nodes...[ \\, o:s]  \\}'
        },

        <NodeMapping<JSArrayBinding>>{
            type: JSNodeType.ArrayBinding,
            template: '\\[  @nodes...[ \\, o:s]  \\]'
        },

        <NodeMapping<JSObjectBinding>>{
            type: JSNodeType.ObjectBinding,
            template: '\\{  @nodes...[ \\, o:s]  \\}'
        },

        <NodeMapping<JSElision>>{
            type: JSNodeType.Elision,
            custom_render: (state) => { return ",".repeat(state.node.count); },
            template: '\\,'
        },

        <NodeMapping<JSThisLiteral>>{
            type: JSNodeType.ThisLiteral,
            template: "\\this"
        },


        //Identifiers
        <NodeMapping<JSIdentifier>>{
            type: JSNodeType.Identifier,
            template: "@value"
        },
        <NodeMapping<JSIdentifierLabel>>{
            type: JSNodeType.IdentifierLabel,
            template: "@value"
        },
        <NodeMapping<JSIdentifierDefault>>{
            type: JSNodeType.IdentifierDefault,
            template: "@value"
        },
        <NodeMapping<JSIdentifierReference>>{
            type: JSNodeType.IdentifierReference,
            template: "@value"
        },
        <NodeMapping<JSIdentifierBinding>>{
            type: JSNodeType.IdentifierBinding,
            template: "@value"
        },
        <NodeMapping<JSIdentifierModule>>{
            type: JSNodeType.IdentifierModule,
            template: "@value"
        },
        <NodeMapping<JSIdentifierName>>{
            type: JSNodeType.IdentifierName,
            template: "@value"
        },
        <NodeMapping<JSIdentifierName>>{
            type: JSNodeType.IdentifierName | JSNodeClass.PROPERTY_NAME,
            template: "@value"
        }
    ]
};
const lu_table = new Map(javascript_mappings.mappings.map((i, j) => [i.type, j]));
javascript_mappings.type_lookup = (node, name) => lu_table.get(node.type) || -1;

export const renderers = experimentalConstructRenderers(<NodeMappings<JSNode, "type">>javascript_mappings);
