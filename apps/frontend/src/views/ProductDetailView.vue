<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '@/entities/product'
import api from '@/api'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const product = ref<Product>({
  id: 0,
  createdAt: '',
  updatedAt: '',
  createdBy: null,
  updatedBy: null,
  name: '',
  sku: '',
  description: '',
  weight: 0,
  width: 0,
  length: 0,
  height: 0,
  image: '',
  price: 0,
  category: null,
})

const fetchProductDetail = async () => {
  try {
    const productId = route.params.id
    const response = await api.get(`/products/${productId}`)
    product.value = response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    } else {
      alert('An unexpected error occurred')
    }
  }
}

onMounted(fetchProductDetail)

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>Detail Produk</h1>
    </header>

    <main class="main-content">
      <h2>{{ product?.name }}</h2>
      <img v-if="product?.image" :src="product.image" alt="Gambar Produk" class="product-image" />
      <p><strong>SKU:</strong> {{ product.sku }}</p>
      <p><strong>Deskripsi:</strong> {{ product.description }}</p>
      <p>
        <strong>Harga: </strong>
        <span class="product-price"> {{ formatCurrency(product.price) }}</span>
      </p>
      <p><strong>Berat:</strong> {{ product.weight }} gram</p>
      <p>
        <strong>Dimensi:</strong> {{ product.width }} cm x {{ product.length }} cm x
        {{ product.height }} cm
      </p>
      <p><strong>Kategori:</strong> {{ product.category?.name }}</p>
    </main>

    <footer class="footer">
      <button @click="goBack" class="back-button">Kembali</button>
    </footer>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 400px;
  margin: auto;
  background: white;
  border-radius: 8px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.main-content {
  flex: 1;
  padding: 1rem;
}
.product-image {
  max-width: 100%;
  border-radius: 8px;
}

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

.product-price {
  font-size: 14px;
  color: #28a745;
  font-weight: bold;
  margin-top: 5px;
}

.back-button {
  width: 100%;
  background: #dc3545;
  color: white;
  border: none;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
</style>
