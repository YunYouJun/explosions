<template>
  <div class="afx-container relative text-center p-10">
    <div class="h-120 inline-flex justify-between items-center" :style="{width: `calc(${elementSize} * 4)`}">
      <div
        ref="triangleRef"
        class="afx-logo-triangle"
        :style="{
          width: `calc(0.4rem + ${elementSize})`,
          height: `calc(0.4rem + ${elementSize})`
        }"
      ></div>
      <div
        ref="squareRef"
        class="afx-logo-square bg-gradient-to-t from-amber-500 to-amber-200"
        :style="{
          width: elementSize,
          height: elementSize
        }"
      ></div>
      <div
        ref="circleRef"
        class="afx-logo-circle rounded-1/2 bg-gradient-to-t from-rose-600 to-rose-400"
        :style="{
          width: elementSize,
          height: elementSize
        }"
      ></div>
    </div>
  </div>
  <h2 class="afx-title text-8xl font-thin">
    A F X
  </h2>
  <div class="mt-4 font-light">
    <span>Size: </span>
    <input v-model="elementSizeNumber" type="number" class="afx-input" @change="setElementSizeNumber" />
    <span class="ml-2">rem</span>
  </div>
</template>

<script setup lang="ts">
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

const elementSizeNumber = ref(localStorage.getItem('afx-logo-size') || 6)
const elementSize = computed(() => `${elementSizeNumber.value}rem`)

const setElementSizeNumber = (e: any) => {
  elementSizeNumber.value = e.target.value
  localStorage.setItem('afx-logo-size', e.target.value)
}
</script>

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
  background-image: linear-gradient(to top, #2563eb, #60a5fa)
}

.afx-input {
  outline: none;

  border: 1px solid black;
  width: 3.5rem;
  padding: 0.2rem 0.5rem;
}
</style>
