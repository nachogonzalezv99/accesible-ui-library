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
import { AiOutlineDown } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

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

const renderChildren = (children: React.ReactNode, currentIndexObj: { index: number }): React.ReactNode => {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === Menu.Item) {
        currentIndexObj.index += 1
        return React.cloneElement(child, { index: currentIndexObj.index })
      }

      if (child.type === Menu.Subgroup) {
        const subgroupChildren = renderChildren(child.props.children, currentIndexObj)
        currentIndexObj.index += 1
        return React.cloneElement(child, { children: subgroupChildren, index: currentIndexObj.index })
      }
    }

    return child
  })
}

export function Menu({ children }: { children: ReactNode }) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Helper function to collect indices of enabled Menu.Items recursively
      const collectMenuItems = (
        children: React.ReactNode,
        indices: number[] = [],
        indexObj = { currentIndex: 0 }
      ): number[] => {
        React.Children.forEach(children, child => {
          if (React.isValidElement(child)) {
            // If it's a Menu.Item and not disabled, assign and add the current index
            if (child.type === Menu.Item && !child.props.disabled) {
              indices.push(indexObj.currentIndex)
              indexObj.currentIndex += 1 // Increment for the next item
            }

            // If it's a Menu.Subgroup, recurse with its children
            if (child.type === Menu.Subgroup && child.props.children) {
              collectMenuItems(child.props.children, indices, indexObj)
              indices.push(indexObj.currentIndex)
              indexObj.currentIndex += 1 // Increment for the next item
            }
          }
        })
        return indices
      }

      // Use collectMenuItems to get all enabled indices
      const enabledIndices = collectMenuItems(children)
      console.log(enabledIndices)

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
        const selectedChild = enabledIndices[focusedIndex]
        if (React.isValidElement(children[selectedChild])) {
          children[selectedChild].props?.onClick()
        }
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
        className={twMerge('flex flex-col p-1 rounded-md overflow-y-auto outline-none ring-blue-300 focus:ring-2')}
      >
        {renderChildren(children, { index: -1 })}
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
      onMouseEnter={() => {
        !disabled && setFocusedIndex(index!)
        console.log(index)
      }}
      onMouseLeave={() => setFocusedIndex(-1)}
      {...props}
      className={twMerge(
        'text-gray-700 flex items-center justify-between gap-6 px-3 py-2 rounded-[3px] cursor-pointer',
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

Menu.Subgroup = function MenuSubgroup({
  children,
  label,
  index,
  ...props
}: {
  children: ReactNode
  label: string
  index?: number
}) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <Menu.Item
        index={index}
        // onClick={() => setOpen(prev =>!prev)}
        onKeyDown={event => event.key === 'Enter' && setOpen(prev => !prev)}
        rightAddornment={<AiOutlineDown />}
        {...props}
      >
        {label}
      </Menu.Item>
      {open && <div className="ml-4">{children}</div>}
    </div>
  )
}
