<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const name = ref('')

const handleRegister = async () => {
  try {
    await authStore.register({
      name: name.value,
      username: username.value,
      password: password.value,
    })

    alert('Berhasil Mendaftar')
    router.push('/')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    } else {
      alert('An unexpected error occurred')
    }
  }
}
</script>

<template>
  <div class="register-container">
    <h2>Toko Klontong</h2>
    <h3>Daftar Member</h3>
    <div class="container-form">
      <form @submit.prevent="handleRegister">
        <label for="name">Nama</label>
        <input id="name" v-model="name" type="text" required />

        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required />

        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />

        <button type="submit">Daftar</button>
        <p class="question">Sudah punya akun? <router-link to="/login">Login</router-link></p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
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
