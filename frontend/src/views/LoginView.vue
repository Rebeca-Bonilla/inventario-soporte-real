<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref('')
const pass = ref('')
const error = ref('')

const login = () => {
  if (user.value === 'admin' && pass.value === '1234') {
    router.push('/app/dashboard')
  } else {
    error.value = 'Usuario o contraseña incorrectos'
  }
}
</script>
<template>
  <div class="login-page">
    <header class="top">
      <div class="logo">LOGO</div>
    </header>

    <!-- 👇 FORM -->
    <form class="card" @submit.prevent="login">
      <div class="avatar"></div>

      <label>Usuario</label>
      <input v-model="user" />

      <label>Contraseña</label>
      <input type="password" v-model="pass" />

      <span v-if="error" class="error">{{ error }}</span>

      <!-- 👇 type="submit" -->
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<style lang="css" scoped>
.login-page {
  min-height: 100vh;
  background: #f4f6f8; /* gris claro, no quema */
  display: flex;
  flex-direction: column;
}

/* Top suave */
.top {
  height: 64px;
  background: #e9edf2;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #dcdfe4;
}

.logo {
  font-weight: 600;
  font-size: 33px;
  color: #2c2c2c;
}

/* Card central */
.card {
  width: 380px;
  margin: auto;
  background: #ffffff;
  padding: 32px;
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0,0,0,.08);
  color: #2c2c2c;
}

/* Avatar */
.avatar {
  width: 88px;
  height: 88px;
  background: #e2e6eb;
  border-radius: 50%;
  margin: 0 auto 24px;
}

/* Labels */
label {
  display: block;
  margin-top: 14px;
  font-size: 18px;
  color: #555;
}

/* Inputs */
input {
  width: 100%;
  padding: 10px 12px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #cfd4da;
  background: #fafafa;
  color: #2c2c2c;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #646cff;
  background: #fff;
}

/* Botón principal */
button {
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  background: #646cff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #535bf2;
}

/* Error */
.error {
  display: block;
  margin-top: 10px;
  color: #d64545;
  font-size: 0.9rem;
  text-align: center;
}
</style>
