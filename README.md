# template-repo

create projects from template repo

## usage

```
npm i @shack-js/template-repo
```

```
import tpl from '../index.mjs'

...
  await tpl(
    { name: 'abc' },  // config
    `https://github.com/shack-js/template-basic.git`, // repo of template 
    target // generate to path
  )
...

```