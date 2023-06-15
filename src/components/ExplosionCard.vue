<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'

const props = defineProps<{
  explosion: {
    emoji?: string
    name?: string
    color?: string
    description?: string
    textColor?: string
  }
}>()

const { explosion } = toRefs(props)

const cardStyle = computed(() => {
  if (explosion.value.color) {
    const color = new TinyColor(explosion.value.color)
    const textColor = explosion.value.textColor || (color.isDark() ? 'white' : 'black')
    return {
      '--tw-gradient-stops': `${color.spin(55).toHexString()}, ${explosion.value.color}`,
      'color': textColor,
    }
  }
  else {
    return {
      backgroundColor: 'rgba(255,255,255,0.6)',
    }
  }
})
</script>

<template>
  <div
    class="
      explosion-card
      shadow
      transition-shadow
      duration-300
      p-5
      cursor-pointer
      w-90
      rounded
    "
    hover="shadow-md"
    bg="opacity-80 gradient-to-br"
    m="2"
    :style="cardStyle"
  >
    <div v-if="explosion.emoji">
      {{ explosion.emoji }}
    </div>
    <h2 class="text-lg" font="black" m="2">
      {{ explosion.name || '忘记叫啥了' }}
    </h2>
    <small class="block" p="2" v-html="explosion.description || '说点什么好呢'" />

    <router-link class="icon-btn" m="x-1" :to="`/${explosion.name}`">
      <i-ri-eye-line />
    </router-link>

    <router-link class="icon-btn" m="x-1" :to="`/${explosion.name}/about`">
      <i-ri-information-line />
    </router-link>
    <slot />
  </div>
</template>
