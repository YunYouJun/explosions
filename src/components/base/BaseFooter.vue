<template>
  <hr class="mt-5" />
  <VueAboutMe :is-dark="isDark" :copyright="copyright" />
</template>

<script lang="ts" setup>
import VueAboutMe from "vue-about-me";
import "vue-about-me/style.css";

import pkg from "~/../package.json";
import { isDark } from "~/composables";

const copyright = {
  name: "Explosions",
  repo: pkg.name,
  author: pkg.author.name,
  color: "rgb(194, 68, 72)",
};
</script>
