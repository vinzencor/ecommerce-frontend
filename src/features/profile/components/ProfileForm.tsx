import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useProfile } from '../hooks/useProfile'
import { Loader2 } from 'lucide-react'

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
    <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 space-y-8 shadow-sm">
      <div className="space-y-1.5">
        <h2 className="text-[17px] font-bold text-black">Personal Information</h2>
        <p className="text-[13px] text-neutral-400 font-medium leading-relaxed">
          Update your profile details below
        </p>
        <div className="h-px bg-neutral-100 w-full mt-4" />
      </div>

      <form className="space-y-8" onSubmit={handleSubmit} key={profile?.id || 'profile-form'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              Full Name
            </Label>
            <Input
              name="name"
              defaultValue={profile?.name || ''}
              className="h-12 bg-neutral-50/50 border-neutral-200 focus:bg-white transition-all text-[14px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              Phone Number
            </Label>
            <Input
              name="phone"
              defaultValue={profile?.phone || ''}
              className="h-12 bg-neutral-50/50 border-neutral-200 focus:bg-white transition-all text-[14px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
            Address
          </Label>
          <Input
            defaultValue="12, MG Road, Indiranagar"
            disabled
            className="h-12 bg-neutral-50/50 border-neutral-200 focus:bg-white transition-all text-[14px] opacity-60 cursor-not-allowed"
          />
          <p className="text-[10px] text-neutral-400">Address management is coming soon</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-12 px-8 bg-black hover:bg-neutral-800 text-white font-bold text-[13px] uppercase tracking-widest rounded-sm transition-all shadow-lg shadow-black/5 min-w-[160px]"
            >
              {isUpdating ? <Loader2 className="size-4 animate-spin" /> : 'Update Profile'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.reload()}
              className="h-12 px-8 border-neutral-200 text-neutral-500 font-bold text-[13px] uppercase tracking-widest rounded-sm hover:bg-neutral-50 transition-all"
            >
              Cancel
            </Button>
          </div>
          <p className="text-[12px] text-neutral-300 font-medium italic">
            * Changes will be reflected across your account immediately
          </p>
        </div>
      </form>
    </div>
  )
}
