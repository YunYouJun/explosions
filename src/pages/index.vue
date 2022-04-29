<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import indexes from '~/../meta/indexes.json'
const { t } = useI18n()

const explosionList = indexes
</script>

<template>
  <div>
    <p class="text-8xl">
      💥
    </p>
    <p class="text-4xl m-6">
      (∩ ◕_▩ )⊃━☆ Explosion！
    </p>
    <p>
      <em class="text-lg opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div flex="~ wrap" justify="center" m="t-4">
      <ExplosionCard
        v-for="(explosion, i) in explosionList"
        :key="i"
        :explosion="explosion"
      />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
