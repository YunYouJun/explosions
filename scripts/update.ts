import fs from 'fs'
import matter from 'gray-matter'
import { logger } from './logger'
import { formatJSON } from './utils'

export const pagesFolder = 'src/pages'
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
  catch {
    logger.error(`${aboutMdPath} 不存在！`)
  }

  return info
})

export function run() {
  fs.writeFileSync('meta/indexes.json', formatJSON(indexes))
  logger.info(`Updated ${pagesFolder}/indexes.json.`)
}

run()
