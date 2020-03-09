export const enum MinTreeNodeClass {
    /**
     * Any node that produces a block structure.
     * ```
     * { ... }
     * ```
     */
    BLOCK = 1 << 0,

    /**
     * Any node that is an expression.
     */

    EXPRESSION = 1 << 1,

    /**
     * Any node that is a statement or declaration.
     */
    STATEMENT = 1 << 2,

    /**
     * Any node with a `nodes` property that can be of arbitrary size.
     */
    LIST = 1 << 3,

    /**
     * Any node that is a function declaration.
     */
    FUNCTION = 1 << 4,

    MODULE = 1 << 5,

    LITERAL = 1 << 6,

    /**
     * Any node of the form
     * ```
     * expression op expression
     * ```
     */
    BINARY_EXPRESSION = 1 << 7,

    /**
     * Any node of the form
     * ```
     * expression op
     * ```
     * or
     * ```
     * op expression
     * ```
     */
    UNARY_EXPRESSION = 1 << 8,

    /**
     * Any node of the form
     * ```
     * expression op expression op expression
     * ```
     */
    TERNARY_EXPRESSION = 1 << 9,

    CLASS = 1 << 10,

    VARIABLE = 1 << 11,

    PROPERTY_NAME = 1 << 12,

    /**
     * Any node that is a method (property function) declaration.
     */
    METHOD = 1 << 13,

    /**
     * A template literal node.
     */
    TEMPLATE = 1 << 14,

    /**
     * An identifier
     */
    IDENTIFIER = 1 << 15
}

export enum MinTreeNodeType {
    /**
     * A Script node that has at least one export or import statement;
     */

    Module = (1 << 24) | MinTreeNodeClass.MODULE,


    /**
     * A binary expression of one of the forms
     *
     * >```
     * > expression + expression
     * > expression - expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */

