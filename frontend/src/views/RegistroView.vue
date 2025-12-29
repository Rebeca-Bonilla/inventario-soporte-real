<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import EquipoForm from '../components/EquipoForm.vue'
import type { EquipoTipo } from '../shared/equipoFields'

const tipoEquipo = ref<EquipoTipo>('computadora')
const form = ref<Record<string, any>>({})

const borrarTodo = () => {
  if (!confirm('¿Seguro que deseas borrar todo el formulario?')) return
  for (const key in form) delete form[key]
}

const guardarLocal = () => {
  localStorage.setItem(
    'registro_equipo_temp',
    JSON.stringify({
      tipo: tipoEquipo.value,
      data: { ...form }
    })
  )
  alert('Equipo guardado localmente')
}

const anadir = () => {
  console.log('ENVIAR A BACKEND:', {
    tipo: tipoEquipo.value,
    data: { ...form }
  })

  alert('Equipo añadido (simulado)')

  for (const key in form) delete form[key]
  localStorage.removeItem('registro_equipo_temp')
}

onMounted(() => {
  const saved = localStorage.getItem('registro_equipo_temp')
  if (!saved) return

  const parsed = JSON.parse(saved)
  tipoEquipo.value = parsed.tipo
  Object.assign(form, parsed.data)
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
