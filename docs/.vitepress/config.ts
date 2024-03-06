import path from 'node:path'
import { defineConfig } from 'vitepress'

import Components from 'unplugin-vue-components/vite'
import Glsl from 'unplugin-glsl/vite'
import UnoCSS from 'unocss/vite'

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
      {
        text: 'Examples',
        items: [
          { text: 'Fish Pond', link: '/examples/fish-pond/' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YunYouJun/explosions' },
    ],
  },

  vite: {
    plugins: [
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
