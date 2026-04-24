import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'

interface VendorBankDetailsFormProps {
  onBack: () => void
}

export default function VendorBankDetailsForm({ onBack }: VendorBankDetailsFormProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-md p-8 md:p-10 space-y-5 shadow-sm max-w-4xl mx-auto mt-12">
      <div className="space-y-1.5">
        <h2 className="text-[17px] font-bold text-black">Bank Information</h2>
        <p className="text-[13px] text-neutral-600 font-medium leading-relaxed">
          Enter your bank details below
        </p>
        <div className="h-px bg-neutral-100 w-full mt-4" />
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-8">
          {/* Bank Name */}
          <div className="space-y-2.5">
            <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
              Bank Name
            </Label>
            <Input
              placeholder="eg. Joe's bank"
              className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
            />
          </div>

          {/* Account Number */}
          <div className="space-y-2.5">
            <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
              Account Number
            </Label>
            <Input
              placeholder="1234567812"
              className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
            />
          </div>

          {/* IFSC Code */}
          <div className="space-y-2.5">
            <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
              IFSC Code
            </Label>
            <Input
              placeholder="123456872"
              className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
            />
          </div>

          {/* Upload ID Proof */}
          <div className="space-y-4">
            <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
              Upload ID Proof
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-neutral-200 rounded-sm p-8 flex flex-col items-center justify-center space-y-3 hover:border-black transition-all cursor-pointer group">
                <div className="h-10 w-10 border border-neutral-100 rounded-sm flex items-center justify-center text-neutral-300 group-hover:text-black transition-colors">
                  <ImageIcon size={20} strokeWidth={1.5} />
                </div>
                <p className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">
                  ID PROOF
                </p>
              </div>
              <div className="border border-neutral-200 rounded-sm p-8 flex flex-col items-center justify-center space-y-3 hover:border-black transition-all cursor-pointer group">
                <div className="h-10 w-10 border border-neutral-100 rounded-sm flex items-center justify-center text-neutral-300 group-hover:text-black transition-colors">
                  <ImageIcon size={20} strokeWidth={1.5} />
                </div>
                <p className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">
                  PAN CARD
                </p>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2.5">
            <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
              Password
            </Label>
            <Input
              type="password"
              placeholder="123456812"
              className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2.5">
            <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
              Confirm Password
            </Label>
            <Input
              type="password"
              placeholder="123456812"
              className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button className="h-10 px-10 bg-[#1A1A1A] hover:bg-black text-white font-black text-[12px] uppercase tracking-widest rounded-sm transition-all shadow-none">
            CONFIRM
          </Button>
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="h-10 px-8 border-none bg-[#EFEFEF] text-neutral-500 font-bold text-[12px] uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-all shadow-none"
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}
