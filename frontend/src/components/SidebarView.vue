<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  isMobile: boolean
  open: boolean
}>()

const emit = defineEmits(['close'])
const router = useRouter()

const go = (path: string) => {
  router.push(path)
  if (props.isMobile) emit('close')
}

const back = () => router.back()
const home = () => router.push('/app/dashboard')
const logout = () => router.push('/login')
</script>

<template>
  <aside
    class="sidebar"
    :class="{ mobile: isMobile, open }"
  >
    <div class="user">
      <div class="avatar" />
      <strong>Usuario</strong>
      <small>Cargo</small>
    </div>

    <!-- MENÚ SOLO EN MÓVIL -->
    <nav v-if="isMobile" class="nav">
      <button @click="go('/app/registro')">Registro</button>
      <button @click="go('/app/consulta')">Consulta</button>
      <button @click="go('/app/archivados')">Archivados</button>
      <button @click="go('/app/importacion')">Importación</button>
      <button @click="go('/app/reportes')">Reportes</button>
      <button @click="go('/app/historial')">Historial</button>
    </nav>

    <div class="actions">
      <button @click="back" title="Regresar">⬅️</button>
      <button @click="home" title="Inicio">🏠</button>
      <button @click="logout" title="Cerrar sesión">⛔</button>
    </div>

    <div class="time">
      Tiempo: 00:00<br />
      Límite: 30:00
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #020617, #020617);
  color: #e5e7eb;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* MOBILE SLIDE */
.sidebar.mobile {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  z-index: 50;
}

.sidebar.mobile.open {
  transform: translateX(0);
}

/* USER */
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

.user strong {
  display: block;
}

.user small {
  color: #94a3b8;
}

/* MOBILE MENU */
.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
}

.nav button {
  background: #1e293b;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.actions button {
  flex: 1;
  background: #1e293b;
  border: 1px solid #334155;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.actions button:last-child {
  background: #7f1d1d;
}

/* TIMER */
.time {
  margin-top: 12px;
  text-align: center;
  color: #ef4444;
  font-weight: bold;
}
</style>
