<script setup lang="ts">
defineProps<{
  label: string
  type?: string
  modelValue?: any
  options?: string[]
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="campo">
    <span>{{ label }}</span>

    <!-- SELECT -->
    <select
      v-if="type === 'select'"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option value="">Seleccione</option>
      <option
        v-for="opt in options"
        :key="opt"
        :value="opt"
      >
        {{ opt }}
      </option>
    </select>

    <!-- INPUT -->
    <input
      v-else
      :type="type || 'text'"
      :value="modelValue"
      :disabled="disabled"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped>
.campo {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
}

input,
select {
  font-size: 13px;
  padding: 3px;
}
</style>
