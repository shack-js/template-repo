import { tmpdir } from 'os'
import { join } from 'path'
import download from 'download-git-repo'
import promisify from './promisify.mjs'
import getConfig, { getEjsOption } from './get-config.mjs'
import tmpl from './template.mjs'
import fs from 'fs-extra'

let down = promisify(download)

export default async (config = {}, template = '', target = '', log = console.log) => {
  let gitPath = join(tmpdir(), template)
  log('start downloading...', gitPath)
  if (!template) throw 'template cannot be empty, shall be `repository` ' +
    'format in https://www.npmjs.com/package/download-git-repo'
  await down(template, gitPath)

  // recursively template
  log('start templating...', gitPath)
  let conf = { ...getConfig(gitPath), ...config }
  await tmpl(join(gitPath, 'template'), target
    , conf, await getEjsOption(gitPath))

  // Manual cleanup
  await fs.remove(gitPath)
}

