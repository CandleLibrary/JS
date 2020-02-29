import { MinTreeNodeDefinition } from "./MinTreeNodeDefinition.js";
import { MinTreeNodeType } from "./ntype.js";

export const MinTreeNodeDefinitions: Array<MinTreeNodeDefinition> = [
    new MinTreeNodeDefinition(
        "AdditiveExpression", 
        ["left", "right", { symbol: "symbol", type: String }], 
        "$1 $symbol $2", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "Arguments", 
        ["expressions"], 
        "($...)", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "ArrayLiteral", 
        ["members"], 
        "[$...]", 
        MinTreeNodeType.$literal | MinTreeNodeType.$array),
    new MinTreeNodeDefinition(
        "ArrowFunction", 
        ["arguments", "body", { isASYNC: "async", type: Boolean }], 
        "$async? $1 => $2", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "AssignmentExpression", 
        ["condition", "expression1", "expression2"], 
        "$1 $symbol $2", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "AwaitExpression", 
        ["expression"], 
        "await $1", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "BindingExpression", 
        ["property", "expression"], 
        "$1 = $2", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "BlockStatement", 
        ["statements"], 
        "{$...}", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "BooleanLiteral", 
        [], 
        "$val", 
        MinTreeNodeType.$literal | MinTreeNodeType.$boolean),
    new MinTreeNodeDefinition(
        "BreakStatement", 
        [], 
        "break;", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "CallExpression", 
        ["object", "arguments"], 
        "$1($...)", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "CallMemberExpression", 
        ["object", "member"], { COMPUTED: "$1[$2]", default: "$1.$2" }, 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "CaseBlock", 
        ["expression"], 
        "case $1:", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "CaseClause", 
        ["statements"], 
        "$...", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "CatchClause", 
        ["expression", "body"], 
        "catch($1){$2}", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "Class", 
        ["name", "heritage", "body"], { $2: "class $1 extends $2 {$3}", default: "class $1 {$3}" }, 
        MinTreeNodeType.$class),
    new MinTreeNodeDefinition(
        "ComputedProperty", 
        [], 
        "[$1]", 
        MinTreeNodeType.$property),
    new MinTreeNodeDefinition(
        "ContinueStatement", 
        [], 
        "continue;", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "ContitionalExpression", 
        [], 
        "$1 ? $2 : $3", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "DebuggerStatement", 
        [], 
        "debugger;", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "DeleteExpression", 
        [], 
        "delete $1", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "DoStatement", 
        [], 
        "do{ $1 }while ($2)", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "EmptyStatement", 
        [], 
        ";", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "EqualityExpression", 
        [], 
        "$1 $symbol $2", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "ExponentationExpression", 
        [], 
        "$1 ** $2", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "ExportClause", 
        [], 
        "{$...}", 
        MinTreeNodeType.$expression | MinTreeNodeType.$export),
    new MinTreeNodeDefinition(
        "ExportDeclaration", 
        [], { DEFAULT: "export default $1", $1: "export $1 $2", default: "export * $2" }, 
        MinTreeNodeType.$expression | MinTreeNodeType.$export),
    new MinTreeNodeDefinition(
        "ExpressionList", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "ExpressionStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "FinallyClause", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "ForInStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "ForOfStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "ForStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "FormalPerameters", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "FromClause", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "Function", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "GetterMethod", 
        [], 
        "", 
        MinTreeNodeType.$function),
    new MinTreeNodeDefinition(
        "Identifier", 
        [], 
        "$val", 
        MinTreeNodeType.$literal | MinTreeNodeType.$identifier),
    new MinTreeNodeDefinition(
        "IfStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "ImportClause", 
        [], 
        "", 
        MinTreeNodeType.$expression | MinTreeNodeType.$import),
    new MinTreeNodeDefinition(
        "ImportDeclaration", 
        [], 
        "", 
        MinTreeNodeType.$expression | MinTreeNodeType.$import),
    new MinTreeNodeDefinition(
        "InExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "InstanceOfExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "LabeledStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "LexicalBinding", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "LexicalDeclaration", 
        [], 
        "$symbol $...;", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "LogicalExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "MemberExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression | MinTreeNodeType.$call),
    new MinTreeNodeDefinition(
        "Method", 
        [], 
        "", 
        MinTreeNodeType.$function),
    new MinTreeNodeDefinition(
        "ModuleSpecifier", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "MultiplicativeExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "NameSpaceImport", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "NamedImports", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "NewExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "NewInstanceExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "NewTarget", 
        [], 
        "new.target", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "NullLiteral", 
        [], 
        "null", 
        MinTreeNodeType.$literal | MinTreeNodeType.$null),
    new MinTreeNodeDefinition(
        "NumericLiteral", 
        [], 
        "$val", 
        MinTreeNodeType.$literal | MinTreeNodeType.$number),
    new MinTreeNodeDefinition(
        "ObjectLiteral", 
        [], 
        "{$...}", 
        MinTreeNodeType.$literal | MinTreeNodeType.$object),
    new MinTreeNodeDefinition(
        "Parameters", 
        [], 
        "$...", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "Parenthasized", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "PostExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "PreExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "PropertyBinding", 
        [], 
        "", 
        MinTreeNodeType.$property),
    new MinTreeNodeDefinition(
        "RegexLiteral", 
        [], 
        "", 
        MinTreeNodeType.$literal | MinTreeNodeType.$regex),
    new MinTreeNodeDefinition(
        "RelationalExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "ReturnStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "Script", 
        [], 
        "$...", 
        MinTreeNodeType.$script),
    new MinTreeNodeDefinition(
        "SetterMethod", 
        [], 
        "", 
        MinTreeNodeType.$function),
    new MinTreeNodeDefinition(
        "ShiftExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "Specifier", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "Spread", 
        [], 
        "...$1", 
        MinTreeNodeType.$spread),
    new MinTreeNodeDefinition(
        "SpreadExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression | MinTreeNodeType.$spread),
    new MinTreeNodeDefinition(
        "StringLiteral", 
        [], 
        "", 
        MinTreeNodeType.$literal | MinTreeNodeType.$string),
    new MinTreeNodeDefinition(
        "SuperCall", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "SuperExpression", 
        [], 
        "", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "SwitchStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "Template", 
        [], 
        "", 
        MinTreeNodeType.$string | MinTreeNodeType.$template),
    new MinTreeNodeDefinition(
        "TemplateHead", 
        [], 
        "", 
        MinTreeNodeType.$string | MinTreeNodeType.$template),
    new MinTreeNodeDefinition(
        "TemplateMiddle", 
        [], 
        "", 
        MinTreeNodeType.$string | MinTreeNodeType.$template),
    new MinTreeNodeDefinition(
        "TemplateTail", 
        [], 
        "", 
        MinTreeNodeType.$string | MinTreeNodeType.$template),
    new MinTreeNodeDefinition(
        "ThisLiteral", 
        [], 
        "this", 
        MinTreeNodeType.$literal | MinTreeNodeType.$this),
    new MinTreeNodeDefinition(
        "ThrowStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "TryStatement", 
        [], 
        "", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "TypeofExpression", 
        [], 
        "typeof $1", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "UnaryExpression", 
        [], 
        "$symbol $1", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "VarDeclaration", 
        [], 
        "var $1", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "VariableStatement", 
        [], 
        "var $...;", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "VoidExpression", 
        [], 
        "void $1", 
        MinTreeNodeType.$expression),
    new MinTreeNodeDefinition(
        "WhileStatement", 
        [], 
        "while($1){$2}", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "WithStatement", 
        [], 
        "with($1){$2}", 
        MinTreeNodeType.$statement),
    new MinTreeNodeDefinition(
        "YieldExpression", 
        [], 
        "yield $1", 
        MinTreeNodeType.$expression)
]