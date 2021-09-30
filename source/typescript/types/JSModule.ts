import { JSExpressionBase, JSModuleBase } from "./JSBase";
import { JSIdentifier, JSIdentifierDefault, JSIdentifierModule, JSIdentifierName } from "./JSIdentifier";
import { JSStringLiteral } from "./JSPrimitive";
import { JSLexicalDeclaration, JSStatementClass, JSVariableStatement } from "./JSStatement";
import { JSNodeType } from "./node_type";
import { JSHoistableDeclarationClass, JSRightHandExpressionClass } from "./JSNodeClasses";
import { JSClassDeclaration } from "./JSClass";
import { JSFunctionDeclaration } from "./JSFunction";



/**
 * A Script node that has at least one export or import statement;
 */
export interface JSModule extends JSModuleBase {
    type: JSNodeType.Module;
    source?: string;
    nodes: (JSStatementClass | JSImportDeclaration | JSExportDeclaration)[];
}


/**
 * Import statement of the forms:
 *
 * >```js
 * > τimport imports from_clause ;
 * > // or
 * > τimport module_specifier ;
 * >```
 *
 * Extended members are:
 * 1. **`imports`**
 * 1. **`from`**
 *
 */
export interface JSImportDeclaration extends JSModuleBase {
    type: JSNodeType.ImportDeclaration;

    nodes: [JSImportClause, JSFromClause] | [null, JSModuleSpecifier];
}


/**
 * An statement of one of the forms:
 *
 * >```
 * > export export_clause from_clause? ;
 * > export variable_statement
 * > export declaration
 * > export default declaration
 * > export default declaration
 * > export default assignment_expression ;
 * >```
 *
 * TODO Extended members are:
 * 1. **`TODO`**
 *
 * TODO Optional Notes
 */
export interface JSExportDeclaration extends JSModuleBase {
    type: JSNodeType.ExportDeclaration;

    DEFAULT: boolean;

    nodes: [JSExportClause, JSFromClause?]
    | [null, JSFromClause]
    | [(JSClassDeclaration | JSVariableStatement | JSLexicalDeclaration | JSFunctionDeclaration | JSHoistableDeclarationClass | JSRightHandExpressionClass)];
}

/**
 * TODO Description
 *
 * >```
 * > identifier
 * > //or
 *  identifier [, name_space_import ]
 * >```
 *
 * Extended members are:
 * 1. **`undefined`**
 *
 * TODO Optional Notes
 */
export interface JSImportClause extends JSModuleBase {
    type: JSNodeType.ImportClause;

    nodes: [(JSIdentifierDefault | JSNameSpaceImport | JSNamedImports)];
}
/**
 * Collection of export specifiers of the form:
 *
 * >```
 * > { export_specifier* }
 * >```
 *
 * Extended members are:
 * 1. **`specifiers`** - Array of ExportSpecifiers
 *
 */
export interface JSExportClause extends JSModuleBase {
    type: JSNodeType.ExportClause;

    nodes: JSModuleSpecifier[];
}


/**
 * Expression of the form
 *
 * >```
 * > from string_literal
 * >```
 *
 * Extended members are:
 * 1. **`url`**
 *
 */
export interface JSFromClause extends JSModuleBase {
    type: JSNodeType.FromClause;
    nodes: [JSStringLiteral];
}



/**
 * Import module expression of the form
 *
 * >```js
 * > * as import_binding
 * >```
 *
 * The extended member is:
 * 1. **`import_binding`**
 *
 */
export interface JSNameSpaceImport extends JSModuleBase {
    type: JSNodeType.NameSpace;
    nodes: [JSIdentifierModule];
}


/**
 * Import module expression of the form
 *
 * >```js
 * > { [imports_specifier [, imports_specifier ]  ] }
 * >```
 *
 *
 */
export interface JSNamedImports extends JSModuleBase {
    type: JSNodeType.Specifiers;
    nodes: JSModuleSpecifier[];
}

/**
* Specify a new name for the imported or exported variable
*
*>```
*> identifier as identifier
*>```
*
* Extended members are
* 1. 'original'
* 2. 'transformed'
*
* Used in `ImportDeclarations` and `ExportDeclarations`
*/
export interface JSModuleSpecifier extends JSModuleBase {
    type: JSNodeType.Specifier;
    nodes: [JSIdentifier, JSIdentifierModule?];
}


export interface JSImportMeta extends JSExpressionBase {
    type: JSNodeType.ImportMeta;
    nodes: [JSIdentifierName] | [JSRightHandExpressionClass];
}
export type JSModuleClass = JSModule
    | JSImportDeclaration
    | JSExportDeclaration
    | JSImportClause
    | JSExportClause
    | JSImportClause
    | JSFromClause
    | JSNameSpaceImport
    | JSNamedImports
    | JSImportMeta
    | JSModuleSpecifier;