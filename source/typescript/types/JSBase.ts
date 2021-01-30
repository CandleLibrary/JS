import { JSNodeType } from "./node_type";

type NodeID =
    JSNodeType.Module
    | JSNodeType.AdditiveExpression
    | JSNodeType.Arguments
    | JSNodeType.ArrayLiteral
    | JSNodeType.ArrowFunction
    | JSNodeType.AssignmentExpression
    | JSNodeType.AwaitExpression
    | JSNodeType.BindingExpression
    | JSNodeType.BitwiseExpression
    | JSNodeType.BlockStatement
    | JSNodeType.BooleanLiteral
    | JSNodeType.BreakStatement
    | JSNodeType.CallExpression
    | JSNodeType.CaseBlock
    | JSNodeType.CaseClause
    | JSNodeType.CatchClause
    | JSNodeType.Class
    | JSNodeType.ClassDeclaration
    | JSNodeType.ClassExpression
    | JSNodeType.ComputedProperty
    | JSNodeType.ContinueStatement
    | JSNodeType.ConditionalExpression
    | JSNodeType.DebuggerStatement
    | JSNodeType.DefaultClause
    | JSNodeType.DeleteExpression
    | JSNodeType.DoStatement
    | JSNodeType.Elision
    | JSNodeType.EmptyStatement
    | JSNodeType.EqualityExpression
    | JSNodeType.ExponentiationExpression
    | JSNodeType.ExportClause
    | JSNodeType.ExportDeclaration
    | JSNodeType.ExpressionList
    | JSNodeType.ExpressionStatement
    | JSNodeType.FinallyClause
    | JSNodeType.ForInStatement
    | JSNodeType.ForOfStatement
    | JSNodeType.ForStatement
    | JSNodeType.FormalParameters
    | JSNodeType.FromClause
    | JSNodeType.FunctionBody
    | JSNodeType.FunctionDeclaration
    | JSNodeType.FunctionExpression
    | JSNodeType.GetterMethod
    | JSNodeType.Identifier
    | JSNodeType.IdentifierName
    | JSNodeType.IdentifierProperty
    | JSNodeType.IdentifierDefault
    | JSNodeType.IdentifierModule
    | JSNodeType.IdentifierReference
    | JSNodeType.IdentifierReferenceProperty
    | JSNodeType.IdentifierBinding
    | JSNodeType.IdentifierLabel
    | JSNodeType.IfStatement
    | JSNodeType.ImportClause
    | JSNodeType.ImportDeclaration
    | JSNodeType.InExpression
    | JSNodeType.InstanceOfExpression
    | JSNodeType.LabeledStatement
    | JSNodeType.LexicalBinding
    | JSNodeType.LexicalDeclaration
    | JSNodeType.LogicalExpression
    | JSNodeType.MemberExpression
    | JSNodeType.Method
    | JSNodeType.MultiplicativeExpression
    | JSNodeType.NameSpaceImport
    | JSNodeType.NamedImports
    | JSNodeType.NewExpression
    | JSNodeType.NewInstanceExpression
    | JSNodeType.NewTarget
    | JSNodeType.NullLiteral
    | JSNodeType.NumericLiteral
    | JSNodeType.BigIntLiteral
    | JSNodeType.ObjectLiteral
    | JSNodeType.Parenthesized
    | JSNodeType.PostExpression
    | JSNodeType.PreExpression
    | JSNodeType.PropertyBinding
    | JSNodeType.RegexLiteral
    | JSNodeType.RelationalExpression
    | JSNodeType.ReturnStatement
    | JSNodeType.Script
    | JSNodeType.SetterMethod
    | JSNodeType.ShiftExpression
    | JSNodeType.Specifier
    | JSNodeType.SpreadExpression
    | JSNodeType.Spread
    | JSNodeType.StringLiteral
    | JSNodeType.SuperCall
    | JSNodeType.SuperExpression
    | JSNodeType.SwitchStatement
    | JSNodeType.Template
    | JSNodeType.TemplateHead
    | JSNodeType.TemplateMiddle
    | JSNodeType.TemplateTail
    | JSNodeType.ThisLiteral
    | JSNodeType.ThrowStatement
    | JSNodeType.TryStatement
    | JSNodeType.TypeofExpression
    | JSNodeType.UnaryExpression
    | JSNodeType.VariableStatement
    | JSNodeType.VariableDeclaration
    | JSNodeType.VoidExpression
    | JSNodeType.WhileStatement
    | JSNodeType.WithStatement
    | JSNodeType.YieldExpression
    | JSNodeType.ObjectBinding
    | JSNodeType.ArrayBinding
    | JSNodeType.OptionalMemberExpression
    | JSNodeType.OptionalChain
    | JSNodeType.CoalesceExpression;

export interface JSNodeBase {
    /**
     * An numeric identifier that encodes the
     * unique node type and additional meta class
     * information in a 32bit integer.
     *
     * The unique node type is stored in the upper 9
     * bits, and class flags are stored in the lower
     * 23 bits:
     *
     * ```bash
     * #31     24      16      8       0#
     * #|      |       |       |       |#
     * #--------------------------------#
     *  \       /\                     /
     *   \_ID__/  \_______CLASS_______/
     *      |        Mask:0x7FFFFFFF
     *  Mask:0xFF800000
     * ```
     * ----
     *
     * This allows filtering classes of nodes using
     * JSNodeClass masks
     *
     * ```typescript
     * const IS_NODE_DECLARATION =
     *      (node.type & JSNodeClass.DECLARATION ) < 0
     *
     * ```
     *
     *
     *
     */
    type: JSNodeType;

    /**
     * Children nodes
     */
    nodes?: JSNodeBase[];

    /**
     * Information on the character segment enclosed
     * by this node.
     */
    pos?: {
        line: number;
        column: number;
        offset: number;
        length: number;
    };
}

export interface JSClauseBase extends JSNodeBase { }
export interface JSExpressionBase extends JSNodeBase { }

export interface JSDeclarationBase extends JSStatementBase { }

/**
 * Unary, Binary, and Ternary operators
 */
export interface JSOperatorBase extends JSExpressionBase {
    /**
     * Optional symbol for operators that contain multiple operator symbol forms
     */
    symbol?: string;
}
export interface JSStatementBase extends JSNodeBase { }
export interface JSIdentifierBase extends JSExpressionBase {
    type: JSNodeType;
    nodes: never;
    value: string;
}

/**
 * Nodes that do not have any children. Represent core
 * indivisible values such as Null, Boolean, Number, and BigInt
 */

export interface JSPrimitiveBase extends JSExpressionBase {
    value?: string | number | boolean;
    nodes: never;
}

export interface JSModuleBase extends JSNodeBase { }

export type JSBaseClass = JSNodeBase
    | JSStatementBase
    | JSModuleBase
    | JSExpressionBase
    | JSDeclarationBase
    | JSOperatorBase
    | JSIdentifierBase
    | JSPrimitiveBase;