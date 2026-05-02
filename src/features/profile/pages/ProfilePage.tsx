import ProfileSidebar from '../components/ProfileSidebar'
import ProfileHeader from '../components/ProfileHeader'
import ProfileForm from '../components/ProfileForm'
import { useProfile } from '../hooks/useProfile'
import { Loader2, Settings } from 'lucide-react'

export default function ProfilePage() {
  const { profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Loader2 className="size-12 animate-spin text-[#505081]" />
          <div className="absolute inset-0 size-12 border-4 border-[#EDEDFD] rounded-full" />
        </div>
        <p className="text-[#666] font-bold text-[18px] animate-pulse">
          Crafting your profile experience...
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-16">
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 md:p-2 bg-[#F5F5F5] rounded-[10px] border border-[#EDEDFD]">
                <Settings className="size-4 md:size-5 text-[#291F1F]" />
              </div>
              <span className="text-[12px] md:text-[14px] font-bold text-[#505081] uppercase tracking-[0.2em]">
                Settings
              </span>
            </div>
            <h1 className="text-[32px] md:text-[48px] font-black text-[#291F1F] tracking-tight leading-none">
              Profile
            </h1>
            <p className="text-[14px] md:text-[18px] text-[#666] font-medium max-w-[500px]">
              Personalize your account settings and preferences for a better shopping journey.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          {/* Sidebar - Acts as sticky nav on mobile and sidebar on desktop */}
          <aside className="w-full lg:col-span-3 sticky top-[110px] md:top-[140px] lg:top-8 z-30 bg-white/95 backdrop-blur-md lg:bg-transparent -mx-4 px-4 md:mx-0 md:px-0">
            <div className="py-2 lg:py-0 border-b border-[#EDEDFD] lg:border-none mb-4 lg:mb-0">
              <ProfileSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:col-span-9 flex flex-col gap-8 md:gap-12">
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
              isVibMember={true}
            />
            <ProfileForm />
          </main>
        </div>
      </div>
    </div>
  )
}

