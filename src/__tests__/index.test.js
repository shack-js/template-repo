import tpl from '../index.mjs'
import { join, resolve, dirname } from 'path'
import fs from 'fs-extra'

test('mainly works', async () => {
  const name = 'test-app'
  let target = join(resolve(dirname('')), name)
  await fs.ensureDir(target)
  await fs.remove(target)
  await tpl({ name }, `https://github.com/shack-js/template-basic.git`, target)
  let pkg = await fs.readJSON(join(target, 'package.json'))
  expect(pkg.name).toBe(name)
}, 1000 * 60 * 5)