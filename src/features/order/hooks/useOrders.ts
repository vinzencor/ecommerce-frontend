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
export const useOrderActions = () => {
  const queryClient = useQueryClient()

  const cancelOrderMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => orderApi.cancelOrder(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  const requestReturnMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { reason: string; images?: string[] } }) =>
      orderApi.requestReturn(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  return {
    cancelOrder: cancelOrderMutation,
    requestReturn: requestReturnMutation,
  }
}
