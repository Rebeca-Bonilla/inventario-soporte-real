<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import EquipoForm from '../components/EquipoForm.vue'
import type { EquipoTipo } from '../shared/equipoFields'
import { normalizarTexto } from '../shared/textUtils'

/* ===============================
   STATE
================================ */
const tipoEquipo = ref<EquipoTipo>('computadora')
const syncingColaborador = ref(false)

const form = ref<Record<string, any>>({
  estado: 'Activo',
  fecha_registro: new Date().toISOString().slice(0, 10),

  // auxiliares
  colaborador_nombre: '',
  centro_trabajo_nombre: ''
})

const errorColaborador = ref('')
const errorCentroTrabajo = ref('')

/* ===============================
   HELPERS
================================ */
const hoyISO = () => {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

/* ===============================
   COLABORADOR: nombre → ID
================================ */
watch(
  () => form.value.colaborador_id,
  async (nuevo) => {
    if (!nuevo || syncingColaborador.value) return

    syncingColaborador.value = true

    try {
      const res = await fetch(
        `http://localhost:3000/inventory/colaboradores/${nuevo}`
      )
      if (!res.ok) throw new Error()

      const data = await res.json()

      // 🔥 AQUÍ EL CAMBIO
      form.value.colaborador_nombre = normalizarTexto(data.nombre)

      errorColaborador.value = ''
    } catch {
      errorColaborador.value = 'Colaborador no encontrado'
    } finally {
      syncingColaborador.value = false
    }
  }
)


/* ===============================
   COLABORADOR: ID → nombre
================================ */
watch(
  () => form.value.colaborador_id,
  async (nuevo) => {
    if (!nuevo) {
      errorColaborador.value = ''
      return
    }

    try {
      const res = await fetch(
        `http://localhost:3000/inventory/colaboradores/${nuevo}`
      )

      if (!res.ok) throw new Error()

      const data = await res.json()
      form.value.colaborador_nombre = data.nombre
      errorColaborador.value = ''
    } catch {
      errorColaborador.value = 'Colaborador no encontrado'
    }
  }
)

/* ===============================
   CENTRO DE TRABAJO (solo ID por ahora)
================================ */
watch(
  () => form.value.centro_trabajo_id,
  async (nuevo) => {
    if (!nuevo) {
      errorCentroTrabajo.value = ''
      return
    }

    try {
      const res = await fetch(
        `http://localhost:3000/centros-trabajo/${nuevo}`
      )

      if (!res.ok) throw new Error()

      errorCentroTrabajo.value = ''
    } catch {
      errorCentroTrabajo.value = 'Centro de trabajo no encontrado'
    }
  }
)

/* ===============================
   ACCIONES
================================ */
const borrarTodo = () => {
  if (!confirm('¿Seguro que deseas borrar todo el formulario?')) return

  for (const key in form.value) delete form.value[key]

  form.value.estado = 'Activo'
  form.value.fecha_registro = hoyISO()
  form.value.colaborador_nombre = ''
  form.value.centro_trabajo_nombre = ''

  errorColaborador.value = ''
  errorCentroTrabajo.value = ''

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
  const data = JSON.parse(JSON.stringify(form.value))

  const payload = {
    tipo: tipoEquipo.value,

    marca: data.marca || null,
    modelo: data.modelo || null,
    numero_serie: data.numero_serie || null,
    ubicacion: data.ubicacion || null,
    observaciones: data.observaciones || null,
    estado: data.estado || 'Activo',

    centro_trabajo_id: data.centro_trabajo_id
      ? Number(data.centro_trabajo_id)
      : null,

    colaborador_id: data.colaborador_id
      ? Number(data.colaborador_id)
      : null,

    ram_gb: data.ram_gb ? Number(data.ram_gb) : null,
    almacenamiento_gb: data.almacenamiento_gb
      ? Number(data.almacenamiento_gb)
      : null,

    tipo_camara: data.tipo_camara || null,
    resolucion_mp: data.resolucion_mp
      ? Number(data.resolucion_mp)
      : null,

    dimension_pulgadas: data.dimension_pulgadas
      ? Number(data.dimension_pulgadas)
      : null,

    capacidad_gb: data.capacidad_gb
      ? Number(data.capacidad_gb)
      : null,

    version_android: data.version_android || null,
    extension: data.extension || null,
    numero_telefono: data.numero_telefono || null,
    imei: data.imei || null,
    plan_datos: data.plan_datos || null
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
   CARGAR BORRADOR
================================ */
onMounted(() => {
  const saved = localStorage.getItem('registro_equipo_temp')
  if (saved) {
    const parsed = JSON.parse(saved)
    tipoEquipo.value = parsed.tipo
    Object.assign(form.value, parsed.data)
  }

  if (!form.value.fecha_registro) {
    form.value.fecha_registro = hoyISO()
  }
})
</script>

<template>
  <section class="registro-page">
    <TipoTabs v-model="tipoEquipo" />

    <p class="leyenda">
      Los campos de texto deben escribirse en
      <strong>MAYÚSCULAS</strong>, sin acentos y usando espacios.
      Para <strong>Centro de Trabajo</strong> y <strong>Colaborador</strong>,
      puede ingresar el <strong>ID</strong> o el <strong>nombre</strong>.
    </p>

    <div class="registro-wrapper">
      <EquipoForm :tipo="tipoEquipo" v-model="form" />

      <p v-if="errorColaborador" class="error">{{ errorColaborador }}</p>
      <p v-if="errorCentroTrabajo" class="error">{{ errorCentroTrabajo }}</p>

      <div class="acciones">
        <button class="btn" @click="borrarTodo">Borrar todo</button>
        <div class="right">
          <button class="btn" @click="guardarLocal">Guardar</button>
          <button class="btn btn-primary" @click="anadir">Añadir</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.registro-page {
  padding: 20px 24px;
}

.registro-wrapper {
  width: 1000px;
}

.leyenda {
  font-size: 17px;
  color: red;
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

.btn {
  padding: 4px 12px;
  border: 1px solid #666;
  background: #e0e0e0;
  font-size: 13px;
  cursor: pointer;
}

.btn-primary {
  background: #2563eb;
  border-color: #2563eb;
  color: white;
}
</style>
