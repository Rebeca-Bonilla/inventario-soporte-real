<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import type { EquipoTipo } from '../shared/equipoFields'

const tipoEquipo = ref<EquipoTipo>('computadora')
const equipos = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await fetch('http://localhost:3000/inventory')
  equipos.value = await res.json()
  loading.value = false
})

/* 🔥 FILTRADO POR TIPO */
const equiposFiltrados = computed(() => {
  return equipos.value.filter(e => e.tipo === tipoEquipo.value)
})
</script>
<template>
  <section class="consulta-page">
    <!-- TABS DE TIPO -->
    <TipoTabs v-model="tipoEquipo" />

    <div class="tabla-wrapper">
      <p v-if="loading">Cargando...</p>

      <table v-else>
        <thead>
          <tr>
            <th>Centro de Trabajo</th>
            <th>Equipo</th>
            <th>Modelo</th>
            <th>N/S</th>
            <th>RAM</th>
            <th>Almacenamiento</th>
            <th>Procesador</th>
            <th>Estado</th>
            <th>Colaborador</th>
            <th>Ubicación</th>
            <th>Observaciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="e in equiposFiltrados" :key="e.id">
            <td>{{ e.centro_trabajo_nombre }}</td>
            <td>{{ e.marca }}</td>
            <td>{{ e.modelo }}</td>
            <td>{{ e.numero_serie }}</td>
            <td>{{ e.ram_gb ?? '-' }}</td>
            <td>{{ e.tipo_almacenamiento ?? '-' }}</td>
            <td>{{ e.procesador ?? '-' }}</td>
            <td>{{ e.estado }}</td>
            <td>{{ e.colaborador_nombre ?? '-' }}</td>
            <td>{{ e.ubicacion }}</td>
            <td>{{ e.observaciones ?? '-' }}</td>
          </tr>

          <tr v-if="!equiposFiltrados.length">
            <td colspan="11" style="text-align:center">
              No hay equipos de este tipo
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.consulta-page {
  padding: 16px;
}

.tabla-wrapper {
  margin-top: 10px;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}

th, td {
  border: 1px solid #333;
  padding: 4px 6px;
  white-space: nowrap;
}

th {
  background: #e0e0e0;
}
</style>
