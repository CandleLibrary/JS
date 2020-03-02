import { MinTreeNodeDefinition } from "./min_tree_node_definition.js";
import { MinTreeNodeMaskedType } from "./ntype.js";
import { MinTreeNodeType } from "./mintree_node_type";
export const MinTreeNodeDefinitions: Array<MinTreeNodeDefinition> = [
    new MinTreeNodeDefinition(
        MinTreeNodeType.AdditiveExpression,
        ["left", "right", { symbol: "symbol", type: String }],
        "$1 $symbol $2",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Arguments,
        ["expressions"],
        "($...)",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ArrayLiteral,
        ["members"],
        "[$...]",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$array),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ArrowFunction,
        ["arguments", "body", { isASYNC: "async", type: Boolean }],
        "$async? $1 => $2",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.AssignmentExpression,
        ["condition", "expression1", "expression2"],
        "$1 $symbol $2",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.AwaitExpression,
        ["expression"],
        "await $1",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.BindingExpression,
        ["property", "expression"],
        "$1 = $2",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.BlockStatement,
        ["statements"],
        "{$...}",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.BooleanLiteral,
        [],
        "$val",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$boolean),
    new MinTreeNodeDefinition(
        MinTreeNodeType.BreakStatement,
        [],
        "break;",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.CallExpression,
        ["object", "arguments"],
        "$1($...)",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.CallMemberExpression,
        ["object", "member"], { COMPUTED: "$1[$2]", default: "$1.$2" },
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.CaseBlock,
        ["expression"],
        "case $1:",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.CaseClause,
        ["statements"],
        "$...",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.CatchClause,
        ["expression", "body"],
        "catch($1){$2}",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Class,
        ["name", "heritage", "body"], { $2: "class $1 extends $2 {$3}", default: "class $1 {$3}" },
        MinTreeNodeMaskedType.$class),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ComputedProperty,
        [],
        "[$1]",
        MinTreeNodeMaskedType.$property),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ContinueStatement,
        [],
        "continue;",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ConditionalExpression,
        [],
        "$1 ? $2 : $3",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.DebuggerStatement,
        [],
        "debugger;",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.DeleteExpression,
        [],
        "delete $1",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.DoStatement,
        [],
        "do{ $1 }while ($2)",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.EmptyStatement,
        [],
        ";",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.EqualityExpression,
        [],
        "$1 $symbol $2",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ExponentiationExpression,
        [],
        "$1 ** $2",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ExportClause,
        [],
        "{$...}",
        MinTreeNodeMaskedType.$expression | MinTreeNodeMaskedType.$export),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ExportDeclaration,
        [], { DEFAULT: "export default $1", $1: "export $1 $2", default: "export * $2" },
        MinTreeNodeMaskedType.$expression | MinTreeNodeMaskedType.$export),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ExpressionList,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ExpressionStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.FinallyClause,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ForInStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ForOfStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ForStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.FormalParameters,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.FromClause,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Function,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.GetterMethod,
        [],
        "",
        MinTreeNodeMaskedType.$function),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Identifier,
        [],
        "$val",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$identifier),
    new MinTreeNodeDefinition(
        MinTreeNodeType.IfStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ImportClause,
        [],
        "",
        MinTreeNodeMaskedType.$expression | MinTreeNodeMaskedType.$import),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ImportDeclaration,
        [],
        "",
        MinTreeNodeMaskedType.$expression | MinTreeNodeMaskedType.$import),
    new MinTreeNodeDefinition(
        MinTreeNodeType.InExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.InstanceOfExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.LabeledStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.LexicalBinding,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.LexicalDeclaration,
        [],
        "$symbol $...;",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.LogicalExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.MemberExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression | MinTreeNodeMaskedType.$call),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Method,
        [],
        "",
        MinTreeNodeMaskedType.$function),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ModuleSpecifier,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.MultiplicativeExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.NameSpaceImport,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.NamedImports,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.NewExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.NewInstanceExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.NewTarget,
        [],
        "new.target",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.NullLiteral,
        [],
        "null",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$null),
    new MinTreeNodeDefinition(
        MinTreeNodeType.NumericLiteral,
        [],
        "$val",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$number),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ObjectLiteral,
        [],
        "{$...}",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$object),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Parameters,
        [],
        "$...",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Parenthesized,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.PostExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.PreExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.PropertyBinding,
        [],
        "",
        MinTreeNodeMaskedType.$property),
    new MinTreeNodeDefinition(
        MinTreeNodeType.RegexLiteral,
        [],
        "",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$regex),
    new MinTreeNodeDefinition(
        MinTreeNodeType.RelationalExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ReturnStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Script,
        [],
        "$...",
        MinTreeNodeMaskedType.$script),
    new MinTreeNodeDefinition(
        MinTreeNodeType.SetterMethod,
        [],
        "",
        MinTreeNodeMaskedType.$function),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ShiftExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Specifier,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Spread,
        [],
        "...$1",
        MinTreeNodeMaskedType.$spread),
    new MinTreeNodeDefinition(
        MinTreeNodeType.SpreadExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression | MinTreeNodeMaskedType.$spread),
    new MinTreeNodeDefinition(
        MinTreeNodeType.StringLiteral,
        [],
        "",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$string),
    new MinTreeNodeDefinition(
        MinTreeNodeType.SuperCall,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.SuperExpression,
        [],
        "",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.SwitchStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.Template,
        [],
        "",
        MinTreeNodeMaskedType.$string | MinTreeNodeMaskedType.$template),
    new MinTreeNodeDefinition(
        MinTreeNodeType.TemplateHead,
        [],
        "",
        MinTreeNodeMaskedType.$string | MinTreeNodeMaskedType.$template),
    new MinTreeNodeDefinition(
        MinTreeNodeType.TemplateMiddle,
        [],
        "",
        MinTreeNodeMaskedType.$string | MinTreeNodeMaskedType.$template),
    new MinTreeNodeDefinition(
        MinTreeNodeType.TemplateTail,
        [],
        "",
        MinTreeNodeMaskedType.$string | MinTreeNodeMaskedType.$template),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ThisLiteral,
        [],
        "this",
        MinTreeNodeMaskedType.$literal | MinTreeNodeMaskedType.$this),
    new MinTreeNodeDefinition(
        MinTreeNodeType.ThrowStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.TryStatement,
        [],
        "",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.TypeofExpression,
        [],
        "typeof $1",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.UnaryExpression,
        [],
        "$symbol $1",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.VarDeclaration,
        [],
        "var $1",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.VariableStatement,
        [],
        "var $...;",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.VoidExpression,
        [],
        "void $1",
        MinTreeNodeMaskedType.$expression),
    new MinTreeNodeDefinition(
        MinTreeNodeType.WhileStatement,
        [],
        "while($1){$2}",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.WithStatement,
        [],
        "with($1){$2}",
        MinTreeNodeMaskedType.$statement),
    new MinTreeNodeDefinition(
        MinTreeNodeType.YieldExpression,
        [],
        "yield $1",
        MinTreeNodeMaskedType.$expression)
];

export enum MinTreeNodeTyped {

}