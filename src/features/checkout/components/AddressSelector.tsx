import { useState } from 'react'
import { Loader2, CheckCircle2, MapPin } from 'lucide-react'
import { useAddresses } from '../../profile/hooks/useAddresses'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import AddAddressModal from '../../profile/components/AddAddressModal'

interface AddressSelectorProps {
  selectedAddressId: string | null
  onSelect: (id: string) => void
}

export default function AddressSelector({ selectedAddressId, onSelect }: AddressSelectorProps) {
  const { addresses, isLoading } = useAddresses()
  const [isAdding, setIsAdding] = useState(false)

  if (isLoading) {
    return (
      <div className="bg-white border border-neutral-200 rounded-md p-8 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-neutral-300" size={24} />
        <p className="text-[13px] text-neutral-400 font-medium italic">Loading your addresses...</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 space-y-6">
      <AddAddressModal open={isAdding} onOpenChange={setIsAdding} />

      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-black flex items-center gap-2">
          <MapPin size={18} />
          Shipping Address
        </h2>
        <Button
          onClick={() => setIsAdding(true)}
          variant="link"
          className="text-black font-black text-[12px] uppercase tracking-wider p-0 h-auto"
        >
          Add New
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="py-6 text-center border-2 border-dashed border-neutral-100 rounded-md">
          <p className="text-[14px] text-neutral-500">No saved addresses found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => onSelect(address.id)}
              className={cn(
                'relative cursor-pointer border rounded-sm p-4 transition-all duration-200',
                selectedAddressId === address.id
                  ? 'border-black bg-neutral-50/50 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                  {address.addressType}
                </span>
                {selectedAddressId === address.id && (
                  <CheckCircle2 size={16} className="text-black fill-white" />
                )}
              </div>
              <p className="text-[14px] font-bold text-black mb-1">{address.fullName}</p>
              <p className="text-[13px] text-neutral-500 leading-relaxed truncate">
                {address.street}, {address.city}
              </p>
              <p className="text-[12px] text-neutral-400 font-bold mt-2">Ph: {address.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
