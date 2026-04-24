import { useQuery } from '@tanstack/react-query'
import { getProducts, type FilterParams } from '../api/products'

export const useProducts = (params: FilterParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  })
}
