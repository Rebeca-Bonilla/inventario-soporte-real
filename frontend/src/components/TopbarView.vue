<script setup lang="ts">
defineProps<{ isMobile: boolean }>()
defineEmits(['toggleSidebar'])
</script>

<template>
  <header class="topbar">
    <div class="left">
      <button v-if="isMobile" class="burger" @click="$emit('toggleSidebar')">☰</button>
      <span class="logo">Inventario</span>
    </div>

    <nav v-if="!isMobile" class="menu">
      <RouterLink to="/app/registro">Registro</RouterLink>
      <RouterLink to="/app/inventory">Consulta</RouterLink>
      <RouterLink to="/app/archivados">Archivados</RouterLink>
      <RouterLink to="/app/importacion">Importación</RouterLink>
      <RouterLink to="/app/reportes">Reportes</RouterLink>
      <RouterLink to="/app/historial">Historial</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.topbar {
  height: 64px;
  background: #4f77c9;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.burger {
  font-size: 22px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.menu {
  display: flex;
  gap: 12px;
}

.menu a {
  background: #eaeaea;
  color: black;
  padding: 6px 14px;
  border-radius: 6px;
  text-decoration: none;
}

.menu a.router-link-active {
  background: #d0d0d0;
}
</style>
