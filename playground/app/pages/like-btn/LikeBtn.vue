<script lang="ts" setup>
import { animateParticles } from '../../../../packages/like-btn/src'

const clickBtn = ref<HTMLElement | null>(null)

function onClick() {
  animateParticles({
    parent: clickBtn.value!,
    total: 40,
  })
}
</script>

<template>
  <button
    ref="clickBtn" flex="~ col" justify="center" items="center"
    class="pumping" data-text="❤️"
    border="none" relative rounded bg-red px-4 py-2 shadow transition-all cursor="pointer"
    active="px-3 py-1"
    @click="onClick"
  >
    ❤️
  </button>
</template>

<style>
.like-btn-shape {
  --size: 8px;
  position: absolute;
  top: calc(50% - var(--size));
  left: calc(50% - var(--size));
  width: calc(var(--size) * 2);
  height: calc(var(--size) * 2);
  animation: popup var(--d) cubic-bezier(.08, .56, .53, .98) forwards;
}

.square {
  border-radius: 4px;
  background-color: var(--c);
}

.circle {
  border-radius: 50%;
  background-color: var(--c);
}

.triangle {
  width: 0;
  height: 0;
  background-color: none;
  border-top: var(--size) solid transparent;
  border-bottom: calc(var(--size) * 2) solid var(--c);
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
}

.heart {
  --size: 6px;
  background-color: var(--c);
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--c);
  border-radius: 50%;
}

.heart::before {
  left: -50%;
}

.heart::after {
  top: -50%;
}

@keyframes popup {
  0% {
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(var(--x), var(--y)) rotate(var(--r));
  }
}
</style>
../../../packages/like-btn/src
