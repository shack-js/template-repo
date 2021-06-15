import tpl from '../index.mjs'
import { join } from 'path'
import fs from 'fs-extra'

test('mainly works', async () => {
  const name = 'test-app'
  let target = `./${name}`
  await tpl({ name }, `https://github.com/shack-js/template-basic.git`, target)
  let pkg = await fs.readJSON(join(target, 'package.json'))
  expect(pkg.name).toBe(name)
}, 1000 * 60 * 5)