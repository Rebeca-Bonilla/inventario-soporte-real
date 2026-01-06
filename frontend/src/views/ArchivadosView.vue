<script setup lang="ts">
import { ref, onMounted } from 'vue'

const equipos = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await fetch(
    'http://localhost:3000/inventory?archivados=1',
    { credentials: 'include' }
  )
  equipos.value = await res.json()
  loading.value = false
})
</script>

<template>
  <section class="page">
    <h1>Archivados</h1>

    <p v-if="loading">Cargando equipos archivados…</p>

    <table v-else>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Ubicación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in equipos" :key="e.id">
          <td>{{ e.tipo }}</td>
          <td>{{ e.marca }}</td>
          <td>{{ e.modelo }}</td>
          <td>{{ e.ubicacion }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
