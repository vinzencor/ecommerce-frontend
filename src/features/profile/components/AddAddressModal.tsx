import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAddresses } from '../hooks/useAddresses'
import { toast } from 'sonner'
import { Home, Briefcase, Globe, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isAxiosError } from 'axios'
import type { Address } from '../api/addresses'

interface AddAddressModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type AddressType = Address['addressType']

const addressTypes: Array<{ id: AddressType; label: string; icon: typeof Home }> = [
  { id: 'HOME', label: 'Home', icon: Home },
  { id: 'WORK', label: 'Work', icon: Briefcase },
  { id: 'OTHERS', label: 'Other', icon: Globe },
]

export default function AddAddressModal({ open, onOpenChange }: AddAddressModalProps) {
  const { addAddress } = useAddresses()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    addressType: 'HOME' as 'HOME' | 'WORK' | 'OTHERS',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addAddress(formData)
      toast.success('Address added successfully!')
      onOpenChange(false)
      setFormData({
        fullName: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        addressType: 'HOME',
      })
    } catch (error: unknown) {
      if (isAxiosError<{ message?: string }>(error)) {
        toast.error(error.response?.data?.message || 'Failed to add address.')
      } else {
        toast.error('Failed to add address.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-sm">
        <DialogHeader className="bg-black text-white p-8">
          <DialogTitle className="text-[24px] font-black uppercase tracking-tight">
            Add New Address
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-[13px] font-medium mt-1">
            Fill in the details below to save a new delivery location.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                Full Name
              </label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="rounded-sm border-neutral-200 h-11 focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                Phone Number
              </label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="rounded-sm border-neutral-200 h-11 focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
              Street Address
            </label>
            <Input
              required
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="123 Luxury Lane, Apartment 4B"
              className="rounded-sm border-neutral-200 h-11 focus:border-black transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                City
              </label>
              <Input
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Mumbai"
                className="rounded-sm border-neutral-200 h-11 focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                State
              </label>
              <Input
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Maharashtra"
                className="rounded-sm border-neutral-200 h-11 focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                Pincode
              </label>
              <Input
                required
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="400001"
                className="rounded-sm border-neutral-200 h-11 focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
              Address Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {addressTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, addressType: type.id })}
                  className={cn(
                    'flex flex-col items-center justify-center p-4 border rounded-sm transition-all gap-2',
                    formData.addressType === type.id
                      ? 'border-black bg-black text-white shadow-md scale-[1.02]'
                      : 'border-neutral-100 hover:border-neutral-300 text-neutral-500 bg-neutral-50/50'
                  )}
                >
                  <type.icon size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-sm h-12 text-[12px] font-black uppercase tracking-widest border-neutral-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] bg-black hover:bg-neutral-800 text-white rounded-sm h-12 text-[12px] font-black uppercase tracking-widest shadow-xl"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save Address'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
