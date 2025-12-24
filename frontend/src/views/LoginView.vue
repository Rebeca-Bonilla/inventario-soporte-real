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

    <div class="card">
      <div class="avatar"></div>

      <label>Usuario</label>
      <input v-model="user" />

      <label>Contraseña</label>
      <input type="password" v-model="pass" />

      <span v-if="error" class="error">{{ error }}</span>

      <button @click="login">Iniciar sesión</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
  .login-page {
  height: 100vh;
  background: #ececec;
}

.top {
  height: 60px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.logo {
  background: #bdbdbd;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
}

.card {
  width: 380px;
  margin: 80px auto;
  background: white;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}

.avatar {
  width: 90px;
  height: 90px;
  background: #bdbdbd;
  border-radius: 50%;
  margin: 0 auto 20px;
}

label {
  display: block;
  margin-top: 12px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
}

button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
}

.error {
  color: red;
  font-size: 13px;
}

</style>
