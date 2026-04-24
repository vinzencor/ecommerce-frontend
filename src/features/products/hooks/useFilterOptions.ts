import { useQuery } from '@tanstack/react-query'
import { getFilterOptions, getCategories } from '../api/products'

export const useFilterOptions = (categoryId?: string) => {
  return useQuery({
    queryKey: ['filter-options', categoryId],
    queryFn: () => getFilterOptions(categoryId!),
    enabled: !!categoryId,
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
