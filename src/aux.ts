import { readFileSync } from 'fs';

import { SyntaxKind } from 'typescript';

export type Context = {
    uniqueErrors: Set<string>;
    errorCount: number;
};

export type onNodeFn = (node: Node, file: string, context: Context) => void;

export const syntaxKindLookup = new Map<number, string>();
{
    for (let [k, v] of Object.entries(SyntaxKind as Object)) syntaxKindLookup.set(v, k);
}

// windows             \r\n
// linux and max > 9   \n
// old mac             \r

const LF = '\n';
//const CR = '\r';

// detecting \n works for most systems
export function getLineNumber(file: string, num: number) {
    let lineNo = 1;
    let i = 0;
    const source = readFileSync(file).toString();

    for (let c of source) {
        if (i === num) return lineNo;
        if (c === LF) ++lineNo;
        ++i;
    }
}
