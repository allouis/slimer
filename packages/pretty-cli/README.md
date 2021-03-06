# Pretty CLI

A mini-module to style a [sywac](http://sywac.io/) instance in a standard way

## Install

Either: `npm i @tryghost/pretty-cli --save` 

Or: `yarn add @tryghost/pretty-cli`

## Usage

E.g. `const prettyCLI = require('@tryghost/pretty-cli');`

`prettyCLI` is a pre-styled instance of the [sywac](http://sywac.io/) API.  

See the [sywac quickstart](http://sywac.io/docs/) and [config guide](http://sywac.io/docs/sync-config.html) for full usage.

Example:

```
#!/usr/bin/env node
const prettyCLI = require('@tryghost/pretty-cli');


prettyCLI
  .command({
    flags: 'myTask [option]',
    desc: 'Run myTask',
    run: (argv) =>  { ... do something here }
  })
  .parseAndExit();
```

You can also grab a fresh instance of the api with `prettyCLI.Api.get()`.

The style rules used are available at `prettyCLI.styles`.

## Test

- `yarn lint` run just eslint
- `yarn test` run lint && tests

# Copyright & License

Copyright (c) 2018 Ghost Foundation - Released under the [MIT license](LICENSE).
