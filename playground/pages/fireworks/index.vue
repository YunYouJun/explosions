<script lang="ts" setup>
import { onMounted } from 'vue'
import { createFireworks } from '../../../packages/fireworks/src'

onMounted(() => {
  createFireworks({
    selector: 'canvas.fireworks',
    colors: ['#66A7DD', '#3E83E1', '#214EC2'],
  })
})
</script>

<template>
  <canvas class="fireworks" />
  <h2>
    Click Somewhere to See Fireworks
  </h2>
</template>

<style>
canvas.fireworks {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  pointer-events: none;
}
</style>
