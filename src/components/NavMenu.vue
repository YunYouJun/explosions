<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BottomMenuItem } from '@yunlefun/vue-components'
import pkg from '~/../package.json'

const { t } = useI18n()

const app = useAppStore()

const items = computed<BottomMenuItem[]>(() => [
  {
    icon: 'i-ri-home-line',
    activeIcon: 'i-ri-home-fill',
    title: t('button.home'),
    to: '/',
  },
  // {
  //   icon: 'i-ri-compass-2-line',
  //   title: '发现',
  //   to: '/discover',
  // },
  // {
  //   icon: 'i-ri-user-line',
  //   title: '我的',
  //   to: '/user',
  // },
  {
    icon: 'i-ri-settings-line',
    activeIcon: 'i-ri-settings-fill',
    title: '设置',
    to: '/settings',
  },
  {
    icon: 'i-ri-information-line',
    activeIcon: 'i-ri-information-fill',
    title: '关于',
    to: '/about',
  },
  {
    icon: 'i-ri-github-line',
    activeIcon: 'i-ri-github-fill',
    title: 'GitHub',
    onClick: () => {
      window.open(pkg.repository.url, '_blank')
    },
  },
])

const router = useRouter()
function onClick(item: BottomMenuItem) {
  app.bottomMenu.activeTab = item.to || ''
  if (item.to)
    router.push(item.to)
  else
    item.onClick?.()
}
</script>

<template>
  <YlfBottomMenu fixed bottom-0 left-0 right-0 shadow>
    <YlfBottomMenuItem
      v-for="item in items"
      :key="item.to"
      :item="item"
      :active="app.bottomMenu.activeTab === item.to"
      @click="onClick"
    />
  </YlfBottomMenu>
</template>
