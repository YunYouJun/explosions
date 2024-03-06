import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { logger } from './logger'
import { formatJSON } from './utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const pagesFolder = resolve(__dirname, '../playground/pages')
const folders = fs.readdirSync(pagesFolder).filter(item => fs.statSync(`${pagesFolder}/${item}`).isDirectory())

const indexes = folders.map((folder) => {
  let info = {
    name: folder,
  }
  const aboutMdPath = `${pagesFolder}/${folder}/about.md`
  try {
    const md = fs.readFileSync(aboutMdPath, 'utf-8')
    const { data: frontmatter } = matter(md)
    info = Object.assign(info, frontmatter)
  }
  catch (e) {
    if (e.code === 'ENOENT')
      logger.error(`${aboutMdPath} 文件不存在！`)
    else
      console.log(e)
  }

  return info
})

export function run() {
  fs.writeFileSync(resolve(__dirname, '../packages/metadata/indexes.json'), formatJSON(indexes))
  logger.info(`Updated ${pagesFolder}/indexes.json.`)
}

run()
