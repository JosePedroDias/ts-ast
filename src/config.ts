import { getContext, ParseProjectParamsObject } from './aux';

import { onNode as importStatements } from './rules/importStatements';
import { onNode as importStatementsWithoutDist } from './rules/importStatementsWithoutDist';


export function getDefaultParseProjectParams(): ParseProjectParamsObject {
    return {
        cwd: '.',
        ignore: [
            'node_modules/**',
            '**/*.d.ts'
        ],
        processors: [
            // importStatements,
            importStatementsWithoutDist,
        ],
        context: getContext()
    }
}
