<script setup lang="ts">
defineProps<{ isMobile: boolean }>()
defineEmits(['toggleSidebar'])
</script>

<template>
  <header class="topbar">
    <div class="left">
      <button
        v-if="isMobile"
        class="burger"
        @click="$emit('toggleSidebar')"
      >
        ☰
      </button>

      <!-- LOGO PLACEHOLDER -->
      <div class="logo-box">LOGO</div>
      <span class="title">Inventario</span>
    </div>

    <!-- MENÚ SOLO DESKTOP -->
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
  background: #e11d48;
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

.logo-box {
  width: 80px;
  height: 36px;
  background: #f8fafc;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 6px;
}

.title {
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
  background: #fecdd3;
  color: #111;
  padding: 6px 14px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
}

.menu a.router-link-active {
  background: #fda4af;
}
</style>
