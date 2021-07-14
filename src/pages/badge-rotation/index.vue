<template>
  <div ref="container" class="badge-container">
    <div class="badge" :style="badgeStyle">
      <div class="front"></div>
      <div class="back"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePointerSwipe } from '@vueuse/core'
import { createInertiaAnimation } from '~/pages/badge-rotation/index'

const rotateY = ref(0)
const badgeStyle = computed(() => {
  return {
    transform: `rotateY(${rotateY.value}deg)`,
  }
})

const inertiaAnimation = createInertiaAnimation({
  getRotation() {
    return rotateY.value
  },
  setRotation(deltaRotation) {
    rotateY.value -= deltaRotation
  },
})

const container = ref(null)
let touchStartTime = 0
let oldRotationY = 0
const { distanceX } = usePointerSwipe(container, {
  threshold: 0,
  onSwipeStart(e) {
    console.debug('[Swipe Start]', 'distanceX:', distanceX.value)

    inertiaAnimation.playAnimation = false
    touchStartTime = new Date().valueOf()
    oldRotationY = rotateY.value
  },
  onSwipe(e) {
    console.debug('[Swipe]', 'distanceX:', distanceX.value)

    rotateY.value = oldRotationY - distanceX.value
  },
  onSwipeEnd(e) {
    console.debug('[Swipe End]', 'distanceX:', distanceX.value)

    const touchEndTime = new Date().valueOf()
    const deltaTime = touchEndTime - touchStartTime

    const speed = distanceX.value / deltaTime
    inertiaAnimation.playAnimation = true
    inertiaAnimation.speed = speed
    inertiaAnimation.run()
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
