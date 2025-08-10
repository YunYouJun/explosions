import { isClient } from '@vueuse/core'
import { MotionPlugin } from '@vueuse/motion'

export default defineNuxtPlugin((nuxtApp) => {
  if (isClient)
    nuxtApp.vueApp.use(MotionPlugin)
})