    AdditiveExpression = (2 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.BINARY_EXPRESSION,


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

    Arguments = (3 << 24) | MinTreeNodeClass.LIST,


    /**
     * An array object declaration of the form
     *
     * >```
     * > \[ [ expression | elision ]* \]
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     *
     */

    ArrayLiteral = (4 << 24),


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

    ArrowFunction = (5 << 24) | MinTreeNodeClass.FUNCTION | MinTreeNodeClass.EXPRESSION,


    /**
     * Expression of the form
     * 
     * >```
     * >[ member | identifier ] = expression
     * >```
     * 
     * Extended members are:
     * 1. **`identifier`**
     * 2. **`expression`**
     */

    AssignmentExpression = (6 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
     * An expression of the form
     *
     * >```
     * > await expression
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     */

    AwaitExpression = (7 << 24) | MinTreeNodeClass.EXPRESSION,


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

    BindingExpression = (8 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
     * A binary expression of one of the forms
     *
     * >```
     * > expression | expression
     * > expression & expression
     * > expression ^ expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 1. **`right`**
     *
     */

    BitwiseExpression = (9 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
     * Statement of the form
     *
     * >```
     * > { statement_list }
     * >```
     *
     * Extended member is:
     * 1. **`statement_list`**
     *
     */

    BlockStatement = (10 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * Literally one of the keywords `true` or `false`
     *
     * >```
     * > [ true | false ]
     * >```
     *
     *
     * This node has the regular property
     * @property {boolean} value
     * 
     */

    BooleanLiteral = (11 << 24) | MinTreeNodeClass.LITERAL,


    /**
     * Statement of the form:
     *
     * >```
     * > break identifier? ;
     * >```
     *
     * Extended member is:
     * 1. **`identifier`**
     *
     */

    BreakStatement = (12 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * Expression of the form:
     *
     * >```
     * > [ member | identifier ] arguments
     * >```
     *
     * Extended members are:
     * 1. **`identifier`**
     * 1. **`arguments`**
     */

    CallExpression = (13 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
     * Expression of the form:
     *
     * >```
     * > [ member | identifier ]  arguments
     * >```
     *
     * Extended members are:
     * 1. **`identifier`**
     * 1. **`arguments`**
     */
    CallMemberExpression = (14 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
     * Block expression of the form:
     *
     * >```
     * > { [ case_clauses* | default_clause ] } 
     * >```
     *
     * Extended member is:
     * 1. **`clauses`**
     *
     * Found only as sub-node of `SwitchStatements`
     * 
     * MinTreeNodeClass Flags:
     * - BLOCK
     */

    CaseBlock = (15 << 24) | MinTreeNodeClass.BLOCK,


    /**
     * Switch clause of the form:
     *
     * >```
     * > case expression  :  statement_list?
     * >```
     *
     * Extended members are:
     * 1. **`case_expression`**
     * 2. **`statements`**
     *
     */

    CaseClause = (16 << 24),


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

    CatchClause = (17 << 24) | MinTreeNodeClass.BLOCK,


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

    Class = (18 << 24) | MinTreeNodeClass.CLASS | MinTreeNodeClass.STATEMENT,


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

    ComputedProperty = (19 << 24) | MinTreeNodeClass.PROPERTY_NAME,


    /**
     * Statement of the form
     *
     * >```
     * > continue identifier? ;
     * >```
     *
     * Extended members are:
     * 1. **`identifier`**
     */

    ContinueStatement = (20 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * A ternary expression of the form
     *
     * >```
     * > expression ? expression : expression
     * >```
     *
     * Extended members are:
     * 1. **`condition`**
     * 1. **`pass_expression`**
     * 1. **`fail_expression`**
     * 
     */

    ConditionalExpression = (21 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.TERNARY_EXPRESSION,


    /**
     * Statement of the form
     *
     * >```
     * > debugger ;
     * >```
     *
     * This node has no extended members;
     *
     */

    DebuggerStatement = (22 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * Expression of the form
     *
     * >```
     * > delete expression
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     *
     */

    DeleteExpression = (23 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
     * Statement of the form:
     *
     * >```
     * > do statement  while ( expression );
     * >```
     *
     * Extended members are:
     * 1. **`statement`**
     * 1. **`expression`**
     */

    DoStatement = (24 << 24) | MinTreeNodeClass.STATEMENT,

    /**
    * A comma or series of commas of the form:
    *
    * >```
    * > ,+
    * >```
    *
    * This node has no extended members.
    * 
    * This node has the regular member:
    * - @property {number} count - The number of commas this elision node represents.
    */

    Elision = (25 << 24),

    /**
     * Statement of the form
     *
     * >```
     * > ;
     * >```
     *
     * This node has no extended members
     *
     */

    EmptyStatement = (26 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * A binary expression of one of the forms:
     *
     * >```
     * > expression == expression
     * > expression != expression
     * > expression === expression
     * > expression !=== expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */

    EqualityExpression = (27 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.BINARY_EXPRESSION,


    /**
     * A binary expression of the form
     *
     * >```
     * > expression ** expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */

    ExponentiationExpression = (28 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.BINARY_EXPRESSION,


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

    ExportClause = (29 << 24),


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

    ExportDeclaration = (30 << 24) | MinTreeNodeClass.STATEMENT,


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

    ExpressionList = (31 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.LIST,



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

    ExpressionStatement = (32 << 24) | MinTreeNodeClass.STATEMENT,


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

    FinallyClause = (33 << 24),


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

    ForInStatement = (34 << 24) | MinTreeNodeClass.STATEMENT,


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

    ForOfStatement = (35 << 24) | MinTreeNodeClass.STATEMENT,


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

    ForStatement = (36 << 24) | MinTreeNodeClass.STATEMENT,


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

    FormalParameters = (37 << 24) | MinTreeNodeClass.LIST,



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

    FromClause = (38 << 24),


    /**
     * A function declaration of the form:
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

    FunctionDeclaration = (39 << 24) | MinTreeNodeClass.FUNCTION | MinTreeNodeClass.STATEMENT,

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

    FunctionExpression = (40 << 24) | MinTreeNodeClass.FUNCTION | MinTreeNodeClass.EXPRESSION,

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

    GetterMethod = (41 << 24) | MinTreeNodeClass.METHOD,


    /**
     * Identifier literal used as a reference, of the form:
     *
     * >```
     * > identifier
     * >```
     *
     * This node does not have extended members.
     * 
     * This node has the regular property:
     *
     * - @property {string} value - The name of the identifier
     */

    Identifier = (42 << 24) | MinTreeNodeClass.IDENTIFIER,

    /**
     * Identifier literal used as a reference, of the form:
     *
     * >```
     * > identifier
     * >```
     *
     * This node does not have extended members.
     * 
     * This node has the regular property:
     *
     * - @property {string} value - The name of the identifier
     */

    IdentifierReference = (43 << 24) | MinTreeNodeClass.VARIABLE | MinTreeNodeClass.IDENTIFIER,


    /**
     * Identifier literal used in binding expressions, of the form:
     *
     * >```
     * > identifier
     * >```
     *
     * This node does not have extended members.
     *
     * This node has the regular property:
     *
     * - @property {string} value - The name of the identifier
     */

    IdentifierBinding = (44 << 24) | MinTreeNodeClass.VARIABLE | MinTreeNodeClass.IDENTIFIER,

    /**
     * Identifier literal used as a label in Break, Continue, and LabelStatements; of the form:
     *
     * >```
     * > identifier
     * >```
     *
     * This node does not have extended members.
     * 
     * This node has the regular property:
     *
     * - @property {string} value - The name of the identifier
     */

    IdentifierLabel = (45 << 24) | MinTreeNodeClass.IDENTIFIER,

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

    IfStatement = (46 << 24) | MinTreeNodeClass.STATEMENT,


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

    ImportClause = (47 << 24),


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

    ImportDeclaration = (48 << 24) | MinTreeNodeClass.STATEMENT,


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

    InExpression = (49 << 24),


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

    InstanceOfExpression = (50 << 24),


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

    LabeledStatement = (51 << 24) | MinTreeNodeClass.STATEMENT,



    /**
     * Lexical declaration used in the initialization field of `for` statements.
     * ```
     * ... for( { ( let | const ) ( BindingExpression ) (, BindingExpression )* } ;... 
     * ```
     * Extended members is:
     * 1. **`bindings`**
     * 
     * Found only as a subnode of `ForStatements`
     */

    LexicalBinding = (52 << 24),



    /**
     * Lexical Scoped variable declaration statement beginning with `let` or `const`.
     * ```
     *  ( let | const ) binding_expression (, binding_expression )* ;
     * ```
     * 
     * Extended members is:
     * 1. **`bindings`**
     * 
     *
     */

    LexicalDeclaration = (53 << 24) | MinTreeNodeClass.STATEMENT,



    /**
     * A binary expression of one of the forms
     *
     * >```
     * > expression || expression
     * > expression && expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */

    LogicalExpression = (54 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.BINARY_EXPRESSION,



    /**
     * An object member access expression using the forms
     * 
     * >```
     * >primary_expression .  primary_expression
     * >```
     * >or
     * >```
     * >primary_expression [ primary_expression ]
     * >```
     * 
     * Extended members are:
     * 1. 'object'        = nodes[0]
     * 2. 'property'      = nodes[1]
     * 
     * If original parsed expression was in the latter form then the property `COMPUTED` will be set to true.
     *
     */

    MemberExpression = (55 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.VARIABLE,


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

    Method = (56 << 24),


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

    ModuleSpecifier = (57 << 24),


    /**
     * Binary expression of one of the forms:
     *
     * >```
     * > expression * expression
     * > expression / expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 1. **`right`**
     * 
     */

    MultiplicativeExpression = (58 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.BINARY_EXPRESSION,


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

    NameSpaceImport = (59 << 24),


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

    NamedImports = (60 << 24),


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

    NewExpression = (61 << 24) | MinTreeNodeClass.EXPRESSION,


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

    NewInstanceExpression = (62 << 24) | MinTreeNodeClass.EXPRESSION,


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

    NewTarget = (63 << 24),


    /**
     * Literally null, of the form:
     *
     * >```
     * > null
     * >```
     *
     * This node has no extended members.
     */

    NullLiteral = (64 << 24) | MinTreeNodeClass.LITERAL,


    /**
     * A literal number 
     *
     * >```
     * > number
     * >```
     *
     * This node has no extended members.
     * 
     * This node has the regular properties:
     * - @property {string} value - The original parsed value;
     * - @property {number} computed_value - The value of original parsed value transformed into a float;
     */

    NumericLiteral = (65 << 24) | MinTreeNodeClass.LITERAL,


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

    ObjectLiteral = (66 << 24) | MinTreeNodeClass.LITERAL,


    /**
     * Expression of the form:
     * ```
     * ( expression )
     * ```
     * 
     * Extended members are:
     * 'expression' = nodes[0]
     */

    Parameters = (67 << 24) | MinTreeNodeClass.LIST,


    /**
     * Expression of the form 
     *
     * >```
     * > ( expression )
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     * 
     */

    Parenthesized = (68 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
     * Expression of one of the forms:
     *
     * >```
     * > expression ++
     * >
     * > expression --
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     *
     */

    PostExpression = (69 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,


    /**
     * Expression of one of the forms:
     *
     * >```
     * > ++ expression
     * >
     * > -- expression
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     *
     */

    PreExpression = (70 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,


    /**
     * A binding of the form:
     *
     * >```
     * > identifier : expression
     * >```
     *
     * Extended members are:
     * 1. **`identifier`**
     * 2. **`expression`**
     * 
     */

    PropertyBinding = (71 << 24),


    /**
     * A Regular Expression literal of the form:
     *
     * >```
     * > / string_data / identifer
     * >```
     *
     * Extended members are:
     * 1. **expression_string**
     * 1. **meta**
     * 
     */

    RegexLiteral = (72 << 24) | MinTreeNodeClass.LITERAL,


    /**
     * A binary expression of one of the forms:
     *
     * >```
     * > expression < expression
     * > expression > expression
     * > expression <= expression
     * > expression >= expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */

    RelationalExpression = (73 << 24) | MinTreeNodeClass.EXPRESSION,


    /**
    * Statement of the form:
    *
    *>```
    *> return expression?;
    *>```
    *
    * Extended members are
    * 1. 'expression'
    *
    */

    ReturnStatement = (74 << 24) | MinTreeNodeClass.STATEMENT,



    /**
     * The root node of a JS file. 
     */

    Script = (75 << 24),


    /**
     * A method declaration of the form
     * ```
     * set ( binding )  { body }
     * ```
     * 
     * Extended members are:
     * 1. `binding`
     * 2. `body`
     */

    SetterMethod = (76 << 24) | MinTreeNodeClass.METHOD,


    /**
     * A binary expression of one of the forms:
     *
     * >```
     * > expression << expression
     * > expression >> expression
     * > expression >>> expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */

    ShiftExpression = (77 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.BINARY_EXPRESSION,



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

    Specifier = (78 << 24),


    /**
     * Expression of the form
     *
     * >```
     * > ... expression
     * >```
     *
     * Extended member is:
     * @property {MinTreeNode} expression **`expression`**
     *
     */

    SpreadExpression = (79 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,


    /**
     * String literal with one of the forms
     *
     * >```
     * > ' * '
     * > " * "
     * >```
     *
     * This node has no extended members.
     *
     * 
     * The node has the regular members: 
     * @property {string} value - The string of characters found between the quotes.
     * @property {string} quote_type - A string with a value of either `"` or `'`
     */

    StringLiteral = (80 << 24) | MinTreeNodeClass.LITERAL,


    /**
     * Expression of the form:
     *
     * >```
     * > super arguments
     * >```
     *
     * Extended member is:
     * 1. **`arguments`**
     * 
     */

    SuperCall = (81 << 24) | MinTreeNodeClass.EXPRESSION,


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

    SuperExpression = (82 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,


    /**
     * Statement of the form
     *
     * >```
     * > switch (expression ) case_block
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     * 2. **`case_block`**
     * 
     */

    SwitchStatement = (83 << 24) | MinTreeNodeClass.STATEMENT,


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

    Template = (84 << 24) | MinTreeNodeClass.LITERAL | MinTreeNodeClass.TEMPLATE,


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

    TemplateHead = (85 << 24),


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

    TemplateMiddle = (86 << 24),


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

    TemplateTail = (87 << 24),


    /**
     * Literally `this` of the form:
     *
     * >```
     * > this
     * >```
     *
     * This node has no extended members.
     */

    ThisLiteral = (88 << 24) | MinTreeNodeClass.LITERAL,


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

    ThrowStatement = (89 << 24) | MinTreeNodeClass.STATEMENT,


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

    TryStatement = (90 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * Expression of the form:
     *
     * >```
     * > typeof expression
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     *
     */

    TypeofExpression = (91 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,


    /**
     * Expression of one of the forms:
     *
     * >```
     * > + expression
     * > - expression
     * > ~ expression
     * > ! expression
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     * 
     */

    UnaryExpression = (92 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,


    /**
     * Statement of the form
     *
     * >```
     * > var binding [, binding]* ;
     * >```
     *
     * This node does not have extended members.
     * 
     */

    VariableStatement = (93 << 24) | MinTreeNodeClass.STATEMENT | MinTreeNodeClass.LIST,


    /**
     * Declaration of the form
     *
     * >```
     * > var binding (, binding)*
     * >```
     *
     * This node does not have extended members.
     * 
     * This node is only found as a subnode of `ForStatements`.
     * 
     */

    VariableDeclaration = (94 << 24) | MinTreeNodeClass.LIST,


    /**
     * TExpression of the form
     *
     * >```
     * > void expression
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     * 
     */

    VoidExpression = (95 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,


    /**
     * Statement loop of the form
     *
     * >```
     * > while ( expression ) statement
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     * 2. **`statement`**
     *
     */

    WhileStatement = (96 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * Statement of the form
     *
     * >```
     * > with ( expression ) statement
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     * 2. **`statement`**
     * 
     */

    WithStatement = (97 << 24) | MinTreeNodeClass.STATEMENT,


    /**
     * Expression of the form 
     *
     * >```
     * > yield expression
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     */

    YieldExpression = (98 << 24) | MinTreeNodeClass.EXPRESSION | MinTreeNodeClass.UNARY_EXPRESSION,
}
