import { MinTreeNodeDefinition } from "./mintree_node_definition.js";
import { MinTreeNodeType } from "../types/mintree_node_type.js";
import { FormatRule } from "@candlefw/conflagrate";


export function createNodeDefinitions(
    bd: MinTreeNodeDefinition[] = [],
    ...args: Array<{
        type?: MinTreeNodeType,
        ext_name?: string[],
        template_pattern?: string | object,
        format_rules?: FormatRule;
    }>): MinTreeNodeDefinition[] {
    return args.map(
        (def) => {
            const d = {};
            if (def.type) {
                const index = def.type >>> 23;
                d.type = def.type;
                if (def.ext_name)
                    d.getters = def.ext_name;
                if (def.template_pattern)
                    d.template_pattern = def.template_pattern;
                if (def.format_rules)
                    d.format_rule = def.format_rules;
            }
            return d;
        }
    );/*.reduce(
        (ret, def) => {
            if (def.type) {
                const index = def.type >>> 23;
                if (def.ext_name)
                    ret[index].getters = def.ext_name;
                if (def.template_pattern)
                    ret[index].template_pattern = def.template_pattern;
                if (def.format_rules)
                    ret[index].format_rule = def.format_rules;
            }
            return ret;
        },
        new Array(512)
            .fill(null)
            .map((e, i) => Object.assign({}, bd[i] || new MinTreeNodeDefinition(i << 23, [], "", ^0)))
    );*/
}

