# TS-AST

A little experiment to traverse typescript source code ASTs to find issues.
I may eventually port this to the [eslint parser used by eslint](https://typescript-eslint.io/architecture/parser/),
though I like the very few dependencies and the types I get using the typescript package directly.

## usage

```
npm run build
npm run run -- <root of the source code>
```

It will run the rules called in `parse.ts`'s `processTypescriptFiles()`.

Example output:

```
 ./src/parse.ts

import
 - promisify
from "util"

import
 - _glob as glob
from "glob"

import
 - Program
 - createProgram
 - forEachChild
 - Node
from "typescript"

import
from "chalk"

import
 - importStatements as onNode
from "./rules/importStatements"

import
 - importStatementsWithoutDist as onNode
from "./rules/importStatementsWithoutDist"
```

## inspiration and reference

- https://satellytes.com/blog/post/typescript-ast-type-checker/
- https://nabeelvalley.co.za/docs/javascript/typescript-ast/
- https://www.typescriptlang.org/tsconfig
- https://github.com/isaacs/node-glob#glob-primer
- https://ts-ast-viewer.com/#
- https://astexplorer.net
