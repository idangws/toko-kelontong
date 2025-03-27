import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'

import api from '@/api'

const DAY_TO_MS = 86399500

export const useAuthStore = defineStore('auth', () => {
  const token = ref(Cookies.get('authToken') || '')
  const isAuthenticated = () => Boolean(Cookies.get('authToken') || '')

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { access_token } = response.data

      Cookies.set('authToken', access_token, { expires: DAY_TO_MS })
    } catch (error) {
      throw error
    }
  }

  const register = async (user: { name: string; username: string; password: string }) => {
    try {
      await api.post('/users', user)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    token.value = ''
    Cookies.remove('authToken')
  }

  return { isAuthenticated, login, logout, register, token }
})
