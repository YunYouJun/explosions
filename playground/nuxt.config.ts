import path from 'node:path'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  ssr: false,

  alias: {
    '@explosions/*': `${path.resolve(__dirname, '../packages')}/*/src/index.ts`,
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',

    '@yunlefun/vue/nuxt',
    '@nuxtjs/i18n',

    'nuxt-monaco-editor',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  components: {
    dirs: [
      { path: '~/components', prefix: '', pathPrefix: false, priority: 10 },
    ],
  },

  pwa,

  devtools: {
    enabled: true,
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.yml',
      },
      {
        code: 'zh-CN',
        file: 'zh-CN.yml',
      },
    ],
    lazy: true,
    langDir: '../locales',
    defaultLocale: 'zh-CN',
  },

  compatibilityDate: '2024-10-06',
})
