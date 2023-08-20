<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'

const props = defineProps<{
  explosion: {
    emoji?: string
    name?: string
    color?: string
    /**
     * random gradient from color
     */
    gradient?: boolean
    description?: string
    textColor?: string
  }
}>()

const { explosion } = toRefs(props)

const cardStyle = computed(() => {
  const color = new TinyColor(explosion.value.color)
  const textColor = explosion.value.textColor || (color.isDark() ? 'white' : 'black')

  if (!explosion.value.gradient) {
    return {
      backgroundColor: explosion.value.color,
      color: textColor,
    }
  }

  if (explosion.value.color) {
    return {
      '--un-gradient-stops': `${color.spin(55).toHexString()}, ${explosion.value.color}`,
      'color': textColor,
    }
  }
  else {
    return {
      backgroundColor: 'rgba(255,255,255,0.6)',
      color: textColor,
    }
  }
})
</script>

<template>
  <div
    class="explosion-card w-90 cursor-pointer rounded p-5 shadow transition-shadow duration-300"
    hover="shadow-md"
    bg="opacity-80 gradient-to-br"
    m="2"
    :style="cardStyle"
  >
    <NuxtLink :to="`/${explosion.name}`">
      <div v-if="explosion.emoji">
        {{ explosion.emoji }}
      </div>
      <h2 class="text-lg" font="black" m="2">
        {{ explosion.name || '忘记叫啥了' }}
      </h2>
      <small class="block" p="2" v-html="explosion.description || '说点什么好呢'" />
    </NuxtLink>

    <div>
      <router-link class="icon-btn" m="x-1" :to="`/${explosion.name}`">
        <div i-ri-eye-line />
      </router-link>

      <router-link class="icon-btn" m="x-1" :to="`/${explosion.name}/about`">
        <div i-ri-information-line />
      </router-link>

      <NuxtLink v-if="explosion.npm" 
        class="icon-btn hover:text-red-600" m="x-1" 
        :href="`https://npmjs.com/package/${explosion.npm}`" target="_blank">
        <div i-ri-npmjs-line />
      </NuxtLink>
    </div>

    <slot />
  </div>
</template>
