interface Lex {
    char: number;
    line: number;
}

export interface MinTreeNode {
    pos: Lex,
    type: string,
    vals: Array<MinTreeNode | any>
}
enum ntype {
    $expression = 1 << 0,
    $statement = 1 << 1,
    $literal = 1 << 2,
    $import = 1 << 3,
    $export = 1 << 4,
    $number = 1 << 5,
    $boolean = 1 << 6,
    $string = 1 << 7,
    $return = 1 << 8,
    $array = 1 << 9,
    $null = 1 << 10,
    $identifier = 1 << 11,
    $regex = 1 << 12,
    $class = 1 << 13,
    $call = 1 << 14,
    $yield = 1 << 15,
    $while = 1 << 16,
    $block = 1 << 17,
    $function = 1 << 18,
    $object = 1 << 19,
    $this = 1 << 20,
    $property = 1 << 21,
    $template = 1 << 22,
    $spread = 1 << 23,
    $script = 1 << 24,
    $undef_17 = 1 << 25,
    $undef_18 = 1 << 26,
    $undef_19 = 1 << 27,
    $undef_20 = 1 << 28,
    $undef_21 = 1 << 29,
    $undef_22 = 1 << 30,
    $undef_23 = 1 << 31
}

export class MinTreeNodeDefinition {

    name: string;
    getters: Array<any>;
    template_pattern: string | object;
    node_type: ntype;

    constructor(name: string, getters: Array<any>, template_pattern: string | object, node_type: ntype) {
        this.name = name;
        this.getters = getters;
        this.template_pattern = template_pattern;
        this.node_type = node_type;
    }
}

