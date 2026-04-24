import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCart, addToCart, removeFromCart, clearCart, shareCart } from '../api/cart'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { CartListItem } from '../api/cart'

export const useCart = () => {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()

  // Fetch Cart
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated,
  })

  // Add to Cart
  const addToCartMutation = useMutation({
    mutationFn: ({ variantId, quantity }: { variantId: string; quantity: number }) =>
      addToCart(variantId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  // Remove from Cart
  const removeFromCartMutation = useMutation({
    mutationFn: (variantId: string) => removeFromCart(variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  // Clear Cart
  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  // Share Cart
  const shareCartMutation = useMutation({
    mutationFn: shareCart,
  })

  const cart = cartQuery.data?.data
  const items = cart?.items || []

  return {
    cart,
    items,
    summary: cart?.summary,
    isLoading: cartQuery.isLoading,
    error: cartQuery.error,
    addToCart: addToCartMutation.mutateAsync,
    isAdding: addToCartMutation.isPending,
    removeFromCart: removeFromCartMutation.mutateAsync,
    clearCart: clearCartMutation.mutateAsync,
    shareCart: shareCartMutation.mutateAsync,
    isSharing: shareCartMutation.isPending,
    cartCount: items.reduce((acc: number, item: CartListItem) => acc + item.quantity, 0),
  }
}
