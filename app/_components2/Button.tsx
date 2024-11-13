import { cva } from 'class-variance-authority'
import { ComponentProps, ReactNode } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

export type Sizes = 'sm' | 'md' | 'lg'
type Variants = 'contained' | 'outlined' | 'link'

const sizes: Record<Sizes, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-1 text-md',
  lg: 'px-4 py-1 text-lg'
}
const variants: Record<Variants, string> = {
  contained:
    'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600 active:bg-blue-700 active:border-blue-700 disabled:text-gray-300 disabled:bg-gray-200 disabled:border-gray-200',
  outlined:
    'border border-gray-300 bg-white hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-300',
  link: 'bg-transparent border border-transparent hover:bg-gray-100 hover:border-gray-100 focus:bg-gray-100 focus:border-gray-100 active:bg-gray-200 active:border-gray-200 disabled:text-gray-300 disabled:bg-transparent'
}

export const buttonVariants = cva(
  'cursor-pointer relative flex justify-center text-gray-700 w-fit items-center rounded-md outline-none ring-blue-300 focus-visible:ring-2 focus:z-10 transition-colors',
  {
    variants: {
      size: sizes,
      variant: variants,
      isLoading: {
        true: 'opacity-40 pointer-events-none',
        false: ''
      }
    },
    defaultVariants: {
      size: 'sm',
      variant: 'contained',
      isLoading: false
    }
  }
)

export interface ButtonProps extends ComponentProps<'button'> {
  size?: Sizes
  variant?: Variants
  startIcon?: ReactNode
  endIcon?: ReactNode
  isLoading?: boolean
}

export function Button({
  size = 'md',
  variant = 'contained',
  children,
  startIcon,
  endIcon,
  className,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={twMerge(buttonVariants({ size, variant, isLoading }), className)}>
      {isLoading && (
        <span className="absolute animate-spin">
          <AiOutlineLoading />
        </span>
      )}

      <span className={twMerge('flex items-center justify-center gap-1 whitespace-nowrap', isLoading && 'invisible')}>
        {startIcon && <span>{startIcon}</span>}
        {children}
        {endIcon && <span>{endIcon}</span>}
      </span>
    </button>
  )
}
