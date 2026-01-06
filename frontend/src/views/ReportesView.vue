<script setup lang="ts">
import { ref } from 'vue'

const desde = ref('')
const hasta = ref('')
const tipo = ref('historial')
const data = ref<any[]>([])
const loading = ref(false)

const generar = async () => {
  loading.value = true
  const params = new URLSearchParams({
    tipo: tipo.value,
    desde: desde.value,
    hasta: hasta.value
  })

  const res = await fetch(
    `http://localhost:3000/inventory/historial?${params}`,
    { credentials: 'include' }
  )

  data.value = await res.json()
  loading.value = false
}
</script>

<template>
  <section class="page">
    <h1>Reportes</h1>

    <div class="filters">
      <input type="date" v-model="desde" />
      <input type="date" v-model="hasta" />

      <select v-model="tipo">
        <option value="historial">Historial</option>
        <option value="computo">Cómputo</option>
      </select>

      <button @click="generar">Generar</button>
    </div>

    <p v-if="loading">Generando reporte…</p>

    <table v-if="data.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Cambio</th>
          <th>Usuario</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, i) in data" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ r.cambio }}</td>
          <td>{{ r.usuario }}</td>
          <td>{{ r.fecha }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}
</style>
