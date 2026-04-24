import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as addressApi from '../api/addresses'

export const useAddresses = () => {
  const queryClient = useQueryClient()

  const addressesQuery = useQuery({
    queryKey: ['addresses'],
    queryFn: addressApi.getAddresses,
  })

  const addMutation = useMutation({
    mutationFn: addressApi.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<addressApi.Address> }) =>
      addressApi.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: addressApi.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  const defaultMutation = useMutation({
    mutationFn: addressApi.makeDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  return {
    addresses: addressesQuery.data || [],
    isLoading: addressesQuery.isLoading,
    addAddress: addMutation.mutateAsync,
    updateAddress: updateMutation.mutateAsync,
    deleteAddress: deleteMutation.mutateAsync,
    makeDefault: defaultMutation.mutateAsync,
  }
}
