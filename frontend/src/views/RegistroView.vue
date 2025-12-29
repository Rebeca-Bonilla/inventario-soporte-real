<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import EquipoForm from '../components/EquipoForm.vue'
import type { EquipoTipo } from '../shared/equipoFields'

/* ===============================
   STATE
================================ */
const tipoEquipo = ref<EquipoTipo>('computadora')
const form = ref<Record<string, any>>({})

/* ===============================
   ACCIONES
================================ */
const borrarTodo = () => {
  if (!confirm('¿Seguro que deseas borrar todo el formulario?')) return
  for (const key in form.value) delete form.value[key]
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
  /* 🔴 MUY IMPORTANTE:
     Convertimos el objeto reactivo en uno plano */
  const data = JSON.parse(JSON.stringify(form.value))

  const payload = {
    tipo: tipoEquipo.value,

    // Campos base
    marca: data.marca,
    modelo: data.modelo,
    numero_serie: data.numero_serie,
    ubicacion: data.ubicacion,
    observaciones: data.observaciones,

    // Numéricos (FKs y números reales)
    ram_gb: data.ram_gb ? Number(data.ram_gb) : null,
    almacenamiento_gb: data.almacenamiento_gb ? Number(data.almacenamiento_gb) : null,
    centro_trabajo_id: Number(data.centro_trabajo_id),
    colaborador_id: data.colaborador_id ? Number(data.colaborador_id) : null,

    estado: 'Activo'
  }

  try {
    const res = await fetch('http://localhost:3000/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error()

    alert('✅ Equipo guardado correctamente')

    for (const key in form.value) delete form.value[key]
    localStorage.removeItem('registro_equipo_temp')
  } catch (e) {
    alert('❌ No se pudo guardar el equipo')
  }
}

/* ===============================
   CARGAR BORRADOR
================================ */
onMounted(() => {
  const saved = localStorage.getItem('registro_equipo_temp')
  if (!saved) return

  const parsed = JSON.parse(saved)
  tipoEquipo.value = parsed.tipo
  Object.assign(form.value, parsed.data)
})
</script>

<template>
  <section class="registro-page">
    <!-- TABS -->
    <TipoTabs v-model="tipoEquipo" />

    <!-- FORM -->
    <div class="registro-wrapper">
      <EquipoForm
        :tipo="tipoEquipo"
        v-model="form"
      />

      <!-- BOTONES -->
      <div class="acciones">
        <button class="btn" @click="borrarTodo">Borrar todo</button>

        <div class="right">
          <button class="btn" @click="guardarLocal">Guardar</button>
          <button class="btn" @click="anadir">Añadir</button>
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

.acciones {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
}

.acciones .right {
  display: flex;
  gap: 6px;
}

.btn {
  padding: 3px 10px;
  border: 1px solid #666;
  background: #e0e0e0;
  font-size: 13px;
  cursor: pointer;
}

.btn:hover {
  background: #d6d6d6;
}
</style>
