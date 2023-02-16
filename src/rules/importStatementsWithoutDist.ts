import {
    Node,
    SyntaxKind,
    ImportDeclaration,
    ImportClause,
    NamedImports,
    ImportSpecifier,
} from 'typescript';

import chalk from 'chalk';

import { Context, getLineNumber } from '../aux';

export function onNode(node: Node, file: string, context: Context) {
    if (node.kind === SyntaxKind.ImportDeclaration) {

        const importDecNode = node as ImportDeclaration;
        const moduleSpecifier = (importDecNode.moduleSpecifier as any).text as string;

        const symbols: string[] = [];

        const importClause: ImportClause = importDecNode.importClause as ImportClause;
        importClause.forEachChild((node3: Node) => {
            if (node3.kind === SyntaxKind.NamedImports) {
                const node4 = node3 as NamedImports;
                for (const el of node4.elements) {
                    if (el.kind === SyntaxKind.ImportSpecifier) {
                        const el2 = el as ImportSpecifier;
                        symbols.push(el2.name.text);
                    }
                }
            }
        });

        if (moduleSpecifier.indexOf('@arkadium/game-core') === 0 && moduleSpecifier.indexOf('/dist/') !== -1) {
            const lineNo = getLineNumber(file, node.pos);
            const moduleSpecifier2 = moduleSpecifier.indexOf('@arkadium/game-core-plugins') === 0 ? chalk.cyanBright(moduleSpecifier) : chalk.magentaBright(moduleSpecifier);
            console.log(
                `${file}:${lineNo}` +
                ` - targeting dist files ` +
                `"` + moduleSpecifier2 + `" symbols: ` +
                symbols.map(s => chalk.yellowBright(s)).join(',')
            );
            ++context.errorCount;
            for (let symbol of symbols) context.uniqueErrors.add(`${moduleSpecifier} / ${symbol}`);
        }
    }
}
