import { tmpdir } from 'os'
import { join } from 'path'
import getConfig, { getEjsOption } from './get-config'
import tmpl from './template'
import * as fs from 'fs-extra'
import { execFile } from 'child_process'
import promisify from './promisify'

export default async (config = {}, template = '', target = '', log = console.log) => {
  // @ts-ignore
  let gitPath = join(tmpdir(), 'tmpl_' + (1 * new Date())) 
  log('start downloading...')
  if (!template) throw 'template needs to be a git repo'
  await promisify(execFile)('git', ['clone', template, gitPath])

  // recursively template
  log('start templating...')
  let conf = { ...getConfig(gitPath), ...config }
  await tmpl(join(gitPath, 'template'), target
    , conf, await getEjsOption(gitPath))

  // Manual cleanup
  await fs.remove(gitPath)
}

