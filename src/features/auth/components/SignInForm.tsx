import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { Chrome, Facebook, Loader2, ArrowLeft, ShieldCheck, Mail, KeyRound } from 'lucide-react'
import { isAxiosError } from 'axios'
import { login, verifyOtp, resendOtp } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

type LoginStep = 'IDENTIFIER' | 'OTP'

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback
  }
  return fallback
}

export default function SignInForm() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  // Step State
  const [step, setStep] = useState<LoginStep>('IDENTIFIER')

  // Form State
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')

  // UI State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login({ emailOrPhone: identifier.trim() })
      setStep('OTP')
      setCountdown(60)
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Account not found. Please register first.'))
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const isEmail = identifier.includes('@')
    const payload = isEmail
      ? { email: identifier.trim(), otp: otp.trim() }
      : { phone: identifier.trim(), otp: otp.trim() }

    try {
      const response = await verifyOtp(payload)
      setAuth(response.data)
      navigate('/')
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Invalid verification code.'))
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (countdown > 0) return
    setLoading(true)
    const isEmail = identifier.includes('@')
    try {
      await resendOtp(isEmail ? { email: identifier } : { phone: identifier })
      setCountdown(60)
    } catch {
      setError('Failed to resend code.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'OTP') {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <button
          onClick={() => setStep('IDENTIFIER')}
          className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors text-[13px] font-bold uppercase tracking-widest w-fit"
        >
          <ArrowLeft size={16} />
          Change email/phone
        </button>

        <div className="space-y-3 flex flex-col">
          <div className="size-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-2">
            <ShieldCheck className="size-8 text-[#B99054]" />
          </div>
          <h2 className="text-[28px] md:text-[34px] font-bold text-black tracking-tight leading-none">
            Enter Code
          </h2>
          <p className="text-[14px] md:text-[15px] text-neutral-500 font-medium tracking-tight">
            Sent to <span className="text-black font-bold">{identifier}</span>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleVerify}>
          <div className="space-y-2">
            <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              Verification Code
            </Label>
            <Input
              type="text"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="h-16 text-center text-3xl font-black tracking-[0.5em] bg-neutral-50/30 border-neutral-200 focus:bg-white focus:ring-black rounded-sm transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-[13px] font-bold text-red-500 bg-red-50 p-3 rounded-sm border border-red-100">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              variant="black"
              disabled={loading || otp.length !== 6}
              className="w-full h-14 rounded-sm text-[13px] font-black tracking-widest uppercase"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'VERIFY & SIGN IN'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || loading}
                className="text-[13px] font-bold text-neutral-400 hover:text-black disabled:opacity-50 transition-colors uppercase tracking-widest"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Tabs */}
      <div className="flex gap-10 border-b border-neutral-100">
        <div className="pb-4 border-b-2 border-[#B99054] text-[14px] font-bold text-black tracking-tight">
          Sign In
        </div>
        <Link
          to="/signup"
          className="pb-4 text-[14px] font-medium text-neutral-400 hover:text-neutral-600 transition-colors tracking-tight"
        >
          Create Account
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-1.5 flex flex-col">
        <div className="size-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-2">
          <KeyRound className="size-8 text-[#B99054]" />
        </div>
        <h2 className="text-[28px] md:text-[34px] font-bold text-black tracking-tight leading-none">
          Welcome Back
        </h2>
        <p className="text-[14px] md:text-[15px] text-neutral-500 font-medium tracking-tight">
          Enter your email or phone to receive a login code.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleRequestOtp}>
        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
            <Mail size={12} className="text-neutral-400" /> Email or Phone
          </Label>
          <Input
            type="text"
            placeholder="you@example.com or 9876543210"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            disabled={loading}
            className="h-13 bg-neutral-50/30 border-neutral-200 focus:bg-white transition-all text-[15px]"
          />
        </div>

        {error && (
          <p className="text-[13px] font-bold text-red-500 bg-red-50 p-3 rounded-sm border border-red-100">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="black"
          disabled={loading || !identifier}
          className="w-full h-14 rounded-sm text-[13px] font-black tracking-widest uppercase shadow-lg shadow-black/10"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'GET LOGIN CODE'}
        </Button>
      </form>

      {/* Social Divider */}
      <div className="relative flex items-center gap-4">
        <div className="flex-1 h-px bg-neutral-100" />
        <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-widest whitespace-nowrap">
          or
        </span>
        <div className="flex-1 h-px bg-neutral-100" />
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full h-13 border-neutral-200 bg-white hover:bg-neutral-50 text-[13px] font-bold gap-4"
        >
          <Chrome size={18} className="text-red-500" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full h-13 border-neutral-200 bg-white hover:bg-neutral-50 text-[13px] font-bold gap-4"
        >
          <Facebook size={18} className="text-blue-600 fill-blue-600" />
          Continue with Facebook
        </Button>
      </div>
    </div>
  )
}
