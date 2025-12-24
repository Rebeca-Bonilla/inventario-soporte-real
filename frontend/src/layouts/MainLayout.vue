<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SidebarView from '../components/SidebarView.vue'
import TopbarView from '../components/TopbarView.vue'

const isMobile = ref(false)
const sidebarOpen = ref(true)

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
    <TopbarView
      :isMobile="isMobile"
      @toggleSidebar="sidebarOpen = !sidebarOpen"
    />

    <div class="body">
      <SidebarView
        :isMobile="isMobile"
        :open="sidebarOpen"
        @close="sidebarOpen = false"
      />

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
}

.body {
  flex: 1;
  display: flex;
}

.content {
  flex: 1;
  padding: 24px;
  background: #f4f6f9;
}
</style>
