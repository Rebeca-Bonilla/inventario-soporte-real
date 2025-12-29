<template>
  <section>
    <h1>Dashboard</h1>

    <div class="cards">
      <div class="card">
        <h3>Total Equipos</h3>
        <strong>120</strong>
      </div>

      <div class="card">
        <h3>Activos</h3>
        <strong>95</strong>
      </div>

      <div class="card">
        <h3>En Reparación</h3>
        <strong>10</strong>
      </div>

      <div class="card">
        <h3>Asignados</h3>
        <strong>80</strong>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.card h3 {
  margin: 0 0 8px;
}

.card strong {
  font-size: 1.5em;
}
</style>
