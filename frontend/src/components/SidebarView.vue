<script setup lang="ts">
defineProps<{
  isMobile: boolean
  open: boolean
}>()

defineEmits(['close'])

const router = useRouter()

const goHome = () => {
  router.push('/app/dashboard')
}

const goBack = () => {
  router.back()
}

const logout = () => {
  router.push('/login')
}
</script>

<template>
  <aside
    class="sidebar"
    :class="{ open }"
  >
    <!-- USUARIO -->
    <div class="user">
      <div class="avatar" />
      <strong>Usuario</strong>
      <small>Cargo</small>
    </div>

    <!-- MENÚ SOLO MÓVIL -->
    <nav v-if="isMobile" class="nav">
      <RouterLink to="/app/registro" @click="$emit('close')">Registro</RouterLink>
      <RouterLink to="/app/inventory" @click="$emit('close')">Consulta</RouterLink>
      <RouterLink to="/app/archivados" @click="$emit('close')">Archivados</RouterLink>
      <RouterLink to="/app/importacion" @click="$emit('close')">Importación</RouterLink>
      <RouterLink to="/app/reportes" @click="$emit('close')">Reportes</RouterLink>
      <RouterLink to="/app/historial" @click="$emit('close')">Historial</RouterLink>
    </nav>

    <!-- TIEMPO -->
    <div class="time">
      <span>Tiempo: 00:00</span>
      <span>Límite: 30:00</span>
    </div>

  <!-- ACCIONES -->
  <div class="actions">
    <button title="Inicio" @click="goHome">🏠</button>
    <button title="Regresar" @click="goBack">↩</button>
    <button class="logout" title="Cerrar sesión" @click="logout">⛔</button>
  </div>

  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  height: 100%;
  background: linear-gradient(180deg, #0f172a, #020617);
  color: #e5e7eb;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: transform 0.3s ease;
}

/* Desktop: siempre visible */
@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0);
  }
}

/* Mobile */
@media (max-width: 1023px) {
  .sidebar {
    position: fixed;
    top: 64px;
    left: 0;
    bottom: 0;
    z-index: 10;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}

/* Usuario */
.user {
  text-align: center;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #64748b;
  margin: 0 auto 10px;
}

/* Menú móvil */
.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
}

.nav a {
  background: #1e293b;
  color: #e5e7eb;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
}

/* Tiempo */
.time {
  text-align: center;
  color: #ef4444;
  font-weight: bold;
}

/* Acciones */
.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  flex: 1;
  background: #1e293b;
  border: 1px solid #334155;
  color: #e5e7eb;
  padding: 8px;
  border-radius: 8px;
}

.logout {
  background: #7f1d1d;
}
</style>
