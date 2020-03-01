export declare function traverse(mintree: any, yielder?: {
    yield: (node: any) => any;
    complete: (node: any) => any;
}): Generator<any, any, unknown>;
export declare function reduce(mintree: any, yielder?: {
    yield: (node: any) => any;
    complete: (node: any) => any;
}): any;
export declare function filter(...type_strings: any[]): void;
export declare function replaceable(for_each_function: any): void;
export declare function output(receptical: any): void;
