<script setup lang="ts">
import CampoInput from './CampoInput.vue'
import { equipoFields } from '../shared/equipoFields'
import type { EquipoTipo } from '../shared/equipoFields'

const props = defineProps<{
  tipo: EquipoTipo
  modelValue: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
}>()

const updateField = (key: string, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}

const leftRows = [
  'centro_trabajo_id',
  'marca',
  'modelo',
  'numero_serie',
  'ram_gb',
  'almacenamiento_gb'
]

const rightRows = [
  'procesador',
  'estado',
  'colaborador_id',
  'ubicacion',
  'observaciones',
  'fecha_registro'
]

const getCampo = (side: 'left' | 'right', key: string) =>
  equipoFields[props.tipo]?.[side]?.find(f => f.key === key)
</script>
<template>
  <div class="form-wrapper">
    <div class="col">
      <CampoInput
        v-for="campo in equipoFields[tipo].left"
        :key="campo.key"
        :label="campo.label"
        :type="campo.type"
        :options="campo.options"
        :model-value="modelValue[campo.key]"
        @update:modelValue="v => updateField(campo.key, v)"
      />
    </div>

    <div class="col">
      <CampoInput
        v-for="campo in equipoFields[tipo].right"
        :key="campo.key"
        :label="campo.label"
        :type="campo.type"
        :options="campo.options"
        :model-value="modelValue[campo.key]"
        @update:modelValue="v => updateField(campo.key, v)"
      />
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #666;
}

.col {
  display: flex;
  flex-direction: column;
}
</style>
