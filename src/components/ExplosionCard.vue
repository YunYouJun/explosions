<template>
  <div
    class="
      explosion-card
      shadow
      hover:shadow-md
      transition-shadow
      duration-300
      p-5
      border
      cursor-pointer
    "
  >
    <div>
      {{ explosion.name }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  explosion: {
    type: Object,
    default() {
      return {
        name: '',
      }
    },
  },
})

const { explosion } = toRefs(props)
</script>
