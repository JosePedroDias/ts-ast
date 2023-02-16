// https://satellytes.com/blog/post/typescript-ast-type-checker/
// https://nabeelvalley.co.za/docs/javascript/typescript-ast/
// https://www.typescriptlang.org/tsconfig

// https://ts-ast-viewer.com/#
// https://astexplorer.net

import {
    Program,
    createProgram,
    forEachChild,
    Node,
    SyntaxKind,
    ImportDeclaration,
    ImportClause,
    NamedImports,
    ImportSpecifier,
} from 'typescript';

const FILE_PATH = 'example.ts';

const files: string[] = [FILE_PATH]
const program: Program = createProgram(files, {});

const mySourceFile = program.getSourceFile(FILE_PATH);

const syntaxKindLookup = new Map<number, string>();
for (let [k, v] of Object.entries(SyntaxKind as Object)) {
    syntaxKindLookup.set(v, k);
}

mySourceFile && forEachChild(mySourceFile, (node: Node) => {
    if (node.kind === SyntaxKind.ImportDeclaration) {
        console.log(`import`);

        const importDecNode = node as ImportDeclaration;
        const importClause: ImportClause = importDecNode.importClause as ImportClause;
        importClause.forEachChild((node3: Node) => {
            if (node3.kind === SyntaxKind.NamedImports) {
                const node4 = node3 as NamedImports;
                for (const el of node4.elements) {
                    if (el.kind === SyntaxKind.ImportSpecifier) {
                        const el2 = el as ImportSpecifier
                        if (el2.propertyName) {
                            console.log(`- ${el2.name.text} as ${el2.propertyName.text}`);
                        } else {
                            console.log(`- ${el2.name.text}`);
                        }
                    }
                }
            }
        })

        const moduleSpecifier = (importDecNode.moduleSpecifier as any).text as string;
        console.log(`from ${moduleSpecifier}`);
    }
});
