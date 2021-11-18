<template>
  <div
    class="inline-grid cursor-pointer bg-opacity-80"
    :bg="props.initStatus ? 'black' : 'white'"
    @click="handleSquareClick"
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

const emit = defineEmits<{
  (e: 'handleSquareClick', x: number, y: number, value: boolean): void
}>()

const isAlive = ref(props.initStatus)

const handleSquareClick = () => {
  isAlive.value = !isAlive.value
  emit('handleSquareClick', props.x, props.y, isAlive.value)
}
</script>
