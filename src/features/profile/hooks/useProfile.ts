import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateProfile, type UserProfile } from '../api/profile'
import { useAuth } from '@/features/auth/hooks/useAuth'

export const useProfile = () => {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isAuthenticated,
  })

  const updateMutation = useMutation({
    mutationFn: (data: Partial<UserProfile>) => updateProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['profile'], updatedProfile)
      // Also potentially update auth state if name/email changed
    },
  })

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isUpdating: updateMutation.isPending,
    updateProfile: updateMutation.mutateAsync,
  }
}
