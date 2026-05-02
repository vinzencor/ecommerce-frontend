import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProfileHeaderProps {
  name: string
  email: string
  memberSince: string
  isVibMember?: boolean
  className?: string
}

export default function ProfileHeader({
  name,
  email,
  memberSince,
  isVibMember = true,
  className,
}: ProfileHeaderProps) {
  return (
    <div
      className={cn(
        'bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm',
        className
      )}
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md transition-transform group-hover:scale-105">
            <AvatarFallback className="bg-[#291F1F] text-white text-2xl font-black">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-[#EDEDFD]">
            <div className="size-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-[24px] font-bold text-[#291F1F]">{name}</h2>
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-[15px] text-[#666] font-medium">{email}</p>
            {isVibMember && (
              <Badge
                variant="outline"
                className="w-fit bg-white border-[#EDEDFD] text-[#505081] font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm"
              >
                VIB MEMBER
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-end gap-1.5 px-6 py-4 bg-white/50 backdrop-blur-sm rounded-[18px] border border-[#EDEDFD]">
        <span className="text-[11px] font-bold text-[#999] uppercase tracking-[0.1em]">
          Member since
        </span>
        <span className="text-[18px] font-bold text-[#291F1F]">{memberSince}</span>
      </div>
    </div>
  )
}

