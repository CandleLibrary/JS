  const
    $expression : 1<<0,
    $statement  : 1<<1,
    $literal    : 1<<2,
    $import     : 1<<3,
    $export     : 1<<4,
    $number     : 1<<5,
    $boolean    : 1<<6,
    $string     : 1<<7,
    $return     : 1<<8,
    $array      : 1<<9,
    $null       : 1<<10,
    $identifier : 1<<11,
    $regex      : 1<<12,
    $class      : 1<<13,
    $call       : 1<<14,
    $yield      : 1<<15,
    $while      : 1<<16,
    $block      : 1<<17,
    $function   : 1<<18,
    $object     : 1<<19,
    $this       : 1<<20,
    $property   : 1<<21,
    $template   : 1<<22,
    $spread     : 1<<23,
    $undef_16   : 1<<24,
    $undef_17   : 1<<25,
    $undef_18   : 1<<26,
    $undef_19   : 1<<27,
    $undef_20   : 1<<28,
    $undef_21   : 1<<29,
    $undef_22   : 1<<30,
    $undef_23   : 1<<31;
export const types =      {
    AdditiveExpression:       { getters: ["left", "right", {symbil:"symbol", type:String}], template_pattarn: "$1 $symbol $2", node_type: $expression }
    Arguments:                { getters: ["expressions"], template_pattarn: "(...$)", node_type: $expression }
    ArrayLiteral:             { getters: ["members"], template_pattarn: "[...$]", node_type: $literal | $array }
    ArrowFunction:            { getters: ["arguments", "body", {isASYNC:"async", type:Boolean}], template_pattarn: "$async? $1 => $2", node_type: $expression }
    AssignmentExpression:     { getters: ["condition","expression1","expression2"], template_pattarn: "$1 $symbol $2", node_type: $expression }
    AwaitExpression:          { getters: ["expression"], template_pattarn: "await $1", node_type: $expression }
    BindingExpression:        { getters: ["property", "value"], template_pattarn: "$1 : $2", node_type: $expression }
    BlockStatement:           { getters: ["statements"], template_pattarn: "{...$}", node_type: $statement }
    BooleanLiteral:           { getters: [], template_pattarn: "$val", node_type: $literal | $boolean }
    BreakStatement:           { getters: [], template_pattarn: "break;", node_type: $statement }
    CallExpression:           { getters: ["object","arguments"], template_pattarn: "$1(...$)", node_type: $expression }
    CallMemberExpression:     { getters: ["object","member"], template_pattarn: {COMPUTED:"$1[$2]", n:"$1.$2"}, node_type: $expression }
    CaseBlock:                { getters: ["expression"], template_pattarn: "case $1:", node_type: $expression }
    CaseClause:               { getters: ["statements"], template_pattarn: "...$", node_type: $expression }
    CatchClause:              { getters: ["expression", "body"], template_pattarn: "catch($1){$2}", node_type: $expression }
    Class:                    { getters: ["name", "heritage", "body"], template_pattarn: {$2: "class $1 extends $2 {$3}", default: "class $1 {$3}" }, node_type: $class }
    ComputedProperty:         { getters: [], template_pattarn: "[$1]", node_type: $property }
    ContinueStatement:        { getters: [], template_pattarn: "continue;", node_type: $statement }
    ContitionalExpression:    { getters: [], template_pattarn: "$1 ? $2 : $3", node_type: $expression }
    DebuggerStatement:        { getters: [], template_pattarn: "debugger;", node_type: $statement }
    DeleteExpression:         { getters: [], template_pattarn: "delete $1", node_type: $expression }
    DoStatement:              { getters: [], template_pattarn: "do{ $1 }while ($2)", node_type: $statement }
    EmptyStatement:           { getters: [], template_pattarn: ";", node_type: $statement }
    EqualityExpression:       { getters: [], template_pattarn: "$1 $symbol $2", node_type: $expression }
    ExponentationExpression:  { getters: [], template_pattarn: "$1 ** $2", node_type: $expression }
    ExportClause:             { getters: [], template_pattarn: "{...$}", node_type: $expression | $export}
    ExportDeclaration:        { getters: [], template_pattarn: {DEFAULT:"export default $1", $1:"export $1 $2", default:"export * $2"}, node_type: $expression | $export}
    ExpressionList:           { getters: [], template_pattarn: "", node_type: $expression }
    ExpressionStatement:      { getters: [], template_pattarn: "", node_type: $statement }
    FinallyClause:            { getters: [], template_pattarn: "", node_type: $expression }
    ForInStatement:           { getters: [], template_pattarn: "", node_type: $statement }
    ForOfStatement:           { getters: [], template_pattarn: "", node_type: $statement }
    ForStatement:             { getters: [], template_pattarn: "", node_type: $statement }
    FormalPerameters:         { getters: [], template_pattarn: "", node_type: $expression }
    FromClause:               { getters: [], template_pattarn: "", node_type: $expression }
    Function:                 { getters: [], template_pattarn: "", node_type: $expression }
    GetterMethod:             { getters: [], template_pattarn: "", node_type: $function }
    Identifier:               { getters: [], template_pattarn: "", node_type: $literal | $identifier }
    IfStatement:              { getters: [], template_pattarn: "", node_type: $statement }
    ImportClause:             { getters: [], template_pattarn: "", node_type: $expression | $import }
    ImportDeclaration:        { getters: [], template_pattarn: "", node_type: $expression | $import }
    InExpression:             { getters: [], template_pattarn: "", node_type: $expression }
    InstanceOfExpression:     { getters: [], template_pattarn: "", node_type: $expression }
    LabeledStatement:         { getters: [], template_pattarn: "", node_type: $statement }
    LexicalBinding:           { getters: [], template_pattarn: "", node_type: $expression }
    LexicalDecleration:       { getters: [], template_pattarn: "", node_type: $expression }
    LogicalExpression:        { getters: [], template_pattarn: "", node_type: $expression }
    MemberExpression:         { getters: [], template_pattarn: "", node_type: $expression | $call }
    Method:                   { getters: [], template_pattarn: "", node_type: $function }
    ModuleSpecifier:          { getters: [], template_pattarn: "", node_type: $expression }
    MultiplicativeExpression: { getters: [], template_pattarn: "", node_type: $expression }
    NameSpaceImport:          { getters: [], template_pattarn: "", node_type: $expression }
    NamedImports:             { getters: [], template_pattarn: "", node_type: $expression }
    NewExpression:            { getters: [], template_pattarn: "", node_type: $expression }
    NewInstanceExpression:    { getters: [], template_pattarn: "", node_type: $expression }
    NewTarget:                { getters: [], template_pattarn: "", node_type: $expression }
    NullLiteral:              { getters: [], template_pattarn: "", node_type: $literal | $null }
    NumericLiteral:           { getters: [], template_pattarn: "", node_type: $literal | $numeric }
    ObjectLiteral:            { getters: [], template_pattarn: "", node_type: $literal | $object }
    Parameters:               { getters: [], template_pattarn: "", node_type: $expression }
    Parenthasized:            { getters: [], template_pattarn: "", node_type: $expression }
    PostExpression:           { getters: [], template_pattarn: "", node_type: $expression }
    PreExpression:            { getters: [], template_pattarn: "", node_type: $expression }
    PropertyBinding:          { getters: [], template_pattarn: "", node_type: $property }
    RegexLiteral:             { getters: [], template_pattarn: "", node_type: $literal | $regex }
    RelationalExpression:     { getters: [], template_pattarn: "", node_type: $expression }
    ReturnStatement:          { getters: [], template_pattarn: "", node_type: $statement }
    Script:                   { getters: [], template_pattarn: "", node_type: $script }
    SetterMethod:             { getters: [], template_pattarn: "", node_type: $function }
    ShiftExpression:          { getters: [], template_pattarn: "", node_type: $expression }
    Specifier:                { getters: [], template_pattarn: "", node_type: $expression }
    Spread:                   { getters: [], template_pattarn: "", node_type: $spread }
    SpreadExpression:         { getters: [], template_pattarn: "", node_type: $expression | $spread }
    StringLiteral:            { getters: [], template_pattarn: "", node_type: $literal | $string }
    SuperCall:                { getters: [], template_pattarn: "", node_type: $expression }
    SuperExpression:          { getters: [], template_pattarn: "", node_type: $expression }
    SwitchStatement:          { getters: [], template_pattarn: "", node_type: $statement }
    Template:                 { getters: [], template_pattarn: "", node_type: $string | $template }
    TemplateHead:             { getters: [], template_pattarn: "", node_type: $string | $template }
    TemplateMiddle:           { getters: [], template_pattarn: "", node_type: $string | $template }
    TemplateTail:             { getters: [], template_pattarn: "", node_type: $string | $template }
    ThisLiteral:              { getters: [], template_pattarn: "", node_type: $literal | $this }
    ThrowStatement:           { getters: [], template_pattarn: "", node_type: $statement }
    TryStatement:             { getters: [], template_pattarn: "", node_type: $statement }
    TypeofExpression:         { getters: [], template_pattarn: "", node_type: $expression }
    UnaryExpression:          { getters: [], template_pattarn: "", node_type: $expression }
    VarDeclaration:           { getters: [], template_pattarn: "", node_type: $expression }
    VariableStatement:        { getters: [], template_pattarn: "", node_type: $statement }
    VoidExpression:           { getters: [], template_pattarn: "", node_type: $expression }
    WhileStatement:           { getters: [], template_pattarn: "", node_type: $statement }
    WithStatement:            { getters: [], template_pattarn: "", node_type: $statement }
    YieldExpression:          { getters: [], template_pattarn: "", node_type: $expression }
}