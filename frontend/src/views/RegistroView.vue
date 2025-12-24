<template>
  <TipoTabs v-model="tipo" />
  <EquipoForm :tipo="tipo" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TipoTabs from '../components/TipoTabs.vue'
import EquipoForm from '../components/EquipoForm.vue'

const tipo = ref('computadora')
</script>
