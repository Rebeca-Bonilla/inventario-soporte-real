<template>
  <div>
    <h1>Dashboard</h1>

    <div class="stats">
      <StatCard title="Total Equipos" value="120" />
      <StatCard title="Activos" value="95" />
      <StatCard title="En Reparación" value="10" />
      <StatCard title="Asignados" value="80" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from '../components/StatCard.vue'
</script>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
</style>
