import api from '@/lib/axios'

export const getMyRewards = async () => {
  const response = await api.get('/rewards/my-rewards')
  return response.data
}

export const getMyReferrals = async () => {
  const response = await api.get('/referrals/my-referrals') // Need to add to backend
  return response.data
}
