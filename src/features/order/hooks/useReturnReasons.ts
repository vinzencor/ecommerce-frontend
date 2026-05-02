import { useQuery } from '@tanstack/react-query'
import { getReturnReasons } from '../api/return-reasons'

export const useReturnReasons = (type?: 'CANCEL' | 'RETURN') => {
  return useQuery({
    queryKey: ['return-reasons', type],
    queryFn: () => getReturnReasons(type),
  })
}
