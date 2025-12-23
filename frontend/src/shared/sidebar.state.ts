import { ref } from 'vue'

export const isSidebarOpen = ref(false)
export const isSidebarPinned = ref(false)

export function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

export function togglePin() {
  isSidebarPinned.value = !isSidebarPinned.value
}

export function closeSidebarIfNotPinned() {
  if (!isSidebarPinned.value) {
    isSidebarOpen.value = false
  }
}
