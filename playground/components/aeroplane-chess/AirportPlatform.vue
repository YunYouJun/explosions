<script lang="ts" setup>
defineProps<{
  color: string
}>()

const size = ref(24)

// const styles = computed(() => {
//   return {
//     backgroundColor: props.color,
// })
</script>

<template>
  <div class="inline-grid col-span-4 row-span-4" :class="`bg-${color}-500`" grid="~ cols-2 rows-2" :w="size" :h="size">
    <div v-for="i in 4" :key="i" bg="white" rounded="full" m="3" />
  </div>
</template>
