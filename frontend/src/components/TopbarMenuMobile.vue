<script setup lang="ts">
import { uiStore } from '@/shared/ui.store'
</script>

<template>
  <header class="topbar">
    <button
      v-if="uiStore.isMobile"
      class="hamburger"
      @click="uiStore.sidebarOpen = !uiStore.sidebarOpen"
    >
      ☰
    </button>

    <h1>Inventario</h1>

    <nav v-if="!uiStore.isMobile" class="menu">
      <RouterLink to="/app/registro">Registro</RouterLink>
      <RouterLink to="/app/consulta">Consulta</RouterLink>
      <RouterLink to="/app/archivados">Archivados</RouterLink>
      <RouterLink to="/app/importacion">Importación</RouterLink>
      <RouterLink to="/app/reportes">Reportes</RouterLink>
      <RouterLink to="/app/historial">Historial</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.topbar {
  background: #4a74c9;
  color: white;
  display: flex;
  align-items: center;
  padding: 12px;
}
.hamburger {
  margin-right: 12px;
  font-size: 22px;
}
.menu a {
  margin: 0 8px;
  color: white;
}
</style>
