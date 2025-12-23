<script setup lang="ts">
defineProps<{
  isMobile: boolean
  pinned: boolean
}>()

defineEmits(['togglePin', 'navigate'])
</script>

<template>
  <aside class="sidebar">
    <div class="user">
      <div class="avatar" />
      <strong>Usuario</strong>
      <small>Cargo</small>
    </div>

    <!-- MENÚ SOLO EN MÓVIL -->
    <nav v-if="isMobile" class="nav">
      <RouterLink to="/app/registro" @click="$emit('navigate')">Registro</RouterLink>
      <RouterLink to="/app/inventory" @click="$emit('navigate')">Consulta</RouterLink>
      <RouterLink to="/app/archivados" @click="$emit('navigate')">Archivados</RouterLink>
      <RouterLink to="/app/importacion" @click="$emit('navigate')">Importación</RouterLink>
      <RouterLink to="/app/reportes" @click="$emit('navigate')">Reportes</RouterLink>
      <RouterLink to="/app/historial" @click="$emit('navigate')">Historial</RouterLink>
    </nav>

    <div class="time">
      <span>Tiempo: 00:00</span>
      <span>Límite: 30:00</span>
    </div>

    <div class="actions">
      <button>🏠</button>
      <button>↩</button>
      <button class="logout">⛔</button>
    </div>

    <!-- PIN SOLO EN MÓVIL -->
    <button v-if="isMobile" class="pin" @click="$emit('togglePin')">
      {{ pinned ? '❌ Desanclar' : '📌 Anclar' }}
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: #141b2d;
  color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: gray;
  margin-bottom: 8px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav a {
  background: #ddd;
  color: black;
  padding: 8px;
  border-radius: 6px;
  text-decoration: none;
}

.time {
  color: red;
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  flex: 1;
}

.logout {
  background: red;
  color: white;
}

.pin {
  margin-top: 12px;
}
</style>
