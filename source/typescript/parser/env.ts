//import { ParserEnvironment } from "@candlelib/hydrocarbon";
import { Lexer } from "@candlelib/wind";

import { JSNodeClass } from "../types/node_class_type.js";
import { JSNodeTypeLU } from "../types/node_type_lu.js";
import { JSNodeType } from "../types/node_type";
import { JSNode } from "../types/JSNode.js";

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
type JSParserEnv = {
    ASI: boolean;
    /**
     * Test
     */
    typ: any;
    cls: any;
    /**
     * Array used to store comment Lexer's that 
     * are encountered while parsing an input.
     */
    comments: Lexer[];

    functions: {
        parseString: (a, b, lex: Lexer) => void,
        parseTemplate: (a, b, lex: Lexer) => void,
        reinterpretArrowParameters: (_: any, symbol: any) => JSNode;
        reinterpretParenthesized: (_: any, symbol: any) => JSNode;
    };
};

export { JSParserEnv };

const env = <JSParserEnv>{
    ASI: true,
    typ: JSNodeTypeLU,
    cls: { PROPERTY_NAME: JSNodeClass.PROPERTY_NAME },
    comments: [],
    functions: {
        parseIdentifier: (a, b, lex: Lexer) => {

            const IWScache = lex.IWS;

            lex.IWS = false;

            const pk = lex.copy();

            while (pk.ty == lex.types.id || pk.tx == "_" || pk.tx == "$") {
                pk.next();
            }

            lex.tl = pk.off - lex.off;

            lex.IWS = IWScache;

            // console.log(`[${lex.tx}]`);
        },
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

        parseRegex: (a, b, lex) => {
            const FLAG_CACHE = lex.CHARACTERS_ONLY;

            lex.CHARACTERS_ONLY = true;

            const pk = lex.pk,
                end = "/";

            lex.next();

            while (!pk.END && pk.tx != end) {
                if (pk.tx == "\\")
                    pk.next();
                pk.next();
            }

            lex.tl = pk.off - lex.off;

            lex.CHARACTERS_ONLY = FLAG_CACHE;
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

        reinterpretArrowParameters: (_, symbols) => {


            const
                node = <JSNode>symbols[0],
                sub = node.nodes[0];

            node.type = JSNodeType.FormalParameters;

            if (sub && sub.type == JSNodeType.ExpressionList)
                node.nodes = [...sub.nodes, ...node.nodes.slice(1)];

            ConvertArrowParameters(node);

            return node;
        },

        reinterpretParenthesized: (_, symbols) => {

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

        frrh: (tk, env: JSParserEnv, output, lex: Lexer, prv_lex, ss, lu, stack_pointer) => {

            const start = lex.copy();

            let t = -1;

            /*shebang*/
            if (lex.off == 0 && lex.tx == "#" && lex.pk.tx == "!") {
                while (lex.ty != lex.types.new_line && !lex.END)
                    lex.next();

                t = lu(lex.next());
            }
            else if (lex.tx == "//" || lex.tx == "/*") {
                /* Comments */
                if (lex.tx == "//") {
                    while (!lex.END && lex.ty !== lex.types.nl)
                        lex.next();

                    //  lex.tl = 0;
                    //  lex.line--;

                    start.fence(lex);

                    env.comments.push(start);

                    t = lu(lex);
                } else {
                    const FLAG_CACHE = lex.CHARACTERS_ONLY;

                    lex.CHARACTERS_ONLY = true;

                    if (lex.tx == "/*") {

                        //@ts-ignore
                        while (!lex.END && (lex.tx !== "*" || lex.pk.tx !== "/"))
                            lex.next();
                        lex.next(); //"*"
                    }

                    start.fence(lex);

                    env.comments.push(start);

                    lex.CHARACTERS_ONLY = FLAG_CACHE;

                    t = lu(lex.next());
                }
            }

            return t;

        },

        lrrh: (tk, env: JSParserEnv, output, lex, prv_lex, ss, lu) => {


            /*Automatic Semicolon Insertion*/
            if (env.ASI && lex.tx !== ")" && !lex.END) {

                let ENCOUNTERED_END_CHAR = (lex.tx == "}" || lex.END || lex.tx == "<");

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

            if (lex.END) {
                lex.tl = 0;
                return lu(<Lexer>{ tx: ";" });
            }

            return -1;
        }
    },

    options: {
        integrate: false,
        onstart: (env: JSParserEnv) => {
            env.comments = [];
            env.ASI = true;
        }
    }
};

export default env;