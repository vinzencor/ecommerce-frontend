import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useProfile } from '../hooks/useProfile'
import { Loader2, User, Phone, MapPin, Save, X } from 'lucide-react'

export default function ProfileForm() {
  const { profile, isUpdating, updateProfile } = useProfile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formElement = e.currentTarget as HTMLFormElement
      const formValues = new FormData(formElement)
      await updateProfile({
        name: (formValues.get('name') as string) || '',
        phone: (formValues.get('phone') as string) || '',
      })
    } catch {
      // Errors are handled by consumers/toasts.
    }
  }

  return (
    <div className="bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] p-8 md:p-12 space-y-10 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-[20px] font-bold text-[#291F1F]">Personal Information</h2>
        <p className="text-[14px] text-[#666] font-medium leading-relaxed">
          Update your profile details to keep your account current
        </p>
        <div className="h-px bg-[#EDEDFD] w-full mt-6" />
      </div>

      <form className="space-y-10" onSubmit={handleSubmit} key={profile?.id || 'profile-form'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="text-[12px] font-bold text-[#999] uppercase tracking-[0.1em] ml-1">
              Full Name
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#999] transition-colors group-focus-within:text-[#291F1F]" />
              <Input
                name="name"
                defaultValue={profile?.name || ''}
                placeholder="Enter your full name"
                className="h-14 pl-12 bg-white border-[#EDEDFD] focus:ring-2 focus:ring-[#EDEDFD] transition-all text-[15px] rounded-[14px] shadow-sm"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-[12px] font-bold text-[#999] uppercase tracking-[0.1em] ml-1">
              Phone Number
            </Label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#999] transition-colors group-focus-within:text-[#291F1F]" />
              <Input
                name="phone"
                defaultValue={profile?.phone || ''}
                placeholder="Enter your phone number"
                className="h-14 pl-12 bg-white border-[#EDEDFD] focus:ring-2 focus:ring-[#EDEDFD] transition-all text-[15px] rounded-[14px] shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[12px] font-bold text-[#999] uppercase tracking-[0.1em] ml-1">
            Default Shipping Address
          </Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#999]" />
            <Input
              defaultValue="12, MG Road, Indiranagar, Bangalore"
              disabled
              className="h-14 pl-12 bg-white border-[#EDEDFD] text-[15px] rounded-[14px] shadow-sm opacity-60 cursor-not-allowed"
            />
          </div>
          <p className="text-[12px] text-[#999] font-medium italic ml-1">
            Address management can be found in the Addresses tab
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[#EDEDFD]">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-14 px-10 w-full sm:w-auto bg-[#291F1F] hover:bg-black text-white font-bold text-[14px] uppercase tracking-wider rounded-full transition-all shadow-lg shadow-black/10 min-w-[180px]"
            >
              {isUpdating ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <Save className="size-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.reload()}
              className="h-14 px-10 w-full sm:w-auto border-[#EDEDFD] text-[#666] font-bold text-[14px] uppercase tracking-wider rounded-full hover:bg-white transition-all bg-transparent"
            >
              <X className="size-4 mr-2" />
              Cancel
            </Button>
          </div>
          <p className="text-[13px] text-[#999] font-medium italic text-center md:text-right">
            * These changes will be applied instantly
          </p>
        </div>
      </form>
    </div>
  )
}

