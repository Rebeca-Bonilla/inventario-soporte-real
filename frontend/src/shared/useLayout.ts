import { ref, computed, onMounted, onUnmounted } from 'vue'

const sidebarOpen = ref(false)
const sidebarPinned = ref(false)
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 1024)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function pinSidebar() {
  sidebarPinned.value = true
  sidebarOpen.value = true
}

function unpinSidebar() {
  sidebarPinned.value = false
}

function updateWidth() {
  windowWidth.value = window.innerWidth

  // si regresamos a desktop → reset
  if (windowWidth.value >= 1024) {
    sidebarOpen.value = true
    sidebarPinned.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
  updateWidth()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

export function useLayout() {
  return {
    isMobile,
    sidebarOpen,
    sidebarPinned,
    toggleSidebar,
    pinSidebar,
    unpinSidebar,
  }
}
