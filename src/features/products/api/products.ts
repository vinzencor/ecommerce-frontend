import api from '@/lib/axios'
import { type BackendProduct } from '@/lib/mapping'

export interface FilterParams {
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  minDiscount?: number
  brandIds?: string // Comma separated string
  hasDiscount?: boolean
  sortBy?: string
  page?: number
  limit?: number
  search?: string
}

export interface Category {
  id: string
  name: string
  level: string
  imageUrl?: string
  parentId?: string
  description?: string
  isActive: boolean
}

export interface ProductsResponse {
  products: BackendProduct[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export interface FilterOptionsResponse {
  brands: Array<{ id: string; name: string }>
  priceRange?: {
    min: number
    max: number
  }
}

export const getProducts = async (params: FilterParams = {}): Promise<ProductsResponse> => {
  const endpoint = params.search ? '/home/search' : '/home/filter'

  // Format params for backend
  const queryParams: Record<string, string | number | boolean | undefined> = { ...params }
  if (params.search) {
    queryParams.value = params.search
  }

  const response = await api.get(endpoint, { params: queryParams })
  return response.data.data
}

export const getProductDetails = async (id: string): Promise<BackendProduct> => {
  const response = await api.get(`/home/h/product/${id}`)
  return response.data.data
}

export const getFilterOptions = async (categoryId: string): Promise<FilterOptionsResponse> => {
  const response = await api.get(`/home/filteroptions/${categoryId}`)
  return response.data.data
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/home/h')
  return response.data.data.categories
}
