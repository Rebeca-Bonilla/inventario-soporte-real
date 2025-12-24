<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  isMobile: boolean
  open: boolean
}>()

defineEmits(['close'])

const router = useRouter()

const go = (path: string) => {
  router.push(path)
}
</script>

<template>
  <aside v-if="open" class="sidebar">
    <div class="user">
      <div class="avatar" />
      <strong>Usuario</strong>
      <small>Cargo</small>
    </div>

    <nav class="nav">
      <button @click="go('/app/dashboard')">Dashboard</button>
      <button @click="go('/app/registro')">Registro</button>
      <button @click="go('/app/inventory')">Consulta</button>
      <button @click="go('/app/archivados')">Archivados</button>
      <button @click="go('/app/importacion')">Importación</button>
      <button @click="go('/app/reportes')">Reportes</button>
      <button @click="go('/app/historial')">Historial</button>
    </nav>

    <div class="time">
      Tiempo: 00:00<br />
      Límite: 30:00
    </div>
  </aside>
</template>
