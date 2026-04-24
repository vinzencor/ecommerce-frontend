import { useState } from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import { useAddresses } from '../hooks/useAddresses'
import { Button } from '@/components/ui/button'
import { Plus, MapPin, Trash2, CheckCircle2, Loader2, Home, Briefcase, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import AddAddressModal from '../components/AddAddressModal'

export default function AddressesPage() {
  const { addresses, isLoading, deleteAddress, makeDefault } = useAddresses()
  const [isAdding, setIsAdding] = useState(false)

  const TypeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'HOME':
        return <Home size={14} />
      case 'WORK':
        return <Briefcase size={14} />
      default:
        return <Globe size={14} />
    }
  }

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 min-h-screen">
      <AddAddressModal open={isAdding} onOpenChange={setIsAdding} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <aside className="lg:col-span-3">
          <ProfileSidebar />
        </aside>

        <main className="lg:col-span-9 flex flex-col gap-8 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-neutral-100">
            <div className="space-y-1.5">
              <h1 className="text-[28px] md:text-[32px] font-bold text-black tracking-tight">
                Saved Addresses
              </h1>
              <p className="text-[14px] text-neutral-400 font-medium">
                Manage your delivery locations for faster checkout
              </p>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-black hover:bg-neutral-800 text-white font-bold text-[13px] uppercase tracking-widest px-8 rounded-sm h-12 shadow-lg"
            >
              <Plus size={16} className="mr-2" />
              Add New Address
            </Button>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-neutral-300 size-10" />
              <p className="text-neutral-500 font-medium italic">Loading your addresses...</p>
            </div>
          ) : addresses.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-neutral-50/50 rounded-lg border-2 border-dashed border-neutral-100">
              <div className="p-4 rounded-full bg-neutral-100 mb-6">
                <MapPin size={32} className="text-neutral-400" />
              </div>
              <h3 className="text-[18px] font-bold text-black mb-2">No Addresses Found</h3>
              <p className="text-[14px] text-neutral-500 max-w-xs px-6">
                You haven't saved any addresses yet. Add one to speed up your checkout process.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={cn(
                    'relative group bg-white border rounded-sm p-6 transition-all duration-300',
                    address.isDefault
                      ? 'border-black shadow-md ring-1 ring-black/5'
                      : 'border-neutral-200 hover:border-neutral-400 shadow-sm'
                  )}
                >
                  {address.isDefault && (
                    <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-sm">
                      Default
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-neutral-100 rounded-sm">
                        <TypeIcon type={address.addressType} />
                      </div>
                      <span className="text-[12px] font-black uppercase tracking-tighter text-neutral-400">
                        {address.addressType}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-black text-[16px]">{address.fullName}</h4>
                      <p className="text-[14px] text-neutral-600 leading-relaxed font-medium">
                        {address.street}, {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-[13px] text-neutral-400 font-bold mt-2">
                        Ph: {address.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 mt-2 border-t border-neutral-50">
                      {!address.isDefault && (
                        <button
                          onClick={() => makeDefault(address.id)}
                          className="text-[12px] font-bold text-neutral-500 hover:text-black transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 size={12} />
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 ml-auto"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
