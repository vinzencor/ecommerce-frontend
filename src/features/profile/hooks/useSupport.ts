import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as supportApi from '../api/support'
import { toast } from 'sonner'

export const useMyTickets = () => {
  return useQuery({
    queryKey: ['my-tickets'],
    queryFn: supportApi.getMyTickets,
  })
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: supportApi.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-tickets'] })
      toast.success('Ticket created successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create ticket')
    }
  })
}

export const useTicketDetails = (id: string) => {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => supportApi.getTicketDetails(id),
    enabled: !!id,
  })
}

export const useReplyToTicket = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) => 
      supportApi.replyToTicket(id, message),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ticket', variables.id] })
      toast.success('Reply sent')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to send reply')
    }
  })
}
