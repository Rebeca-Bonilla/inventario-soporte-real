<template>
  <div class="login">
    <h1>Login Inventario</h1>

    <input v-model="username" placeholder="Usuario" />
    <input v-model="password" type="password" placeholder="Contraseña" />

    <button @click="login">Entrar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

function login() {
  // TEMPORAL — luego va al backend
  if (username.value && password.value) {
    router.push('/app/dashboard')
  }
}
</script>
