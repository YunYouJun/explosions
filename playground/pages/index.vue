<script setup lang="ts">
import { indexes } from '@explosions/metadata'

const { t } = useI18n()

const explosionList = indexes

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <p class="text-8xl">
      💥
    </p>
    <p class="m-6 text-4xl">
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
