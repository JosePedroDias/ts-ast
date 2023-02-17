import { getArguments, getContext } from './aux';
import { parseProject } from './parse';
import { getDefaultParseProjectParams } from './config';

import chalk from 'chalk';

const cwds = getArguments();
// console.log('cwds', cwds);
const context = getContext();

(async () => {
    for (let cwd of cwds) {
        console.log(chalk.green(`\nParsing project: ${cwd}...`));
        const opts = getDefaultParseProjectParams();
        opts.cwd = cwd;
        opts.context = context;
        await parseProject(opts);
    }
    
    console.log(chalk.green(`\nUnique errors:`));
    const errors = Array.from(context.uniqueErrors);
    errors.sort();
    console.log(errors.join('\n'));
})();
