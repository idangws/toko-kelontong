<script setup lang="ts">
import api from '@/api'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const productForm = ref<HTMLFormElement | null>(null)
const router = useRouter()

const product = ref({
  name: '',
  price: null,
  image: null as File | null,
  sku: '',
  description: '',
  weight: null,
  width: null,
  length: null,
  height: null,
  categoryId: null as number | null,
})

const categories = ref<{ id: number; name: string }[]>([])
const loadingCategories = ref(false)
const imageFile = ref<File | null>(null)
const uploadingImage = ref(false)

const fetchCategories = async () => {
  loadingCategories.value = true
  try {
    const response = await api.get('/categories')
    categories.value = response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    } else {
      alert('An unexpected error occurred')
    }
  } finally {
    loadingCategories.value = false
  }
}

onMounted(() => {
  fetchCategories()
})

const addProduct = async () => {
  if (!product.value.image) {
    alert('Silakan upload gambar terlebih dahulu.')
    return
  }

  try {
    await api.post('/products', {
      name: product.value.name,
      sku: product.value.sku,
      description: product.value.description,
      weight: product.value.weight,
      width: product.value.width,
      length: product.value.length,
      height: product.value.height,
      price: product.value.price,
      category_id: product.value.categoryId,
      image: product.value.image,
    })

    alert('Berhasil Tambah Produk')
    goBack()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    } else {
      alert('An unexpected error occurred')
    }
  }
}

const submitForm = () => {
  productForm.value?.requestSubmit()
}

const uploadImage = async () => {
  if (!imageFile.value) return

  const formData = new FormData()
  formData.append('file', imageFile.value)

  uploadingImage.value = true
  try {
    const response = await api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    product.value.image = response.data.path
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message)
    } else {
      alert('An unexpected error occurred')
    }
  } finally {
    uploadingImage.value = false
  }
}

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      alert('Format gambar harus JPEG atau PNG!')
      return
    }
    imageFile.value = file
    uploadImage()
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="container">
    <!-- Header/Navbar -->
    <header class="header">
      <h1>Tambah Product</h1>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <form ref="productForm" @submit.prevent="addProduct" class="product-form">
        <label for="name">Nama Produk</label>
        <input id="name" v-model="product.name" type="text" placeholder="Nama Produk" required />

        <label for="sku">SKU Produk</label>
        <input id="sku" v-model="product.sku" type="text" placeholder="SKU" required />

        <label for="desc">Deskripsi</label>
        <input
          id="desc"
          v-model="product.description"
          type="text"
          placeholder="Deskripsi"
          required
        />

        <label for="weight">Berat</label>
        <input
          id="weight"
          v-model.number="product.weight"
          type="number"
          placeholder="Berat (gram)"
          required
        />

        <label for="width">Lebar</label>
        <input
          id="width"
          v-model.number="product.width"
          type="number"
          placeholder="Lebar (cm)"
          required
        />

        <label for="height">Tinggi</label>
        <input
          id="height"
          v-model.number="product.height"
          type="number"
          placeholder="Tinggi (cm)"
          required
        />

        <label for="length">Panjang</label>
        <input
          id="length"
          v-model.number="product.length"
          type="number"
          placeholder="Panjang (cm)"
          required
        />

        <label for="price">Harga</label>
        <input
          id="price"
          v-model.number="product.price"
          type="number"
          placeholder="Harga Produk"
          required
        />

        <label for="category">Kategori</label>
        <select id="category" v-model="product.categoryId" required>
          <option value="" disabled>Pilih Kategori</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <label for="image">Gambar Produk</label>
        <input id="image" type="file" @change="handleFileUpload" accept="image/*" required />
      </form>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <button @click="submitForm" class="footer-button add-product">Simpan</button>
      <button @click="goBack" class="footer-button">Cancel</button>
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
  max-width: 100vw;
  margin: auto;
  background: white;
  border-radius: 8px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background-color: white;
  padding: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
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

.main-content {
  flex: 1;
  padding: 1.5rem;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.product-form input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-form select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  gap: 5px;
}

.footer-button {
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
.add-product {
  background: #28a745;
  color: white;
}
</style>
