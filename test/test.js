import chai from "chai";
import {parse} from "../source/ecma.js"

chai.should();


describe("parsing js expressions", function() {})
describe("rendering js expressions", function() {

    it("arrow and object literal", function() {
    	var ast = parse("test=>({d:a})")
    	ast.render().should.equal("test=>({d : a});");
    })

    it("arrow and statements / statement lists", function() {
    	var ast = parse("test=>{let d = 1}")
    	ast.render().should.equal("test=>{let d = 1;};")
    })

})
