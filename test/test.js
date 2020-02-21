import chai from "chai";
import {parser} from "../source/ecma.mjs"

chai.should();

describe("parsing js expressions", function() {})
describe("rendering js expressions", function() {

    it("var assignment expressions", function() {
        parser("var t = 0;").result.render().should.equal("var t = 0;");
        parser("var t_ = 0;").result.render().should.equal("var t_ = 0;");
        parser("var $t = 0;").result.render().should.equal("var $t = 0;");
        parser("var t = 0, d = { };").result.render().should.equal("var t = 0, d = {};");
    });

    it("let assignment expressions", function() {
        console.log(parser("let _t = 0;"))
        parser("let _t = 0;").result.render().should.equal("let _t = 0;");
        parser("let t_ = 0;").result.render().should.equal("let t_ = 0;");
        parser("let $t = 0;").result.render().should.equal("let $t = 0;");
        parser("let t = 0, d = { };").result.render().should.equal("let t = 0, d = {};");
    });

    it("const assignment expressions", function() {
        parser("const t = 0;").result.render().should.equal("const t = 0;");
        parser("const t_ = 0;").result.render().should.equal("const t_ = 0;");
        parser("const $t = 0;").result.render().should.equal("const $t = 0;");
        parser("const t = 0, d = { };").result.render().should.equal("const t = 0, d = {};");
    });

    it("const assignment expressions", function() {
        parser("const \n t = 0;").result.render().should.equal("const t = 0;");
        parser("const t_ =\n 0;").result.render().should.equal("const t_ = 0;");
        parser("const $t = 0;").result.render().should.equal("const $t = 0;");
        parser("const t = 0, d = { };").result.render().should.equal("const t = 0, d = {};");
    });

    it("export statement", function() {
        parser("export default const dollar = {}").result.render().should.equal("export default const dollar = {};");
        console.log(parser("export default as tree").result.render())
        parser("const $t = 0;").result.render().should.equal("const $t = 0;");
        parser("const t = 0, d = { };").result.render().should.equal("const t = 0, d = {};");
    });

    it("import statement", function() {
        parser("import {dolpins} from \"@dolphins\"").result.render().should.equal("import {dolpins} from \"@dolphins\";");
    });
 
    it("arrow and object literal", function() {
    	var ast = parser("test=>({d:a})").result
    	ast.render().should.equal("test=>({d : a});");
    })

    it("arrow and statements / statement lists", function() {
    	var ast = parser("test=>{let d = 1}").result
    	ast.render().should.equal("test=>{let d = 1;};");
    })

    it("template literal with multiple args", function() {
    	var ast = parser("let a = `test ${a} ${b} ${c} this!`").result
    	ast.render().should.equal("let a = `test ${a} ${b} ${c} this!`;")
    })

})
