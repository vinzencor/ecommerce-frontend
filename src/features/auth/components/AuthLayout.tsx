import React from 'react'
import AuthBranding from './AuthBranding'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: React.ReactNode
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white">
      {/* Left Panel: Branding */}
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-1/2 w-full h-[320px] md:h-[480px] lg:h-full z-10">
        <AuthBranding title={title} subtitle={subtitle} />
      </div>

      {/* Right Panel: Content/Form */}
      <div className="flex-1 lg:ml-[50%] flex flex-col justify-center items-center py-10 md:py-16 px-4 md:px-8">
        <div className="w-full max-w-2xl bg-white p-6 md:p-10 lg:p-14">{children}</div>
      </div>
    </div>
  )
}
