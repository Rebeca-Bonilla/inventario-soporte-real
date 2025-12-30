<script setup lang="ts">
import { ref, watch } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import EquipoForm from '../components/EquipoForm.vue'
import type { EquipoTipo } from '../shared/equipoFields'
import { normalizarTexto } from '../shared/textUtils'

/* ===============================
   STATE
================================ */
const tipoEquipo = ref<EquipoTipo>('computadora')

const syncingColaborador = ref(false)
const syncingCentro = ref(false)

const form = ref<Record<string, any>>({
  estado: 'Activo',
  fecha_registro: new Date().toISOString().slice(0, 10),

  colaborador_nombre: '',
  colaborador_id: null,

  centro_trabajo_nombre: '',
  centro_trabajo_id: null
})

const errorColaborador = ref('')
const errorCentro = ref('')

/* ===============================
   COLABORADOR
================================ */

// nombre → id
watch(() => form.value.colaborador_nombre, async (v) => {
  if (!v || syncingColaborador.value) return

  syncingColaborador.value = true
  errorColaborador.value = ''

  try {
    const res = await fetch(
      `http://localhost:3000/inventory/colaboradores/buscar?nombre=${encodeURIComponent(
        normalizarTexto(v)
      )}`
    )
    if (!res.ok) throw new Error()
    const data = await res.json()
    form.value.colaborador_id = data.id
  } catch {
    errorColaborador.value = 'Colaborador no encontrado'
  } finally {
    syncingColaborador.value = false
  }
})

// id → nombre
watch(() => form.value.colaborador_id, async (v) => {
  if (!v || syncingColaborador.value) return

  syncingColaborador.value = true
  errorColaborador.value = ''

  try {
    const res = await fetch(
      `http://localhost:3000/inventory/colaboradores/${v}`
    )
    if (!res.ok) throw new Error()
    const data = await res.json()
    form.value.colaborador_nombre = normalizarTexto(data.nombre)
  } catch {
    errorColaborador.value = 'Colaborador no encontrado'
  } finally {
    syncingColaborador.value = false
  }
})

/* ===============================
   CENTRO DE TRABAJO (MISMA LÓGICA)
================================ */

// nombre → id
watch(() => form.value.centro_trabajo_nombre, async (v) => {
  if (!v || syncingCentro.value) return

  syncingCentro.value = true
  errorCentro.value = ''

  try {
    const res = await fetch(
      `http://localhost:3000/inventory/centros-trabajo/buscar?nombre=${encodeURIComponent(
        normalizarTexto(v)
      )}`
    )
    if (!res.ok) throw new Error()
    const data = await res.json()
    form.value.centro_trabajo_id = data.id
  } catch {
    errorCentro.value = 'Centro de trabajo no encontrado'
  } finally {
    syncingCentro.value = false
  }
})

// id → nombre
watch(() => form.value.centro_trabajo_id, async (v) => {
  if (!v || syncingCentro.value) return

  syncingCentro.value = true
  errorCentro.value = ''

  try {
    const res = await fetch(
      `http://localhost:3000/inventory/centros-trabajo/${v}`
    )
    if (!res.ok) throw new Error()
    const data = await res.json()
    form.value.centro_trabajo_nombre = normalizarTexto(data.nombre)
  } catch {
    errorCentro.value = 'Centro de trabajo no encontrado'
  } finally {
    syncingCentro.value = false
  }
})

/* ===============================
   GUARDAR
================================ */
const anadir = async () => {
  const payload = {
    tipo: tipoEquipo.value,
    ...form.value
  }

  const res = await fetch('http://localhost:3000/inventory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    alert('Error al guardar')
    return
  }

  alert('Equipo añadido correctamente')
}
</script>

<template>
  <section class="registro-page">
    <TipoTabs v-model="tipoEquipo" />

    <EquipoForm :tipo="tipoEquipo" v-model="form" />

    <p v-if="errorColaborador" class="error">{{ errorColaborador }}</p>
    <p v-if="errorCentro" class="error">{{ errorCentro }}</p>

    <button @click="anadir">Añadir</button>
  </section>
</template>

<style scoped>
.error {
  color: red;
  font-size: 12px;
}
</style>
