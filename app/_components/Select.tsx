import { useRef, useState } from 'react'
import { AiOutlineCheck, AiOutlineDown, AiOutlineSearch } from 'react-icons/ai'
import { CustomChangeEventHandler } from '../_types/events'
import { formatString } from '../_utils/strings'
import { ClearButton } from './BaseInput'
import { TextInput, TextInputProps } from './TextInput'

export interface SelectOption<T> {
  label: string
  value: T
  disabled?: boolean
}
interface SelectProps<T> extends Omit<TextInputProps, 'value' | 'onChange'> {
  value: T | null
  options: T[] | SelectOption<T>[]
  allowSearch?: boolean
  onChange: CustomChangeEventHandler<T | null>
}

function isArrayOption<T>(opts: SelectOption<T>[] | T[]): opts is SelectOption<T>[] {
  return (opts as SelectOption<T>[])[0]?.label !== undefined
}

function isOption<T>(opts: SelectOption<T> | T): opts is SelectOption<T> {
  return (opts as SelectOption<T>)?.label !== undefined
}

export function Select<T extends string>({ options, allowSearch, allowClear, onChange, ...props }: SelectProps<T>) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedValue, setSelectedValue] = useState<T | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const filteredOptions = options.filter(o =>
    searchValue ? formatString(isOption(o) ? o.value : o).includes(formatString(searchValue)) : true
  )

  const openDropdown = () => {
    setIsOpen(true)
    setFocusedOptionIndex(0)
  }
  const closeDropdown = () => {
    setIsOpen(false)
    if (!selectedValue) setSearchValue('')
  }
  const selectOption = (option: T | null) => {
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

      const focusedOption = filteredOptions[focusedOptionIndex]
      if (focusedOption !== undefined) selectOption(isOption(focusedOption) ? focusedOption.value : focusedOption)
      else selectOption(null)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <TextInput
        {...props}
        value={
          isArrayOption(options)
            ? options.find(o => o.value === selectedValue)?.label || searchValue
            : selectedValue || searchValue
        }
        onChange={e => {
          if (!allowSearch) return
          setSearchValue(e.target.value)
          setSelectedValue(null)
          setIsOpen(true)

          if (onChange) onChange({ ...e, target: { ...e.target, value: selectedValue } })
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
                selectOption(isOption(o) ? o.value : o)
              }}
              onMouseEnter={() => setFocusedOptionIndex(index)}
              onMouseLeave={() => setFocusedOptionIndex(-1)}
              className={`hover:bg-gray-200 rounded-[3px] p-1 flex items-center justify-between cursor-pointer ${
                selectedValue === (isOption(o) ? o.value : o)
                  ? 'bg-blue-100 text-gray-950'
                  : index === focusedOptionIndex
                  ? 'bg-gray-100'
                  : 'text-gray-600 '
              }`}
              key={isOption(o) ? o.value : o}
            >
              {isOption(o) ? o.label : o}
              <AiOutlineCheck className={selectedValue === o ? 'text-gray-600' : 'text-transparent'} />
            </div>
          ))}
          {filteredOptions.length < 1 && <div className="text-gray-400 p-1">No hay ninguna opción</div>}
        </div>
      )}
    </div>
  )
}
