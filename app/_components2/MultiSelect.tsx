import { ComponentProps, ReactNode, useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineDown } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { DropdownMenu } from './DropdownMenu'
import { Sizes, Variants, base, sizes, variants } from './Input'
import { Tag } from './Tag'

export interface SelectItem {
  label: ReactNode
  value: string
  disabled?: boolean
  description?: string
  leftAddornment?: ReactNode
}

interface SelectProps extends Omit<ComponentProps<'button'>, 'size' | 'defaultValue'> {
  size?: Sizes
  variant?: Variants
  items: string[] | SelectItem[]
  placeholder?: string
  defaultValue?: string[] | null
}

function isSelectItemArray(items: SelectItem[] | string[]): items is SelectItem[] {
  return (items as SelectItem[])[0]?.value !== undefined
}

const getBorderRadiusClass = (index: number, selected: string[] | null, normalizedItems: SelectItem[]) => {
  const isSelected = selected?.includes(normalizedItems[index].value)
  const isPreviousSelected = index > 0 && selected?.includes(normalizedItems[index - 1].value)
  const isNextSelected = index < normalizedItems.length - 1 && selected?.includes(normalizedItems[index + 1].value)

  if (isSelected) {
    if (isPreviousSelected && isNextSelected) {
      return 'rounded-none'
    } else if (isPreviousSelected) {
      return 'rounded-t-none'
    } else if (isNextSelected) {
      return 'rounded-b-none'
    } else {
      return 'rounded'
    }
  }
  return '' // No special border radius if the item isn't selected
}

export function MultiSelect({
  size = 'md',
  variant = 'outlined',
  className,
  items,
  placeholder,
  disabled,
  defaultValue,
  ...props
}: SelectProps) {
  const [open, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[] | null>(defaultValue || null)

  const normalizedItems: SelectItem[] = isSelectItemArray(items)
    ? items
    : items.map(item => ({ label: item, value: item }))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key)
      if (e.key === 'Backspace') {
        e.preventDefault()
        setSelected(prev => prev?.slice(0, -1) || [])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen} matchTriggerWidth>
      <DropdownMenu.Trigger>
        <button
          {...props}
          disabled={disabled}
          className={twMerge(base, sizes[size], variants[variant], 'px-[2px] py-[2px] items-center', className)}
        >
          {selected?.length ? (
            <div className="flex-1 flex flex-wrap  gap-[2px]">
              {selected.map(x => (
                <Tag
                  disabled={disabled}
                  tabIndex={-1}
                  size={size}
                  key={x}
                  closable
                  onClose={() => setSelected(prev => prev?.filter(v => v !== x) || [])}
                >
                  {normalizedItems.find(i => i.value === x)?.label}
                </Tag>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 px-2">{placeholder}</span>
          )}
          <span className="ml-auto shrink-0 px-2">
            <AiOutlineDown className="ml-auto" />
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="flex flex-col p-1">
        {normalizedItems.map((item, index) => (
          <DropdownMenu.Item
            key={item.value}
            rightAddornment={selected?.includes(item.value) ? <AiOutlineCheck /> : <span> </span>}
            onClick={() => {
              setIsOpen(true)
              setSelected(prev =>
                prev?.includes(item.value) ? prev.filter(v => v !== item.value) : [...(prev || []), item.value]
              )
            }}
            {...item}
            className={`${selected?.includes(item.value) ? 'font-semibold bg-blue-100' : ''} ${getBorderRadiusClass(
              index,
              selected,
              normalizedItems
            )}`}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
