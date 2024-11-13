import { ReactNode } from 'react'
import { Button, ButtonProps, Sizes } from './Button'
import { twMerge } from 'tailwind-merge'

interface IconButtonProps extends Omit<ButtonProps, 'children' | 'startIcon' | 'endIcon'> {
  icon: ReactNode
  shape?: 'square' | 'circle'
}

const sizes: Record<Sizes, string> = {
  sm: 'px-1 text-xl',
  md: 'px-1 text-2xl',
  lg: 'px-[6px] text-2xl'
}

export function IconButton({ icon, size = 'md', shape = 'square', className, ...props }: IconButtonProps) {
  return (
    <Button
      className={twMerge('aspect-square font-extralight stroke-3', sizes[size], shape === 'circle' && 'rounded-full', className)}
      startIcon={icon}
      {...props}
    />
  )
}
