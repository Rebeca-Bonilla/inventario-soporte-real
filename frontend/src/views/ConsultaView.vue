<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import { equipoFields } from '../shared/equipoFields'
import type { EquipoTipo } from '../shared/equipoFields'

/* ===============================
   STATE
================================ */
const tipoEquipo = ref<EquipoTipo | 'todos'>('todos')
const equipos = ref<any[]>([])
const loading = ref(true)

/* 🔐 ROL (mock) */
const isAdmin = ref(true)

/* UI */
const modoEdicion = ref(false)
const seleccionados = ref<number[]>([])
const mostrarFiltro = ref(false)

/* ===============================
   FILTROS
================================ */

const camposFiltrables = [
  'centro_trabajo_nombre',
  'marca',
  'modelo',
  'estado',
  'colaborador_nombre',
  'ubicacion'
]

const camposFiltro = computed(() => {
  if (tipoEquipo.value === 'todos') {
    return Object.values(equipoFields)
      .flatMap(f => [...f.left, ...f.right])
      .filter(
        (c, i, arr) =>
          camposFiltrables.includes(c.key) &&
          arr.findIndex(x => x.key === c.key) === i
      )
  }

  const campos = equipoFields[tipoEquipo.value]
  return [...campos.left, ...campos.right]
    .filter(c => camposFiltrables.includes(c.key))
})

const filtros = ref<Record<string, string>>({})

watch(
  () => tipoEquipo.value,
  () => {
    filtros.value = {}
    camposFiltro.value.forEach(c => {
      filtros.value[c.key] = ''
    })
  },
  { immediate: true }
)

/* ===============================
   DATA
================================ */
onMounted(async () => {
  const res = await fetch('http://localhost:3000/inventory')
  equipos.value = await res.json()
  loading.value = false
})

/* ===============================
   COMPUTEDS
================================ */

const equiposPorTipo = computed(() => {
  if (tipoEquipo.value === 'todos') return equipos.value
  return equipos.value.filter(e => e.tipo === tipoEquipo.value)
})

const equiposFiltrados = computed(() => {
  return equiposPorTipo.value.filter(e =>
    Object.entries(filtros.value).every(([key, val]) =>
      !val || e[key] === val
    )
  )
})

const valoresUnicos = (campo: string) => {
  return [
    ...new Set(
      equiposPorTipo.value
        .map(e => e[campo])
        .filter(Boolean)
    )
  ].sort()
}

/* ===============================
   ACTIONS
================================ */

const limpiarFiltros = () => {
  Object.keys(filtros.value).forEach(k => (filtros.value[k] = ''))
}

const activarEdicion = () => {
  if (!isAdmin.value) {
    alert('Se requieren permisos de administrador')
    return
  }
  modoEdicion.value = !modoEdicion.value
  seleccionados.value = []
}

const exportarCSV = () => {
  if (!equiposFiltrados.value.length) return

  const headers = Object.keys(equiposFiltrados.value[0])
  const rows = equiposFiltrados.value.map(e =>
    headers.map(h => `"${e[h] ?? ''}"`).join(',')
  )

  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'inventario_consulta.csv'
  a.click()

  URL.revokeObjectURL(url)
}

const archivarSeleccionados = () => {
  if (!seleccionados.value.length) {
    alert('Selecciona al menos un equipo')
    return
  }

  alert(`Archivados ${seleccionados.value.length} equipos`)
  modoEdicion.value = false
}

const toggleSeleccion = (id: number) => {
  seleccionados.value.includes(id)
    ? (seleccionados.value = seleccionados.value.filter(i => i !== id))
    : seleccionados.value.push(id)
}
</script>

<template>
  <section class="consulta-page">
    <TipoTabs v-model="tipoEquipo" />

    <div class="acciones">
      <button @click="mostrarFiltro = !mostrarFiltro">Filtrar</button>
      <button @click="exportarCSV">Exportar</button>
      <button @click="activarEdicion">Editar</button>
    </div>

    <div v-if="mostrarFiltro" class="panel-filtro">
      <label v-for="campo in camposFiltro" :key="campo.key">
        {{ campo.label }}
        <select v-model="filtros[campo.key]">
          <option value="">Todos</option>
          <option v-for="v in valoresUnicos(campo.key)" :key="v">
            {{ v }}
          </option>
        </select>
      </label>

      <div class="filtro-acciones">
        <button @click="mostrarFiltro = false">Cerrar</button>
        <button @click="limpiarFiltros">Limpiar</button>
      </div>
    </div>

    <div class="tabla-wrapper">
      <p v-if="loading">Cargando...</p>

      <table v-else>
        <thead>
          <tr>
            <th v-if="modoEdicion"></th>
            <th>Centro</th>
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
            <td v-if="modoEdicion">
              <input
                type="checkbox"
                :checked="seleccionados.includes(e.id)"
                @change="toggleSeleccion(e.id)"
              />
            </td>

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
            <td :colspan="modoEdicion ? 12 : 11" style="text-align:center">
              No hay equipos
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="modoEdicion" class="edicion-footer">
      <button @click="modoEdicion = false">Guardar</button>
      <button @click="archivarSeleccionados">Archivar</button>
    </div>
  </section>
</template>

<style scoped>
.consulta-page { padding: 16px; }
.acciones { display: flex; gap: 8px; margin: 10px 0; }
.panel-filtro {
  position: absolute;
  background: #f2f2f2;
  border: 1px solid #333;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  font-size: 12px;
  z-index: 20;
}
.panel-filtro label { display: flex; flex-direction: column; }
.panel-filtro select { font-size: 11px; }
.filtro-acciones {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
}
.tabla-wrapper { margin-top: 10px; overflow-x: auto; }
table { border-collapse: collapse; width: 100%; font-size: 12px; }
th, td { border: 1px solid #333; padding: 4px 6px; white-space: nowrap; }
th { background: #e0e0e0; }
.edicion-footer { margin-top: 10px; display: flex; gap: 10px; }
</style>
