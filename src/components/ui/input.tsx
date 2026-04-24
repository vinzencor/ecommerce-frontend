import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-12 w-full rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50 transition-colors dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-600 dark:focus-visible:border-neutral-300',
        className
      )}
      {...props}
    />
  )
}

export { Input }
