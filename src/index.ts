import { getArguments } from './aux';
import { parseProject } from './parse';
import { getDefaultParseProjectParams } from './config';

const args = getArguments();
const opts = getDefaultParseProjectParams();
const cwd = args[0] || '.';
console.log('cwd', args[0]);

opts.cwd = cwd;
parseProject(opts)
.then((context) => {
    console.log(context);
});
