import {
  cloneElement,
  ComponentProps,
  createContext,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

type Side = 'top' | 'right' | 'bottom' | 'left'
type Align = 'start' | 'center' | 'end'

interface Position {
  top: number
  left: number
  width?: number
}
interface DropdownContextProps {
  isOpen: boolean
  dropdownRef: RefObject<HTMLDivElement>
  triggerRef: RefObject<HTMLButtonElement>
  overlayRef: RefObject<HTMLDivElement>
  updateOpen: (value: boolean) => void
  position: Position
}

const DropdownContext = createContext<DropdownContextProps | null>(null)

export function useDropdown() {
  const context = useContext(DropdownContext) as DropdownContextProps | null
  if (!context) throw new Error('useForm must be used inside a FormProvider')
  return context
}

export interface DropdownProps extends ComponentProps<'div'> {
  side?: Side
  sideOffset?: number
  align?: Align
  collisionPadding?: number
  matchTriggerWidth?: boolean
  open?: boolean
  onOpenChange?: (value: boolean) => void
  isModal?: boolean
}

export function Dropdown({
  side = 'bottom',
  sideOffset = 10,
  align = 'start',
  collisionPadding = 10,
  matchTriggerWidth,
  open,
  onOpenChange,
  isModal,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<Position>({ top: -2000, left: -2000 })
  const originalWidthRef = useRef<number | undefined>()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const updateOpen = useCallback(
    (value: boolean) => {
      setIsOpen(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  useEffect(() => {
    if (open !== undefined) updateOpen(open)
  }, [open, updateOpen])

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const focusableItems = getFocusableItems(dropdownRef.current)
      if (focusableItems.length) (focusableItems[0] as HTMLElement).focus()
    }
  }, [isOpen, dropdownRef])

  useLayoutEffect(() => {
    const calculatePosition = () => {
      setTimeout(() => {
        if (triggerRef.current && dropdownRef.current) {
          const triggerRect = triggerRef.current.getBoundingClientRect()
          const dropdownRect = dropdownRef.current.getBoundingClientRect()
          const windowWidth = window.innerWidth
          const windowHeight = window.innerHeight

          let top = 0
          let left = 0
          let width: number | undefined = dropdownRect.width

          // Center position for modal
          if (isModal) {
            top = (windowHeight - dropdownRect.height) / 2
            left = (windowWidth - dropdownRect.width) / 2
          } else {
            // Regular dropdown positioning logic
            const minWidth = 250 // Adjust this value as needed for your use case

            // Store the initial width in the ref on first open (if not set yet)
            if (!originalWidthRef.current) {
              originalWidthRef.current = matchTriggerWidth
                ? Math.max(triggerRect.width, minWidth) // Set minimum width when matchTriggerWidth is true
                : dropdownRect.width
            }

            // Calculate initial position based on `side`
            switch (side) {
              case 'top':
                top = triggerRect.top - dropdownRect.height - sideOffset
                break
              case 'right':
                top = triggerRect.top
                left = triggerRect.right + sideOffset
                break
              case 'bottom':
                top = triggerRect.bottom + sideOffset
                break
              case 'left':
                top = triggerRect.top
                left = triggerRect.left - dropdownRect.width - sideOffset
                break
            }

            // Adjust alignment based on `align`
            switch (align) {
              case 'start':
                if (side === 'top' || side === 'bottom') left = triggerRect.left
                else top = triggerRect.top
                break
              case 'center':
                if (side === 'top' || side === 'bottom') {
                  left = triggerRect.left + triggerRect.width / 2 - dropdownRect.width / 2
                } else {
                  top = triggerRect.top + triggerRect.height / 2 - dropdownRect.height / 2
                }
                break
              case 'end':
                if (side === 'top' || side === 'bottom') {
                  left = triggerRect.right - dropdownRect.width
                } else {
                  top = triggerRect.bottom - dropdownRect.height
                }
                break
            }

            // Check available space on both sides (bottom and top)
            const spaceBelow = windowHeight - triggerRect.bottom - sideOffset
            const spaceAbove = triggerRect.top - sideOffset

            // Adjust vertical position based on available space (top/bottom)
            if (side === 'top' || side === 'bottom') {
              if (spaceBelow >= dropdownRect.height) {
                // Enough space below, position it at the bottom
                top = triggerRect.bottom + sideOffset
              } else if (spaceAbove >= dropdownRect.height) {
                // Enough space above, position it at the top
                top = triggerRect.top - dropdownRect.height - sideOffset
              } else {
                // If neither top nor bottom has enough space, open it at the bottom
                top = triggerRect.bottom + sideOffset
              }
            }

            // Adjust horizontal position to fit within screen bounds (left/right)
            if (left < collisionPadding) {
              left = collisionPadding
            } else if (left + dropdownRect.width > windowWidth - collisionPadding) {
              left = windowWidth - dropdownRect.width - collisionPadding
            }

            // Prevent overflow on the bottom of the screen for vertical positioning
            if (top + dropdownRect.height > windowHeight - collisionPadding) {
              top = Math.max(collisionPadding, windowHeight - dropdownRect.height - collisionPadding)
            }

            // Ensure that `width` does not exceed the available space, and respect minWidth
            const availableWidth = windowWidth - 2 * collisionPadding

            // Ensure the dropdown does not overflow horizontally
            if (left + dropdownRect.width > windowWidth - collisionPadding) {
              // Shrink the width to fit within the available space
              width = Math.min(availableWidth, originalWidthRef.current || dropdownRect.width)
            } else {
              // Use the original width unless it exceeds available space
              width = Math.min(originalWidthRef.current || dropdownRect.width, availableWidth)
            }

            // Ensure width respects the minWidth
            width = Math.max(width, minWidth)
          }

          setPosition({ top, left, width })
        }
      }, 0)
    }
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation()

      // Check if the clicked element is inside the dropdown or its nested elements
      const isClickInsideDropdown = dropdownRef.current?.contains(event.target as Node)
      const isClickInsideTrigger = triggerRef.current?.contains(event.target as Node)

      // If the click is not inside either the dropdown or the trigger, close the dropdown
      if (!isClickInsideDropdown && !isClickInsideTrigger) {
        updateOpen(false) // Close the dropdown if click is outside
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const focusableItems = (dropdownRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, *[tabindex="0"]'
      ) || []) as HTMLElement[]
      const filteredFocusableItems = Array.from(focusableItems).filter(item => item.tabIndex !== -1)
      const firstItem = filteredFocusableItems[0]
      const lastItem = filteredFocusableItems[filteredFocusableItems.length - 1]

      const focusNextElement = (direction: 'prev' | 'next') => {
        const allFocusableElements = Array.from(
          document.querySelectorAll('button, [href], input, select, textarea, *[tabindex="0"]')
        ).filter(element => !(element as HTMLButtonElement).disabled && !element.hasAttribute('aria-disabled'))
        const triggerIndex = allFocusableElements.indexOf(triggerRef.current!)

        const isFocused = triggerRef.current === document.activeElement
        if (isFocused) {
          const nextIndex = direction === 'prev' ? triggerIndex - 1 : triggerIndex + 1

          if (nextIndex >= 0 && nextIndex < allFocusableElements.length) {
            ;(allFocusableElements[nextIndex] as HTMLElement).focus()
          }
        } else triggerRef.current?.focus()
      }

      if (e.key === 'Tab' && dropdownRef.current) {
        if (e.shiftKey && (document.activeElement === firstItem || !firstItem || !lastItem)) {
          e.preventDefault()
          updateOpen(false)
          focusNextElement('prev')
        } else if (!e.shiftKey && (document.activeElement === lastItem || !firstItem || !lastItem)) {
          console.log('shift')
          e.preventDefault()
          updateOpen(false)
          focusNextElement('next')
        }
      }

      if (e.key === 'Escape') {
        updateOpen(false)
        triggerRef.current?.focus()
      }
    }
    const handleResize = () => {
      if (isOpen) calculatePosition()
    }

    if (isOpen) {
      overlayRef.current?.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      window.addEventListener('resize', handleResize)
      calculatePosition()
      document.body.style.overflow = 'hidden'
    } else {
      overlayRef.current?.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }

    return () => {
      overlayRef.current?.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, align, collisionPadding, side, sideOffset, matchTriggerWidth, updateOpen])

  return (
    <DropdownContext.Provider
      {...props}
      value={{ isOpen, dropdownRef, triggerRef, overlayRef, updateOpen, position }}
    />
  )
}

export interface DropdownTriggerProps extends ComponentProps<'button'> {
  children: ReactElement
}
Dropdown.Trigger = function DropdownTrigger({ children, ...props }: DropdownTriggerProps) {
  const { updateOpen, triggerRef } = useDropdown()

  return cloneElement(children, {
    onClick: () => updateOpen(true),
    ref: triggerRef,
    ...props
  })
}

export interface DropdownContentProps extends ComponentProps<'div'> {
  children: ReactNode
  overlayClassName?: string
}
Dropdown.Content = function DropdownContent({ className, children, overlayClassName, ...props }: DropdownContentProps) {
  const { isOpen, dropdownRef, position, overlayRef } = useDropdown()
  return (
    isOpen && (
      <>
        <div ref={overlayRef} className={twMerge('fixed inset-0 z-40', overlayClassName)} />
        {createPortal(
          <div
            data-open={isOpen}
            style={{ top: position.top, left: position.left, width: position.width ?? 'auto' }}
            ref={dropdownRef}
            className={twMerge(
              'z-50 fixed bg-white rounded-md border border-gray-300 drop-shadow-xl overflow-hidden',
              className
            )}
            {...props}
          >
            {children}
          </div>,
          document.body
        )}
      </>
    )
  )
}

const getFocusableItems = (container: HTMLElement | null) => {
  if (!container) return []
  const items = container.querySelectorAll('button, [href], input, select, textarea, *[tabindex="0"]')
  return Array.from(items).filter(
    item => !(item as HTMLElement).hasAttribute('tabIndex') || (item as HTMLElement).tabIndex !== -1
  )
}
