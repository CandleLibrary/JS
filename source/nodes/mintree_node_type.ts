export enum MinTreeNodeType {
    /**
     * A Script node that has at least one export or import statement;
     */
    Module = "Module",
    /**
     * An Expression node of the form
     * ```
     * Expression + Expression
     * ```
     */
    AdditiveExpression = "AdditiveExpression",
    Arguments = "Arguments",
    ArrayLiteral = "ArrayLiteral",
    ArrowFunction = "ArrowFunction",
    AssignmentExpression = "AssignmentExpression",
    AwaitExpression = "AwaitExpression",
    /**
     * An identifier 
     */
    BindingExpression = "BindingExpression",
    BlockStatement = "BlockStatement",
    BooleanLiteral = "BooleanLiteral",
    BreakStatement = "BreakStatement",
    CallExpression = "CallExpression",
    CallMemberExpression = "CallMemberExpression",
    CaseBlock = "CaseBlock",
    CaseClause = "CaseClause",
    CatchClause = "CatchClause",
    Class = "Class",
    ComputedProperty = "ComputedProperty",
    ContinueStatement = "ContinueStatement",
    ConditionalExpression = "ConditionalExpression",
    DebuggerStatement = "DebuggerStatement",
    DeleteExpression = "DeleteExpression",
    DoStatement = "DoStatement",
    EmptyStatement = "EmptyStatement",
    EqualityExpression = "EqualityExpression",
    ExponentiationExpression = "ExponentiationExpression",
    ExportClause = "ExportClause",
    ExportDeclaration = "ExportDeclaration",
    ExpressionList = "ExpressionList",
    ExpressionStatement = "ExpressionStatement",
    FinallyClause = "FinallyClause",
    ForInStatement = "ForInStatement",
    ForOfStatement = "ForOfStatement",
    ForStatement = "ForStatement",
    FormalParameters = "FormalParameters",
    FromClause = "FromClause",
    Function = "Function",
    GetterMethod = "GetterMethod",
    Identifier = "Identifier",
    IfStatement = "IfStatement",
    ImportClause = "ImportClause",
    ImportDeclaration = "ImportDeclaration",
    InExpression = "InExpression",
    InstanceOfExpression = "InstanceOfExpression",
    LabeledStatement = "LabeledStatement",
    /**
     * Lexical declaration used in the initialazition field of for statements.
     * ```
     * ... for( { ( let | const ) ( BindingExpression ) (, BindingExpression )* } ;... 
     * ```
     */
    LexicalBinding = "LexicalBinding",
    /**
     * Lexical Scoped variable declaration statement beginning with let or const.
     * ```
     *  ( let | const ) ( BindingExpression ) (, BindingExpression )* ;
     * ```
     */
    LexicalDeclaration = "LexicalDeclaration",
    LogicalExpression = "LogicalExpression",
    MemberExpression = "MemberExpression",
    Method = "Method",
    ModuleSpecifier = "ModuleSpecifier",
    MultiplicativeExpression = "MultiplicativeExpression",
    NameSpaceImport = "NameSpaceImport",
    NamedImports = "NamedImports",
    NewExpression = "NewExpression",
    NewInstanceExpression = "NewInstanceExpression",
    NewTarget = "NewTarget",
    NullLiteral = "NullLiteral",
    NumericLiteral = "NumericLiteral",
    ObjectLiteral = "ObjectLiteral",
    Parameters = "Parameters",
    Parenthesized = "Parenthesized",
    PostExpression = "PostExpression",
    PreExpression = "PreExpression",
    PropertyBinding = "PropertyBinding",
    RegexLiteral = "RegexLiteral",
    RelationalExpression = "RelationalExpression",
    ReturnStatement = "ReturnStatement",
    /**
     * The top most node of a JS file. 
     */
    Script = "Script",
    /**
     * Defines a setter function on an object or class.
     * ```
     * set ( binding )  { function_body }
     * ```
     */
    SetterMethod = "SetterMethod",
    ShiftExpression = "ShiftExpression",
    Specifier = "Specifier",
    Spread = "Spread",
    SpreadExpression = "SpreadExpression",
    StringLiteral = "StringLiteral",
    SuperCall = "SuperCall",
    SuperExpression = "SuperExpression",
    SwitchStatement = "SwitchStatement",
    Template = "Template",
    TemplateHead = "TemplateHead",
    TemplateMiddle = "TemplateMiddle",
    TemplateTail = "TemplateTail",
    ThisLiteral = "ThisLiteral",
    ThrowStatement = "ThrowStatement",
    TryStatement = "TryStatement",
    TypeofExpression = "TypeofExpression",
    UnaryExpression = "UnaryExpression",
    VarDeclaration = "VarDeclaration",
    VariableStatement = "VariableStatement",
    VoidExpression = "VoidExpression",
    WhileStatement = "WhileStatement",
    WithStatement = "WithStatement",
    YieldExpression = "YieldExpression"
}
