import { Token } from '@candlelib/hydrocarbon';
import { JSNodeType } from "./node_type";
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
     type: number;
     */

export interface JSNodeBase {

    nodes?: JSNodeBase[];
    pos?: Token;
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