import { reactive } from 'vue'

export const uiStore = reactive({
  isMobile: false,
  sidebarOpen: false,
  sidebarPinned: false,
})
