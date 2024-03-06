import path from 'node:path'
import fs from 'fs-extra'
import consola from 'consola'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const rootDir = path.resolve(__dirname, '../../')

/**
 * Create a new example from template
 */
export function createExampleFromTemplate(name: string) {
  const pixiExampleDir = path.resolve(rootDir, 'templates/pixi-example')
  const templateFiles = fs.readdirSync(pixiExampleDir)

  const exampleDir = path.resolve(rootDir, `docs/examples/${name}`)
  fs.ensureDirSync(exampleDir)

  for (const file of templateFiles) {
    const filePath = path.resolve(pixiExampleDir, file)
    fs.copyFileSync(filePath, path.resolve(exampleDir, file))
  }

  // write index.md
  const indexMdPath = path.resolve(rootDir, exampleDir, `index.md`)
  fs.writeFileSync(indexMdPath, `---
title: ${name}
---  
`)

  consola.success(`Example ${name} created!`)
  consola.info('Path:', exampleDir)
}
