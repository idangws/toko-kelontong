export interface Category {
  id: number
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  name: string
}

export interface Product {
  id: number
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  name: string
  sku: string
  description: string
  weight: number
  width: number
  length: number
  height: number
  image: string
  price: number
  category: Category | null
}

export interface ProductResponse {
  data: Product[]
  currentPage: number
  totalPages: number
  totalItems: number
}
