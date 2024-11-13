import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type Sizes = 'sm' | 'md' | 'lg'
export type Variants = 'outlined' | 'link'

export const sizes: Record<Sizes, string> = {
  sm: 'px-2 py-1 text-sm min-h-[29.78px]',
  md: 'px-3 py-1 text-md min-h-[33.78px]',
  lg: 'px-4 py-1 text-lg min-h-[37.78px]'
}
export const base =
  'w-full flex gap-1 items-center rounded-md outline-none ring-blue-300 focus:ring-2 focus:z-10 transition-colors enabled:hover:border-blue-500'
export const variants: Record<Variants, string> = {
  outlined: 'border border-gray-300 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-300',
  link: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 gap-2 disabled:text-gray-300 disabled:bg-white'
}

interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: Sizes
  variant?: Variants
  isLoading?: boolean
  //   startIcon?: ReactElement
  //   endIcon?: ReactElement
}

export function Input({ size = 'md', variant = 'outlined', className, isLoading, ...props }: InputProps) {
  return isLoading ? (
    <div className={twMerge('flex bg-gray-100  rounded-md animate-pulse border border-gray-100', sizes[size])} />
  ) : (
    <input
      {...props}
      className={twMerge(
        'rounded-md outline-none ring-blue-300 focus-visible:ring-2 focus:z-10 transition-colors',
        sizes[size],
        variants[variant],
        className
      )}
    />
  )
}
