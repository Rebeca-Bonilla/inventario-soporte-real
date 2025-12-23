<template>
  <div class="login">
    <h1>Login</h1>

    <input placeholder="Usuario" />
    <input type="password" placeholder="Contraseña" />

    <button @click="login">Entrar</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function login() {
  // luego conectamos backend
  router.push('/app/dashboard')
}
</script>

<style scoped>
.login {
  height: 100vh;
  display: grid;
  place-content: center;
  gap: 1rem;
}
</style>
