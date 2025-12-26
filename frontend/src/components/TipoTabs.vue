<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const tipos = [
  { label: 'computadora', value: 'computadora' },
  { label: 'telefono', value: 'telefono_fijo' },
  { label: 'monitor', value: 'monitor' },
  { label: 'camara', value: 'camara' },
  { label: 'tablet', value: 'tablet' },
  { label: 'terminal', value: 'terminal' },
  { label: 'otro', value: 'otro' }
]
</script>

<template>
  <div class="tabs">
    <button
      v-for="t in tipos"
      :key="t.value"
      class="tab"
      :class="{ active: modelValue === t.value }"
      @click="emit('update:modelValue', t.value)"
    >
      {{ t.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}

.tab {
  padding: 4px 10px;
  border: 1px solid #666;
  background: #e6e6e6;
  font-size: 13px;
  cursor: pointer;
}

.tab.active {
  background: #9e9e9e;
  font-weight: bold;
}
</style>
