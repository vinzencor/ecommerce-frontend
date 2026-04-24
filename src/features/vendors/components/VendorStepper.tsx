import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = ['Seller Account Creation', 'Add Business Details', 'Add Bank Details']

interface VendorStepperProps {
  currentStep: number
}

export default function VendorStepper({ currentStep }: VendorStepperProps) {
  return (
    <div className="w-full max-w-lg mx-auto py-1 mt-4">
      <div className="relative flex items-center justify-between">
        {/* Connector Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 z-0" />

        {/* Connector Active Progress */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-[#3AB561] -translate-y-1/2 transition-all duration-500 z-0"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        {STEPS.map((step, idx) => {
          const stepNumber = idx + 1
          const isCompleted = stepNumber < currentStep || (currentStep === 3 && stepNumber === 3) // Show 3rd check on 3rd page to match design
          const isActive = stepNumber === currentStep && currentStep !== 3

          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                  isCompleted
                    ? 'bg-[#3AB561] border-[#3AB561] text-white shadow-sm'
                    : isActive
                      ? 'bg-[#3AB561] border-[#3AB561] text-white'
                      : 'bg-neutral-200 border-neutral-200 text-neutral-400'
                )}
              >
                {isCompleted ? (
                  <Check size={12} strokeWidth={4} />
                ) : isActive ? (
                  <div className="h-2 w-2 rounded-full bg-white" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-white opacity-0" />
                )}
              </div>
              <span
                className={cn(
                  'text-[8px] font-black uppercase tracking-[0.15em] absolute -bottom-6 whitespace-nowrap',
                  isCompleted || isActive ? 'text-black' : 'text-neutral-600'
                )}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
