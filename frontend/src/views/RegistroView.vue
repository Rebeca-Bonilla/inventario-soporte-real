<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
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
   ACCIONES
================================ */
const borrarTodo = () => {
  if (!confirm('¿Seguro que deseas borrar todo el formulario?')) return

  for (const key in form.value) delete form.value[key]

  form.value.estado = 'Activo'
  form.value.fecha_registro = new Date().toISOString().slice(0, 10)
  form.value.colaborador_nombre = ''
  form.value.centro_trabajo_nombre = ''

  errorColaborador.value = ''
  errorCentro.value = ''

  localStorage.removeItem('registro_equipo_temp')
}

const guardarLocal = () => {
  localStorage.setItem(
    'registro_equipo_temp',
    JSON.stringify({
      tipo: tipoEquipo.value,
      data: { ...form.value }
    })
  )
  alert('Equipo guardado localmente')
}

const anadir = async () => {
  const payload = {
    tipo: tipoEquipo.value,
    ...form.value,
    colaborador_id: form.value.colaborador_id
      ? Number(form.value.colaborador_id)
      : null,
    centro_trabajo_id: form.value.centro_trabajo_id
      ? Number(form.value.centro_trabajo_id)
      : null
  }

  try {
    const res = await fetch('http://localhost:3000/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error()

    alert('Equipo añadido correctamente')
    borrarTodo()
  } catch {
    alert('Error al guardar el equipo')
  }
}

/* ===============================
   BORRADOR
================================ */
onMounted(() => {
  const saved = localStorage.getItem('registro_equipo_temp')
  if (saved) {
    const parsed = JSON.parse(saved)
    tipoEquipo.value = parsed.tipo
    Object.assign(form.value, parsed.data)
  }
})
</script>

<template>
  <section class="registro-page">
    <TipoTabs v-model="tipoEquipo" />

    <p class="leyenda">
      Los campos de texto deben escribirse en <strong>MAYÚSCULAS</strong>,
      sin acentos y usando espacios.
      Para <strong>Centro de Trabajo</strong> y <strong>Colaborador</strong>,
      puede ingresar el <strong>ID</strong>, o
      <strong>nombre</strong>.
    </p>

    <EquipoForm :tipo="tipoEquipo" v-model="form" />

    <p v-if="errorColaborador" class="error">{{ errorColaborador }}</p>
    <p v-if="errorCentro" class="error">{{ errorCentro }}</p>

    <div class="acciones">
      <button class="btn" @click="borrarTodo">Borrar todo</button>

      <div class="right">
        <button class="btn" @click="guardarLocal">Guardar</button>
        <button class="btn btn-primary" @click="anadir">Añadir</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.registro-page {
  padding: 20px 24px;
  background-color: var(--content-bg);
}

.leyenda {
  font-size: 14px;
  color: #dc2626; /* error text stays red in both modes */
  margin: 10px 0 14px;
}

.error {
  color: #dc2626;
  font-size: 12px;
  margin: 4px 0;
}

.acciones {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.acciones .right {
  display: flex;
  gap: 6px;
}

/* THEME-SAFE BUTTONS */
.btn {
  padding: 4px 12px;
  border: 1px solid var(--input-border);
  background: var(--button-bg);
  color: var(--button-text);
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-primary {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
}

.btn-primary:hover {
  background: #1d4ed8;
}

</style>
