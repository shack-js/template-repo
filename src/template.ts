import * as fs from 'fs-extra'
import { render } from 'ejs'
import { join } from 'path'

export default async function tmpl(from, to, conf = {}, ejsOption = {}) {
  let fromStat = await fs.stat(from)
  if (fromStat.isFile()) {
    await fs.writeFile(to, render(await fs.readFile(from, 'utf-8'), conf, ejsOption))
  } else {
    await fs.ensureDir(to)
    for (let child of await fs.readdir(from)) {
      await tmpl(join(from, child), join(to, child), conf, ejsOption)
    }
  }
}