<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const authStore = useAuthStore()
const { login } = authStore

const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login({ username: username.value, password: password.value })
    router.push('/')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    } else {
      alert('An unexpected error occurred')
    }
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Toko Klontong</h2>
    <h3>Login</h3>
    <div class="container-form">
      <form @submit.prevent="handleLogin">
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required />

        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />

        <button type="submit">Login</button>
        <p class="question">Belum punya akun? <router-link to="/register">Daftar</router-link></p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  text-align: center;
}

.container-form {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
}

input {
  width: 90%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background: #28a745;
  border-radius: 5px;

  color: white;
  border: none;
  cursor: pointer;
}

.question {
  font-size: 0.8rem;
}
</style>
