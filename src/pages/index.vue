<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import indexes from '~/../meta/indexes.json'
const { t } = useI18n()

const router = useRouter()

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

    <div class="my-5 grid grid-cols-3 gap-5">
      <ExplosionCard
        v-for="(explosion, i) in explosionList"
        :key="i"
        :explosion="explosion"
        @click="router.push(explosion.name)"
      ></ExplosionCard>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
