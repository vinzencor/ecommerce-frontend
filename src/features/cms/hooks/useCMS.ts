import { useQuery } from '@tanstack/react-query'
import * as cmsApi from '../api/cms.api'

export const usePublicPages = () => {
  return useQuery({
    queryKey: ['public-cms-pages'],
    queryFn: async () => {
      const result = await cmsApi.getPublicPages()
      return result?.data ?? result
    },
  })
}

export const useCMSPage = (slug: string) => {
  return useQuery({
    queryKey: ['cms-page', slug],
    queryFn: async () => {
      if (!slug) return null
      const result = await cmsApi.getPageBySlug(slug)
      return result?.data ?? result
    },
    enabled: !!slug,
  })
}
