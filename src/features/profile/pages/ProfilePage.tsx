import ProfileSidebar from '../components/ProfileSidebar'
import ProfileHeader from '../components/ProfileHeader'
import ProfileForm from '../components/ProfileForm'
import { useProfile } from '../hooks/useProfile'
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const { profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="size-10 animate-spin text-neutral-300" />
        <p className="text-neutral-500 font-medium">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <ProfileSidebar />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 flex flex-col gap-8 pb-20">
          <div className="flex flex-col gap-1.5 mb-2">
            <h1 className="text-[28px] md:text-[32px] font-bold text-black tracking-tight">
              Profile Settings
            </h1>
            <p className="text-[14px] md:text-[15px] text-neutral-400 font-medium">
              Manage your personal information and preferences
            </p>
          </div>

          <ProfileHeader
            name={profile?.name || 'User'}
            email={profile?.email || ''}
            memberSince={
              profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })
                : ''
            }
            isVibMember={true} // Keep static for now if no logic
          />
          <ProfileForm />
        </main>
      </div>
    </div>
  )
}
