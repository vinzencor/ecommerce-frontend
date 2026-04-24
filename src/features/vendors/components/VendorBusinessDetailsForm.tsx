import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'

interface VendorBusinessDetailsFormProps {
  onNext: () => void
  onBack: () => void
}

export default function VendorBusinessDetailsForm({
  onNext,
  onBack,
}: VendorBusinessDetailsFormProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-md p-8 md:p-10 space-y-5 shadow-sm max-w-4xl mx-auto mt-12">
      <div className="space-y-1.5">
        <h2 className="text-[17px] font-bold text-black">Business Information</h2>
        <p className="text-[13px] text-neutral-600 font-medium leading-relaxed">
          Enter your business details below
        </p>
        <div className="h-px bg-neutral-100 w-full mt-4" />
      </div>

      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault()
          onNext()
        }}
      >
        <div className="space-y-8">
          {/* Row 1: Business Name & VAT Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Business Name
              </Label>
              <Input
                placeholder="eg. Adam jke"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                VAT Number
              </Label>
              <Input
                placeholder="12345678912"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Row 2: Building Number & Landmark */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8">
            <div className="space-y-2.5 col-span-1">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Building Number
              </Label>
              <Input
                placeholder="945B"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2.5 col-span-3">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Landmark
              </Label>
              <Input
                placeholder="Enter Landmark"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Row 3: City, State, Country, Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8">
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                City
              </Label>
              <Input
                placeholder="Mathuras"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                State
              </Label>
              <Input
                placeholder="Bengaluru"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Country
              </Label>
              <Input
                placeholder="Bengaluru"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Pincode
              </Label>
              <Input
                placeholder="556001"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Business Logo Upload Area */}
          <div className="space-y-2.5">
            <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
              Upload Business Logo
            </Label>
            <div className="border border-neutral-200 rounded-sm p-12 flex flex-col items-center justify-center space-y-4 hover:border-black transition-all cursor-pointer group">
              <div className="h-12 w-12 border border-neutral-100 rounded-sm flex items-center justify-center text-neutral-300 group-hover:text-black transition-colors">
                <ImageIcon size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">
                Supported: [.jpg, .png]
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 pt-2">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              type="submit"
              className="h-11 px-12 bg-[#1A1A1A] hover:bg-black text-white font-black text-[13px] uppercase tracking-widest rounded-sm transition-all shadow-none"
            >
              Next
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="h-11 px-8 border-none bg-[#EFEFEF] text-neutral-500 font-bold text-[12px] uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-all shadow-none"
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
