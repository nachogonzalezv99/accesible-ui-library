import { ComponentProps, ReactNode, useState } from 'react'
import { AiOutlineCheck, AiOutlineDown } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { DropdownMenu } from './DropdownMenu'
import { Sizes, Variants, base, sizes, variants } from './Input'

export interface SelectItem {
  label: ReactNode
  value: string
  disabled?: boolean
  description?: string
  leftAddornment?: ReactNode
}

interface SelectProps extends Omit<ComponentProps<'button'>, 'size'> {
  size?: Sizes
  variant?: Variants
  items: string[] | SelectItem[]
  placeholder?: string
}

function isSelectItemArray(items: SelectItem[] | string[]): items is SelectItem[] {
  return (items as SelectItem[])[0]?.value !== undefined
}

export function Select({ size = 'md', variant = 'outlined', className, items, placeholder, ...props }: SelectProps) {
  const [open, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const normalizedItems: SelectItem[] = isSelectItemArray(items)
    ? items
    : items.map(item => ({ label: item, value: item }))

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen} matchTriggerWidth>
      <DropdownMenu.Trigger>
        <button {...props} className={twMerge(base, sizes[size], variants[variant], className)}>
          {selected ? (
            normalizedItems.find(i => i.value === selected)?.label
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <AiOutlineDown className="ml-auto" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="flex flex-col p-1">
        {normalizedItems.map(item => (
          <DropdownMenu.Item
            key={item.value}
            rightAddornment={selected === item.value ? <AiOutlineCheck /> : <span> </span>}
            onClick={() => {
              setIsOpen(false)
              setSelected(item.value)
            }}
            {...item}
            className={selected === item.value ? 'font-semibold bg-blue-100' : ''}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
