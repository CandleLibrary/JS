import { JSNodeClass } from "./node_class_type";


export const enum JSNodeType {
    /**
     * A Script node that has at least one export or import statement;
     */
    Module = (0 << 23) | JSNodeClass.MODULE,


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
    AdditiveExpression = (1 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


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
    AssignmentExpression = (5 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.ASSIGNMENT,


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
    AwaitExpression = (6 << 23) | JSNodeClass.EXPRESSION,


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
    BindingExpression = (7 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.ASSIGNMENT,


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
    BitwiseExpression = (8 << 23) | JSNodeClass.EXPRESSION,


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
    BlockStatement = (9 << 23) | JSNodeClass.STATEMENT | JSNodeClass.BLOCK,


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
    BooleanLiteral = (10 << 23) | JSNodeClass.LITERAL,


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
    BreakStatement = (11 << 23) | JSNodeClass.STATEMENT,


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
    CallExpression = (12 << 23) | JSNodeClass.EXPRESSION,

    /**
     * Block expression of the form:
     *
     * >```
     * > { [ case_clauses ]* default_clause? [ case_clauses ]* }
     * >```
     *
     * This node does not have any extended members
     *
     * Found only as sub-node of `SwitchStatements`
     *
     * JSNodeClass Flags:
     * - BLOCK
     */
    CaseBlock = (13 << 23) | JSNodeClass.BLOCK,


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
    Class = (16 << 23) | JSNodeClass.CLASS | JSNodeClass.STATEMENT,


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
    ContinueStatement = (18 << 23) | JSNodeClass.STATEMENT,


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
    ConditionalExpression = (19 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.TERNARY_EXPRESSION,


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
    DebuggerStatement = (20 << 23) | JSNodeClass.STATEMENT,

    /**
     * Switch clause of the form:
     *
     * >```
     * > default : statement_list?
     * >```
     *
     * Extended members are:
     * 1. **`case_expression`**
     * 2. **`statements`**
     *
     */
    DefaultClause = (21 << 23),

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
    DeleteExpression = (22 << 23) | JSNodeClass.EXPRESSION,


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
    EmptyStatement = (25 << 23) | JSNodeClass.STATEMENT,


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
    EqualityExpression = (26 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


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
    ExportDeclaration = (29 << 23) | JSNodeClass.STATEMENT | JSNodeClass.MODULE,


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
    ExpressionStatement = (31 << 23) | JSNodeClass.STATEMENT,


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
    FinallyClause = (32 << 23),


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
    ForInStatement = (33 << 23) | JSNodeClass.STATEMENT | JSNodeClass.BLOCK,


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
    ForOfStatement = (34 << 23) | JSNodeClass.STATEMENT | JSNodeClass.BLOCK,


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
    FunctionDeclaration = (39 << 23) | JSNodeClass.FUNCTION | JSNodeClass.STATEMENT,

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
    FunctionExpression = (40 << 23) | JSNodeClass.FUNCTION | JSNodeClass.EXPRESSION,

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
    Identifier = (42 << 23) | JSNodeClass.IDENTIFIER,

    /**
     * See `Identifier`
     */
    IdentifierName = Identifier,

    /**
     * Identifier literal used as a module reference. This is either as the name of an exported
     * object, or the name of an imported object.
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
    IdentifierProperty = Identifier | JSNodeClass.IDENTIFIER | JSNodeClass.PROPERTY_NAME,

    /**
     * Identifier literal used as a module reference. This is either as the name of an exported
     * object, or the name of an imported object.
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
    IdentifierDefault = (43 << 23) | JSNodeClass.IDENTIFIER | JSNodeClass.MODULE,


    /**
     * Identifier literal used as a module reference. This is either as the name of an exported
     * object, or the name of an imported object.
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
    IdentifierModule = (44 << 23) | JSNodeClass.IDENTIFIER | JSNodeClass.MODULE,

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
    IdentifierReference = ((45 << 23) | JSNodeClass.VARIABLE | JSNodeClass.IDENTIFIER),


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
    IdentifierBinding = (46 << 23) | JSNodeClass.VARIABLE | JSNodeClass.IDENTIFIER,

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
    IdentifierLabel = (47 << 23) | JSNodeClass.IDENTIFIER,

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
    ImportDeclaration = (50 << 23) | JSNodeClass.STATEMENT | JSNodeClass.MODULE,


    /**
     * TODO Description:
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
    InExpression = (51 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


    /**
     * A binary expression of the form:
     *
     * >```javascript
     * > expression instanceof expression
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */
    InstanceOfExpression = (52 << 23) | JSNodeClass.BINARY_EXPRESSION | JSNodeClass.EXPRESSION,


    /**
     * Statement of the form:
     *
     * >```javascript
     * > identifier :  ( statement | function_declaration )
     * >```
     *
     * Extended members are:
     * 1. **`label`**
     * 1. **`statement`**
     *
     */
    LabeledStatement = (53 << 23) | JSNodeClass.STATEMENT,



    /**
     * Lexical declaration used in the initialization field of `for` statements.
     * ```javascript
     * ( let | const )  binding_expression  [, binding_expression ]*
     * ```
     * Extended members is:
     * 1. **`bindings`**
     *
     * Found only as a subnode of `ForStatements`
     */
    LexicalBinding = (54 << 23),



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
    LexicalDeclaration = (55 << 23) | JSNodeClass.STATEMENT,



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
    LogicalExpression = (56 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,



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


    /**
     * Expression of the form:
     *
     * >```js
     * > new expression
     * >```
     *
     * The extended member is:
     * 1. **`expression`**
     *
     */
    NewExpression = (62 << 23) | JSNodeClass.EXPRESSION,


    /**
     * Expression of the form:
     *
     * >```js
     * > new (identifier | member_expression ) arguments
     * >```
     *
     * The extended member is:
     * 1. **`identifier`**
     *
     */
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


    /**
     * Literally null, of the form:
     *
     * >```javascript
     * > null
     * >```
     *
     * This node does not have extended members.
     */
    NullLiteral = (65 << 23) | JSNodeClass.LITERAL,


    /**
     * A literal number
     *
     * >```javascript
     * > number
     * >```
     *
     * This node does not have extended members.
     *
     * This node has the regular properties:
     * - @property {string} value - The original parsed value;
     * - @property {number} computed_value - The value of original parsed value transformed into a float;
     */
    NumericLiteral = (66 << 23) | JSNodeClass.LITERAL,


    /**
     * A literal large integer
     *
     * >```javascript
     * > #number n
     * >```
     *
     * This node does not have extended members.
     *
     * This node has the regular properties:
     * - @property {string} value - The original parsed value;
     * - @property {number} computed_value - The value of original parsed value transformed into a float;
     */
    BigIntLiteral = (67 << 23) | JSNodeClass.LITERAL,


    /**
     * An object literal declaration of the form
     *
     * >```javascript
     * > { PropertyBinding  [, PropertyBinding ]* }
     * >```
     *
     * Extended members are:
     * 1. **`properties`**
     */
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


    /**
     * Expression of the form
     *
     * >```javascript
     * > ( expression )
     * >```
     *
     * Extended member is:
     * 1. **`expression`**
     *
     */
    Parenthesized = (70 << 23) | JSNodeClass.EXPRESSION,


    /**
     * Expression of one of the forms:
     *
     * >```javascript
     * > expression ++
     * >
     * > expression --
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     *
     */
    PostExpression = (71 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,


    /**
     * Expression of one of the forms:
     *
     * >```javascript
     * > ++ expression
     * >
     * > -- expression
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     *
     */
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


    /**
     * A Regular Expression literal of the form:
     *
     * >```javascript
     * > / expression_string / meta
     * >```
     *
     * Extended members are:
     * 1. **expression_string**
     * 1. **meta**
     *
     */
    RegexLiteral = (74 << 23) | JSNodeClass.LITERAL,


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
    RelationalExpression = (75 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.BINARY_EXPRESSION,


    /**
    * Statement of the form:
    *
    *>```javascript
    *> return expression? ;
    *>```
    *
    * Extended members are
    * 1.  **expression** *(optional - may be `null`)*
    *
    */
    ReturnStatement = (76 << 23) | JSNodeClass.STATEMENT,



    /**
     * The root node of a JavaScript module or script.
     */
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


    /**
     * A binary expression of one of the forms:
     *
     * >```javascript
     * > left << right
     * > //or
     * > left >> right
     * > //or
     * > left >>> right
     * >```
     *
     * Extended members are:
     * 1. **`left`**
     * 2. **`right`**
     *
     */
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
    Specifier = (80 << 23),


    /**
     * Character sequence of the form
     *
     * >```
     * > ... expression
     * >```
     *
     * Extended member is:
     * @property {JSNode} expression **`expression`**
     *
     */
    Spread = (81 << 23),

    /**
     * TODO - remove the following
     */
    SpreadExpression = Spread,

    /**
     * String literal with one of the forms
     *
     * >```javascript
     * > ' value '
     * > //or
     * > " value "
     * >```
     *
     * This node does not have extended members.
     *
     * The node has the regular members:
     * @property {string} value - The string of characters found between the quotes.
     * @property {string} quote_type - A string with a value of either `"` or `'`
     */
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


    /**
     * Statement of the form
     *
     * >```
     * > switch (expression ) case_block
     * >```
     *
     * Extended members are:
     * 1. **`expression`**
     * 2. **`block`**
     *
     */
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


    /**
     * Literally `this` of the form:
     *
     * >```
     * > this
     * >```
     *
     * This node does not have extended members.
     */
    ThisLiteral = (90 << 23) | JSNodeClass.LITERAL,


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
    ThrowStatement = (91 << 23) | JSNodeClass.STATEMENT,


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
    TryStatement = (92 << 23) | JSNodeClass.STATEMENT,


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
    TypeofExpression = (93 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,


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
    UnaryExpression = (94 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,


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
    VariableStatement = (95 << 23) | JSNodeClass.STATEMENT | JSNodeClass.LIST,


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
    VariableDeclaration = (96 << 23) | JSNodeClass.LIST,


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
    VoidExpression = (97 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,


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
    WhileStatement = (98 << 23) | JSNodeClass.STATEMENT,


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
    WithStatement = (99 << 23) | JSNodeClass.STATEMENT,


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
    YieldExpression = (100 << 23) | JSNodeClass.EXPRESSION | JSNodeClass.UNARY_EXPRESSION,

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
    ObjectBinding = (101 << 23),

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
    ArrayBinding = (102 << 23)
}
