import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
    // {
    //   file: 'dist/index.cjs.js',
    //   format: 'cjs',
    // },
    // {
    //   file: 'dist/index.esm.js',
    //   format: 'es',
    // },
  ],
  plugins: [typescript()],
})
