<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'

const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 25,
    mass: 2,
  },
}

const triangleRef = ref()
const squareRef = ref()
const circleRef = ref()

useMotion(triangleRef, {
  initial: { x: 800, y: 600, scale: 2, rotate: 100 },
  enter: final,
})

useMotion(squareRef, {
  initial: { x: 1000, y: -200, scale: 1.5, rotate: -50 },
  enter: final,
})

useMotion(circleRef, {
  initial: { y: 700, x: -100, scale: 2 },
  enter: final,
})

const afxLogoSize = useStorage('afx-logo-size', 6)

const elementSize = computed(() => `${afxLogoSize.value}rem`)

function setElementSizeNumber(e: any) {
  afxLogoSize.value = e.target.value
  localStorage.setItem('afx-logo-size', e.target.value)
}
</script>

<template>
  <div class="afx-container relative p-10 text-center">
    <div
      class="h-120 inline-flex items-center justify-between"
      :style="{ width: `calc(${elementSize} * 4)` }"
    >
      <div
        ref="triangleRef"
        class="afx-logo-triangle"
        :style="{
          width: `calc(0.4rem + ${elementSize})`,
          height: `calc(0.4rem + ${elementSize})`,
        }"
      />
      <div
        ref="squareRef"
        class="afx-logo-square from-amber-500 to-amber-200 bg-gradient-to-t"
        :style="{
          width: elementSize,
          height: elementSize,
        }"
      />
      <div
        ref="circleRef"
        class="afx-logo-circle rounded-1/2 from-rose-600 to-rose-400 bg-gradient-to-t"
        :style="{
          width: elementSize,
          height: elementSize,
        }"
      />
    </div>
  </div>
  <h2 class="afx-title text-8xl font-thin">
    A F X
  </h2>
  <div class="mt-4 font-light">
    <span>Size:</span>
    <input
      v-model="afxLogoSize"
      type="number"
      class="exp-input"
      @change="setElementSizeNumber"
    >
    <span class="ml-2">rem</span>
  </div>
</template>

<style lang="scss">
main {
  overflow: hidden;
  min-height: 100vh;
}

.afx-title {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}

.afx-logo-triangle {
  clip-path: polygon(50% 7%, 0% 100%, 100% 100%);
  background-image: linear-gradient(to top, #2563eb, #60a5fa);
}
</style>
