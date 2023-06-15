<script setup lang="ts">
import { computed } from 'vue'

const cubeStyle = computed(() => {
  return {
    transform: 'rotate3d(2, -1, -1, -0.2turn)',
  }
})
</script>

<template>
  <main class="container">
    <div id="example-element" class="transition-all" :style="cubeStyle">
      <div class="face front">
        1
      </div>
      <div class="face back">
        2
      </div>
      <div class="face right">
        3
      </div>
      <div class="face left">
        4
      </div>
      <div class="face top">
        5
      </div>
      <div class="face bottom">
        6
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

#default-example {
  background: linear-gradient(skyblue, khaki);
  perspective: 550px;
}
#example-element {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
}
.face {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: inherit;
  font-size: 60px;
  color: #fff;
}
.front {
  background: rgba(90, 90, 90, 0.7);
  transform: translateZ(50px);
}
.back {
  background: rgba(0, 210, 0, 0.7);
  transform: rotateY(180deg) translateZ(50px);
}
.right {
  background: rgba(210, 0, 0, 0.7);
  transform: rotateY(90deg) translateZ(50px);
}
.left {
  background: rgba(0, 0, 210, 0.7);
  transform: rotateY(-90deg) translateZ(50px);
}
.top {
  background: rgba(210, 210, 0, 0.7);
  transform: rotateX(90deg) translateZ(50px);
}
.bottom {
  background: rgba(210, 0, 210, 0.7);
  transform: rotateX(-90deg) translateZ(50px);
}
</style>
