import { getArguments, getContext } from './aux';
import { parseProject } from './parse';
import { getDefaultParseProjectParams } from './config';

const cwds = getArguments();
console.log('cwds', cwds);

const context = getContext();

(async () => {
    for (let cwd of cwds) {
        const opts = getDefaultParseProjectParams();
        opts.cwd = cwd;
        opts.context = context;
        await parseProject(opts);
    }
    console.log(context);
})();
