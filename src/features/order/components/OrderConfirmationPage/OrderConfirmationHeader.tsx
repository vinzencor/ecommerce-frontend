import { Check } from 'lucide-react'

export default function OrderConfirmationHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-8 md:py-12">
      <div className="size-16 md:size-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
        <Check size={32} strokeWidth={3} />
      </div>
      <h2 className="text-[24px] md:text-[30px] font-bold text-black uppercase tracking-tight">
        Your Order is Confirmed !
      </h2>
      <p className="text-[14px] md:text-[16px] text-neutral-500 font-medium max-w-md leading-relaxed">
        We received your order and will let you know once it ships
      </p>
    </div>
  )
}
