import { useQuery } from '@tanstack/react-query'
import * as dealsApi from '../api/deals'

export const useDeals = () => {
  return useQuery({
    queryKey: ['deals'],
    queryFn: dealsApi.getDeals,
  })
}
