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


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    Arguments = "Arguments",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ArrayLiteral = "ArrayLiteral",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ArrowFunction = "ArrowFunction",


    /**
     * Expression of the form
     * 
     * >```
     * >(member | identifier) = expression
     * >```
     * 
     * Extended members are:
     * 1. **`identifier`**
     * 2. **`expression`**
     */

    AssignmentExpression = "AssignmentExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    AwaitExpression = "AwaitExpression",


    /**
     * An expression of the form
     * 
     * >```
     * >identifier = expression
     * >```
     * 
     * Extended members are:
     * 1. **`declaration`**
     * 2. **`expression`** 
     * 
     * This expression can be a child of the following nodes:
     * - `ArrayLiteral`
     * - `ObjectLiteral`
     * - `ArgumentList`
     * - `CatchClause `
     * - `VariableStatement`
     * - `LexicalDeclaration`
     * - `FormalParameters`
     */

    BindingExpression = "BindingExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    BlockStatement = "BlockStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    BooleanLiteral = "BooleanLiteral",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    BreakStatement = "BreakStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    CallExpression = "CallExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    CallMemberExpression = "CallMemberExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    CaseBlock = "CaseBlock",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    CaseClause = "CaseClause",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */
    CatchClause = "CatchClause",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    Class = "Class",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ComputedProperty = "ComputedProperty",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ContinueStatement = "ContinueStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ConditionalExpression = "ConditionalExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    DebuggerStatement = "DebuggerStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    DeleteExpression = "DeleteExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    DoStatement = "DoStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    EmptyStatement = "EmptyStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    EqualityExpression = "EqualityExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ExponentiationExpression = "ExponentiationExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ExportClause = "ExportClause",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ExportDeclaration = "ExportDeclaration",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ExpressionList = "ExpressionList",



    /**
     * A statement of the form 
     * 
     * >```
     * >expression ;
     * >```
     * 
     * 
     * Extended member is:
     * 1. **`expression`**
     */

    ExpressionStatement = "ExpressionStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    FinallyClause = "FinallyClause",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ForInStatement = "ForInStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ForOfStatement = "ForOfStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ForStatement = "ForStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    FormalParameters = "FormalParameters",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    FromClause = "FromClause",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    Function = "Function",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    GetterMethod = "GetterMethod",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    Identifier = "Identifier",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    IfStatement = "IfStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ImportClause = "ImportClause",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ImportDeclaration = "ImportDeclaration",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    InExpression = "InExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    InstanceOfExpression = "InstanceOfExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

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
     * Extended members are:
     * 'object'        = nodes[0]
     * 'property'      = nodes[1]
     */

    MemberExpression = "MemberExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    Method = "Method",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    ModuleSpecifier = "ModuleSpecifier",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    MultiplicativeExpression = "MultiplicativeExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    NameSpaceImport = "NameSpaceImport",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    NamedImports = "NamedImports",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    NewExpression = "NewExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    NewInstanceExpression = "NewInstanceExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    NewTarget = "NewTarget",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    NullLiteral = "NullLiteral",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    NumericLiteral = "NumericLiteral",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    ObjectLiteral = "ObjectLiteral",
    /**
     * Expression of the form:
     * ```
     * ( expression )
     * ```
     * 
     * Extended members are:
     * 'expression' = nodes[0]
     */

    Parameters = "Parameters",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    Parenthesized = "Parenthesized",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    PostExpression = "PostExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    PreExpression = "PreExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    PropertyBinding = "PropertyBinding",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    RegexLiteral = "RegexLiteral",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    RelationalExpression = "RelationalExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

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
     * 
     * Extended members are:
     * 'identifier' = nodes[0]
     * 'body'       = nodes[1]
     */

    SetterMethod = "SetterMethod",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    ShiftExpression = "ShiftExpression",



    /**
    * Specify a new name for the imported or exported variable
    * ```
    * identifier as identifier
    *```
    * Used in ImportDeclarations and ExportDeclarations
    * 
    * Extended members are:
    * 'original'     = nodes[0]
    * 'transformed'  = nodes[1]
    */

    Specifier = "Specifier",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    Spread = "Spread",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */

    SpreadExpression = "SpreadExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    StringLiteral = "StringLiteral",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    SuperCall = "SuperCall",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    SuperExpression = "SuperExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    SwitchStatement = "SwitchStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    Template = "Template",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    TemplateHead = "TemplateHead",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    TemplateMiddle = "TemplateMiddle",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    TemplateTail = "TemplateTail",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    ThisLiteral = "ThisLiteral",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    ThrowStatement = "ThrowStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    TryStatement = "TryStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    TypeofExpression = "TypeofExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    UnaryExpression = "UnaryExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    VarDeclaration = "VarDeclaration",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    VariableStatement = "VariableStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    VoidExpression = "VoidExpression",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    WhileStatement = "WhileStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    WithStatement = "WithStatement",


    /**
     * TODO Description
     *
     * >```
     * > undefined
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     * 
     * TODO Optional Notes
     */

    YieldExpression = "YieldExpression"
}
