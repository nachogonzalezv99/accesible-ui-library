import { ComponentProps, createContext, ReactElement, ReactNode, useContext } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

interface BaseInputContextProps {}

export function BaseInput(props: BaseInputProps) {
  return (
    <BaseInputContext.Provider value={{}}>
      <label className="flex flex-col" {...props} />
    </BaseInputContext.Provider>
  )
}

export interface BaseInputLabelProps extends ComponentProps<'label'> {
  children?: ReactNode
}
BaseInput.Label = function Label({ id, children }: BaseInputLabelProps) {
  return children && <label htmlFor={id}>{children}</label>
}

export interface BaseInputContentProps extends Omit<ComponentProps<'div'>, 'prefix' | 'sufix'> {
  label?: string
  prefix?: ReactNode
  sufix?: ReactNode
  allowClose?: boolean
  onClose?: () => void
  children: ReactElement
  size: 'XS' | 'S' | 'M'
}
const sizes = {
  XS: 'px-1 py-1',
  S: 'px-2 py-2',
  M: 'px-3 py-2'
}
BaseInput.Content = function Content({
  children,
  prefix,
  sufix,
  className,
  allowClose,
  onClose,
  size,
  ...props
}: BaseInputContentProps) {
  return (
    <div
      className={twMerge(
        'flex gap-3 items-start border px-2 py-1 ring-blue-300 focus-within:ring-2 hover:border-blue-600',
        sizes[size],
        className
      )}
      {...props}
    >
      {prefix && <span className="text-gray-500">{prefix}</span>}
      {children}
      {allowClose && (
        <span className="h-full self-baseline">
          <button onClick={onClose}>
            <AiOutlineCloseCircle className="text-sm text-gray-400" />
          </button>
        </span>
      )}
      {sufix && <span className="text-gray-500">{sufix}</span>}
    </div>
  )
}
