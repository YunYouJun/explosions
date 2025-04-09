<script lang="ts" setup>
import { VueAboutMe } from 'vue-about-me'

import pkg from '~/../package.json'
import 'vue-about-me/style.css'

const copyright = {
  name: 'Explosions',
  repo: `YunYouJun/${pkg.name}`,
  author: pkg.author.name,
  color: 'rgb(194, 68, 72)',
}

const color = useColorMode()
const isDark = computed(() => color.value === 'dark')
</script>

<template>
  <hr my="8" op="20">
  <VueAboutMe :is-dark="isDark" :copyright="copyright" />
</template>
