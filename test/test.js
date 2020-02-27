import chai from "chai";
import {parser} from "../source/ecma.mjs"
import {traverse, filter, replaceable, output, reduce} from "../source/tools/traverser.js"

chai.should();

describe("parsing js expressions", function() {})
describe("rendering js expressions", function() {

    it("var assignment expressions", function() {

        let ast = parser("var t = 0, test;").value;
        
        const d = {};
        
        console.log("dd", reduce(ast, filter("BindingExpression")))
        
        for(const node of traverse(ast, filter("Identifier").next(replaceable()).next(output(d)) )){
            if(node.val == "t")
                node.replace("t.support")
        }
        console.dir(ast,{depth:null})
        console.dir(d,{depth:null})
    });
})
