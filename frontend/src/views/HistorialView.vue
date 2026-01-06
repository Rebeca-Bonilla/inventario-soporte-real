<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface HistorialItem {
  id: number
  cambio: string
  usuario: string
  fecha: string
  hora: string
}

const historial = ref<HistorialItem[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/inventory/historial', {
      credentials: 'include'
    })

    historial.value = await res.json()
  } catch (err) {
    console.error('Error cargando historial', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="page">
    <h1>Historial</h1>

    <p v-if="loading">Cargando historial…</p>

    <div class="table-wrapper" v-else>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cambio realizado</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in historial" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.cambio }}</td>
            <td>{{ item.usuario }}</td>
            <td>{{ item.fecha }}</td>
            <td>{{ item.hora }}</td>
          </tr>

          <tr v-if="!historial.length">
            <td colspan="5">No hay registros</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.table-wrapper {
  max-height: 70vh;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #999;
  padding: 6px 8px;
  text-align: center;
}

thead {
  background: #ddd;
  position: sticky;
  top: 0;
}
</style>
