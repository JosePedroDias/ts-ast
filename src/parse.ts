import { promisify } from 'util';

import { glob as _glob } from 'glob';

import {
    Program,
    createProgram,
    forEachChild,
    Node,
} from 'typescript';

import chalk from 'chalk';

import { onNode as importStatements } from './rules/importStatements';
import { onNode as importStatementsWithoutDist } from './rules/importStatementsWithoutDist';

const glob = promisify(_glob);

const args = Array.from(process.argv);
args.shift();
args.shift();

const cwd = args[0] || '.';
console.log('cwd', cwd);

glob(
    '**/*.ts',
    {
        cwd,
        ignore: [
            'node_modules/**',
            '**/*.d.ts'
        ]
    }).then(
        (matches) => {
            const fullPaths = matches.map(s => `${cwd}/${s}`);
            processTypescriptFiles(fullPaths);
        }
);

function processTypescriptFiles(files: string[]) {
    const program: Program = createProgram(files, {});

    for (const file of files) {
        console.log(chalk.bgBlueBright( chalk.black(`\n ${file} \n`) ));

        const sourceFile = program.getSourceFile(file);

        sourceFile && forEachChild(sourceFile, (node: Node) => importStatements(node, file));
        // sourceFile && forEachChild(sourceFile, (node: Node) => importStatementsWithoutDist(node, file));
    }
}
