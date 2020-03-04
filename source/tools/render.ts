import { MinTreeNodeDefinitions } from "../nodes/mintree_nodes.js";
import { MinTreeNode } from "../nodes/mintree_node.js";
import { MinTreeNodeDefinition } from "../nodes/min_tree_node_definition.js";

type RenderStub = (arg0: MinTreeNode) => string;

class RenderAction 
{
    action_list : Array< RenderStub >;
    
    constructor(action_list : Array< RenderStub >){
        this.action_list = action_list;
    }

    render(node : MinTreeNode) : string {
        return this.action_list.map(a=>a(node)).join("");
    }
}

interface ConditionBranch {
    prop : string,
    action: RenderAction
} 

interface ValuePresenceBranch {
    flag : number,
    action: RenderAction
} 

class NodeRenderer 
{
    condition_branches: Array<ConditionBranch>;
    val_presence_branches: Array<ValuePresenceBranch>;
    default_branch: RenderAction;
    HAS_CONDITIONS : boolean;
    HAS_VAL_ABSENCE : boolean;
    
    constructor(condition_branches: Array<ConditionBranch>, val_presence_branches: Array<ValuePresenceBranch>, default_branch: RenderAction ){
        this.HAS_CONDITIONS = !!condition_branches.length;
        this.HAS_VAL_ABSENCE = !!val_presence_branches.length;
        this.condition_branches = condition_branches;
        this.val_presence_branches = val_presence_branches;
        this.default_branch = default_branch;
    }

    render(node : MinTreeNode) : string {
        let out = "";
        
        for(const cond of this.condition_branches){
            if(!!node[cond.prop])
                return cond.action.render(node);
        }

        const flag = (node.nodes) ? node.nodes.map((v,i) => !!v ? 1<<i : 0).reduce((r,v)=>r|v,0) : 0xFFFFFFFF;

        for(const cond of this.val_presence_branches){
            if((cond.flag & flag) == flag)
                return cond.action.render(node);
        }

        return this.default_branch.render(node);

        return out;
    }
}

function buildRendererFromTemplateString(template_pattern : string) : RenderAction {
    
    /* 
        A template pattern may contain template insertion points marked by a [$]
        character. For each insertion point there is an action to perform depending
        on the surrounding syntax:
        
        1. ValIndexInsertion
        $\n* => This indicates the rendering of the node contained in node.vals[*] should be
                rendered and the result inserted at this point. 

        2. SpreadValsInsertion
        ...$ => This indicates that all node.vals should be rendered and results inserted into 
                the output string with a comma separating the entries. If there are proceeding 
                ValIndexInsertion, the spread will start at the index location following the 
                one specified in ValIndexInsertion

        3. NonValsInsertion 
        $\w* => This indicates that a property of node should be inserted into the output
                string, after being coerced to a string value using the string constructor
                String()
    */

    const regex = /(\$\.\.\.)|(\$[\w\$\_][\w\$\_\n]*)|(\$[\w]*)|([^$]+)*/g,
          actions_iterator : IterableIterator<RegExpMatchArray> = template_pattern.matchAll(regex),
          action_list : Array<RenderStub> = [];
    
    let last_index = -1;

    for(const match of actions_iterator){

        //Need to determine what type of match we have
        if(match[0][0] == "$"){
            
            //SpreadValsInsertion
            if(match[0] == "$..."){
                const index = last_index + 1;
                const delimiter = ", ";
                action_list.push( (node : MinTreeNode) : string => node.nodes.slice(index).map( node => render(node) ).join(delimiter) )
            }

            //ValIndexInsertion
            else if(!isNaN(parseInt(match[0].slice(1)))){
                const index = parseInt(match[0].slice(1))-1;
                action_list.push( (node : MinTreeNode) : string => (render(node.nodes[index])))
                last_index = index;
            }
            
            //NonValsInsertion
            else{
                const prop = match[0].slice(1);
                action_list.push( (node : MinTreeNode) : string => String(node[prop]) )
            }
        }

        //Plain old string insertion
        else{
            const str = match[0];
            action_list.push( () : string => str );
        }
    }

    return new RenderAction(action_list);
}

/**
 *   Builds a string renderer from a MinTreeNodeDefinition
 *   @param node_definition
 */
function buildRenderer(node_definition : MinTreeNodeDefinition) : NodeRenderer {

    /* 
        Template pattern may be an object or a string. If it is an object,
        than each key in the object represents a certain condition that is
        checked on MinTreeNode that determins what type of NodeRenderer is used
        to render that version of the node.

        For each key in the object:

            1. If the key is "default", then use the value as the fallback render template for the node.

            2. if the key is $(not_{number})+, use the value as the render template when certain vals are set to null. 

            3. Otherwise, use the value if the property node.[key] is set to a truthy value. 
    */
    
    const 
        template_pattern = node_definition.template_pattern, 
        conditions : Array<ConditionBranch> = [],
        present_vals : Array<ValuePresenceBranch> = [];

    let _default : RenderAction = null;

    if(typeof template_pattern == "object"){

        const template_pattern_object = template_pattern;

        for(const key in template_pattern){

            if(key == "default"){
            
                _default = buildRendererFromTemplateString(template_pattern_object[key]);
            }else if (key[0] == "$"){
                
                const flag : number = Array
                                        .from(key.slice(1)
                                        .matchAll(/not_(\n+)/))
                                        .reduce((r:number,m) : number => r ^ (1 << (parseInt(m[1])-1)), 0xFFFFFFFF);

                present_vals.push({flag,action: buildRendererFromTemplateString(template_pattern_object[key]) });
            }else
                conditions.push({prop: key,action: buildRendererFromTemplateString(template_pattern_object[key]) });
        }
    }else{
        _default = buildRendererFromTemplateString(template_pattern);  
    }

    return new NodeRenderer(conditions, present_vals, _default);

}

/**
 * Creates a map of NodeRenderers  
 * 
 *  @param node_definitions
 */ 
function RendererBuilder (node_definitions : Array<MinTreeNodeDefinition>) : Map<string, NodeRenderer> {
    
    const renderers : Map<string, NodeRenderer> = new Map();

    for(const node_definition of node_definitions){
        
        const renderer = buildRenderer(node_definition);

        renderers.set(node_definition.name, renderer);
    }

    return renderers;

}

let Renderers : Map<string, NodeRenderer> = null;

/**
 *  Takes a mintree node and produces a string comprising the rendered productions of the ast.
 */
export function render(node : MinTreeNode) :string {

    /*
        Load Renderes on demand to allow for MinTreeNodeDefinition modifications, additions.
    */
    if(!Renderers)
        Renderers = RendererBuilder(MinTreeNodeDefinitions);
 
    const renderer = Renderers.get(node.type);

    if(!renderer)
        throw new Error(`Cannot find string renderer for MinTree node type ${node.type}`);

    return renderer.render(node);
}