<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { isDark, toggleDark } from '~/composables'
import pkg from '~/../package.json'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="text-xl my-4">
    <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
      <i-carbon-campsite />
    </router-link>

    <button
      class="icon-btn mx-2 !outline-none"
      :title="t('button.toggle_dark')"
      @click="
        () => {
          toggleDark()
        }
      "
    >
      <i-carbon-moon v-if="isDark" />
      <i-carbon-sun v-else />
    </button>

    <a
      class="icon-btn mx-2"
      :title="t('button.toggle_langs')"
      @click="toggleLocales"
    >
      <i-carbon-language />
    </a>

    <router-link class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <i-carbon-dicom-overlay />
    </router-link>

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      :href="pkg.repository.url"
      target="_blank"
      title="GitHub"
    >
      <i-carbon-logo-github />
    </a>
  </nav>
</template>
