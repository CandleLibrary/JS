import { FormatRule, buildFormatRules, buildRenderers } from "@candlefw/conflagrate";
import { JSNodeDefinition } from "../types/node_definition.js";
import { JSNodeType } from "../types/node_type";
import { JSNodeTypeLU } from "../types/node_type_lu.js";

export function createNodeDefinitions(
    bd: JSNodeDefinition[] = [],
    ...args: Array<{
        type?: JSNodeType,
        ext_name?: string[],
        template_pattern?: string | object,
        format_rules?: FormatRule;
    }>): JSNodeDefinition[] {
    return args.map(
        (def) => {
            const d: JSNodeDefinition = <JSNodeDefinition>{};
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
    );
}

export const format_rules = buildFormatRules([{
    type: JSNodeType.LexicalDeclaration,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 1 | FormatRule.MIN_LIST_ELE_LIMIT * 15
}, {
    type: JSNodeType.AssignmentExpression,
    format_rule: FormatRule.OPTIONAL_SPACE
}, {
    type: JSNodeType.BindingExpression,
    format_rule: FormatRule.OPTIONAL_SPACE
}, {
    type: JSNodeType.IfStatement,
    format_rule: FormatRule.OPTIONAL_SPACE
}, {
    type: JSNodeType.Script,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.Class,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.Module,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 1 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.BlockStatement,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.FunctionBody,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.CaseBlock,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.CaseClause,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.DefaultClause,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.ObjectLiteral,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT * 2 | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.Arguments,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT | FormatRule.MIN_LIST_ELE_LIMIT * 5
}, {
    type: JSNodeType.FormalParameters,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT | FormatRule.MIN_LIST_ELE_LIMIT * 14
}, {
    type: JSNodeType.ExpressionList,
    format_rule: FormatRule.INDENT | FormatRule.OPTIONAL_SPACE | FormatRule.LIST_SPLIT | FormatRule.MIN_LIST_ELE_LIMIT * 14
}]).format_rules;


export const JSNodeDefinitions: Array<JSNodeDefinition> = createNodeDefinitions([],
    {
        type: JSNodeType.OptionalMemberExpression,
        ext_name: [],
        template_pattern: "@1\\?.@2",
    },
    {
        type: JSNodeType.OptionalChain,
        ext_name: [],
        template_pattern: "@1",
    },

    {
        type: JSNodeType.CoalesceExpression,
        ext_name: [],
        template_pattern: "@1%\\?%\\?%@2",
    },
    {
        type: JSNodeType.AdditiveExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2"
    },

    {
        type: JSNodeType.Arguments,
        ext_name: ["expressions"],
        template_pattern: "(^1@...,^0)",
    },

    {
        type: JSNodeType.ArrayLiteral,
        ext_name: ["members"],
        template_pattern: "[^1@...,^0]",
    },

    {
        type: JSNodeType.ArrowFunction,
        ext_name: ["arguments", "body"],
        template_pattern: "@(ASYNC,async )@1%=>%@2",
    },

    {
        type: JSNodeType.AssignmentExpression,
        ext_name: ["identifier", "expression"],
        template_pattern: "@1%@symbol%@2",
    },

    {
        type: JSNodeType.BlockStatement,
        ext_name: ["statements"],
        template_pattern: "{^1@...%^0}",
    },

    {
        type: JSNodeType.AwaitExpression,
        ext_name: ["expression"],
        template_pattern: "await @1",
    },
    {
        type: JSNodeType.BigIntLiteral,
        ext_name: [],
        template_pattern: "@(NEGATIVE,-)@value%n",
    },
    {
        type: JSNodeType.BindingExpression,
        ext_name: ["property", "expression"],
        template_pattern: "@...=",
    },
    {
        type: JSNodeType.BooleanLiteral,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.BreakStatement,
        ext_name: [],
        template_pattern: { default: "break @1?;", $not_1: "break;" },
    },
    {
        type: JSNodeType.CallExpression,
        ext_name: ["object", "arguments"],
        template_pattern: "@1@2",
    },
    {
        type: JSNodeType.CaseBlock,
        ext_name: ["expression"],
        template_pattern: "{^1@... ^0}",
    },
    {
        type: JSNodeType.CaseClause,
        ext_name: ["statements"],
        template_pattern: "case @1%:%^1@...%^0",
    },
    {
        type: JSNodeType.DefaultClause,
        ext_name: ["statements"],
        template_pattern: "default%:%^1@...%^0",
    },
    {
        type: JSNodeType.CatchClause,
        ext_name: ["expression", "body"],
        template_pattern: "catch(@1)@2",
    },
    {
        type: JSNodeType.Class,
        ext_name: ["name", "heritage", "body"],
        template_pattern: {
            default: "class @1 extends @2{^1@...%^0}",
            $not_2: "class @1{^1@...%^0}"
        }
    },
    {
        type: JSNodeType.ComputedProperty,
        ext_name: [],
        template_pattern: "[@1]",
    },
    {
        type: JSNodeType.ContinueStatement,
        ext_name: ["identifier"],
        template_pattern: { default: "continue @1?;", $not_1: "continue;" },
    },
    {
        type: JSNodeType.ConditionalExpression,
        ext_name: ["condition", "pass_expression", "fail_expression"],
        template_pattern: "@1%^1\n\\?%@2\n%:%@3",
    },
    {
        type: JSNodeType.DebuggerStatement,
        ext_name: [],
        template_pattern: "debugger;",
    },
    {
        type: JSNodeType.DeleteExpression,
        ext_name: ["expression"],
        template_pattern: "delete @1",
    },
    {
        type: JSNodeType.DoStatement,
        ext_name: ["statement", "expression"],
        template_pattern: "do @1 while(^1@2%^0)",
    },
    {
        type: JSNodeType.Elision,
        ext_name: [],
        template_pattern: "",
    },
    {
        type: JSNodeType.EmptyStatement,
        ext_name: [],
        template_pattern: ";",
    },
    {
        type: JSNodeType.EqualityExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: JSNodeType.ExponentiationExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%**%@2",
    },
    {
        type: JSNodeType.ExportClause,
        ext_name: [],
        template_pattern: "{^1@...,^0}",
    },
    {
        type: JSNodeType.ExportDeclaration,
        ext_name: [],
        template_pattern: {
            default: "export @1 @2;",
            DEFAULT: "export default @1;",
            $not_2: "export @1;",
            $not_1: "export * @2;"
        }
    },
    {
        type: JSNodeType.ExpressionList,
        ext_name: [],
        template_pattern: "^1@...,",
    },
    {
        type: JSNodeType.ExpressionStatement,
        ext_name: ["expression"],
        template_pattern: "@1;",
    },
    {
        type: JSNodeType.FinallyClause,
        ext_name: [],
        template_pattern: "finally@1",
    },
    {
        type: JSNodeType.ForInStatement,
        ext_name: [],
        template_pattern: "for(@1 in @2)^1\n@3",
    },
    {
        type: JSNodeType.ForOfStatement,
        ext_name: [],
        template_pattern: "for@(AWAIT, await)%(@1 of @2)@3",
    },
    {
        type: JSNodeType.ForStatement,
        ext_name: [],
        template_pattern: {
            default: "for(@1?%;%@2?%;%@3?%)@4",
            LEX: "for(@1?%%@2?%;%@3?%)@4"
        }
    },
    {
        type: JSNodeType.FormalParameters,
        ext_name: [],
        template_pattern: "(^1@...,^0)",
    },
    {
        type: JSNodeType.FromClause,
        ext_name: ["url"],
        template_pattern: "from%@1",
    },
    {
        type: JSNodeType.FunctionDeclaration,
        ext_name: ["name", "parameters", "body"],
        template_pattern: {
            default: "@(ASYNC,async )function%@(GENERATOR,*) @1?@2{@3?}",
            $not_2: "@(ASYNC,async )function%@(GENERATOR,*) @1?%\(\){@3?}",
            $not_1not_2: "@(ASYNC,async )function%@(GENERATOR,*)%\(\){@3?}",
        }
    },
    {
        type: JSNodeType.FunctionExpression,
        ext_name: ["name", "parameters", "body"],
        template_pattern: {
            default: "@(ASYNC,async )function%@(GENERATOR,*) @1?@2{@3?}",
            $not_2: "@(ASYNC,async )function%@(GENERATOR,*) @1?%\(\){@3?}",
            $not_1not_2: "@(ASYNC,async )function%@(GENERATOR,*)%\(\){@3?}",
        }
    },
    {
        type: JSNodeType.FunctionBody,
        ext_name: [],
        template_pattern: "^1@...%^0",
    },
    {
        type: JSNodeType.GetterMethod,
        ext_name: ["name", "body"],
        template_pattern: "get @1\(%\){@2?}",
    },
    {
        type: JSNodeType.Identifier,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.IdentifierDefault,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.IdentifierName,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.IdentifierModule,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.IdentifierLabel,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.IdentifierBinding,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.IdentifierReference,
        ext_name: [],
        template_pattern: "@value",
    },
    {
        type: JSNodeType.IfStatement,
        ext_name: [],
        template_pattern: {
            default: "if%(%@1%)%^1@2^0else @3", $not_3: "if%(%@1%)%\n@2"
        }
    },
    {
        type: JSNodeType.ImportClause,
        ext_name: [],
        template_pattern: "^1@...,^0"
    },
    {
        type: JSNodeType.ImportDeclaration,
        ext_name: ["clause", "from"],
        template_pattern: "import @1 @2;",
    },
    {
        type: JSNodeType.InExpression,
        ext_name: [],
        template_pattern: "@1 in @2",
    },
    {
        type: JSNodeType.InstanceOfExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1 instanceof @2",
    },
    {
        type: JSNodeType.LabeledStatement,
        ext_name: ["label", "statement"],
        template_pattern: "@1%:\n%@2",
    },
    {
        type: JSNodeType.LexicalBinding,
        ext_name: [],
        template_pattern: "@symbol ^1@...,",
    },
    {
        type: JSNodeType.LexicalDeclaration,
        ext_name: [],
        template_pattern: "@symbol ^1@...,;",
    },
    {
        type: JSNodeType.LogicalExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: JSNodeType.BitwiseExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: JSNodeType.MemberExpression,
        ext_name: ["object", "member"],
        template_pattern: { COMPUTED: "@1[@2]", default: "@1.@2" }
    },
    {
        type: JSNodeType.Method,
        ext_name: ["name", "parameters", "body"],
        template_pattern: {
            default: "@(ASYNC,async )%@(GENERATOR,*)@1%@2?{^1@3?^0}",
            $not_2: "@(ASYNC,async )%@(GENERATOR,*)@1%(){^1@3?^0}",
            $not_2not_3: "@(ASYNC,async )%@(GENERATOR,*)@1%(){^1@3?^0}",
        },
    },

    {
        type: JSNodeType.MultiplicativeExpression,
        ext_name: ["left", "right"],/*  */
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: JSNodeType.NameSpaceImport,
        ext_name: [],
        template_pattern: "*%as @1",
    },
    {
        type: JSNodeType.NamedImports,
        ext_name: [],
        template_pattern: "{^1@...,^0}",
    },
    {
        type: JSNodeType.NewExpression,
        ext_name: [],
        template_pattern: "new @1",
    },
    {
        type: JSNodeType.NewInstanceExpression,
        ext_name: [],
        template_pattern: "new @1%@2",
    },
    {
        type: JSNodeType.NewTarget,
        ext_name: [],
        template_pattern: "new.target",
    },
    {
        type: JSNodeType.NullLiteral,
        ext_name: [],
        template_pattern: "null",
    },
    {
        type: JSNodeType.NumericLiteral,
        ext_name: [],
        template_pattern: "@(NEGATIVE,-)@value",
    },
    {
        type: JSNodeType.ObjectLiteral,
        ext_name: [],
        template_pattern: "{%^1@...,^0%}",
    },
    {
        type: JSNodeType.Parameters,
        ext_name: [],
        template_pattern: "(%^1@...,^0%)",
    },
    {
        type: JSNodeType.Parenthesized,
        ext_name: ["expression"],
        template_pattern: "(^1@1%^0)",
    },
    {
        type: JSNodeType.PostExpression,
        ext_name: ["expression"],
        template_pattern: "@1@symbol",
    },
    {
        type: JSNodeType.PreExpression,
        ext_name: ["expression"],
        template_pattern: "@symbol@1",
    },
    {
        type: JSNodeType.PropertyBinding,
        ext_name: ["identifier", "expression"],
        template_pattern: "@1%:%@2",
    },
    {
        type: JSNodeType.RegexLiteral,
        ext_name: ["expression_string", "meta"],
        template_pattern: "/@value/@flags?",
    },
    {
        type: JSNodeType.RelationalExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: JSNodeType.ReturnStatement,
        ext_name: ["expression"],
        template_pattern: "return @...%;",
    },
    {
        type: JSNodeType.Script,
        ext_name: [],
        template_pattern: "^1@...%^0",
    },
    {
        type: JSNodeType.Module,
        ext_name: [],
        template_pattern: "@...%",
    },
    {
        type: JSNodeType.SetterMethod,
        ext_name: ["name", "parameter", "body"],
        template_pattern: "set @1(@2){@3?}",
    },
    {
        type: JSNodeType.ShiftExpression,
        ext_name: ["left", "right"],
        template_pattern: "@1%@symbol%@2",
    },
    {
        type: JSNodeType.Specifier,
        ext_name: ["original", "transformed"],
        template_pattern: {
            default: "@1 as @2",
            $node_2: "@1"
        },
    },
    {
        type: JSNodeType.SpreadExpression,
        ext_name: ["expression"],
        template_pattern: "...@1",
    },
    {
        type: JSNodeType.StringLiteral,
        ext_name: [],
        template_pattern: "@quote_type@value@quote_type",
    },
    {
        type: JSNodeType.SuperCall,
        ext_name: ["arguments"],
        template_pattern: "super@1",
    },
    {
        type: JSNodeType.SuperExpression,
        ext_name: ["member"],
        template_pattern: { COMPUTED: "super[@1]", default: "super.@1" },
    },
    {
        type: JSNodeType.SwitchStatement,
        ext_name: ["expression", "case_block"],
        template_pattern: "switch(^1@1^0)\n@2",
    },
    {
        type: JSNodeType.Template,
        ext_name: [],
        template_pattern: { NO_SUBSTITUTE: "`@1?`", default: "@...%" },
    },
    {
        type: JSNodeType.TemplateHead,
        ext_name: [],
        template_pattern: "`@value${",
    },
    {
        type: JSNodeType.TemplateMiddle,
        ext_name: [],
        template_pattern: "}@value${",
    },
    {
        type: JSNodeType.TemplateTail,
        ext_name: [],
        template_pattern: "}@value`",
    },
    {
        type: JSNodeType.ThisLiteral,
        ext_name: [],
        template_pattern: "this",
    },
    {
        type: JSNodeType.ThrowStatement,
        ext_name: ["expression"],
        template_pattern: "throw @1;",
    },
    {
        type: JSNodeType.TryStatement,
        ext_name: [],
        template_pattern: "try@1?\n@2?\n@3?",
    },
    {
        type: JSNodeType.TypeofExpression,
        ext_name: ["expression"],
        template_pattern: "typeof @1",
    },
    {
        type: JSNodeType.UnaryExpression,
        ext_name: ["expression"],
        template_pattern: "@symbol@1",
    },
    {
        type: JSNodeType.VariableDeclaration,
        ext_name: [],
        template_pattern: "var @...,",
    },
    {
        type: JSNodeType.VariableStatement,
        ext_name: [],
        template_pattern: "var @...,;",
    },
    {
        type: JSNodeType.VoidExpression,
        ext_name: ["expression"],
        template_pattern: "void @1",
    },
    {
        type: JSNodeType.WhileStatement,
        ext_name: ["expression", "statement"],
        template_pattern: "while(@1)@2",
    },
    {
        type: JSNodeType.WithStatement,
        ext_name: ["expression", "statement"],
        template_pattern: "with(@1)@2",
    },
    {
        type: JSNodeType.YieldExpression,
        ext_name: ["expression"],
        template_pattern: "yield@(GENERATOR,*) @1",
    },
    {
        type: JSNodeType.ObjectBinding,
        ext_name: ["expression"],
        template_pattern: "{^1%@...,%^0}",
    },
    {
        type: JSNodeType.ArrayBinding,
        ext_name: ["expression"],
        template_pattern: "[^1%@...,%^0]",
    }
);

export const renderers = buildRenderers(JSNodeDefinitions, JSNodeTypeLU);
