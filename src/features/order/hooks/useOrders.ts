import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as orderApi from '../api/orders'

export const useOrders = () => {
  const queryClient = useQueryClient()

  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getMyOrders,
  })

  const placeOrderMutation = useMutation({
    mutationFn: orderApi.placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] }) // Order clears cart
    },
  })

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    placeOrder: placeOrderMutation.mutateAsync,
    isPlacing: placeOrderMutation.isPending,
  }
}

export const useOrder = (id: string | null) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrderById(id!),
    enabled: !!id,
  })
}
