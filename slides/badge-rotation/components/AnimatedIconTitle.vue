<script lang="ts" setup>
defineProps<{
  title: string
}>()

const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2,
  },
}
</script>

<template>
  <h1>
    <uiw-stop-o v-motion :initial="{ y: -100, x: -100, scale: 2 }" :enter="final" class="inline" />
    <span>{{ title }}</span>
  </h1>
</template>
