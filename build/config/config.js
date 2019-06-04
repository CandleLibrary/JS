import resolve from 'rollup-plugin-node-resolve';

const output = [{
        name: "js",
        file: "./build/ecma.js",
        format: "iife"
    },{
        name: "js_cjs",
        file: "./build/ecma.node.js",
        format: "cjs"
    }];

export default {
    input: "./source/ecma.mjs",
    treeshake: false,
    output,
    plugins: [resolve({jail:"",modulesOnly: true})]
};
