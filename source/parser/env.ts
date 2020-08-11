import { ParserEnvironment } from "@candlefw/hydrocarbon/build/library/runtime";
import { Lexer } from "@candlefw/wind";

import { JSNodeClass } from "../types/node_class_type.js";
import { JSNodeTypeLU } from "../types/node_type_lu.js";
import { JSNodeType } from "../types/node_type";
import { JSNode } from "../types/node.js";

function ConvertArrowParameters(node: JSNode) {
    for (const sub of node.nodes) {

        const type = sub.type;

        if (type == JSNodeType.SpreadExpression) {
        } else if (type & JSNodeClass.IDENTIFIER) {
            sub.type = JSNodeType.IdentifierBinding;
        } else if (type == JSNodeType.AssignmentExpression
            && sub.nodes[0].type & JSNodeClass.IDENTIFIER) {
            sub.nodes[0].type = JSNodeType.IdentifierBinding;
        } else if (type == JSNodeType.ObjectLiteral || type == JSNodeType.ArrayLiteral) { } else
            sub.pos.throw(`Unexpected ${JSNodeTypeLU[sub.type]} in arrow function parameters`);
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
        reinterpretArrowParameters: (symbol: any) => JSNode;
        reinterpretParenthesized: (symbol: any) => JSNode;
        buildJSAST: (node: JSNode) => JSNode;
    };
};
export { JSParserEnv };
const env = <JSParserEnv>{
    ASI: true,
    typ: JSNodeTypeLU,
    cls: { PROPERTY_NAME: JSNodeClass.PROPERTY_NAME },
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
                node = <JSNode>symbols[0],
                sub = node.nodes[0];

            node.type = JSNodeType.FormalParameters;

            if (sub && sub.type == JSNodeType.ExpressionList)
                node.nodes = [...sub.nodes, ...node.nodes.slice(1)];

            ConvertArrowParameters(node);

            return node;
        },

        reinterpretParenthesized: (symbols) => {

            const
                node = <JSNode>symbols[0],
                sub = node.nodes[0];

            if (!sub)
                throw {};

            if (node.nodes.length > 1)
                node.nodes[1].pos.throw(`Unexpected ${JSNodeTypeLU[node.nodes[1].type]}`);

            if (sub.type == JSNodeType.Spread)
                sub.pos.throw(`Unexpected ${JSNodeTypeLU[sub.type]}`);

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