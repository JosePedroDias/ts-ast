import {
    Node,
    SyntaxKind,
    ImportDeclaration,
    ImportClause,
    NamedImports,
    ImportSpecifier,
} from 'typescript';

import chalk from 'chalk';

export function onNode(node: Node, file: string) {
    if (node.kind === SyntaxKind.ImportDeclaration) {
        console.log(chalk.yellow(`import`));

        const importDecNode = node as ImportDeclaration;
        const importClause: ImportClause = importDecNode.importClause as ImportClause;
        importClause.forEachChild((node3: Node) => {
            if (node3.kind === SyntaxKind.NamedImports) {
                const node4 = node3 as NamedImports;
                for (const el of node4.elements) {
                    if (el.kind === SyntaxKind.ImportSpecifier) {
                        const el2 = el as ImportSpecifier
                        if (el2.propertyName) {
                            console.log(` - ${chalk.blueBright(el2.name.text)} as ${el2.propertyName.text}`);
                        } else {
                            console.log(` - ${chalk.blueBright(el2.name.text)}`);
                        }
                    }
                }
            }
        });

        const moduleSpecifier = (importDecNode.moduleSpecifier as any).text as string;
        console.log(`from "` + chalk.magentaBright(moduleSpecifier) + '"\n');
    }
}
