<script setup lang="ts">
import { indexes } from '../../../packages/metadata/src'

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
    <div>
      <em class="text-lg opacity-75">{{ t('intro.desc') }}</em>
    </div>

    <RouterLink
      class="my-4 m-auto max-w-64 flex justify-center items-center text-lg p-4 shadow-lg bg-blue-500 text-white rounded-lg"
      to="/pixi/play"
    >
      Pixi Playground
    </RouterLink>

    <hr my="8" op="20">

    <div flex="~ wrap" justify="center" m="t-4">
      <ExplosionCard
        v-for="(explosion, i) in explosionList"
        :key="i"
        :explosion="explosion"
      />
    </div>
  </div>
</template>