export const MinTreeNodeDefinitions: Array<MinTreeNodeDefinition> = [
    new MinTreeNodeDefinition(
        "AdditiveExpression", 
        ["left", "right", { symbol: "symbol", type: String }], 
        "$1 $symbol $2", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "Arguments", 
        ["expressions"], 
        "($...)", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "ArrayLiteral", 
        ["members"], 
        "[$...]", 
        ntype.$literal | ntype.$array),
    new MinTreeNodeDefinition(
        "ArrowFunction", 
        ["arguments", "body", { isASYNC: "async", type: Boolean }], 
        "$async? $1 => $2", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "AssignmentExpression", 
        ["condition", "expression1", "expression2"], 
        "$1 $symbol $2", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "AwaitExpression", 
        ["expression"], 
        "await $1", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "BindingExpression", 
        ["property", "expression"], 
        "$1 = $2", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "BlockStatement", 
        ["statements"], 
        "{$...}", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "BooleanLiteral", 
        [], 
        "$val", 
        ntype.$literal | ntype.$boolean),
    new MinTreeNodeDefinition(
        "BreakStatement", 
        [], 
        "break;", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "CallExpression", 
        ["object", "arguments"], 
        "$1($...)", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "CallMemberExpression", 
        ["object", "member"], { COMPUTED: "$1[$2]", default: "$1.$2" }, 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "CaseBlock", 
        ["expression"], 
        "case $1:", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "CaseClause", 
        ["statements"], 
        "$...", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "CatchClause", 
        ["expression", "body"], 
        "catch($1){$2}", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "Class", 
        ["name", "heritage", "body"], { $2: "class $1 extends $2 {$3}", default: "class $1 {$3}" }, 
        ntype.$class),
    new MinTreeNodeDefinition(
        "ComputedProperty", 
        [], 
        "[$1]", 
        ntype.$property),
    new MinTreeNodeDefinition(
        "ContinueStatement", 
        [], 
        "continue;", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "ContitionalExpression", 
        [], 
        "$1 ? $2 : $3", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "DebuggerStatement", 
        [], 
        "debugger;", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "DeleteExpression", 
        [], 
        "delete $1", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "DoStatement", 
        [], 
        "do{ $1 }while ($2)", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "EmptyStatement", 
        [], 
        ";", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "EqualityExpression", 
        [], 
        "$1 $symbol $2", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "ExponentationExpression", 
        [], 
        "$1 ** $2", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "ExportClause", 
        [], 
        "{$...}", 
        ntype.$expression | ntype.$export),
    new MinTreeNodeDefinition(
        "ExportDeclaration", 
        [], { DEFAULT: "export default $1", $1: "export $1 $2", default: "export * $2" }, 
        ntype.$expression | ntype.$export),
    new MinTreeNodeDefinition(
        "ExpressionList", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "ExpressionStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "FinallyClause", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "ForInStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "ForOfStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "ForStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "FormalPerameters", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "FromClause", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "Function", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "GetterMethod", 
        [], 
        "", 
        ntype.$function),
    new MinTreeNodeDefinition(
        "Identifier", 
        [], 
        "$val", 
        ntype.$literal | ntype.$identifier),
    new MinTreeNodeDefinition(
        "IfStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "ImportClause", 
        [], 
        "", 
        ntype.$expression | ntype.$import),
    new MinTreeNodeDefinition(
        "ImportDeclaration", 
        [], 
        "", 
        ntype.$expression | ntype.$import),
    new MinTreeNodeDefinition(
        "InExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "InstanceOfExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "LabeledStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "LexicalBinding", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "LexicalDecleration", 
        [], 
        "$symbol $...;", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "LogicalExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "MemberExpression", 
        [], 
        "", 
        ntype.$expression | ntype.$call),
    new MinTreeNodeDefinition(
        "Method", 
        [], 
        "", 
        ntype.$function),
    new MinTreeNodeDefinition(
        "ModuleSpecifier", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "MultiplicativeExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "NameSpaceImport", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "NamedImports", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "NewExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "NewInstanceExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "NewTarget", 
        [], 
        "new.target", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "NullLiteral", 
        [], 
        "null", 
        ntype.$literal | ntype.$null),
    new MinTreeNodeDefinition(
        "NumericLiteral", 
        [], 
        "$val", 
        ntype.$literal | ntype.$number),
    new MinTreeNodeDefinition(
        "ObjectLiteral", 
        [], 
        "{$...}", 
        ntype.$literal | ntype.$object),
    new MinTreeNodeDefinition(
        "Parameters", 
        [], 
        "$...", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "Parenthasized", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "PostExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "PreExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "PropertyBinding", 
        [], 
        "", 
        ntype.$property),
    new MinTreeNodeDefinition(
        "RegexLiteral", 
        [], 
        "", 
        ntype.$literal | ntype.$regex),
    new MinTreeNodeDefinition(
        "RelationalExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "ReturnStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "Script", 
        [], 
        "$...", 
        ntype.$script),
    new MinTreeNodeDefinition(
        "SetterMethod", 
        [], 
        "", 
        ntype.$function),
    new MinTreeNodeDefinition(
        "ShiftExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "Specifier", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "Spread", 
        [], 
        "...$1", 
        ntype.$spread),
    new MinTreeNodeDefinition(
        "SpreadExpression", 
        [], 
        "", 
        ntype.$expression | ntype.$spread),
    new MinTreeNodeDefinition(
        "StringLiteral", 
        [], 
        "", 
        ntype.$literal | ntype.$string),
    new MinTreeNodeDefinition(
        "SuperCall", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "SuperExpression", 
        [], 
        "", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "SwitchStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "Template", 
        [], 
        "", 
        ntype.$string | ntype.$template),
    new MinTreeNodeDefinition(
        "TemplateHead", 
        [], 
        "", 
        ntype.$string | ntype.$template),
    new MinTreeNodeDefinition(
        "TemplateMiddle", 
        [], 
        "", 
        ntype.$string | ntype.$template),
    new MinTreeNodeDefinition(
        "TemplateTail", 
        [], 
        "", 
        ntype.$string | ntype.$template),
    new MinTreeNodeDefinition(
        "ThisLiteral", 
        [], 
        "this", 
        ntype.$literal | ntype.$this),
    new MinTreeNodeDefinition(
        "ThrowStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "TryStatement", 
        [], 
        "", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "TypeofExpression", 
        [], 
        "typeof $1", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "UnaryExpression", 
        [], 
        "$symbol $1", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "VarDeclaration", 
        [], 
        "var $1", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "VariableStatement", 
        [], 
        "var $...;", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "VoidExpression", 
        [], 
        "void $1", 
        ntype.$expression),
    new MinTreeNodeDefinition(
        "WhileStatement", 
        [], 
        "while($1){$2}", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "WithStatement", 
        [], 
        "with($1){$2}", 
        ntype.$statement),
    new MinTreeNodeDefinition(
        "YieldExpression", 
        [], 
        "yield $1", 
        ntype.$expression)
]