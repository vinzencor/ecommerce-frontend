import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ProfileHeaderProps {
  name: string
  email: string
  memberSince: string
  isVibMember?: boolean
}

export default function ProfileHeader({
  name,
  email,
  memberSince,
  isVibMember = true,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white border border-neutral-200 border-t-4 border-t-black rounded-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20 border-2 border-neutral-100">
          <AvatarFallback className="bg-black text-white text-xl font-black">
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[18px] font-bold text-neutral-800">{name}</h2>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-neutral-400 font-medium">{email}</p>
            {isVibMember && (
              <Badge
                variant="outline"
                className="w-fit bg-neutral-100 border-neutral-200 text-neutral-500 font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm"
              >
                VIB MEMBER
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="text-right flex flex-col items-center md:items-end gap-1">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
          Member since
        </span>
        <span className="text-[15px] font-bold text-black">{memberSince}</span>
      </div>
    </div>
  )
}
