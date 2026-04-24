import React from 'react'
import { Dot } from 'lucide-react'

interface AuthBrandingProps {
  title: string
  subtitle: React.ReactNode
}

const FEATURES = [
  {
    icon: Dot,
    text: 'Free express shipping on orders over ₹2,999',
    bold: 'Free express shipping',
  },
  { icon: Dot, text: 'Early access to seasonal collections', bold: 'Early access' },
  { icon: Dot, text: 'Exclusive member-only offers & rewards', bold: 'Exclusive member-only' },
  { icon: Dot, text: 'Hassle-free returns within 30 days', bold: 'Hassle-free returns' },
]

export default function AuthBranding({ title, subtitle }: AuthBrandingProps) {
  return (
    <div className="relative h-full w-full bg-[#1A1A1A] text-white p-10 md:p-16 flex flex-col justify-between overflow-hidden">
      {/* Background Gradient / Glow — centered */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(70% 100% at 30% 50%, rgba(212, 169, 106, 0.15) 0%, rgba(212, 169, 106, 0) 100%)',
        }}
      />

      {/* Background Pattern: Circular lines */}
      <div className="absolute bottom-[12%] right-[-18%] w-[350px] h-[350px] pointer-events-none">
        <div className="absolute inset-0 border border-[#D4A96A]/10 rounded-full" />
        <div className="absolute inset-0 border border-[#D4A96A]/10 rounded-full scale-[0.65]" />
      </div>

      <div className="relative z-10 space-y-20">
        {/* Logo Section */}
        <div className="space-y-1">
          <h1 className="text-[28px] font-black tracking-[0.2em] uppercase">LOGO</h1>
          <p
            className="text-[10px] font-bold tracking-[0.4em] uppercase"
            style={{ color: '#D4A96A' }}
          >
            Curated Commerce
          </p>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 max-w-md">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-0.5 bg-[#D4A96A]" />
            <h2 className="text-[40px] md:text-[52px] font-light leading-[1.1] tracking-tight italic">
              {title.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={i === 3 || i === 4 ? 'italic font-light' : ''}
                  style={i === 3 || i === 4 ? { color: '#D4A96A' } : undefined}
                >
                  {word}
                  {i === 2 ? <br /> : ' '}
                </span>
              ))}
            </h2>
          </div>
          <p className="text-[19px] text-neutral-400 font-light leading-relaxed">{subtitle}</p>
        </div>

        {/* Features List */}
        <ul className="space-y-6">
          {FEATURES.map((feature, index) => (
            <li key={index} className="flex items-center gap-5">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#D4A96A' }}
              />
              <p className="text-[15px] text-neutral-400 font-light leading-snug">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-10">
        <p className="text-[12px] text-neutral-500 font-medium tracking-tight">
          © 2026 Name · All rights reserved
        </p>
      </div>
    </div>
  )
}
