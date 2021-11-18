<template>
  <VueAboutMe :copyright="copyright" />
</template>

<script lang="ts" setup>
import VueAboutMe from "vue-about-me";
import "vue-about-me/style.css";

import pkg from "~/../package.json";

const copyright = {
  name: "Explosions",
  repo: pkg.name,
  author: pkg.author.name,
  color: "rgb(194, 68, 72)",
};
</script>
