<template>
  <div class="relative text-center mb-10">
    <div class="w-80 flex justify-between items-end">
      <div
        v-motion
        class="afx-logo-triangle"
        :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
        :enter="final"
      ></div>
      <div
        v-motion
        class="afx-logo-square w-20 h-20 bg-gradient-to-t from-amber-500 to-amber-200"
        :initial="{ x: 800, y: -100, scale: 1.5, rotate: -50 }"
        :enter="final"
      ></div>
      <div
        v-motion
        class="afx-logo-circle rounded-1/2 w-20 h-20 bg-gradient-to-t from-rose-600 to-rose-400"
        :initial="{ y: 500, x: -100, scale: 2 }"
        :enter="final"
      ></div>
    </div>
  </div>
</template>

<style>
.afx-logo-triangle {
  width: 5.4rem;
  height: 5.4rem;
  clip-path: polygon(50% 7%, 0% 100%, 100% 100%);
  background-image: linear-gradient(to top, #2563eb, #60a5fa)
}
</style>
