import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createExampleFromTemplate } from './example'

yargs(hideBin(process.argv))
  .command('example <name>', 'create pixi example', () => {}, ({
    name,
  }) => {
    createExampleFromTemplate(name)
  })

  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .parse()
