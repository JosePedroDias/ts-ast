import {
    Node,
    SyntaxKind,
    ImportDeclaration,
} from 'typescript';

import chalk from 'chalk';

import { getLineNumber } from '../aux';

export function onNode(node: Node, file: string) {
    if (node.kind === SyntaxKind.ImportDeclaration) {

        const importDecNode = node as ImportDeclaration;
        const moduleSpecifier = (importDecNode.moduleSpecifier as any).text as string;

        if (moduleSpecifier.indexOf('@arkadium/game-core') === 0 && moduleSpecifier.indexOf('/dist/') !== -1) {
            const lineNo = getLineNumber(file, node.pos);
            console.log(chalk.yellow(`${file}:${lineNo}`) + ` - ` + `targeting dist files "` + chalk.red(moduleSpecifier) + `"!`);
        }
    }
}
