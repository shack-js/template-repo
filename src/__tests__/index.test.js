import tpl from '../index.mjs'
import { join, resolve } from 'path'
import fs from 'fs-extra'

test('mainly works', async () => {
  const name = 'test-app'
  let target = resolve(name)
  await fs.remove(target)
  await tpl({ name }, `shack-js/template-basic`, target)
  let pkg = await fs.readJSON(join(target, 'package.json'))
  expect(pkg.name).toBe(name)
},60000*5)