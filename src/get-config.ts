import * as fs from 'fs-extra'
import { join } from 'path'

const candidates: [string, (x) => {}][] = [
  ['defaults.json', async file => await fs.readJSON(file)]
]

export default async (dir) => {
  for (let [name, fn] of candidates) {
    let file = join(dir, name)
    if (!await fs.pathExists(file)) continue
    return await fn(file)
  }
  return {}
}

export async function getEjsOption(dir) {
  let file = join(dir, 'ejs.json')
  if (!await fs.pathExists(file)) return {}
  return await fs.readJSON(file)
}