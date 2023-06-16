import path from 'node:path'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'

import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import Markdown from 'vite-plugin-vue-markdown'
import UnoCSS from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

import { componentsDir } from '@yunlefun/vue-components'

const markdownWrapperClasses = 'markdown-body m-auto text-left'

export default defineConfig(({ mode }) => {
  const commonConfig: UserConfig = {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '@explosions/': `${path.resolve(__dirname, 'packages')}/`,
      },
    },

    // build: {
    //   rollupOptions: {
    //     external: ['p5'],
    //   },
    // },
  }

  if (mode === 'lib') {
    // todo
    return {
      ...commonConfig,
    }
  }
  else {
    return {
      ...commonConfig,
      plugins: [
        Vue({
          include: [/\.vue$/, /\.md$/],
        }),

        // https://github.com/hannoeru/vite-plugin-pages
        Pages({
          extensions: ['vue', 'md'],
        }),

        // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
        Layouts(),

        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
          imports: [
            'vue',
            'vue-router',
            'vue-i18n',
            '@vueuse/head',
            '@vueuse/core',
          ],
          dts: 'src/auto-imports.d.ts',
          dirs: [
            'src/composables',
            'src/stores',
          ],
          vueTemplate: true,
        }),

        // https://github.com/antfu/unplugin-vue-components
        Components({
          // allow auto load markdown components under `./src/components/`
          dirs: ['src/components', componentsDir],
          extensions: ['vue', 'md'],
          // allow auto import and register components used in markdown
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: 'src/components.d.ts',
        }),

        // https://github.com/antfu/unplugin-icons
        Icons({
          autoInstall: true,
        }),

        UnoCSS(),

        // https://github.com/antfu/vite-plugin-vue-markdown
        // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
        Markdown({
          wrapperClasses: markdownWrapperClasses,
          headEnabled: true,
          markdownItSetup(md) {
            // https://prismjs.com/
            md.use(Prism)
            md.use(LinkAttributes, {
              pattern: /^https?:\/\//,
              attrs: {
                target: '_blank',
                rel: 'noopener',
              },
            })
          },
        }),

        // https://github.com/antfu/vite-plugin-pwa
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
          manifest: {
            name: 'Vitesse',
            short_name: 'Vitesse',
            theme_color: '#ffffff',
            icons: [
              {
                src: '/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: '/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
              },
              {
                src: '/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
              },
            ],
          },
        }),

        // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
        VueI18n({
          runtimeOnly: true,
          compositionOnly: true,
          fullInstall: true,
          include: [path.resolve(__dirname, 'locales/**')],
        }),
      ],

      // https://github.com/antfu/vite-ssg
      ssgOptions: {
        script: 'async',
        formatting: 'minify',
        crittersOptions: {
          reduceInlineStyles: false,
        },
        onFinished() {
          generateSitemap()
        },
      },

      ssr: {
        // TODO: workaround until they support native ESM
        noExternal: ['workbox-window', /vue-i18n/],
      },
    }
  }
})
