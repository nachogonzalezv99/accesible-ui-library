import React, {
  ComponentProps,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { twMerge } from 'tailwind-merge'
import { buttonVariants } from './Button'

interface MenuContextProps {
  focusedIndex: number
  setFocusedIndex: Dispatch<SetStateAction<number>>
}

const MenuContext = createContext<MenuContextProps | null>(null)

export function useMenu() {
  const context = useContext(MenuContext) as MenuContextProps | null
  if (!context) throw new Error('useForm must be used inside a FormProvider')
  return context
}

export function Menu({ children }: { children: ReactNode }) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const childrenArray = React.Children.toArray(children)

      const enabledIndices = childrenArray
        .map((child, index) =>
          React.isValidElement(child) && child.type === Menu.Item && !child.props.disabled ? index : null
        )
        .filter(index => index !== null) as number[]

      if (enabledIndices.length === 0) return

      const currentIndex = enabledIndices.indexOf(focusedIndex)

      // Key handling for ArrowUp and ArrowDown
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % enabledIndices.length
        setFocusedIndex(enabledIndices[nextIndex])
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + enabledIndices.length) % enabledIndices.length
        setFocusedIndex(enabledIndices[prevIndex])
      } else if (e.key === 'Enter' && focusedIndex !== -1) {
        console.log('enter')
        if (React.isValidElement(childrenArray[focusedIndex])) childrenArray[focusedIndex].props?.onClick()
      }
    }

    if (isFocused) {
      document.addEventListener('keydown', handleKeyDown)
    } else document.removeEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFocused, focusedIndex, children, setFocusedIndex])

  return (
    <MenuContext.Provider value={{ focusedIndex, setFocusedIndex }}>
      <div
        ref={contentRef}
        tabIndex={0}
        onFocus={event => {
          if (!contentRef.current?.contains(event.relatedTarget as Node)) {
            setIsFocused(true)
            setFocusedIndex(0)
          }
        }}
        onBlur={event => {
          if (!contentRef.current?.contains(event.relatedTarget as Node)) {
            setIsFocused(false)
            setFocusedIndex(-1)
          }
        }}
        className={twMerge('flex flex-col p-1 overflow-y-auto max-h-80 outline-none ring-blue-300 focus:ring-2')}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === Menu.Item) {
            return React.cloneElement(child as React.ReactElement<{ index: number }>, { index })
          }
          return child
        })}
      </div>
    </MenuContext.Provider>
  )
}

interface MenuItemProps extends ComponentProps<'div'> {
  children: ReactNode
  leftAddornment?: ReactNode
  rightAddornment?: ReactNode
  description?: string
  index?: number
  disabled?: boolean
}
Menu.Item = function MenuItem({
  children,
  leftAddornment,
  rightAddornment,
  index,
  disabled,
  onClick,
  className,
  description,
  ...props
}: MenuItemProps) {
  const { focusedIndex, setFocusedIndex } = useMenu()

  return (
    <div
      tabIndex={-1}
      onClick={event => !disabled && onClick?.(event)}
      aria-disabled={disabled}
      onMouseEnter={() => !disabled && setFocusedIndex(index!)}
      onMouseLeave={() => setFocusedIndex(-1)}
      {...props}
      className={twMerge(
        buttonVariants({ variant: 'link', size: 'lg' }),
        'w-full',
        disabled && 'text-gray-300 cursor-not-allowed',
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
    </div>
  )
}

Menu.Divider = function MenuDivider() {
  return <div className="w-full h-[1px] bg-gray-200 my-1" />
}
