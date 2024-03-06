import fs from 'node:fs'
import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'custom-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/) || !id.includes('docs/examples/') || !id.endsWith('index.md'))
        return null

      const exampleId = id.split('docs/examples/')[1].split('/index.md')[0]
      if (!exampleId)
        return null

      code = `${code}

<script lang="ts" setup>
import main from './index'
</script>

<PreviewPixi :init="main" />

<<< @/examples/${exampleId}/index.ts
`
      return code
    },

  }
}