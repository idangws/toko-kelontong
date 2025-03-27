import { ref, watch } from 'vue'
import axios from 'axios'
import api from '@/api'
import type { Product, ProductResponse } from '@/entities/product'
import { useRouter, useRoute } from 'vue-router'

export const useProductStore = () => {
  const router = useRouter()
  const route = useRoute()

  const products = ref<Product[]>([])
  const page = ref(1)
  const limit = 6
  const isLoading = ref(false)
  const hasMore = ref(true)
  const searchQuery = ref(route.query.search || '')

  const fetchProducts = async () => {
    if (!hasMore.value || isLoading.value) return

    isLoading.value = true
    try {
      const response = await api.get<ProductResponse>(`/products`, {
        params: { page: page.value, limit, name: searchQuery.value || undefined },
      })

      const { currentPage, totalPages, data } = response.data

      if (currentPage === totalPages) {
        hasMore.value = false
      }

      products.value.push(...data)
      page.value += 1
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message)
      } else {
        alert('An unexpected error occurred')
      }
    } finally {
      isLoading.value = false
    }
  }

  let debounceTimer: ReturnType<typeof setTimeout>
  watch(searchQuery, (newQuery) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      page.value = 1
      hasMore.value = true
      products.value = []
      fetchProducts()

      router.replace({ query: { ...route.query, search: newQuery || undefined } })
    }, 500)
  })

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return { products, fetchProducts, isLoading, hasMore, searchQuery, setSearchQuery }
}
