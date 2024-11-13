import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Sizes } from './Button'

const sizes: Record<Sizes, string> = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10'
}

export function Avatar({ size = 'lg', children }: { size?: Sizes; children: ReactNode }) {
  return (
    <div
      className={twMerge(
        'shrink-0 flex items-center justify-center bg-white border rounded-full w-10 h-10 text-gray-600',
        sizes[size]
      )}
    >
      {children}
    </div>
  )
}
