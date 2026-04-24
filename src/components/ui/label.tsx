import { Root } from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

function Label({ className, ...props }: React.ComponentProps<typeof Root>) {
  return (
    <Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-[11px] leading-tight font-semibold uppercase tracking-wider text-neutral-500 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 transition-colors dark:text-neutral-400',
        className
      )}
      {...props}
    />
  )
}

export { Label }
