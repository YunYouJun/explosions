import type { DefaultTheme } from 'vitepress'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

import UnoCSS from 'unocss/vite'
import Glsl from 'unplugin-glsl/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'
import { MarkdownTransform } from './plugins/markdownTransform'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getExamplesSidebar(): DefaultTheme.SidebarItem {
  const examplesDir = path.resolve(__dirname, '../examples')
  const children = fs.readdirSync(examplesDir)
    .filter((name) => {
      return fs.statSync(path.resolve(examplesDir, name)).isDirectory()
    })
    .map((name) => {
      const indexMdPath = path.resolve(examplesDir, name, 'index.md')
      const indexMd = fs.readFileSync(indexMdPath, 'utf-8')
      const title = matter(indexMd).data.title || name

      return {
        text: title,
        link: `/examples/${name}/`,
      }
    })

  return {
    text: 'Examples',
    items: children,
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Explosions',
  description: '(∩ ◕_▩ )⊃━☆ Explosion！',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      getExamplesSidebar(),
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YunYouJun/explosions' },
    ],
  },

  vite: {
    plugins: [
      MarkdownTransform(),
      // splitVendorChunkPlugin(),

      Components({
        dirs: [
          path.resolve(__dirname, 'theme/components'),
        ],
        include: [/\.vue$/, /\.md$/],
      }),
      Glsl(),

      UnoCSS(),
    ],
  },
})
