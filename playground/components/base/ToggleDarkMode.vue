<script lang="ts" setup>
import { Switch } from '@headlessui/vue'

const color = useColorMode()
const isDark = computed(() => color.value === 'dark')

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}

const { t } = useI18n()
</script>

<template>
  <div class="py-16">
    <Switch
      v-model="isDark"
      shadow
      :class="isDark ? 'bg-blue-900' : 'bg-yellow-400'"
      class="relative h-[38px] w-[74px] inline-flex shrink-0 cursor-pointer border-2 border-transparent rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="sr-only">Toggle Dark Mode</span>
      <span
        :title="t('button.toggle_dark')"
        aria-hidden="true"
        class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        dark="text-gray-700"
        :class="isDark ? 'translate-x-9' : 'translate-x-0'"
        inline-flex
        justify="center" items="center"
      >
        <div i="ri-sun-line dark:ri-moon-line" />
      </span>
    </Switch>
  </div>
</template>
