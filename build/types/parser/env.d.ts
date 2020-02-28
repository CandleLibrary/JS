declare const env: {
    ASI: boolean;
    functions: {
        buildJSAST(node: any): any;
        defaultError: (tk: any, env: any, output: any, lex: any, prv_lex: any, ss: any, lu: any) => any;
    };
    options: {
        integrate: boolean;
        onstart: () => void;
    };
};
export default env;
