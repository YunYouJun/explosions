<template>
  <div>
    <button
      :class="['btn', 'm-2', swipeType === 'PointSwipe' ? 'active' : '']"
      @click="swipeType = 'PointSwipe'"
    >
      PointerSwipe
    </button>
    <button
      :class="['btn', 'm-2', swipeType === 'Swipe' ? 'active' : '']"
      @click="swipeType = 'Swipe'"
    >
      Swipe(Touch)
    </button>
  </div>
  <div ref="container" class="badge-container">
    <div class="badge" :style="badgeStyle">
      <div class="front"></div>
      <div class="back"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// import { usePointerSwipe } from '@vueuse/core'
import { usePointerSwipe, useSwipe } from '@vueuse/core'
import { createInertiaAnimation } from '@explosions/badge-rotation'

const rotateY = ref(0)
const badgeStyle = computed(() => {
  return {
    transform: `rotateY(${rotateY.value}deg)`,
  }
})

const inertiaAnimation = createInertiaAnimation({
  speed: 0.2,
  getRotation() {
    return rotateY.value
  },
  setRotation(deltaRotation) {
    rotateY.value -= deltaRotation
  },
})

const swipeType = ref('PointSwipe')
const container = ref<HTMLDivElement | null>(null)
let touchStartTime = 0
let oldRotationY = 0

/**
 * 触摸开始
 */
function onTouchStart(distanceX: number, type = 'Swipe') {
  console.debug(`[${type} Start]`, 'distanceX:', distanceX)

  inertiaAnimation.playAnimation = false
  touchStartTime = new Date().valueOf()
  oldRotationY = rotateY.value
}

function onTouchMove(distanceX: number, type = 'Swipe') {
  console.debug(`[${type}]`, 'distanceX:', distanceX)

  rotateY.value = oldRotationY - distanceX
}

function onTouchEnd(distanceX: number, type = 'Swipe') {
  console.debug(`[${type} End]`, 'distanceX:', distanceX)

  const touchEndTime = new Date().valueOf()
  const deltaTime = touchEndTime - touchStartTime

  const speed = distanceX / deltaTime
  inertiaAnimation.playAnimation = true
  inertiaAnimation.speed = speed
  inertiaAnimation.run()
}

const { distanceX } = usePointerSwipe(container, {
  threshold: 10,
  onSwipeStart(e) {
    if (swipeType.value !== 'PointSwipe') return
    onTouchStart(distanceX.value, 'PointerSwipe')
  },
  onSwipe(e) {
    if (swipeType.value !== 'PointSwipe') return
    onTouchMove(distanceX.value, 'PointerSwipe')
  },
  onSwipeEnd(e) {
    if (swipeType.value !== 'PointSwipe') return
    onTouchEnd(distanceX.value, 'PointerSwipe')
  },
})

const { lengthX } = useSwipe(container, {
  onSwipeStart(e) {
    if (swipeType.value !== 'Swipe') return
    onTouchStart(lengthX.value)
  },
  onSwipe(e) {
    if (swipeType.value !== 'Swipe') return
    onTouchMove(lengthX.value)
  },
  onSwipeEnd(e) {
    if (swipeType.value !== 'Swipe') return
    onTouchEnd(lengthX.value)
  },
})

onMounted(() => {
  inertiaAnimation.run()

  container.value?.addEventListener('touchcancel', () => {
    console.debug('[Swipe Cancel]', 'distanceX:', distanceX.value)

    const touchEndTime = new Date().valueOf()
    const deltaTime = touchEndTime - touchStartTime

    const speed = distanceX.value / deltaTime
    inertiaAnimation.playAnimation = true
    inertiaAnimation.speed = speed
    inertiaAnimation.run()
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