export const MinTreeNodeDefinitions: Array<MinTreeNodeDefinition> = createNodeDefinitions([],
    {
        type: MinTreeNodeType.AdditiveExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2"
    },

    {
        type: MinTreeNodeType.Arguments,
        ext_name: ["expressions"],
        template_pattern: "(^1@...,^0)",
    },

    {
        type: MinTreeNodeType.ArrayLiteral,
        ext_name: ["members"],
        template_pattern: "[^1@...,^0]",
    },

    {
        type: MinTreeNodeType.ArrowFunction,
        ext_name: ["arguments", "body"],
        template_pattern: "@1%=>%@2",
    },

    {
        type: MinTreeNodeType.AssignmentExpression,
        ext_name: ["identifier", "expression"],
        template_pattern: "@1%@symbol%@2",
    },

    {
        type: MinTreeNodeType.BlockStatement,
        ext_name: ["statements"],
        template_pattern: "{^1@...%^0}",
    },

    {
        type: MinTreeNodeType.AwaitExpression,
        ext_name: ["expression"],
        template_pattern: "await @1",
    },
    {
        type: MinTreeNodeType.BigIntLiteral,
        ext_name: [],
        template_pattern: "@(NEGATIVE,-)@value%n",
    },
    {
        type: MinTreeNodeType.BindingExpression,
        ext_name: ["property", "expression"],
        template_pattern: "@1%=%@2",
    },
    {
        type: MinTreeNodeType.BooleanLiteral,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.BreakStatement,
        ext_name: [],
        template_pattern: "break;",
    },
    {
        type: MinTreeNodeType.CallExpression,
        ext_name: ["object", "arguments"],
        template_pattern: "@1@2",
    },
    {
        type: MinTreeNodeType.CaseBlock,
        ext_name: ["expression"],
        template_pattern: "{^1@... ^0}",
    },
    {
        type: MinTreeNodeType.CaseClause,
        ext_name: ["statements"],
        template_pattern: "case @1%:%^1@...%",
    },
    {
        type: MinTreeNodeType.DefaultClause,
        ext_name: ["statements"],
        template_pattern: "default%:%^1@...%",
    },
    {
        type: MinTreeNodeType.CatchClause,
        ext_name: ["expression", "body"],
        template_pattern: "catch(@1)@2",
    },
    {
        type: MinTreeNodeType.Class,
        ext_name: ["name", "heritage", "body"],
        template_pattern: { default: "class @1 extends @2{^1@...%^0}", $not_2: "class @1{ ^1@...% ^0}" }
    },
    {
        type: MinTreeNodeType.ComputedProperty,
        ext_name: [],
        template_pattern: "[@1]",
    },
    {
        type: MinTreeNodeType.ContinueStatement,
        ext_name: ["identifier"],
        template_pattern: { default: "continue @1;", $not_1: "continue;" },
    },
    {
        type: MinTreeNodeType.ConditionalExpression,
        ext_name: ["condition", "pass_expression", "fail_expression"],
        template_pattern: "@1%^1\n\\?%@2\n%:%@3",
    },
    {
        type: MinTreeNodeType.DebuggerStatement,
        ext_name: [],
        template_pattern: "debugger;",
    },
    {
        type: MinTreeNodeType.DeleteExpression,
        ext_name: ["expression"],
        template_pattern: "delete @1",
    },
    {
        type: MinTreeNodeType.DoStatement,
        ext_name: ["statement", "expression"],
        template_pattern: "do @1 while(^1@2%^0)",
    },
    {
        type: MinTreeNodeType.Elision,
        ext_name: [],
        template_pattern: "",
    },
    {
        type: MinTreeNodeType.EmptyStatement,
        ext_name: [],
        template_pattern: ";",
    },
    {
        type: MinTreeNodeType.EqualityExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.ExponentiationExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%**%@2",
    },
    {
        type: MinTreeNodeType.ExportClause,
        ext_name: [],
        template_pattern: "{^1@...,^0}",
    },
    {
        type: MinTreeNodeType.ExportDeclaration,
        ext_name: [],
        template_pattern: {
            default: "export @1 @2;",
            DEFAULT: "export default @1;",
            $not_2: "export @1;",
            $not_1: "export * @2;"
        }
    },
    {
        type: MinTreeNodeType.ExpressionList,
        ext_name: [],
        template_pattern: "^1@...,",
    },
    {
        type: MinTreeNodeType.ExpressionStatement,
        ext_name: ["expression"],
        template_pattern: "@1;",
    },
    {
        type: MinTreeNodeType.FinallyClause,
        ext_name: [],
        template_pattern: "finally@1",
    },
    {
        type: MinTreeNodeType.ForInStatement,
        ext_name: [],
        template_pattern: "for(@1 in @2)^1\n@3",
    },
    {
        type: MinTreeNodeType.ForOfStatement,
        ext_name: [],
        template_pattern: "for@(AWAIT, await)%(@1 of @2)@3",
    },
    {
        type: MinTreeNodeType.ForStatement,
        ext_name: [],
        template_pattern: {
            default: "for(@1?%;%@2?%;%@3?%)@4",
            LEX: "for(@1?%%@2?%;%@3?%)@4"
        }
    },
    {
        type: MinTreeNodeType.FormalParameters,
        ext_name: [],
        template_pattern: "(^1@...,^0)",
    },
    {
        type: MinTreeNodeType.FromClause,
        ext_name: ["url"],
        template_pattern: "from%@1",
    },
    {
        type: MinTreeNodeType.FunctionDeclaration,
        ext_name: ["name", "parameters", "body"],
        template_pattern: {
            default: "@(ASYNC,async )function%@(GENERATOR,*) @1?@2{@3?}",
            $not_2: "@(ASYNC,async )function@(GENERATOR,*) @1?(){@3?}"
        }
    },
    {
        type: MinTreeNodeType.FunctionExpression,
        ext_name: ["name", "parameters", "body"],
        template_pattern: {
            default: "@(ASYNC,async )function%@(GENERATOR,*) @1?@2{@3?}",
            $not_2: "@(ASYNC,async )function%@(GENERATOR,*) @1?(){@3?}"
        }
    },
    {
        type: MinTreeNodeType.FunctionBody,
        ext_name: [],
        template_pattern: "^1@...%^0",
    },
    {
        type: MinTreeNodeType.GetterMethod,
        ext_name: ["name", "body"],
        template_pattern: "get @1(){@2?}",
    },
    {
        type: MinTreeNodeType.Identifier,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierDefault,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierName,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierModule,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierLabel,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierBinding,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierReference,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: MinTreeNodeType.IfStatement,
        ext_name: [],
        template_pattern: {
            default: "if%(%@1%)%^1@2^0else @3", $not_3: "if%(%@1%)%\n@2"
        }
    },
    {
        type: MinTreeNodeType.ImportClause,
        ext_name: [],
        template_pattern: "^1@...,^0"
    },
    {
        type: MinTreeNodeType.ImportDeclaration,
        ext_name: ["clause", "from"],
        template_pattern: "import @1 @2;",
    },
    {
        type: MinTreeNodeType.InExpression,
        ext_name: [],
        template_pattern: "@1 in @2",
    },
    {
        type: MinTreeNodeType.InstanceOfExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1 instanceof @2",
    },
    {
        type: MinTreeNodeType.LabeledStatement,
        ext_name: ["label", "statement"],
        template_pattern: "@1%:\n%@2",
    },
    {
        type: MinTreeNodeType.LexicalBinding,
        ext_name: [],
        template_pattern: "@symbol ^1@...,",
    },
    {
        type: MinTreeNodeType.LexicalDeclaration,
        ext_name: [],
        template_pattern: "@symbol ^1@...,;",
    },
    {
        type: MinTreeNodeType.LogicalExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.BitwiseExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.MemberExpression,
        ext_name: ["object", "member"],
        template_pattern: { COMPUTED: "@1[@2]", default: "@1.@2" }
    },
    {
        type: MinTreeNodeType.Method,
        ext_name: ["name", "parameters", "body"],
        template_pattern: {
            default: "@(ASYNC,async )%@(GENERATOR,*)@1%@2?{^1@3?^0}",
            $not_2: "@(ASYNC,async )%@(GENERATOR,*)@1%(){^1@3?^0}",
        },
    },

    {
        type: MinTreeNodeType.MultiplicativeExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.NameSpaceImport,
        ext_name: [],
        template_pattern: "* as @1",
    },
    {
        type: MinTreeNodeType.NamedImports,
        ext_name: [],
        template_pattern: "{^1@...,^0}",
    },
    {
        type: MinTreeNodeType.NewExpression,
        ext_name: [],
        template_pattern: "new @1",
    },
    {
        type: MinTreeNodeType.NewInstanceExpression,
        ext_name: [],
        template_pattern: "new @1@2",
    },
    {
        type: MinTreeNodeType.NewTarget,
        ext_name: [],
        template_pattern: "new.target",
    },
    {
        type: MinTreeNodeType.NullLiteral,
        ext_name: [],
        template_pattern: "null",
    },
    {
        type: MinTreeNodeType.NumericLiteral,
        ext_name: [],
        template_pattern: "@(NEGATIVE,-)@value",
    },
    {
        type: MinTreeNodeType.ObjectLiteral,
        ext_name: [],
        template_pattern: "{^1@...,^0}",
    },
    {
        type: MinTreeNodeType.Parameters,
        ext_name: [],
        template_pattern: "(^1@...,^0)",
    },
    {
        type: MinTreeNodeType.Parenthesized,
        ext_name: ["expression"],
        template_pattern: "(^1@1%^0)",
    },
    {
        type: MinTreeNodeType.PostExpression,
        ext_name: ["expression"],
        template_pattern: "@1@symbol",
    },
    {
        type: MinTreeNodeType.PreExpression,
        ext_name: ["expression"],
        template_pattern: "@symbol@1",
    },
    {
        type: MinTreeNodeType.PropertyBinding,
        ext_name: ["identifier", "expression"],
        template_pattern: "@1%:%@2",
    },
    {
        type: MinTreeNodeType.RegexLiteral,
        ext_name: ["expression_string", "meta"],
        template_pattern: "/@value/@flags?",
    },
    {
        type: MinTreeNodeType.RelationalExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.ReturnStatement,
        ext_name: ["expression"],
        template_pattern: "return @1;",
    },
    {
        type: MinTreeNodeType.Script,
        ext_name: [],
        template_pattern: "@...%",
    },
    {
        type: MinTreeNodeType.Module,
        ext_name: [],
        template_pattern: "@...%",
    },
    {
        type: MinTreeNodeType.SetterMethod,
        ext_name: ["name", "parameter", "body"],
        template_pattern: "set @1(@2){@3?}",
    },
    {
        type: MinTreeNodeType.ShiftExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.Specifier,
        ext_name: ["original", "transformed"],
        template_pattern: "@1 as @2",
    },
    {
        type: MinTreeNodeType.SpreadExpression,
        ext_name: ["expression"],
        template_pattern: "...@1",
    },
    {
        type: MinTreeNodeType.StringLiteral,
        ext_name: [],
        template_pattern: "@quote_type@value@quote_type",
    },
    {
        type: MinTreeNodeType.SuperCall,
        ext_name: ["arguments"],
        template_pattern: "super@1",
    },
    {
        type: MinTreeNodeType.SuperExpression,
        ext_name: ["member"],
        template_pattern: { COMPUTED: "super[@1]", default: "super.@1" },
    },
    {
        type: MinTreeNodeType.SwitchStatement,
        ext_name: ["expression", "case_block"],
        template_pattern: "switch(@1)\n@2",
    },
    {
        type: MinTreeNodeType.Template,
        ext_name: [],
        template_pattern: { NO_SUBSTITUTE: "`@1?`", default: "@...%" },
    },
    {
        type: MinTreeNodeType.TemplateHead,
        ext_name: [],
        template_pattern: "`@value${",
    },
    {
        type: MinTreeNodeType.TemplateMiddle,
        ext_name: [],
        template_pattern: "}@value${",
    },
    {
        type: MinTreeNodeType.TemplateTail,
        ext_name: [],
        template_pattern: "}@value`",
    },
    {
        type: MinTreeNodeType.ThisLiteral,
        ext_name: [],
        template_pattern: "this",
    },
    {
        type: MinTreeNodeType.ThrowStatement,
        ext_name: ["expression"],
        template_pattern: "throw @1;",
    },
    {
        type: MinTreeNodeType.TryStatement,
        ext_name: [],
        template_pattern: "try@1?\n@2?\n@3?",
    },
    {
        type: MinTreeNodeType.TypeofExpression,
        ext_name: ["expression"],
        template_pattern: "typeof @1",
    },
    {
        type: MinTreeNodeType.UnaryExpression,
        ext_name: ["expression"],
        template_pattern: "@symbol@1",
    },
    {
        type: MinTreeNodeType.VariableDeclaration,
        ext_name: [],
        template_pattern: "var @...,",
    },
    {
        type: MinTreeNodeType.VariableStatement,
        ext_name: [],
        template_pattern: "var @...,;",
    },
    {
        type: MinTreeNodeType.VoidExpression,
        ext_name: ["expression"],
        template_pattern: "void @1",
    },
    {
        type: MinTreeNodeType.WhileStatement,
        ext_name: ["expression", "statement"],
        template_pattern: "while(@1)@2",
    },
    {
        type: MinTreeNodeType.WithStatement,
        ext_name: ["expression", "statement"],
        template_pattern: "with(@1)@2",
    },
    {
        type: MinTreeNodeType.YieldExpression,
        ext_name: ["expression"],
        template_pattern: "yield @1",
    },
    {
        type: MinTreeNodeType.ObjectBinding,
        ext_name: ["expression"],
        template_pattern: "{^1%@...,%^0}",
    },
    {
        type: MinTreeNodeType.ArrayBinding,
        ext_name: ["expression"],
        template_pattern: "[^1%@...,%^0]",
    }
);
