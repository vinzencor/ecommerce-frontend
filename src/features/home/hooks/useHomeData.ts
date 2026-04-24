import { useQuery } from '@tanstack/react-query'
import { getHomeData } from '../api/home'

export const useHomeData = () => {
  return useQuery({
    queryKey: ['homeData'],
    queryFn: getHomeData,
  })
}
