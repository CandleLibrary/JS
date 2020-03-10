import { MinTreeNodeDefinition } from "./mintree_node_definition.js";
import { MinTreeNodeType } from "../types/mintree_node_type.js";

export const MinTreeNodeDefinitions: Array<MinTreeNodeDefinition> = [

    new MinTreeNodeDefinition(
        MinTreeNodeType.AdditiveExpression,
        ["left", "right"],
        "$1 $symbol $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Arguments,
        ["expressions"],
        "($...,)"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ArrayLiteral,
        ["members"],
        "[$...]"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ArrowFunction,
        ["arguments", "body", { isASYNC: "async", type: Boolean }],
        "$async? $1 => $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.AssignmentExpression,
        ["identifier", "expression"],
        "$1 $operator $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.AwaitExpression,
        ["expression"],
        "await $1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.BindingExpression,
        ["property", "expression"],
        "$1 = $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.BlockStatement,
        ["statements"],
        "{$...}"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.BooleanLiteral,
        [],
        "$val"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.BreakStatement,
        [],
        "break;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.CallExpression,
        ["object", "arguments"],
        "$1$2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.CallMemberExpression,
        ["member", "arguments"], "$1$2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.CaseBlock,
        ["expression"],
        "case $1:"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.CaseClause,
        ["statements"],
        "$..."),

    new MinTreeNodeDefinition(
        MinTreeNodeType.CatchClause,
        ["expression", "body"],
        "catch($1){$2}"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Class,
        ["name", "heritage", "body"],
        { $2: "class $1 extends $2 {$3}", default: "class $1 {$3}" }),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ComputedProperty,
        [],
        "[$1]"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ContinueStatement,
        ["identifier"],
        "continue;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ConditionalExpression,
        ["condition", "pass_expression", "fail_expression"],
        "$1 ? $2 : $3"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.DebuggerStatement,
        [],
        "debugger;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.DeleteExpression,
        ["expression"],
        "delete $1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.DoStatement,
        ["statement", "expression"],
        "do{$1} while($2)"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.EmptyStatement,
        [],
        ";"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.EqualityExpression,
        ["left", "right"],
        "$1 $symbol $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ExponentiationExpression,
        ["left", "right"],
        "$1 ** $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ExportClause,
        [],
        "{$...}"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ExportDeclaration,
        [],
        { DEFAULT: "export default $1", $1: "export $1 $2", default: "export * $2" }),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ExpressionList,
        [],
        "$...,"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ExpressionStatement,
        ["expression"],
        "$1;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.FinallyClause,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ForInStatement,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ForOfStatement,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ForStatement,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.FormalParameters,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.FromClause,
        ["url"],
        "from $1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.FunctionDeclaration,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.GetterMethod,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Identifier,
        [],
        "$value"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.IdentifierLabel,
        [],
        "$value"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.IdentifierBinding,
        [],
        "$value"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.IdentifierReference,
        [],
        "$value"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.IfStatement,
        [],
        { default: "if ($1) $2 else $3", $not_3: "if ($1) $2 " }),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ImportClause,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ImportDeclaration,
        ["clause", "from"],
        "import $1 $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.InExpression,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.InstanceOfExpression,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.LabeledStatement,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.LexicalBinding,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.LexicalDeclaration,
        ["bindings, expression"],
        "$symbol $...,;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.LogicalExpression,
        ["left", "right"],
        "$1 $symbol $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.BitwiseExpression,
        ["left", "right"],
        "$1 $symbol $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.MemberExpression,
        ["object", "member"],
        { COMPUTED: "$1[$2]", default: "$1.$2" }),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Method,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ModuleSpecifier,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.MultiplicativeExpression,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.NameSpaceImport,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.NamedImports,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.NewExpression,
        [],
        "new $1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.NewInstanceExpression,
        [],
        "new $1$2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.NewTarget,
        [],
        "new.target"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.NullLiteral,
        [],
        "null"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.NumericLiteral,
        [],
        "$value"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ObjectLiteral,
        [],
        "{$...}"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Parameters,
        [],
        "$...,"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Parenthesized,
        ["expression"],
        "($1)"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.PostExpression,
        ["expression"],
        "$1$symbol"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.PreExpression,
        ["expression"],
        "$symbol$1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.PropertyBinding,
        ["identifier", "expression"],
        "$1.$2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.RegexLiteral,
        ["expression_string", "meta"],
        "/$1/$2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.RelationalExpression,
        ["left", "right"],
        "$1 $symbol $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ReturnStatement,
        ["expression"],
        "return $1;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Script,
        [],
        "$... "),

    new MinTreeNodeDefinition(
        MinTreeNodeType.SetterMethod,
        ["binding", "body"],
        "set($1){$2}"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ShiftExpression,
        ["left", "right"],
        "$1 $symbol $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Specifier,
        ["original", "transformed"],
        "$1 as $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.SpreadExpression,
        ["expression"],
        "...$1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.StringLiteral,
        [],
        "$quote_type$value$quote_type"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.SuperCall,
        ["arguments"],
        "super$1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.SuperExpression,
        ["member"],
        { COMPUTED: "super[$1]", default: "super.$2" }),

    new MinTreeNodeDefinition(
        MinTreeNodeType.SwitchStatement,
        ["expression", "case_block"],
        "switch($1)$2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.Template,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.TemplateHead,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.TemplateMiddle,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.TemplateTail,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ThisLiteral,
        [],
        "this"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.ThrowStatement,
        ["expression"],
        "throw $1;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.TryStatement,
        [],
        ""),

    new MinTreeNodeDefinition(
        MinTreeNodeType.TypeofExpression,
        ["expression"],
        "typeof $1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.UnaryExpression,
        ["expression"],
        "$symbol$1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.VariableDeclaration,
        [],
        "var $...,"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.VariableStatement,
        [],
        "var $...,;"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.VoidExpression,
        ["expression"],
        "void $1"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.WhileStatement,
        ["expression", "statement"],
        "while($1) $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.WithStatement,
        ["expression", "statement"],
        "with($1) $2"),

    new MinTreeNodeDefinition(
        MinTreeNodeType.YieldExpression,
        ["expression"],
        "yield $1")
];

export enum MinTreeNodeTyped {

}