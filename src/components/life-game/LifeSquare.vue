<template>
  <div
    class="inline-grid cursor-pointer bg-opacity-80"
    :bg="props.initStatus ? 'black' : 'white'"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * 初始状态
   */
  initStatus: boolean
  x: number
  y: number
}>()
</script>
