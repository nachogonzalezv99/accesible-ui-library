import React, {
  ComponentProps,
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { twMerge } from 'tailwind-merge'
import { Dropdown, DropdownContentProps, DropdownProps, useDropdown } from './Dropdown'

interface DropdownMenuContextProps {
  focusedIndex: number
  setFocusedIndex: Dispatch<SetStateAction<number>>
  itemRefs: MutableRefObject<(HTMLButtonElement | null)[]>
}

const DropdownMenuContext = createContext<DropdownMenuContextProps | null>(null)

export function useDropdownMenu() {
  const context = useContext(DropdownMenuContext) as DropdownMenuContextProps | null
  if (!context) throw new Error('useForm must be used inside a FormProvider')
  return context
}

export function DropdownMenu({ children, ...props }: DropdownProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  return (
    <Dropdown {...props}>
      <DropdownMenuContext.Provider value={{ focusedIndex, setFocusedIndex, itemRefs }}>
        {children}
      </DropdownMenuContext.Provider>
    </Dropdown>
  )
}

DropdownMenu.Trigger = Dropdown.Trigger

DropdownMenu.Content = function DropdownContent({ className, children, ...props }: DropdownContentProps) {
  const { isOpen, updateOpen, dropdownRef } = useDropdown()
  const { focusedIndex, setFocusedIndex, itemRefs } = useDropdownMenu()

  const calculateScroll = (nextIndex: number) => {
    if (dropdownRef.current && itemRefs.current[nextIndex]) {
      const dropdown = dropdownRef.current
      const item = itemRefs.current[nextIndex]

      const dropdownTop = dropdown.getBoundingClientRect().top
      const dropdownBottom = dropdown.getBoundingClientRect().bottom
      const itemTop = item.getBoundingClientRect().top
      const itemBottom = item.getBoundingClientRect().bottom

      if (itemTop < dropdownTop) {
        dropdown.scrollTo({
          top: item.offsetTop - dropdown.offsetTop,
          behavior: 'smooth'
        })
      } else if (itemBottom >= dropdownBottom) {
        dropdown.scrollTo({
          top: item.offsetTop + item.clientHeight - dropdown.clientHeight,
          behavior: 'smooth'
        })
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const childrenArray = React.Children.toArray(children)

      const enabledIndices = childrenArray
        .map((child, index) =>
          React.isValidElement(child) && child.type === DropdownMenu.Item && !child.props.disabled ? index : null
        )
        .filter(index => index !== null) as number[]

      if (enabledIndices.length === 0) return

      const currentIndex = enabledIndices.indexOf(focusedIndex)

      // Key handling for ArrowUp and ArrowDown
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % enabledIndices.length
        setFocusedIndex(enabledIndices[nextIndex])
        calculateScroll(nextIndex)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + enabledIndices.length) % enabledIndices.length
        setFocusedIndex(enabledIndices[prevIndex])
        calculateScroll(prevIndex)
      } else if (e.key === 'Enter' && focusedIndex !== -1) {
        console.log('enter')
        updateOpen(false)
        if (React.isValidElement(childrenArray[focusedIndex])) childrenArray[focusedIndex].props?.onClick()
      }
    }

    if (isOpen) {
      calculateScroll(focusedIndex)
      document.addEventListener('keydown', handleKeyDown)
    } else document.removeEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [focusedIndex, children, isOpen, updateOpen, setFocusedIndex])

  return (
    <Dropdown.Content {...props} className={twMerge('flex flex-col p-1 overflow-y-auto max-h-80', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === DropdownMenu.Item) {
          return React.cloneElement(child as React.ReactElement<{ index: number }>, { index })
        }
        return child
      })}
    </Dropdown.Content>
  )
}

interface DropdownMenuItemProps extends ComponentProps<'button'> {
  children: ReactNode
  leftAddornment?: ReactNode
  rightAddornment?: ReactNode
  description?: string
  index?: number
  disabled?: boolean
}
DropdownMenu.Item = function DropdownMenuItem({
  children,
  leftAddornment,
  rightAddornment,
  index,
  disabled,
  onClick,
  className,
  description,
  ...props
}: DropdownMenuItemProps) {
  const { focusedIndex, setFocusedIndex, itemRefs } = useDropdownMenu()

  return (
    <button
      ref={el => {
        itemRefs.current[index!] = el
      }}
      tabIndex={-1}
      onClick={event => {
        onClick?.(event)
      }}
      onMouseEnter={() => setFocusedIndex(index!)}
      onMouseLeave={() => setFocusedIndex(-1)}
      disabled={disabled}
      {...props}
      className={twMerge(
        'text-gray-700 flex items-center justify-between gap-6 px-3 py-2 rounded-[3px]',
        disabled && 'text-gray-300',
        focusedIndex === index && 'bg-gray-100',
        className
      )}
    >
      <span className="flex flex-col flex-1">
        <span className="flex items-center gap-2">
          {leftAddornment} {children}
        </span>
        <p className="text-gray-400 text-sm font-light text-left">{description}</p>
      </span>

      {rightAddornment}
    </button>
  )
}

DropdownMenu.Divider = function DropdownMenuDivider() {
  return <div className="w-full h-[1px] bg-gray-200 my-1" />
}
