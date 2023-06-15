import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLifeStore = defineStore('life', () => {
  return {
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLifeStore, import.meta.hot))
