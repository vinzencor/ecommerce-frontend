import { Input } from '@/components/ui/input'

export default function AddressForm() {
  return (
    <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 space-y-8">
      <h2 className="text-[18px] font-bold text-black">Delivery Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-black">First Name*</label>
          <Input placeholder="Adam" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-black">Last Name*</label>
          <Input placeholder="Joe" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-black">Email Id*</label>
          <Input type="email" placeholder="adam@gmail.com" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-black">Phone Number*</label>
          <Input placeholder="+91 8521474714" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-black">City*</label>
          <Input placeholder="Ernakulam" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-black">State*</label>
          <Input placeholder="Kerala" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-black">Pin code*</label>
          <Input placeholder="680021" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-bold text-black">Address*</label>
        <textarea
          className="flex min-h-32 w-full rounded-sm border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-black transition-colors"
          placeholder="Enter full address"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="save-info"
          className="size-4 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
        />
        <label
          htmlFor="save-info"
          className="text-[13px] font-medium text-neutral-600 cursor-pointer select-none"
        >
          Save this information for next time
        </label>
      </div>
    </div>
  )
}
