<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProductStore } from '@/stores/product'

const router = useRouter()
const authStore = useAuthStore()
const { products, fetchProducts, isLoading, hasMore, searchQuery, setSearchQuery } =
  useProductStore()

const sentinel = ref(null)

onMounted(async () => {
  await fetchProducts()

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value) {
        fetchProducts()
      }
    },
    { rootMargin: '100px' },
  )

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

const goToDetail = (id: number) => {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="container">
    <!-- Header/Navbar -->
    <header class="header">
      <div class="top-header">
        <h1>Toko Klontong</h1>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
      <input
        type="text"
        v-model="searchQuery"
        @input="setSearchQuery(($event.target as HTMLInputElement).value)"
        placeholder="Cari produk..."
        class="search-input"
      />
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="product-grid">
        <div
          class="product-card"
          v-for="product in products"
          :key="product.id"
          @click="goToDetail(product.id)"
        >
          <img :src="product.image" alt="Product Image" class="product-image" />
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">{{ formatCurrency(product.price) }}</p>
        </div>
      </div>
    </main>

    <div ref="sentinel" class="h-10"></div>

    <p v-if="isLoading" class="text-center">Loading...</p>
    <p v-if="!hasMore" class="text-center text-gray-500">No more products</p>

    <!-- Footer -->
    <footer class="footer">
      <router-link to="/add-product" class="footer-button add-product">
        <span class="icon">+</span> Tambah Produk
      </router-link>
    </footer>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 400px;
  background: white;
  margin: auto;
  min-height: 100vh;
}

/* Header */
.header {
  background-color: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Search Input */
.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
  margin-top: 1rem;
}

.product-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 14px;
  font-weight: bold;
}

.product-price {
  font-size: 14px;
  color: #28a745;
  font-weight: bold;
  margin-top: 5px;
}

/* Footer */
.footer {
  background: white;
  color: white;
  text-align: center;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-button {
  width: 100%;
  background: #28a745;
  color: white;
  border: none;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #9b9b9b;
}
</style>
