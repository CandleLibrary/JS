import chai from "chai";

import {parser, render} from "../source/ecma.mjs"

chai.should();

describe("parsing js expressions", function() {})
describe("rendering js expressions", function() {

    it("var assignment expressions", function() {

        let ast = parser("let t = null, test = null;");

       console.log({render:render(ast)});
    });
})
