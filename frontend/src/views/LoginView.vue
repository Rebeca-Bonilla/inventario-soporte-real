<template>
  <div class="login-page">
    <!-- TOP BAR -->
    <header class="topbar">
      <div class="logo">LOGO</div>
    </header>

    <!-- LOGIN CARD -->
    <div class="login-card">
      <div class="avatar"></div>

      <label>Usuario:</label>
      <input v-model="user" type="text" />
      <span v-if="errorUser" class="error">Usuario incorrecto</span>

      <label>Contraseña:</label>
      <div class="password">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
        />
        <label class="show">
          <input type="checkbox" v-model="showPassword" />
          Visualizar contraseña
        </label>
      </div>
      <span v-if="errorPass" class="error">Contraseña incorrecta</span>

      <a class="forgot">¿Olvidaste tu contraseña?</a>

      <button @click="login">Iniciar sesión</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const login = () => {
  if (user.value === 'admin' && password.value === '1234') {
    router.push('/app/dashboard')
  }
}

</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.topbar {
  height: 64px;
  background: #d1d1d1;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.logo {
  background: #bdbdbd;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
}

.login-card {
  margin: auto;
  width: 360px;
  background: white;
  padding: 32px;
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,.1);
}

.avatar {
  width: 96px;
  height: 96px;
  background: #bdbdbd;
  border-radius: 50%;
  margin: 0 auto 20px;
}

label {
  display: block;
  text-align: left;
  margin-top: 12px;
}

input {
  width: 100%;
  padding: 6px;
  margin-top: 4px;
}

.password {
  display: flex;
  flex-direction: column;
}

.show {
  font-size: 12px;
  margin-top: 4px;
}

.error {
  color: red;
  font-size: 12px;
  text-align: left;
}

.forgot {
  display: block;
  margin: 12px 0;
  font-size: 13px;
}

button {
  width: 100%;
  padding: 8px;
  background: #e5e5e5;
  border: none;
  cursor: pointer;
}
</style>
