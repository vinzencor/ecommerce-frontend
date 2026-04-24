import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SearchX } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-[#F8F8F8] rounded-[32px] p-10 md:p-16 text-center max-w-2xl w-full border border-neutral-100 flex flex-col items-center shadow-sm relative overflow-hidden isolate">
        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="w-20 h-20 md:w-24 md:h-24 bg-black text-white rounded-full flex items-center justify-center mb-6 z-10 shadow-lg">
          <SearchX size={40} className="md:w-12 md:h-12" strokeWidth={1.5} />
        </div>

        <div className="z-10 flex flex-col items-center">
          <h1 className="text-[80px] md:text-[120px] font-black leading-none tracking-tighter text-black">
            404
          </h1>

          <h2 className="text-[20px] md:text-[28px] font-bold tracking-tight text-[#282C3F] mt-2 mb-4">
            Oops! Page Not Found
          </h2>

          <p className="text-neutral-500 text-[14px] md:text-[16px] max-w-md mx-auto mb-8 leading-relaxed">
            We couldn't find the page you're looking for. It might have been moved, deleted, or
            perhaps you mistyped the URL.
          </p>

          <Link to="/">
            <Button className="bg-black text-white hover:bg-neutral-800 transition-colors h-14 md:h-16 px-8 md:px-10 rounded-full font-bold tracking-widest text-[12px] md:text-[13px] uppercase shadow-md flex items-center gap-2 group">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
