<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <strong>{{ value }}</strong>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
}>()
</script>

<style scoped>
.card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}
</style>
