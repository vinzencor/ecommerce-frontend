import { useState } from 'react'
import AddressSelector from '../components/AddressSelector'
import ShippingMethods from '../components/ShippingMethods'
import PaymentMethods from '../components/PaymentMethods'
import CheckoutSummary from '../components/CheckoutSummary'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function CheckoutPage() {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16 py-6 md:py-10 min-h-screen">
      <h1 className="text-[26px] md:text-[30px] font-bold text-black mb-6 md:mb-10">
        Let's Checkout !!!
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start pb-20">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
          {/* Checkout as Guest Card - Only show if not authenticated */}
          {!isAuthenticated && (
            <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[17px] font-bold text-black">Checkout as Guest</h2>
                <p className="text-[13px] text-neutral-400 font-medium leading-relaxed">
                  Sign in to track your order and save your information for faster checkout
                </p>
              </div>
              <Button
                variant="outline"
                className="h-10 px-6 rounded-sm border-neutral-200 text-[13px] font-bold hover:bg-neutral-50 transition-all"
              >
                Sign In
              </Button>
            </div>
          )}

          <AddressSelector selectedAddressId={selectedAddressId} onSelect={setSelectedAddressId} />
          <ShippingMethods />
          <PaymentMethods />
        </div>

        {/* Right Column: Summary */}
        <CheckoutSummary selectedAddressId={selectedAddressId} />
      </div>
    </div>
  )
}
