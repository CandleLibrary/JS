import { MinTreeNodeDefinition } from "./mintree_node_definition.js";
import { MinTreeNodeType } from "../types/mintree_node_type.js";
import { FormatRule } from "@candlefw/conflagrate";


export function createNodeDefinitions(
    bd: MinTreeNodeDefinition[] = [],
    ...args: Array<{
        type?: MinTreeNodeType,
        ext_name?: string[],
        format_string?: string | object,
        format_rules?: FormatRule;
    }>): MinTreeNodeDefinition[] {
    return args.reduce(
        (ret, def) => {
            if (def.type) {
                const index = def.type >>> 23;
                if (def.ext_name)
                    ret[index].getters = def.ext_name;
                if (def.format_string)
                    ret[index].template_pattern = def.format_string;
                if (def.format_rules)
                    ret[index].format_rule = def.format_rules;
            }
            return ret;
        },
        new Array(512)
            .fill(null)
            .map((e, i) => Object.assign({}, bd[i] || new MinTreeNodeDefinition(i << 23, [], "", 0)))
    );
}

export const MinTreeNodeDefinitions: Array<MinTreeNodeDefinition> = createNodeDefinitions([],
    {
        type: MinTreeNodeType.AdditiveExpression,
        ext_name: ["left", "right"],
        format_string: "@1%@symbol%@2"
    },
    {
        type: MinTreeNodeType.Arguments,
        ext_name: ["expressions"],
        format_string: "(1@...,0)",
    },
    {
        type: MinTreeNodeType.ArrayLiteral,
        ext_name: ["members"],
        format_string: "[1@...,0]",
    },
    {
        type: MinTreeNodeType.ArrowFunction,
        ext_name: ["arguments", "body"],
        format_string: "@1%=>%@2",
    },
    {
        type: MinTreeNodeType.AssignmentExpression,
        ext_name: ["identifier", "expression"],
        format_string: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.BlockStatement,
        ext_name: ["statements"],
        format_string: "{1@...%0}",
    },
    {
        type: MinTreeNodeType.AwaitExpression,
        ext_name: ["expression"],
        format_string: "await @1",
    },
    {
        type: MinTreeNodeType.BigIntLiteral,
        ext_name: [],
        format_string: "@(NEGATIVE,-)@value%n",
    },


    const enum DATA_DIRECTION {
        DOWN = 1,
        UP = 2
    }
    
    function updateChildren(data, flags) {
    
        for (const name in data) {
    
            if (typeof data[name] == "undefined") {
    
                let i = 0;
    
                for (const chup of this.chups) {
    
                    if (chup[name])
                        this.ch[i].update({ [chup[name]]: data[name] }, flags | DATA_FLOW_FLAG.FROM_PARENT);
                    i++;
                }
            }
        }
    }
    
    function updateParent(data) {
        if (this.par)
            updateFromChild.call(this.par, data);
    }
    
    function updateFromParent(local_index, v, flags) {
    
        if (flags >> 24 == this.ci + 1)
         


const enum DATA_DIRECTION {
    DOWN = 1,
    UP = 2
}

function updateChildren(data, flags) {

    for (const name in data) {

        if (typeof data[name] == "undefined") {

            let i = 0;

            for (const chup of this.chups) {

                if (chup[name])
                    this.ch[i].update({ [chup[name]]: data[name] }, flags | DATA_FLOW_FLAG.FROM_PARENT);
                i++;
            }
        }
    }
}

function updateParent(data) {
    if (this.par)
        updateFromChild.call(this.par, data);
}

function updateFromParent(local_index, v, flags) {

    if (flags >> 24 == this.ci + 1)
       


const enum DATA_DIRECTION {
    DOWN = 1,
    UP = 2
}

function updateChildren(data, flags) {

    for (const name in data) {

        if (typeof data[name] == "undefined") {

            let i = 0;

            for (const chup of this.chups) {

                if (chup[name])
                    this.ch[i].update({ [chup[name]]: data[name] }, flags | DATA_FLOW_FLAG.FROM_PARENT);
                i++;
            }
        }
    }
}

function updateParent(data) {
    if (this.par)
        updateFromChild.call(this.par, data);
}

function updateFromParent(local_index, v, flags) {

    if (flags >> 24 == this.ci + 1)
        return;

    this["u" + local_index](v, DATA_FLOW_FLAG.FROM_PARENT | flags);
}

function syncParentMethod(this_index, parent_method_index, child_index) {

    this.ci = child_index;
    this.pui[this_index] = this.par["u" + parent_method_index];
}


function updateFromChild(local_index, val, flags) {

    const method = this.pui[local_index];

    if (typeof method == "function")
        method.call(this.par, val, flags | DATA_FLOW_FLAG.FROM_CHILD | ((this.ci + 1) << 24));

};

function updateModel() {
    // Go through the model's props and test whether they are different then the 
    // currently cached variables
    const model = this.model;

    for (const name in this.nlu) {

        if ((this.nlu[name] >>> 24) & DATA_FLOW_FLAG.FROM_MODEL) {
            const index = this.nlu[name] & 0xFFFFFF;
            const v = this[index];

            if (model[name] && model[name] !== v)
                this.update({ [name]: model[name] }, DATA_FLOW_FLAG.FROM_MODEL);
        }
    }
}
    this["u" + local_index](v, DATA_FLOW_FLAG.FROM_PARENT | flags);
}

function syncParentMethod(this_index, parent_method_index, child_index) {

    this.ci = child_index;
    this.pui[this_index] = this.par["u" + parent_method_index];
}


function updateFromChild(local_index, val, flags) {

    const method = this.pui[local_index];

    if (typeof method == "function")
        method.call(this.par, val, flags | DATA_FLOW_FLAG.FROM_CHILD | ((this.ci + 1) << 24));

};

function updateModel() {
    // Go through the model's props and test whether they are different then the 
    // currently cached variables
    const model = this.model;

    for (const name in this.nlu) {

        if ((this.nlu[name] >>> 24) & DATA_FLOW_FLAG.FROM_MODEL) {
            const index = this.nlu[name] & 0xFFFFFF;
            const v = this[index];

            if (model[name] && model[name] !== v)
                this.update({ [name]: model[name] }, DATA_FLOW_FLAG.FROM_MODEL);
        }
    }
}   return;
    
        this["u" + local_index](v, DATA_FLOW_FLAG.FROM_PARENT | flags);
    }
    
    function syncParentMethod(this_index, parent_method_index, child_index) {
    
        this.ci = child_index;
        this.pui[this_index] = this.par["u" + parent_method_index];
    }
    
    
    function updateFromChild(local_index, val, flags) {
    
        const method = this.pui[local_index];
    
        if (typeof method == "function")
            method.call(this.par, val, flags | DATA_FLOW_FLAG.FROM_CHILD | ((this.ci + 1) << 24));
    
    };
    
    function updateModel() {
        // Go through the model's props and test whether they are different then the 
        // currently cached variables
        const model = this.model;
    
        for (const name in this.nlu) {
    
            if ((this.nlu[name] >>> 24) & DATA_FLOW_FLAG.FROM_MODEL) {
                const index = this.nlu[name] & 0xFFFFFF;
                const v = this[index];
    
                if (model[name] && model[name] !== v)
                    this.update({ [name]: model[name] }, DATA_FLOW_FLAG.FROM_MODEL);
            }
        }
    }
    {
        type: MinTreeNodeType.BindingExpression,
        ext_name: ["property", "expression"],
        format_string: "@1%=%@2",
    },
    {
        type: MinTreeNodeType.BooleanLiteral,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.BreakStatement,
        ext_name: [],
        format_string: "break;",
    },
    {
        type: MinTreeNodeType.CallExpression,
        ext_name: ["object", "arguments"],
        format_string: "@1@2",
    },
    {
        type: MinTreeNodeType.CaseBlock,
        ext_name: ["expression"],
        format_string: "{1@... 0}",
    },
    {
        type: MinTreeNodeType.CaseClause,
        ext_name: ["statements"],
        format_string: "case @1%:%1@...%",
    },
    {
        type: MinTreeNodeType.DefaultClause,
        ext_name: ["statements"],
        format_string: "default%:%1@...%",
    },
    {
        type: MinTreeNodeType.CatchClause,
        ext_name: ["expression", "body"],
        format_string: "catch(@1)@2",
    },
    {
        type: MinTreeNodeType.Class,
        ext_name: ["name", "heritage", "body"],
        format_string: { default: "class @1 extends @2{1@...%0}", $not_2: "class @1{1@...%0}" }
    },
    {
        type: MinTreeNodeType.ComputedProperty,
        ext_name: [],
        format_string: "[@1]",
    },
    {
        type: MinTreeNodeType.ContinueStatement,
        ext_name: ["identifier"],
        format_string: { default: "continue @1;", $not_1: "continue;" },
    },
    {
        type: MinTreeNodeType.ConditionalExpression,
        ext_name: ["condition", "pass_expression", "fail_expression"],
        format_string: "@1%1\n\\?%@2\n%:%@3",
    },
    {
        type: MinTreeNodeType.DebuggerStatement,
        ext_name: [],
        format_string: "debugger;",
    },
    {
        type: MinTreeNodeType.DeleteExpression,
        ext_name: ["expression"],
        format_string: "delete @1",
    },
    {
        type: MinTreeNodeType.DoStatement,
        ext_name: ["statement", "expression"],
        format_string: "do @1 while(1@2%0)",
    },
    {
        type: MinTreeNodeType.Elision,
        ext_name: [],
        format_string: "",
    },
    {
        type: MinTreeNodeType.EmptyStatement,
        ext_name: [],
        format_string: ";",
    },
    {
        type: MinTreeNodeType.EqualityExpression,
        ext_name: ["left", "right"],
        format_string: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.ExponentiationExpression,
        ext_name: ["left", "right"],
        format_string: "@1%**%@2",
    },
    {
        type: MinTreeNodeType.ExportClause,
        ext_name: [],
        format_string: "{1@...,0}",
    },
    {
        type: MinTreeNodeType.ExportDeclaration,
        ext_name: [],
        format_string: {
            default: "export @1 @2;",
            DEFAULT: "export default @1;",
            $not_2: "export @1;",
            $not_1: "export * @2;"
        }
    },
    {
        type: MinTreeNodeType.ExpressionList,
        ext_name: [],
        format_string: "1@...,",
    },
    {
        type: MinTreeNodeType.ExpressionStatement,
        ext_name: ["expression"],
        format_string: "@1;",
    },
    {
        type: MinTreeNodeType.FinallyClause,
        ext_name: [],
        format_string: "finally@1",
    },
    {
        type: MinTreeNodeType.ForInStatement,
        ext_name: [],
        format_string: "for(@1 in @2)1\n@3",
    },
    {
        type: MinTreeNodeType.ForOfStatement,
        ext_name: [],
        format_string: "for@(AWAIT, await)%(@1 of @2)@3",
    },
    {
        type: MinTreeNodeType.ForStatement,
        ext_name: [],
        format_string: {
            default: "for(@1?%;%@2?%;%@3?%)@4",
            LEX: "for(@1?%%@2?%;%@3?%)@4"
        }
    },
    {
        type: MinTreeNodeType.FormalParameters,
        ext_name: [],
        format_string: "(1@...,0)",
    },
    {
        type: MinTreeNodeType.FromClause,
        ext_name: ["url"],
        format_string: "from%@1",
    },
    {
        type: MinTreeNodeType.FunctionDeclaration,
        ext_name: ["name", "parameters", "body"],
        format_string: {
            default: "@(ASYNC,async )function%@(GENERATOR,*) @1?@2{@3?}",
            $not_2: "@(ASYNC,async )function@(GENERATOR,*) @1?(){@3?}"
        }
    },
    {
        type: MinTreeNodeType.FunctionExpression,
        ext_name: ["name", "parameters", "body"],
        format_string: {
            default: "@(ASYNC,async )function%@(GENERATOR,*) @1?@2{@3?}",
            $not_2: "@(ASYNC,async )function%@(GENERATOR,*) @1?(){@3?}"
        }
    },
    {
        type: MinTreeNodeType.FunctionBody,
        ext_name: [],
        format_string: "1@...%0",
    },
    {
        type: MinTreeNodeType.GetterMethod,
        ext_name: ["name", "body"],
        format_string: "get @1(){@2?}",
    },
    {
        type: MinTreeNodeType.Identifier,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierDefault,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierName,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierModule,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierLabel,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierBinding,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.IdentifierReference,
        ext_name: [],
        format_string: "@value",
    },
    {
        type: MinTreeNodeType.IfStatement,
        ext_name: [],
        format_string: { default: "if%(%@1%)%\n@2\nelse @3", $not_3: "if%(%@1%)%\n@2" }
    },
    {
        type: MinTreeNodeType.ImportClause,
        ext_name: [],
        format_string: "1@...,0"
    },
    {
        type: MinTreeNodeType.ImportDeclaration,
        ext_name: ["clause", "from"],
        format_string: "import @1 @2;",
    },
    {
        type: MinTreeNodeType.InExpression,
        ext_name: [],
        format_string: "@1 in @2",
    },
    {
        type: MinTreeNodeType.InstanceOfExpression,
        ext_name: ["left", "right"],
        format_string: "@1 instanceof @2",
    },
    {
        type: MinTreeNodeType.LabeledStatement,
        ext_name: ["label", "statement"],
        format_string: "@1%:\n%@2",
    },
    {
        type: MinTreeNodeType.LexicalBinding,
        ext_name: [],
        format_string: "@symbol 1@...,",
    },
    {
        type: MinTreeNodeType.LexicalDeclaration,
        ext_name: [],
        format_string: "@symbol 1@...,;",
    },
    {
        type: MinTreeNodeType.LogicalExpression,
        ext_name: ["left", "right"],
        format_string: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.BitwiseExpression,
        ext_name: ["left", "right"],
        format_string: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.MemberExpression,
        ext_name: ["object", "member"],
        format_string: { COMPUTED: "@1[@2]", default: "@1.@2" }
    },
    {
        type: MinTreeNodeType.Method,
        ext_name: ["name", "parameters", "body"],
        format_string: {
            default: "@(ASYNC,async )%@(GENERATOR,*)@1%@2?{1@3?0}",
            $not_2: "@(ASYNC,async )%@(GENERATOR,*)@1%(){1@3?0}",
        },
    },

    {
        type: MinTreeNodeType.MultiplicativeExpression,
        ext_name: ["left", "right"],
        format_string: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.NameSpaceImport,
        ext_name: [],
        format_string: "* as @1",
    },
    {
        type: MinTreeNodeType.NamedImports,
        ext_name: [],
        format_string: "{1@...,0}",
    },
    {
        type: MinTreeNodeType.NewExpression,
        ext_name: [],
        format_string: "new @1",
    },
    {
        type: MinTreeNodeType.NewInstanceExpression,
        ext_name: [],
        format_string: "new @1@2",
    },
    {
        type: MinTreeNodeType.NewTarget,
        ext_name: [],
        format_string: "new.target",
    },
    {
        type: MinTreeNodeType.NullLiteral,
        ext_name: [],
        format_string: "null",
    },
    {
        type: MinTreeNodeType.NumericLiteral,
        ext_name: [],
        format_string: "@(NEGATIVE,-)@value",
    },
    {
        type: MinTreeNodeType.ObjectLiteral,
        ext_name: [],
        format_string: "{1@...,0}",
    },
    {
        type: MinTreeNodeType.Parameters,
        ext_name: [],
        format_string: "(1@...,0)",
    },
    {
        type: MinTreeNodeType.Parenthesized,
        ext_name: ["expression"],
        format_string: "(1@1%0)",
    },
    {
        type: MinTreeNodeType.PostExpression,
        ext_name: ["expression"],
        format_string: "@1@symbol",
    },
    {
        type: MinTreeNodeType.PreExpression,
        ext_name: ["expression"],
        format_string: "@symbol@1",
    },
    {
        type: MinTreeNodeType.PropertyBinding,
        ext_name: ["identifier", "expression"],
        format_string: "@1%:%@2",
    },
    {
        type: MinTreeNodeType.RegexLiteral,
        ext_name: ["expression_string", "meta"],
        format_string: "/@value/@flags?",
    },
    {
        type: MinTreeNodeType.RelationalExpression,
        ext_name: ["left", "right"],
        format_string: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.ReturnStatement,
        ext_name: ["expression"],
        format_string: "return @1;",
    },
    {
        type: MinTreeNodeType.Script,
        ext_name: [],
        format_string: "@...%",
    },
    {
        type: MinTreeNodeType.Module,
        ext_name: [],
        format_string: "@...%",
    },
    {
        type: MinTreeNodeType.SetterMethod,
        ext_name: ["name", "parameter", "body"],
        format_string: "set @1(@2){@3?}",
    },
    {
        type: MinTreeNodeType.ShiftExpression,
        ext_name: ["left", "right"],
        format_string: "@1%@symbol%@2",
    },
    {
        type: MinTreeNodeType.Specifier,
        ext_name: ["original", "transformed"],
        format_string: "@1 as @2",
    },
    {
        type: MinTreeNodeType.SpreadExpression,
        ext_name: ["expression"],
        format_string: "...@1",
    },
    {
        type: MinTreeNodeType.StringLiteral,
        ext_name: [],
        format_string: "@quote_type@value@quote_type",
    },
    {
        type: MinTreeNodeType.SuperCall,
        ext_name: ["arguments"],
        format_string: "super@1",
    },
    {
        type: MinTreeNodeType.SuperExpression,
        ext_name: ["member"],
        format_string: { COMPUTED: "super[@1]", default: "super.@1" },
    },
    {
        type: MinTreeNodeType.SwitchStatement,
        ext_name: ["expression", "case_block"],
        format_string: "switch(@1)\n@2",
    },
    {
        type: MinTreeNodeType.Template,
        ext_name: [],
        format_string: { NO_SUBSTITUTE: "`@1?`", default: "@...%" },
    },
    {
        type: MinTreeNodeType.TemplateHead,
        ext_name: [],
        format_string: "`@value${",
    },
    {
        type: MinTreeNodeType.TemplateMiddle,
        ext_name: [],
        format_string: "}@value${",
    },
    {
        type: MinTreeNodeType.TemplateTail,
        ext_name: [],
        format_string: "}@value`",
    },
    {
        type: MinTreeNodeType.ThisLiteral,
        ext_name: [],
        format_string: "this",
    },
    {
        type: MinTreeNodeType.ThrowStatement,
        ext_name: ["expression"],
        format_string: "throw @1;",
    },
    {
        type: MinTreeNodeType.TryStatement,
        ext_name: [],
        format_string: "try@1?\n@2?\n@3?",
    },
    {
        type: MinTreeNodeType.TypeofExpression,
        ext_name: ["expression"],
        format_string: "typeof @1",
    },
    {
        type: MinTreeNodeType.UnaryExpression,
        ext_name: ["expression"],
        format_string: "@symbol@1",
    },
    {
        type: MinTreeNodeType.VariableDeclaration,
        ext_name: [],
        format_string: "var @...,",
    },
    {
        type: MinTreeNodeType.VariableStatement,
        ext_name: [],
        format_string: "var @...,;",
    },
    {
        type: MinTreeNodeType.VoidExpression,
        ext_name: ["expression"],
        format_string: "void @1",
    },
    {
        type: MinTreeNodeType.WhileStatement,
        ext_name: ["expression", "statement"],
        format_string: "while(@1)@2",
    },
    {
        type: MinTreeNodeType.WithStatement,
        ext_name: ["expression", "statement"],
        format_string: "with(@1)@2",
    },
    {
        type: MinTreeNodeType.YieldExpression,
        ext_name: ["expression"],
        format_string: "yield @1",
    },
    {
        type: MinTreeNodeType.ObjectBinding,
        ext_name: ["expression"],
        format_string: "{1%@...,%0}",
    },
    {
        type: MinTreeNodeType.ArrayBinding,
        ext_name: ["expression"],
        format_string: "[1%@...,%0]",
    }
);
