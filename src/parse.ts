import { promisify } from 'util';

import { glob as _glob } from 'glob';

import {
    Program,
    createProgram,
    forEachChild,
    Node,
} from 'typescript';

import chalk from 'chalk';

import { Context, OnNodeFn, ParseProjectParamsObject } from './aux';

const glob = promisify(_glob);

export function parseProject(opts: ParseProjectParamsObject): Promise<Context> {
    return glob(
        '**/*.ts',
        {
            cwd: opts.cwd,
            ignore: opts.ignore
        }).then(
            (matches) => {
                const fullPaths = matches.map(s => `${opts.cwd}/${s}`);
                processTypescriptFiles(fullPaths, opts.context, opts.processors);
                return opts.context;
            }
    );
}

function processTypescriptFiles(files: string[], context: Context, processors: OnNodeFn[] ) {
    const program: Program = createProgram(files, {});
    for (const file of files) {
        // console.log(chalk.bgBlueBright( chalk.black(`\n ${file} \n`) ));
        const sourceFile = program.getSourceFile(file);
        if (sourceFile) {
            for (const processor of processors) {
                forEachChild(sourceFile, (node: Node) =>
                    processor(node, file, context));
            }
        }
    }
}
