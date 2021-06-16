# template-repo

create projects from template repo

## usage

```
npm i @shack-js/template-repo
```

```
import tpl from '@shack-js/template-repo'

...
  await tpl(
    { name: 'abc' },  // config
    `https://github.com/shack-js/template-basic.git`, // repo of template 
    target // generate to path
  )
...

```

## template standard

```
+-- defaults.json // default values
+-- ejs.json // ejs options
+-- template // files to be templated
     +-- ...
          +-- ...
     +-- ...
```

