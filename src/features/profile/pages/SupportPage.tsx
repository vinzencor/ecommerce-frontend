import { useState } from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import { useMyTickets, useCreateTicket } from '../hooks/useSupport'
import { Loader2, Plus, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SupportPage() {
  const { data: response, isLoading } = useMyTickets()
  const createTicketMutation = useCreateTicket()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ subject: '', message: '', priority: 'LOW' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createTicketMutation.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false)
        setFormData({ subject: '', message: '', priority: 'LOW' })
      }
    })
  }

  const tickets = response?.data || []

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-16">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-[32px] md:text-[48px] font-black text-[#291F1F] tracking-tight leading-none">
              Support
            </h1>
            <p className="text-[14px] md:text-[18px] text-[#666] font-medium max-w-[500px]">
              Need help? Create a ticket and our team will get back to you soon.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#505081] hover:bg-[#404070] text-white rounded-full px-8 h-14 font-bold transition-all shadow-lg hover:shadow-[#505081]/25">
                <Plus className="mr-2 h-5 w-5" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[32px] border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-[#291F1F]">Create Support Ticket</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#505081] uppercase tracking-wider">Subject</label>
                  <Input 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Briefly describe the issue"
                    className="h-12 rounded-xl border-[#EDEDFD] focus:ring-[#505081]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#505081] uppercase tracking-wider">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full h-12 rounded-xl border border-[#EDEDFD] px-3 focus:ring-[#505081] outline-none"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#505081] uppercase tracking-wider">Message</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Explain your problem in detail"
                    className="min-h-[150px] rounded-xl border-[#EDEDFD] focus:ring-[#505081]"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={createTicketMutation.isPending}
                  className="w-full h-14 bg-[#505081] hover:bg-[#404070] text-white rounded-xl font-bold transition-all"
                >
                  {createTicketMutation.isPending ? <Loader2 className="animate-spin" /> : 'Submit Ticket'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <aside className="w-full lg:col-span-3 sticky top-8">
            <ProfileSidebar />
          </aside>

          <main className="w-full lg:col-span-9">
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="size-10 animate-spin text-[#505081]" />
              </div>
            ) : tickets.length === 0 ? (
              <div className="bg-[#F5F5F5] rounded-[32px] p-20 text-center border border-[#EDEDFD]">
                <div className="bg-white size-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <MessageSquare className="size-10 text-[#505081]" />
                </div>
                <h3 className="text-2xl font-bold text-[#291F1F] mb-2">No tickets yet</h3>
                <p className="text-[#666] font-medium">If you're facing any issues, our support team is here to help.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket: any) => (
                  <div key={ticket.id} className="bg-white border border-[#EDEDFD] rounded-[24px] p-6 hover:shadow-xl hover:shadow-[#505081]/5 transition-all group">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${
                          ticket.status === 'OPEN' ? 'bg-blue-50 text-blue-600' :
                          ticket.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {ticket.status === 'OPEN' ? <AlertCircle size={20} /> :
                           ticket.status === 'IN_PROGRESS' ? <Clock size={20} /> :
                           <CheckCircle2 size={20} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#291F1F] text-lg group-hover:text-[#505081] transition-colors">{ticket.subject}</h4>
                          <p className="text-sm text-[#666] font-medium">Created on {new Date(ticket.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className={`text-[12px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${
                          ticket.status === 'OPEN' ? 'bg-blue-50 text-blue-600' :
                          ticket.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
