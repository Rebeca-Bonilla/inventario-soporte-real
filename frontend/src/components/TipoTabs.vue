<template>
  <div class="tabs">
    <button v-for="t in tipos" :key="t" @click="$emit('update:modelValue', t)">
      {{ t }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue'])

const tipos = ['computadora', 'telefono', 'monitor', 'camara', 'tablet', 'terminal', 'otro']
</script>
