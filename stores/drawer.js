import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  const isOpen = ref(false)
  
  function toggleDrawer() {
    isOpen.value = !isOpen.value
  }
  
  function setDrawerState(state) {
    isOpen.value = state
  }
  
  function closeDrawer() {
    isOpen.value = false
  }

  function openDrawer() {
    isOpen.value = true
  }
  
  return {
    isOpen,
    toggleDrawer,
    setDrawerState,
    closeDrawer,
    openDrawer
  }
})