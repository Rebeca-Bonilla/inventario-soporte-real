<script setup lang="ts">
defineProps<{ isMobile: boolean }>()
defineEmits(['toggleSidebar'])
</script>

<template>
  <header class="topbar">
    <button v-if="isMobile" @click="$emit('toggleSidebar')">☰</button>
    <span>Inventario</span>
  </header>
</template>
