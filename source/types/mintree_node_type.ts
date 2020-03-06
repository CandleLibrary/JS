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
     * An expression of the form
     * ```
     * identifier = expression
     * ```
     * The getters `declaration` and `expression` are available as short hand for nodes[0] and nodes[1] when using the `ex`
     * function.
     * 
     * This expression is found in the following nodes:
     * - `ArrayLiteral`
     * - `ObjectLiteral`
     * - `ArgumentList`
     * - `CatchClause `
     * - `VariableStatement`
     * - `LexicalDeclaration`
     * - `FormalParameters`
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
     * Lexical declaration used in the initialization field of `for` statements.
     * ```
     * ... for( { ( let | const ) ( BindingExpression ) (, BindingExpression )* } ;... 
     * ```
     */
    LexicalBinding = "LexicalBinding",
    /**
     * Lexical Scoped variable declaration statement beginning with `let` or `const`.
     * ```
     *  ( let | const ) ( BindingExpression ) (, BindingExpression )* ;
     * ```
     */
    LexicalDeclaration = "LexicalDeclaration",
    /**
     * * An Expression node of the form
     * 
     * > `expression` ( `||` or `&&` ) `expression`
     * 
     */
    LogicalExpression = "LogicalExpression",
    /**
     * An object member access expression using the forms
     * ```
     * primary_expression .  primary_expression
     * ```
     * or
     * ```
     * primary_expression [ primary_expression ]
     * ```
     * 
     * If original parsed expression was in the latter form then the property `COMPUTED` will be set to true
     * 
     * The getters `object` and `property` are available as short hand for nodes[0] and nodes[1] when using the `ex`
     * function.
     * 
     */
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
    /**
    * Specify a new name for the imported or exported variable
    * ```
    * identifier as identifier
    *```
    * Used in ImportDeclarations and ExportDeclarations
    */
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
