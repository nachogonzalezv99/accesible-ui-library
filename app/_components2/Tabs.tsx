import { useEffect, useState } from 'react'
import { Button } from './Button'

export interface TabItem<T> {
  label: string
  value: T
  disabled?: boolean
}
export interface TabsProps<T> {
  items: readonly T[] | readonly TabItem<T>[]
  value: T | null
  onChange: (value: T | null) => void
}

function isTabItemArray<T>(items: readonly TabItem<T>[] | readonly T[]): items is TabItem<T>[] {
  return (items as TabItem<T>[])[0]?.value !== undefined
}

export function Tabs<T extends string>({ items, value, onChange }: TabsProps<T>) {
  const [selected, setSelected] = useState<T | null>(null)

  const normalizedItems = isTabItemArray(items)
    ? items
    : (items.map(item => ({ label: item, value: item })) as TabItem<T>[])

  useEffect(() => {
    const firstAvailable = normalizedItems.find(item => !item.disabled)
    if (firstAvailable) {
      setSelected(firstAvailable.value)
      onChange?.(firstAvailable.value)
    }
  }, [items])

  useEffect(() => {
    if (value !== undefined) setSelected(value)
  }, [value])

  return (
    <div className="flex h-12">
      {normalizedItems.map(item => (
        <div key={item.value} className="relative flex items-center">
          <Button
            onClick={() => {
              setSelected(item.value)
              onChange?.(item.value)
            }}
            variant="link"
            size="sm"
            className={selected === item.value ? 'text-gray-700' : 'text-gray-400'}
            disabled={item.disabled}
          >
            {item.label}
          </Button>
          {selected === item.value && <div className="absolute bottom-0 h-[2px] bg-black inset-x-0" />}
        </div>
      ))}
    </div>
  )
}
