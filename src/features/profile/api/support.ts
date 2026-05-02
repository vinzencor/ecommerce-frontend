import api from '@/lib/axios'

export const getMyTickets = async () => {
  const response = await api.get('/support/tickets')
  return response.data
}

export const createTicket = async (data: { subject: string; message: string; priority?: string }) => {
  const response = await api.post('/support/tickets', data)
  return response.data
}

export const getTicketDetails = async (id: string) => {
  const response = await api.get(`/support/tickets/${id}`)
  return response.data
}

export const replyToTicket = async (id: string, message: string) => {
  const response = await api.post(`/support/tickets/${id}/reply`, { message })
  return response.data
}
