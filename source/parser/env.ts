const env = {
    table: {},
    ASI: true,
    functions: {

        buildJSAST(node){
            return node;
        },

        defaultError: (tk, env, output, lex, prv_lex, ss, lu) => {
            
            if (lex.tx == "//" || lex.tx == "/*") {
                if (lex.tx == "//") {
                    while (!lex.END && lex.ty !== lex.types.nl)
                        lex.next();
                } else
                if (lex.tx == "/*") {
                    while (!lex.END && (lex.tx !== "*" || lex.pk.tx !== "/"))
                        lex.next();
                    lex.next(); //"*"
                }

                return lu(lex.next());
            }

            /*USED for ASI*/
            if (env.ASI && lex.tx !== ")" && !lex.END) {

                let ENCOUNTERED_END_CHAR = (lex.tx == "}" || lex.END);

                while (!ENCOUNTERED_END_CHAR && !prv_lex.END && prv_lex.off < lex.off) {
                    prv_lex.next();
                    if (prv_lex.ty == prv_lex.types.nl)
                        ENCOUNTERED_END_CHAR = true;
                }

                if (ENCOUNTERED_END_CHAR) {
                    lex.tl = 0;
                    return lu({ tx: ";" });
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
                return lu({ tx: ";" });
            }

        }
    },

    options: {
        integrate: false,
        onstart: () => {
            env.table = {};
            env.ASI = true;
        }
    }
};

export default env;