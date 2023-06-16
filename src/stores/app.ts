import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const bottomMenu = useStorage('ylf:bottom-menu', {
    activeTab: '/',
  })

  return {
    bottomMenu,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
