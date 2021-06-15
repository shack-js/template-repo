import { tmpdir } from 'os'
import { join } from 'path'
import getConfig, { getEjsOption } from './get-config.mjs'
import tmpl from './template.mjs'
import fs from 'fs-extra'
import { execFile } from 'child_process'
import promisify from './promisify.mjs'

export default async (config = {}, template = '', target = '', log = console.log) => {
  let gitPath = join(tmpdir(), 'tmpl_' + (new Date() + 1))
  log('start downloading...', gitPath)
  if (!template) throw 'template needs to be a git repo'
  await promisify(execFile)('git', ['clone', template, gitPath])

  // recursively template
  log('start templating...', gitPath)
  let conf = { ...getConfig(gitPath), ...config }
  await tmpl(join(gitPath, 'template'), target
    , conf, await getEjsOption(gitPath))

  // Manual cleanup
  await fs.remove(gitPath)
}

