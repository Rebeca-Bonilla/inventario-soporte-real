<template>
  <TipoTabs v-model="tipo" />
  <EquipoTable :tipo="tipo" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import EquipoTable from '../components/EquipoTable.vue'

const tipo = ref('computadora')
</script>
