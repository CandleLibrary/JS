import { MinTreeNodeType, MinTreeNodeClass } from "../types/mintree_node_type.js";
import { MinTreeNode } from "../types/mintree_node.js";
import { ParserEnvironment } from "@candlefw/hydrocarbon";
import { Lexer } from "@candlefw/wind";

function ConvertArrowParameters(node: MinTreeNode) {
    for (const sub of node.nodes) {

        const type = sub.type;

        if (type == MinTreeNodeType.SpreadExpression) {
        } else if (type & MinTreeNodeClass.IDENTIFIER) {
            sub.type = MinTreeNodeType.IdentifierBinding;
        } else if (type == MinTreeNodeType.AssignmentExpression
            && sub.nodes[0].type & MinTreeNodeClass.IDENTIFIER) {
            sub.nodes[0].type = MinTreeNodeType.IdentifierBinding;
        } else if (type == MinTreeNodeType.ObjectLiteral || type == MinTreeNodeType.ArrayLiteral) { } else
            sub.pos.throw(`Unexpected ${MinTreeNodeType[sub.type]} in arrow function parameters`);
    }
}
type JSParserEnv = ParserEnvironment & {
    ASI: boolean;
    /**
     * Test
     */
    typ: any;
    cls: any;
    functions: {
        parseString: (a, b, lex: Lexer) => void,
        parseTemplate: (a, b, lex: Lexer) => void,
        reinterpretArrowParameters: (symbol: any) => MinTreeNode;
        reinterpretParenthesized: (symbol: any) => MinTreeNode;
        buildJSAST: (node: MinTreeNode) => MinTreeNode;
    };
};
export { JSParserEnv };
const env = <JSParserEnv>{
    ASI: true,
    typ: MinTreeNodeType,
    cls: MinTreeNodeClass,
    functions: {
        parseTemplate: (a, b, lex: Lexer) => {
            const pk = lex.pk;

            lex.next();

            pk.symbol_map = lex.symbol_map;

            while (!pk.END && pk.tx != "`" && pk.tx != "${") {
                if (pk.tx == "\\")
                    pk.next();
                pk.next();
            }

            lex.tl = pk.off - lex.off;
        },

        parseString: (a, b, lex) => {

            const pk = lex.pk,
                end = lex.tx;

            lex.next();

            while (!pk.END && pk.tx != end) {
                if (pk.tx == "\\")
                    pk.next();
                pk.next();
            }

            lex.tl = pk.off - lex.off;
        },

        reinterpretArrowParameters: (symbols) => {


            const
                node = <MinTreeNode>symbols[0],
                sub = node.nodes[0];

            node.type = MinTreeNodeType.FormalParameters;

            if (sub && sub.type == MinTreeNodeType.ExpressionList)
                node.nodes = [...sub.nodes, ...node.nodes.slice(1)];

            ConvertArrowParameters(node);

            return node;
        },

        reinterpretParenthesized: (symbols) => {

            const
                node = <MinTreeNode>symbols[0],
                sub = node.nodes[0];

            if (!sub)
                throw {};

            if (node.nodes.length > 1)
                node.nodes[1].pos.throw(`Unexpected ${MinTreeNodeType[node.nodes[1].type]}`);

            if (sub.type == MinTreeNodeType.Spread)
                sub.pos.throw(`Unexpected ${MinTreeNodeType[sub.type]}`);

            return node;
        },


        buildJSAST(node) {
            return node;
        },

        defaultError: (tk, env: JSParserEnv, output, lex, prv_lex, ss, lu) => {
            //Comments
            const t = lex.copy();
            if (lex.tx == "//" || lex.tx == "/*") {
                if (lex.tx == "//") {
                    while (!lex.END && lex.ty !== lex.types.nl)
                        lex.next();

                    if (lex.END) {
                        lex.tl = 0;
                        return 0;//lu({ tx: ";" });
                    }
                } else
                    if (lex.tx == "/*") {
                        //@ts-ignore
                        while (!lex.END && (lex.tx !== "*" || lex.pk.tx !== "/"))
                            lex.next();
                        lex.next(); //"*"
                    }

                return lu(lex.next());
            }

            /*USED for Automatic Semicolon Insertion*/
            if (env.ASI && lex.tx !== ")" && !lex.END) {

                let ENCOUNTERED_END_CHAR = (lex.tx == "}" || lex.END);

                while (!ENCOUNTERED_END_CHAR && !prv_lex.END && prv_lex.off < lex.off) {
                    prv_lex.next();
                    if (prv_lex.ty == prv_lex.types.nl)
                        ENCOUNTERED_END_CHAR = true;
                }

                if (ENCOUNTERED_END_CHAR) {
                    lex.tl = 0;
                    return lu(<Lexer>{ tx: ";" });
                }
            }

            if (lex.ty == lex.types.sym && lex.tx.length > 1) {
                //Try splitting up the symbol
                lex.tl = 0;
                lex.next(lex, false);
                return lu(lex);
            }

            if (lex.END) {
                lex.tl = 0;
                return lu(<Lexer>{ tx: ";" });
            }

        }
    },

    options: {
        integrate: false,
        onstart: () => {
            env.ASI = true;
        }
    }
};

export default env;