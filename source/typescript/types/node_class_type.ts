// ######################################################################
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Max Class value CANNOT be greater than 1<<19 for interop with cfw.wick.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// ######################################################################
export enum JSNodeClass {
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
    IDENTIFIER = 1 << 15,

    /**
     * Any node that assigns a value to variable or object member.
     */
    ASSIGNMENT = 1 << 16,
    /**
     * Any node that assigns a value to variable or object member.
     */
    DECLARATION = 1 << 17,

    /**
     * Any node that is hoisted when declared
     */
    HOISTABLE_DECLARATION = 1 << 18
}



