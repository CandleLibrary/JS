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
    class_value_lookup = new Map(),
    type_value_lookup = new Map(),
    type_value_replace = [];

//Pull in class information, convert expression in numbers, and store in class lookup
for (const { node } of traverse(class_ast, "nodes").filter("type", TSNodeTypeLU.TSEnumBindingMember)) {
    const [name_node, expression] = node.nodes,
        name = name_node.value,
        value = eval(renderCompressed(expression));
    class_value_lookup.set(name, value);
}

function convertClassReferences(expression) {

    return traverse(expression, "nodes")
        .filter("type", JSNodeTypeLU.MemberExpression)
        .mutate((node) => exp(`${(class_value_lookup.get(node.nodes[1].value))}`))
        .run();
}
let counter = 0, counter_shift = 23;
//Convert 
for (const { node } of traverse(type_ast, "nodes")
    .filter("type", TSNodeTypeLU.TSEnumDeclaration)
) {

    for (const { node: enum_member, meta: { mutate, index } } of traverse(node, "nodes", 2).skipRoot().makeMutable()) {
        if (index < 1) continue;
        //console.log({ enum_member });

        if (enum_member.type == TSNodeTypeLU.TSEnumBindingMember) {

            let [name_node, expression] = enum_member.nodes;

            const name = name_node.value;

            if (expression.type == JSNodeTypeLU.IdentifierReference) {

                const replacement = exp(`${name}=0`);

                mutate(replacement);

                type_value_replace.push([expression.value, replacement]);

            } else {

                expression = convertClassReferences(expression);

                const value = exp((((counter++) << counter_shift) | eval(renderCompressed(expression))) + "");

                enum_member.nodes[1] = value;

                type_value_lookup.set(name_node.value, value);
            }
        } else {
            const replacement = exp(`${enum_member.value}=${(counter++) << counter_shift}`);

            mutate(replacement);
        }
    }
}

for (const referenced_type of type_value_replace) {

    const [name, node] = referenced_type;

    const value = type_value_lookup.get(name);

    node.nodes[1] = value;
}

fs.writeFileSync((await URL.resolveRelative("./source/typescript/types/node_type.ts")) + "", renderWithFormatting(type_ast.nodes[1]));


