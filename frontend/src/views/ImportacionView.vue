<script setup lang="ts">
import { ref } from 'vue'

const tipoEquipo = ref('computo')
const preview = ref<any[]>([])
const loading = ref(false)

const simularCarga = () => {
  loading.value = true
  setTimeout(() => {
    preview.value = [
      { marca: 'Lenovo', modelo: 'T14', serie: 'PF4D4R6W' },
      { marca: 'HP', modelo: 'E14', serie: 'SL11BS7077' }
    ]
    loading.value = false
  }, 800)
}
</script>

<template>
  <section class="page">
    <h1>Importación</h1>

    <div class="controls">
      <select v-model="tipoEquipo">
        <option value="computo">Cómputo</option>
        <option value="telefonos">Teléfonos</option>
        <option value="monitores">Monitores</option>
        <option value="otros">Otros</option>
      </select>

      <button @click="simularCarga">Subir CSV / XLSX</button>
    </div>

    <p v-if="loading">Procesando archivo…</p>

    <table v-if="preview.length">
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>N/S</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, i) in preview" :key="i">
          <td>{{ r.marca }}</td>
          <td>{{ r.modelo }}</td>
          <td>{{ r.serie }}</td>
        </tr>
      </tbody>
    </table>

    <button v-if="preview.length" class="primary">
      Importar a BD
    </button>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
