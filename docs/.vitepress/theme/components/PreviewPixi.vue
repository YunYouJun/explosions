<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Application } from 'pixi.js'
import { initPixiApp } from '../utils/pixi'

const props = defineProps<{
  init?: (app: Application) => Promise<void>
}>()

const pixiCanvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  if (!pixiCanvas.value)
    return
  const app = await initPixiApp(pixiCanvas.value)
  await props.init?.(app)
})
</script>

<template>
  <canvas id="pixi-canvas" ref="pixiCanvas" class="h-full w-full bg-black" />
</template>
