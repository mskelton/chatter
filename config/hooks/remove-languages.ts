import { glob } from 'glob'
import fs from 'node:fs/promises'
import path from 'node:path'

export default async function removeLanguages(
  buildPath: string,
  regex: RegExp,
) {
  const cwd = path.join(buildPath, '../..')
  const lproj = await glob('**/*.lproj', { cwd })
  const paths = lproj
    .filter((dir) => !regex.test(dir))
    .map((dir) => path.join(cwd, dir))

  await Promise.all(paths.map((dir) => fs.rm(dir, { recursive: true })))
}
