import {
  cloneElement,
  ComponentProps,
  forwardRef,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { AiOutlineCheck, AiOutlineCloseCircle, AiOutlineDown, AiOutlineSearch } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

const formatString = (text: string) => {
  const formattedText = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  return formattedText
}

const ClearButton = ({ onClick }: { onClick?: MouseEventHandler<SVGElement> }) => (
  <AiOutlineCloseCircle
    className="text-gray-500 hover:text-gray-800 cursor-pointer pointer-events-auto"
    onClick={e => onClick && onClick(e)}
  />
)

interface BaseInputProps<T>
  extends Omit<
    ComponentProps<'input'>,
    'prefix' | 'sufix' | 'size' | 'value' | 'defaultValue' | 'min' | 'max' | 'defaultChecked'
  > {
  id?: string // id is optional
  label?: string // label is optional
  icon?: ReactNode // icon is optional (could be a string or a React node
  prefix?: ReactElement
  sufix?: ReactElement
  allowClear?: boolean
  size?: 'sm' | 'md' | 'lg'
  value?: T
  defaultValue?: T
  onClear?: MouseEventHandler<SVGElement>
}

type InputProps<T> =
  | (BaseInputProps<T> & { id: string; label?: string })
  | (BaseInputProps<T> & { id?: undefined; label?: undefined })

function BaseInput<T extends number | string>({
  label,
  id,
  required,
  className,
  prefix,
  sufix,
  allowClear,
  onClick,
  onMouseEnter,
  onMouseLeave,
  defaultValue,
  value,
  onChange,
  onClear,
  size,
  ...props
}: InputProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <span className="flex flex-col">
      {Boolean(label) && (
        <label htmlFor={id} className="text-gray-500">
          {label} {required && '*'}
        </label>
      )}

      <div
        className={twMerge(
          `flex items-center gap-2 px-2 py-1 bg-white border border-gray-300 rounded-md hover hover:border-blue-600 focus-within:ring-2 focus-within:border-blue-600 
            ring-blue-200 overflow-hidden cursor-text disabled:bg-gray-100 disabled:cursor-not-allowed`,
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
          ref={inputRef}
          id={id}
          className={twMerge('outline-none flex-1', className)}
          required={required}
          value={value}
          onChange={onChange}
          {...props}
        />
        {allowClear && value && <ClearButton onClick={onClear} />}

        {sufix &&
          cloneElement(sufix, {
            ...sufix.props,
            className: twMerge('text-gray-400 pointer-events-none select-none', sufix.props.className)
          })}
      </div>
    </span>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps<string>>(
  ({ value, defaultValue, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '')

    useLayoutEffect(() => {
      if (value !== undefined) setInternalValue(value)
    }, [value])

    return (
      <BaseInput
        {...props}
        value={internalValue}
        onChange={e => {
          setInternalValue(e.target.value)
          if (onChange) onChange(e)
        }}
        onClear={e => {
          e.stopPropagation()
          setInternalValue('')
        }}
      />
    )
  }
)

const isNumber = (str: string): boolean => {
  return /^[0-9]+$/.test(str)
}

interface NumberInputProps extends Omit<InputProps<number>, 'onChange'> {
  onChange?: (value: number) => void
}
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, defaultValue, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue !== undefined ? Number(defaultValue) : '')
    console.log(internalValue)

    useLayoutEffect(() => {
      if (value !== undefined) setInternalValue(value)
    }, [value])

    return (
      <BaseInput
        {...props}
        value={internalValue}
        onChange={e => {
          const inputValue = e.target.value

          if (!isNumber(inputValue) && inputValue !== '') return
          setInternalValue(inputValue ? Number(inputValue) : '')
          if (onChange) onChange(Number(inputValue))
        }}
        onClear={e => {
          e.stopPropagation()
          setInternalValue('')
        }}
      />
    )
  }
)

type SelectProps = {
  options: string[]
  allowSearch?: boolean
} & InputProps<string>

export function Select({ options, allowSearch, allowClear, ...props }: SelectProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedValue, setSelectedValue] = useState<null | string>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const filteredOptions = options.filter(o =>
    searchValue ? formatString(o).includes(formatString(searchValue)) : true
  )

  const openDropdown = () => {
    setIsOpen(true)
    setFocusedOptionIndex(0)
  }
  const closeDropdown = () => {
    setIsOpen(false)
    if (!selectedValue) setSearchValue('')
  }
  const selectOption = (option: string | null) => {
    setSelectedValue(option)
    setSearchValue('')
    setIsOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
        event.preventDefault()
        openDropdown()
      }
      return
    }

    if (event.key === 'ArrowDown') {
      setFocusedOptionIndex(prev => (prev < options.length - 1 ? prev + 1 : 0))
    } else if (event.key === 'ArrowUp') {
      setFocusedOptionIndex(prev => (prev > 0 ? prev - 1 : options.length - 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      selectOption(filteredOptions[focusedOptionIndex] || null)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <Input
        {...props}
        value={selectedValue || searchValue}
        onChange={e => {
          if (!allowSearch) return
          setSearchValue(e.target.value)
          setSelectedValue(null)
          setIsOpen(true)
        }}
        className={allowSearch ? '' : 'cursor-pointer caret-transparent select-none'}
        onClick={() => {
          if (isOpen && !allowSearch) closeDropdown()
          else openDropdown()
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        onBlur={() => closeDropdown()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sufix={
          allowClear && hover && (searchValue || selectedValue) ? (
            <ClearButton
              onClick={e => {
                e.stopPropagation()
                setSelectedValue(null)
                setSearchValue('')
                setIsOpen(false)
              }}
            />
          ) : allowSearch && isOpen ? (
            <AiOutlineSearch
              onClick={e => {
                e.stopPropagation()
                closeDropdown()
              }}
              className="pointer-events-auto"
            />
          ) : (
            <AiOutlineDown />
          )
        }
      />
      {isOpen && (
        <div className="flex flex-col bg-white rounded-md shadow-md border p-1 z-10 absolute bottom-0 left-0 right-0 translate-y-full">
          {filteredOptions.map((o, index) => (
            <div
              onMouseDown={e => {
                e.preventDefault()
                selectOption(o)
              }}
              onMouseEnter={() => setFocusedOptionIndex(index)}
              onMouseLeave={() => setFocusedOptionIndex(-1)}
              className={`hover:bg-gray-200 rounded-[3px] p-1 flex items-center justify-between cursor-pointer ${
                selectedValue === o
                  ? 'bg-blue-100 text-gray-950'
                  : index === focusedOptionIndex
                  ? 'bg-gray-100'
                  : 'text-gray-600 '
              }`}
              key={o}
            >
              {o} <AiOutlineCheck className={selectedValue === o ? 'text-gray-600' : 'text-transparent'} />
            </div>
          ))}
          {filteredOptions.length < 1 && <div className="text-gray-400 p-1">No hay ninguna opción</div>}
        </div>
      )}
    </div>
  )
}

export function Autocomplete() {
  return <input />
}
