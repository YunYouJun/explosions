<script lang="ts" setup>
import 'vue-about-me/style.css'

import VueAboutMe from 'vue-about-me'
import pkg from '~/../package.json'

const copyright = {
  name: 'Explosions',
  repo: pkg.name,
  author: pkg.author.name,
  color: 'rgb(194, 68, 72)',
}
</script>

<template>
  <hr class="mt-5">
  <VueAboutMe :is-dark="isDark" :copyright="copyright" />
</template>
