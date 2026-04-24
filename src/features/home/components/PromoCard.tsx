import { Button } from '@/components/ui/button'

export function PromoCard() {
  return (
    <div className="bg-white p-3 md:p-4 rounded-sm w-full shadow-sm flex flex-col items-center justify-center relative isolate h-full min-h-0">
      {/* Top-Left Corner Border */}
      <div className="absolute top-3 left-3 w-[80%] h-[35%] border-t border-l border-black pointer-events-none" />

      {/* Bottom-Right Corner Border */}
      <div className="absolute bottom-3 right-3 w-[80%] h-[35%] border-b border-r border-black pointer-events-none" />

      <div className="flex flex-col items-center text-center justify-between h-full py-1 md:py-2 z-10 w-full">
        {/* Header Texts */}
        <div className="space-y-1 md:space-y-2 pt-1">
          <h2 className="text-[20px] md:text-[26px] font-black tracking-tight text-black uppercase leading-tight">
            Sale
          </h2>
          <p className="font-bold text-[9px] md:text-[11px] tracking-wider text-black uppercase">
            Just For You
          </p>
        </div>

        {/* 40% OFF DISCOUNT Typography Graphic */}
        <div className="relative flex justify-center items-center w-full max-w-full mx-auto my-3 md:my-4">
          <div className="flex flex-col items-start font-serif pr-2 md:pr-8 pb-2 md:pb-3">
            <div className="flex items-start">
              <span className="text-[55px] xl:text-[90px] font-black tracking-tighter leading-[0.75] -mr-1 xl:-mr-2 text-black">
                40
              </span>
              <span className="text-[25px] xl:text-[45px] font-black tracking-tighter leading-none mt-0.5 xl:mt-1 text-black">
                %
              </span>
            </div>
            <span className="text-[16px] xl:text-[30px] font-black tracking-widest leading-[0.8] ml-1 xl:ml-2 mt-1 xl:mt-2 text-black">
              OFF
            </span>
          </div>

          <div className="absolute z-20 bottom-1 xl:bottom-4 right-0 xl:right-2 rotate-[-30deg] bg-white px-1 xl:px-2 py-0.5">
            <div className="border-t-[2px] xl:border-t-3 border-black pt-1 px-1">
              <span className="text-[9px] xl:text-[14px] font-black uppercase tracking-widest text-black font-sans leading-none block">
                Discount
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto w-full px-2 md:px-4 text-center z-20">
          <Button
            variant="outline-black"
            className="w-full text-[10px] md:text-[11px] tracking-wider h-8 md:h-11 border-black hover:bg-black hover:text-white transition-colors"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </div>
  )
}
