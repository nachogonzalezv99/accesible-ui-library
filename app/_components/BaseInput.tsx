import { cloneElement, ComponentProps, forwardRef, MouseEventHandler, ReactElement, Ref, useRef } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { triggerOnChange } from '../_utils/events'
import { composeRef } from '../_utils/refs'

export type Size = 'sm' | 'md' | 'lg'
const sizeStyles: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-2 py-1',
  lg: 'px-3 py-2'
}

export interface BaseInputProps<T>
  extends Omit<ComponentProps<'input'>, 'prefix' | 'sufix' | 'size' | 'value' | 'defaultValue' | 'defaultChecked'> {
  prefix?: ReactElement
  sufix?: ReactElement
  allowClear?: boolean
  size?: Size
  error?: string
  value?: T
  defaultValue?: T
}

export const ClearButton = ({ onClick }: { onClick?: MouseEventHandler<SVGElement> }) => (
  <AiOutlineCloseCircle
    className="text-gray-500 hover:text-gray-800 cursor-pointer pointer-events-auto"
    onClick={e => onClick && onClick(e)}
  />
)

export const BaseInput = forwardRef(function BaseInput<T extends string | number>(
  {
    size = 'sm',
    error,
    prefix,
    sufix,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onChange,
    value,
    allowClear,
    children,
    disabled,
    ...props
  }: BaseInputProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div
      className={twMerge(
        `flex items-center gap-2 bg-white border border-gray-300 rounded-md hover hover:border-blue-600 focus-within:ring-2 focus-within:border-blue-600 
        ring-blue-200 overflow-hidden cursor-text`,
        sizeStyles[size],
        disabled && 'bg-gray-100 cursor-not-allowed hover:border-gray-300',
        Boolean(error) &&
          'ring-red-200 border-red-600 hover:border-red-600 focus-within:ring-2 focus-within:border-red-600 ',
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseDown={e => {
        e.preventDefault()
        inputRef.current?.focus()
      }}
      onMouseLeave={onMouseLeave}
    >
      {prefix &&
        cloneElement(prefix, {
          ...prefix.props,
          className: twMerge('text-gray-400 pointer-events-none select-none', prefix.props.className)
        })}
      <input
        ref={composeRef(ref, inputRef)}
        className={twMerge('outline-none flex-1 bg-none', disabled && 'cursor-not-allowed', className)}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {allowClear && value && <ClearButton onClick={() => triggerOnChange(inputRef, '')} />}

      {sufix &&
        cloneElement(sufix, {
          ...sufix.props,
          className: twMerge('text-gray-400 pointer-events-none select-none', sufix.props.className)
        })}
      {children}
    </div>
  )
})
