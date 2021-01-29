//Load class info

import { parser, renderCompressed, renderWithFormatting, TSNodeTypeLU } from "@candlefw/ts";
import { exp, JSNodeTypeLU } from "@candlefw/js";
import URL from "@candlefw/url";
import { traverse } from "@candlefw/conflagrate";
import fs from "fs";

await URL.server();

const
    node_types = await URL.resolveRelative("./source/typescript/types/node_type_template.ts").fetchText(),
    node_class = await URL.resolveRelative("./source/typescript/types/node_class_type.ts").fetchText(),
    type_ast = parser(node_types).ast,
    class_ast = parser(node_class).ast,
    class_values = new Map();

for (const { node } of traverse(class_ast, "nodes").filter("type", TSNodeTypeLU.TSEnumBindingMember)) {
    const [name_node, expression] = node.nodes,
        name = name_node.value,
        value = eval(renderCompressed(expression));
    class_values.set(name, value);
}

function convertClassReferences(expression) {

    for (const { node, meta: { mutate } } of traverse(expression, "nodes")
        .filter("type", JSNodeTypeLU.MemberExpression
        ).makeMutable())
        mutate(exp(`${class_values.get(node.nodes[1].value) || 0}`));

    return expression;
}

for (const { node, meta: { mutate } } of traverse(type_ast, "nodes").filter("type", TSNodeTypeLU.TSEnumBindingMember).makeMutable()) {
    const [name_node, expression] = node.nodes;
    const name = name_node.value;
    convertClassReferences(expression);
    const value = exp(eval(renderCompressed(expression)) + "");
    node.nodes[1] = value;
}

fs.writeFileSync((await URL.resolveRelative("./source/typescript/types/node_type.ts")) + "", renderWithFormatting(type_ast.nodes[1]));


