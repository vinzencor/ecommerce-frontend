import api from '@/lib/axios'

export const getPublicPages = async () => {
  const response = await api.get('/cms/public/pages')
  return response.data
}

export const getPageBySlug = async (slug: string) => {
  const response = await api.get(`/cms/${slug}`)
  return response.data
}
