<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const tipos = [
  { label: 'todos', value: 'todos' },
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
  gap: 8px;
  margin-bottom: 12px;
}

.tab {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  background-color: var(--button-bg);
  color: var(--button-text);
  border: 1px solid var(--input-border);

  transition: background-color 0.2s, color 0.2s;
}

.tab.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.tab:hover {
  background-color: #1e293b;
}

</style>
