interface Lex {
    char: number;
    line: number;
}
export interface MinTreeNode {
    pos: Lex;
    type: string;
    vals: Array<MinTreeNode | any>;
}
declare enum ntype {
    $expression = 1,
    $statement = 2,
    $literal = 4,
    $import = 8,
    $export = 16,
    $number = 32,
    $boolean = 64,
    $string = 128,
    $return = 256,
    $array = 512,
    $null = 1024,
    $identifier = 2048,
    $regex = 4096,
    $class = 8192,
    $call = 16384,
    $yield = 32768,
    $while = 65536,
    $block = 131072,
    $function = 262144,
    $object = 524288,
    $this = 1048576,
    $property = 2097152,
    $template = 4194304,
    $spread = 8388608,
    $script = 16777216,
    $undef_17 = 33554432,
    $undef_18 = 67108864,
    $undef_19 = 134217728,
    $undef_20 = 268435456,
    $undef_21 = 536870912,
    $undef_22 = 1073741824,
    $undef_23 = -2147483648
}
export declare class MinTreeNodeDefinition {
    name: string;
    getters: Array<any>;
    template_pattern: string | object;
    node_type: ntype;
    constructor(name: string, getters: Array<any>, template_pattern: string | object, node_type: ntype);
}
export declare const MinTreeNodeDefinitions: Array<MinTreeNodeDefinition>;
export {};
