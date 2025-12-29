<script setup lang="ts">
defineProps<{
  label: string
  modelValue?: string
  type?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="campo">
    <div class="label">{{ label }}</div>

    <input
      v-if="!disabled"
      :type="type || 'text'"
      :value="modelValue ?? ''"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <div v-else class="fake"></div>
  </div>
  
</template>

<style scoped>
.campo {
  display: grid;
  grid-template-columns: 200px 1fr;
  height: 34px;
  border-bottom: 1px solid #666;
}

.label {
  background: #e6e6e6;
  padding: 6px 8px;
  border-right: 1px solid #666;
  font-weight: 600;
  display: flex;
  align-items: center;
}

input,
.fake {
  padding: 6px 8px;
  border: none;
  background: #f3f3f3;
  font-size: 13px;
}
</style>
