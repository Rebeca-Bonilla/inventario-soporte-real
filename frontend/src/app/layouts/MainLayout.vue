<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TopbarView from '@/components/TopbarView.vue'
import SidebarView from '@/components/SidebarView.vue'

const route = useRoute()

const isMobile = ref(false)
const sidebarOpen = ref(false)
const sidebarPinned = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth < 1100

  // en desktop siempre visible
  if (!isMobile.value) {
    sidebarOpen.value = true
    sidebarPinned.value = false
  }
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})

// cerrar sidebar al navegar SOLO si es móvil y no está anclado
const handleNavigate = () => {
  if (isMobile.value && !sidebarPinned.value) {
    sidebarOpen.value = false
  }
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const togglePin = () => {
  sidebarPinned.value = !sidebarPinned.value
}
</script>

<template>
  <div class="layout">
    <!-- TOPBAR -->
    <TopbarView :isMobile="isMobile" @toggleSidebar="toggleSidebar" />

    <div class="body">
      <!-- SIDEBAR -->
      <SidebarView
        v-if="sidebarOpen"
        :isMobile="isMobile"
        :pinned="sidebarPinned"
        @togglePin="togglePin"
        @navigate="handleNavigate"
      />

      <!-- CONTENT -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: #f5f7fa;
}
</style>
