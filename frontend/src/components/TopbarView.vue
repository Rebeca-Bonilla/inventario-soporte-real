<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ isMobile: boolean }>()
defineEmits(['toggleSidebar'])

const router = useRouter()
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

      <span class="logo" @click="router.push('/app/dashboard')">
        Inventario
      </span>
    </div>

    <!-- MENÚ SOLO EN DESKTOP -->
    <nav v-if="!isMobile" class="menu">
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
  height: 64px;
  background: #1e40af; /* azul profesional */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  cursor: pointer;
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
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.menu a.router-link-active {
  background: white;
  color: #1e40af;
}
</style>
