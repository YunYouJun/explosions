<script lang="ts" setup>
// import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales: string[] = []
  // const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  // await loadLanguageAsync(newLocale)
  locale.value = newLocale
}

const isChinese = computed(() => locale.value === 'zh-CN')
</script>

<template>
  <button
    shadow
    :class="isChinese ? 'bg-blue-900' : 'bg-yellow-400'"
    class="relative h-[38px] w-[74px] inline-flex shrink-0 cursor-pointer border-2 border-transparent rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    @click="toggleLocales"
  >
    <span class="sr-only">Toggle Dark Mode</span>
    <span
      :title="t('button.toggle_langs')"
      aria-hidden="true"
      class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      dark="text-gray-700"
      :class="isChinese ? 'translate-x-9' : 'translate-x-0'"
      inline-flex
      justify="center" items="center"
    >
      <div i="ri-translate" :class="isChinese ? '-scale-x-100' : ''" />
    </span>
  </button>

  <br>
  <div my="5">
    {{ t('button.toggle_langs') }}
  </div>
</template>
