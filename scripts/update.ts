import fs from 'fs'
import { logger } from './logger'
import { formatJSON } from './utils'

export const pagesFolder = 'src/pages'
const folders = fs.readdirSync(pagesFolder).filter(item => fs.statSync(`${pagesFolder}/${item}`).isDirectory())

const indexes = folders.map((folder) => {
  return {
    name: folder,
  }
})

export function run() {
  fs.writeFileSync('meta/indexes.json', formatJSON(indexes))
  logger.info(`Updated ${pagesFolder}/indexes.json.`)
}

run()
