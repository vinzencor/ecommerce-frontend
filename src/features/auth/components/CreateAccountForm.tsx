import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, ArrowLeft, ShieldCheck, Mail, Phone, UserPlus } from 'lucide-react'
import { isAxiosError } from 'axios'
import { register, verifyOtp, resendOtp } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

type SignupStep = 'DETAILS' | 'OTP'

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback
  }
  return fallback
}

export default function CreateAccountForm() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  // Step State
  const [step, setStep] = useState<SignupStep>('DETAILS')

  // Form State
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [referralCode, setReferralCode] = useState('')
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await register({
        name: `${firstName} ${lastName}`.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        referralCode: referralCode.trim() || undefined,
      })
      setStep('OTP')
      setCountdown(60)
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Registration failed. Please check your details.'))
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await verifyOtp({
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        otp: otp.trim(),
      })

      // Auto Login
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
    try {
      await resendOtp({ email: email || undefined, phone: phone || undefined })
      setCountdown(60)
    } catch {
      setError('Failed to resend code. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'OTP') {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <button
          onClick={() => setStep('DETAILS')}
          className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors text-[13px] font-bold uppercase tracking-widest w-fit"
        >
          <ArrowLeft size={16} />
          Back to Details
        </button>

        <div className="space-y-3 flex flex-col">
          <div className="size-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-2">
            <ShieldCheck className="size-8 text-[#B99054]" />
          </div>
          <h2 className="text-[28px] md:text-[34px] font-bold text-black tracking-tight leading-none">
            Verify Account
          </h2>
          <p className="text-[14px] md:text-[15px] text-neutral-500 font-medium tracking-tight">
            We've sent a 6-digit verification code to{' '}
            <span className="text-black font-bold">{email || phone}</span>.
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
              {loading ? <Loader2 className="animate-spin" /> : 'VERIFY & CREATE ACCOUNT'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || loading}
                className="text-[13px] font-bold text-neutral-400 hover:text-black disabled:opacity-50 transition-colors uppercase tracking-widest"
              >
                {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend Code'}
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
        <Link
          to="/login"
          className="pb-4 text-[14px] font-medium text-neutral-400 hover:text-neutral-600 transition-colors tracking-tight"
        >
          Sign In
        </Link>
        <div className="pb-4 border-b-2 border-[#B99054] text-[14px] font-bold text-black tracking-tight cursor-default">
          Create Account
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1.5 flex flex-col">
        <div className="size-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-2">
          <UserPlus className="size-8 text-[#B99054]" />
        </div>
        <h2 className="text-[28px] md:text-[34px] font-bold text-black tracking-tight leading-none">
          Join Us
        </h2>
        <p className="text-[14px] md:text-[15px] text-neutral-500 font-medium tracking-tight">
          Create your account — it's fast and passwordless.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              First Name
            </Label>
            <Input
              type="text"
              placeholder="Aryan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 bg-neutral-50/30 border-neutral-200 focus:bg-white transition-all text-[15px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              Last Name
            </Label>
            <Input
              type="text"
              placeholder="Sharma"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 bg-neutral-50/30 border-neutral-200 focus:bg-white transition-all text-[15px]"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
            <Mail size={12} className="text-neutral-400" /> Email Address
          </Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-neutral-50/30 border-neutral-200 focus:bg-white transition-all text-[15px]"
            required={!phone}
          />
        </div>

        <div className="space-y-1.5 flex flex-col">
          <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
            <Phone size={12} className="text-neutral-400" /> Phone Number (Optional)
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-neutral-400 font-bold tracking-tight">
              +91
            </span>
            <Input
              type="tel"
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              className="h-12 pl-12 bg-neutral-50/30 border-neutral-200 focus:bg-white transition-all text-[15px]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
            Referral Code (Optional)
          </Label>
          <Input
            type="text"
            placeholder="XXXX-XXXX"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            className="h-12 bg-neutral-50/30 border-neutral-200 focus:bg-white transition-all text-[15px]"
          />
        </div>

        {error && (
          <p className="text-[13px] font-bold text-red-500 bg-red-50 p-3 rounded-sm border border-red-100">
            {error}
          </p>
        )}

        <div className="pt-4 flex flex-col gap-4">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="w-full h-14 rounded-sm text-[13px] font-black tracking-widest uppercase shadow-lg shadow-black/10"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'GET VERIFICATION CODE'}
          </Button>
          <p className="text-[12px] text-neutral-400 text-center font-medium leading-relaxed">
            By creating an account you agree to our{' '}
            <Link to="/terms" className="text-black font-bold hover:underline underline-offset-4">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-black font-bold hover:underline underline-offset-4">
              Privacy
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  )
}
