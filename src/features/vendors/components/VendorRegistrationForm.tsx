import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface VendorRegistrationFormProps {
  onNext: () => void
}

export default function VendorRegistrationForm({ onNext }: VendorRegistrationFormProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-md p-8 md:p-10 space-y-5 shadow-sm max-w-4xl mx-auto mt-12">
      <div className="space-y-1.5">
        <h2 className="text-[17px] font-bold text-black">Personal information</h2>
        <p className="text-[13px] text-neutral-600 font-medium leading-relaxed">
          Enter your profile details below
        </p>
        <div className="h-px bg-neutral-100 w-full mt-4" />
      </div>

      <form
        className="space-y-10"
        onSubmit={(e) => {
          e.preventDefault()
          onNext()
        }}
      >
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Full Name
              </Label>
              <Input
                placeholder="eg. Adam Joe"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Email Address
              </Label>
              <Input
                placeholder="eg. adam@gmail.com"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Row 2 - Narrower Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8">
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Phone Number
              </Label>
              <Input
                placeholder="eg. +912582582525"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                Alternative Phone Number
              </Label>
              <Input
                placeholder="eg. +912582582525"
                className="h-10 bg-white border-neutral-200 focus:ring-0 focus:border-black transition-all text-[13px] rounded-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="md:col-span-2" /> {/* Empty space to match design */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 pt-2">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              type="submit"
              className="h-11 px-12 bg-[#1A1A1A] hover:bg-black text-white font-black text-[13px] uppercase tracking-widest rounded-sm transition-all"
            >
              Next
            </Button>
            <Button
              variant="outline"
              className="h-11 px-8 border-neutral-100 bg-[#EFEFEF] text-neutral-500 font-bold text-[12px] uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-all border-none"
            >
              Cancel
            </Button>
          </div>
          <p className="text-[9px] text-neutral-400 font-medium italic">
            * Changes will be reflected across your account immediately
          </p>
        </div>
      </form>
    </div>
  )
}
