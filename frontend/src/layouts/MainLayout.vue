<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SidebarView from '../components/SidebarView.vue'
import TopbarView from '../components/TopbarView.vue'

const isMobile = ref(false)
const sidebarOpen = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth < 1024
  sidebarOpen.value = !isMobile.value
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
</script>

<template>
  <div class="layout">
    <SidebarView
      :isMobile="isMobile"
      :open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <div class="content">
      <TopbarView
        :isMobile="isMobile"
        @toggleSidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="page">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: auto;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page {
  flex: 1;
  padding: 24px;
  background: #f5f7fb;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
