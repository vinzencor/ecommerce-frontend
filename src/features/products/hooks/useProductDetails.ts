import { useQuery } from '@tanstack/react-query'
import { getProductDetails } from '../api/products'

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  })
}
