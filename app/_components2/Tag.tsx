import { ComponentProps, ReactElement } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { Sizes } from './Input'

type Colors = 'warning' | 'success' | 'info' | 'error' | 'default'

const sizes: Record<Sizes, string> = {
  sm: 'px-1 py-[1px] text-sm gap-1 font-thin',
  md: 'px-1 py-[3px] text-sm gap-1',
  lg: 'px-1 py-[5px] text-sm gap-2'
}
export interface TagProps extends Omit<ComponentProps<'div'>, 'color'> {
  size?: Sizes
  color?: Colors
  icon?: ReactElement
  closable?: boolean
  onClose?: () => void
  disabled?: boolean
}
const colors: Record<Colors, string> = {
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-300',
  success: 'text-green-600 bg-green-50 border-green-300',
  info: 'text-blue-600 bg-blue-50 border-blue-300',
  error: 'text-red-600 bg-red-50 border-red-300',
  default: 'text-gray-600 bg-gray-50 border-gray-300'
}

export function Tag({
  className,
  children,
  color = 'default',
  icon,
  size = 'md',
  closable,
  onClose,
  tabIndex,
  disabled,
  ...props
}: TagProps) {
  return (
    <div
      className={twMerge(
        'flex items-center border rounded-md text-gray-700 ',
        sizes[size],
        colors[color],
        disabled && 'bg-gray-200 text-gray-400',
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
      {closable && (
        <button
          disabled={disabled}
          tabIndex={tabIndex}
          className="text-gray-600 enabled:hover:text-gray-900 disabled:text-gray-400"
          onClick={e => {
            e.stopPropagation()
            onClose?.()
          }}
        >
          <AiOutlineClose />
        </button>
      )}
    </div>
  )
}
