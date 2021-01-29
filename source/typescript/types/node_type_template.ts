import { JSNodeClass } from "./node_class_type";

/**
 * Template Converted into Node Type const numbers
 */
export const enum JSNodeType {

    Module = JSNodeClass.MODULE,



    AdditiveExpression = JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


    /**
     * A parenthesized list of expressions of the form:
     *
     * >```
     * > ( expression [, expression]* )
     * >```
     *
     *  This node has no extended members.
     *
     */
    Arguments = (2 << 23) | JSNodeClass.LIST,



    ArrayLiteral = (3 << 23) | JSNodeClass.LITERAL,


    /**
     * A function declaration of the form
     *
     * >```
     * > async? [ arguments | identifier ] => [ expression | block_statement ]
     * >```
     *
     * Extended members are:
     * 1. **`arguments`**
     * 1. **`body`**
     *
     * This node contains the regular properties:
     *
     * @property {boolean} IS_ASYNC - True if node was parsed with an `async` keyword
     */
    ArrowFunction = (4 << 23) | JSNodeClass.FUNCTION | JSNodeClass.EXPRESSION,


    AssignmentExpression = (5 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.ASSIGNMENT,



    AwaitExpression = (6 << 23) | JSNodeClass.EXPRESSION,



    BindingExpression = (7 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.ASSIGNMENT,



    BitwiseExpression = (8 << 23) | JSNodeClass.EXPRESSION,

    BlockStatement = (9 << 23) | JSNodeClass.STATEMENT | JSNodeClass.BLOCK,



    BooleanLiteral = (10 << 23) | JSNodeClass.LITERAL,



    BreakStatement = (11 << 23) | JSNodeClass.STATEMENT,



    CallExpression = (12 << 23) | JSNodeClass.EXPRESSION,


    CaseBlock = (13 << 23) | JSNodeClass.BLOCK,



    CaseClause = (14 << 23),


    /**
     * Try-Catch clause of the form:
     *
     * >```
     * > catch ( identifier ) block
     * >```
     *
     * Extended members are:
     * 1. **`identifier`**
     * 2. **`statement`**
     *
     */
    CatchClause = (15 << 23),


    /**
     * Class declaration of the form:
     *
     * >```
     * > class identifier? class_heritage? { class_body? }
     * >```
     *
     * Extended members are:
     * 1. **`name`**
     * 2. **`heritage`**
     * 3. **`body`**
     *
     */
    Class = (16 << 23) | JSNodeClass.CLASS | JSNodeClass.STATEMENT | JSNodeClass.DECLARATION | JSNodeClass.HOISTABLE_DECLARATION,
    ClassDeclaration = (16 << 23) | JSNodeClass.CLASS | JSNodeClass.STATEMENT | JSNodeClass.DECLARATION | JSNodeClass.HOISTABLE_DECLARATION,

    /**
     * Class declaration of the form:
     *
     * >```
     * > class identifier? class_heritage? { class_body? }
     * >```
     *
     * Extended members are:
     * 1. **`name`**
     * 2. **`heritage`**
     * 3. **`body`**
     *
     */
    ClassExpression = (16 << 23) | JSNodeClass.CLASS | JSNodeClass.EXPRESSION | JSNodeClass.DECLARATION,


    /**
     * Property name declaration of the form:
     *
     * >```
     * > \[ expression \]
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     *
     */
    ComputedProperty = (17 << 23) | JSNodeClass.PROPERTY_NAME,



    ContinueStatement = (18 << 23) | JSNodeClass.STATEMENT,



    ConditionalExpression = (19 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.TERNARY_EXPRESSION,



    DebuggerStatement = (20 << 23) | JSNodeClass.STATEMENT,

    DefaultClause = (21 << 23),

    DeleteExpression = (22 << 23) | JSNodeClass.EXPRESSION,

    DoStatement = (23 << 23) | JSNodeClass.STATEMENT,

    /**
    * A comma or series of commas of the form:
    *
    * >```js
    * > ,+
    * >```
    *
    * This node does not have extended members.
    *
    * This node has the regular member:
    * - @property {number} count - The number of commas this elision node represents.
    */
    Elision = (24 << 23),


    EmptyStatement = (25 << 23) | JSNodeClass.STATEMENT,



    EqualityExpression = (26 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


    ExponentiationExpression = (27 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


    /**
     * Collection of export specifiers of the form:
     *
     * >```
     * > { export_specifier* }
     * >```
     *
     * Extended members are:
     * 1. **`specifiers`** - Array of ExportSpecifiers
     *
     */
    ExportClause = (28 << 23),


    /**
     * An statement of one of the forms:
     *
     * >```
     * > export export_clause from_clause? ;
     * > export variable_statement
     * > export declaration
     * > export default declaration
     * > export default declaration
     * > export default assignment_expression ;
     * >```
     *
     * TODO Extended members are:
     * 1. **`TODO`**
     *
     * TODO Optional Notes
     */
    ExportDeclaration = (29 << 23) | JSNodeClass.STATEMENT | JSNodeClass.MODULE | JSNodeClass.DECLARATION,


    /**
     * Expression of the form
     *
     * >```
     * >  expression [, expression]*
     * >```
     *
     * This node does not have any extended members.
     *
     */
    ExpressionList = (30 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.LIST,




    ExpressionStatement = (31 << 23) | JSNodeClass.STATEMENT,

    FinallyClause = (32 << 23),


    ForInStatement = (33 << 23) | JSNodeClass.STATEMENT | JSNodeClass.BLOCK,



    ForOfStatement = (34 << 23) | JSNodeClass.STATEMENT | JSNodeClass.BLOCK,


    ForStatement = (35 << 23) | JSNodeClass.STATEMENT | JSNodeClass.BLOCK,


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
    FormalParameters = (36 << 23) | JSNodeClass.LIST,



    /**
     * Expression of the form
     *
     * >```
     * > from string_literal
     * >```
     *
     * Extended members are:
     * 1. **`url`**
     *
     */
    FromClause = (37 << 23),

    /**
     * A list of statements found within a FunctionDeclaration, FunctionExpression, or Method
     *
     * >```
     * > statements+
     * >```
     *
     * This node does not have extended members.
     *
     */
    FunctionBody = (38 << 23) | JSNodeClass.BLOCK,

    FunctionDeclaration = (39 << 23) | JSNodeClass.FUNCTION | JSNodeClass.STATEMENT | JSNodeClass.DECLARATION,

    /**
     * A function expression of the form:
     *
     * >```
     * > async? function  \*? identifier? \( parameters? \) { body? }
     * >```
     *
     * Extended members are:
     * 1. **name**
     * 1. **parameters**
     * 1. **body**
     *
     * This node has the regular properties
     *
     * - @property {boolean} ASYNC - True if the parse encountered the `async` keyword.
     * - @property {boolean} GENERATOR - True if the parse encountered the symbol `*`.
     */
    FunctionExpression = (39 << 23) | JSNodeClass.FUNCTION | JSNodeClass.EXPRESSION | JSNodeClass.DECLARATION,

    /**
     * A method declaration of the form:
     *
     * >```
     * > get \*? identifier? { body }
     * >```
     *
     * Extended members are:
     * 1. **name**
     * 1. **body**
     *
     * This node has the regular properties
     *
     * - @property {boolean} ASYNC - True if the parse encountered the `async` keyword.
     * - @property {boolean} GENERATOR - True if the parse encountered the symbol `*`.
     */
    GetterMethod = (41 << 23) | JSNodeClass.METHOD,



    Identifier = (42 << 23) | JSNodeClass.IDENTIFIER,


    IdentifierName = (42 << 23) | JSNodeClass.IDENTIFIER,


    IdentifierProperty = (42 << 23) | JSNodeClass.IDENTIFIER | JSNodeClass.PROPERTY_NAME,

    IdentifierDefault = (43 << 23) | JSNodeClass.IDENTIFIER | JSNodeClass.MODULE,



    IdentifierModule = (44 << 23) | JSNodeClass.IDENTIFIER | JSNodeClass.MODULE,


    IdentifierReference = ((45 << 23) | JSNodeClass.VARIABLE | JSNodeClass.IDENTIFIER),

    IdentifierReferenceProperty = (45 << 23) | JSNodeClass.PROPERTY_NAME,



    IdentifierBinding = (46 << 23) | JSNodeClass.VARIABLE | JSNodeClass.IDENTIFIER,


    IdentifierLabel = (47 << 23) | JSNodeClass.IDENTIFIER,


    IfStatement = (48 << 23) | JSNodeClass.STATEMENT,


    /**
     * TODO Description
     *
     * >```
     * > identifier
     * > //or
     *  identifier [, name_space_import ]
     * >```
     *
     * Extended members are:
     * 1. **`undefined`**
     *
     * TODO Optional Notes
     */
    ImportClause = (49 << 23),


    /**
     * Import statement of the forms:
     *
     * >```js
     * > τimport imports from_clause ;
     * > // or
     * > τimport module_specifier ;
     * >```
     *
     * Extended members are:
     * 1. **`imports`**
     * 1. **`from`**
     *
     */
    ImportDeclaration = (50 << 23) | JSNodeClass.STATEMENT | JSNodeClass.MODULE | JSNodeClass.DECLARATION,

    InExpression = (51 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,



    InstanceOfExpression = (52 << 23) | JSNodeClass.BINARY_EXPRESSION | JSNodeClass.EXPRESSION,


    LabeledStatement = (53 << 23) | JSNodeClass.STATEMENT,




    LexicalBinding = (54 << 23),




    LexicalDeclaration = (55 << 23) | JSNodeClass.STATEMENT | JSNodeClass.DECLARATION,




    LogicalExpression = (56 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,




    MemberExpression = (57 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.VARIABLE,


    /**
     * Object method property of the form:
     *
     * >```js
     * > async? *? name ( parameters? ) { body? }
     * >```
     *
     * Extended members are:
     * 1. **name**
     * 1. **parameters**
     * 1. **body**
     *
     * This node has the regular properties
     *
     * - @property {boolean} ASYNC - True if the parse encountered the `async` keyword.
     * - @property {boolean} GENERATOR - True if the parse encountered the symbol `*`.
     */
    Method = (58 << 23),


    MultiplicativeExpression = (59 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


    /**
     * Import module expression of the form
     *
     * >```js
     * > * as import_binding
     * >```
     *
     * The extended member is:
     * 1. **`import_binding`**
     *
     */
    NameSpaceImport = (60 << 23),


    /**
     * Import module expression of the form
     *
     * >```js
     * > { [imports_specifier [, imports_specifier ]  ] }
     * >```
     *
     * This node does not have extended members.
     *
     */
    NamedImports = (61 << 23),



    NewExpression = (62 << 23) | JSNodeClass.EXPRESSION,



    NewInstanceExpression = (63 << 23) | JSNodeClass.EXPRESSION,


    /**
     * Expression of the form:
     *
     * >```js
     * > new . target
     * >```
     *
     * This node does not have extended members.
     *
     */
    NewTarget = (64 << 23) | JSNodeClass.LITERAL,



    NullLiteral = (65 << 23) | JSNodeClass.LITERAL,



    NumericLiteral = (66 << 23) | JSNodeClass.LITERAL,



    BigIntLiteral = (67 << 23) | JSNodeClass.LITERAL,



    ObjectLiteral = (68 << 23) | JSNodeClass.LITERAL,


    /**
     * Expression of the form:
     *
     * ```javascript
     * ( expression )
     * ```
     *
     * Extended members are:
     * 'expression' = nodes[0]
     */
    Parameters = (69 << 23) | JSNodeClass.LIST,

    Parenthesized = (70 << 23) | JSNodeClass.EXPRESSION,



    PostExpression = (71 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,



    PreExpression = (72 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,


    /**
     * A binding of the form:
     *
     * >```javascript
     * > identifier : expression
     * > //or
     * > [ expression ] : expression //if COMPUTED is set to `true`
     * >```
     *
     * Extended members are:
     * 1. **`identifier`**
     * 2. **`expression`**
     *
     */
    PropertyBinding = (73 << 23) | JSNodeClass.ASSIGNMENT,



    RegexLiteral = (74 << 23) | JSNodeClass.LITERAL,



    RelationalExpression = (75 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,



    ReturnStatement = (76 << 23) | JSNodeClass.STATEMENT,



    Script = (77 << 23),


    /**
     * A method declaration of the form
     *
     * >```javascript
     * >set ( binding )  { body }
     * >```
     *
     * Extended members are:
     * 1. `binding`
     * 2. `body`
     */
    SetterMethod = (78 << 23) | JSNodeClass.METHOD,



    ShiftExpression = (79 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,



    /**
    * Specify a new name for the imported or exported variable
    *
    *>```
    *> identifier as identifier
    *>```
    *
    * Extended members are
    * 1. 'original'
    * 2. 'transformed'
    *
    * Used in `ImportDeclarations` and `ExportDeclarations`
    */
    Specifier = (80 << 23) | JSNodeClass.BINARY_EXPRESSION,



    Spread = (81 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,

    // TODO - remove the following
    SpreadExpression = (81 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,


    StringLiteral = (82 << 23) | JSNodeClass.LITERAL,


    /**
     * Expression of the form:
     *
     * >```javascript
     * > super arguments
     * >```
     *
     * Extended member is:
     * 1. **`arguments`**
     *
     */
    SuperCall = (83 << 23) | JSNodeClass.EXPRESSION,


    /**
     * An object member access expression using the forms
     *
     * >```
     * >super .  identifier
     * >```
     * >or
     * >```
     * >super [ expression ]
     * >```
     *
     * If original parsed expression was in the latter form then the property `COMPUTED` will be set to true.
     *
     * Extended member is:
     * 1. 'member'
     */
    SuperExpression = (84 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,



    SwitchStatement = (85 << 23) | JSNodeClass.STATEMENT,


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
    Template = (86 << 23) | JSNodeClass.LITERAL | JSNodeClass.TEMPLATE,


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
    TemplateHead = (87 << 23),


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
    TemplateMiddle = (88 << 23),


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
    TemplateTail = (89 << 23),



    ThisLiteral = (90 << 23) | JSNodeClass.LITERAL,
    ThrowStatement = (91 << 23) | JSNodeClass.STATEMENT,



    TryStatement = (92 << 23) | JSNodeClass.STATEMENT,



    TypeofExpression = (93 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,



    UnaryExpression = (94 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,



    VariableStatement = (95 << 23) | JSNodeClass.LIST | JSNodeClass.DECLARATION | JSNodeClass.STATEMENT | JSNodeClass.HOISTABLE_DECLARATION,


    VariableDeclaration = (96 << 23) | JSNodeClass.LIST | JSNodeClass.DECLARATION,



    VoidExpression = (97 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,



    WhileStatement = (98 << 23) | JSNodeClass.STATEMENT,



    WithStatement = (99 << 23) | JSNodeClass.STATEMENT,

    YieldExpression = (100 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,

    /**
     * Object Binding Pattern
     *
     * >```
     * > { <object_binding_properties> } 
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     */
    ObjectBinding = (101 << 23),

    /**
     * Array Binding Pattern
     *
     * >```
     * > [ <object_binding_properties> ]
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     */
    ArrayBinding = (102 << 23),

    OptionalMemberExpression = (103 << 23) | JSNodeClass.EXPRESSION,

    OptionalChain = (104 << 23),

    CoalesceExpression = (105 << 23) | JSNodeClass.EXPRESSION
}
