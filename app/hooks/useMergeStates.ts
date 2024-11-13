'use client'
import { useLayoutEffect, useState } from 'react'

interface MergeStateProps<T> {
  defaultValue?: T
  value?: T
  onChange?: (event: Event) => void
}
export function useMergeStates<T>({ value, defaultValue, onChange }: MergeStateProps<T>) {
  const [internalValue, setInternalValue] = useState<T>(() => {
    return value !== undefined ? value : (defaultValue as T)
  })

  useLayoutEffect(() => {
    if (value !== undefined) setInternalValue(value)
    else if (defaultValue !== undefined) setInternalValue(defaultValue)
  }, [value, defaultValue])

  const handleValueChange = (newValue: T) => {
    setInternalValue(newValue)
    if (onChange) onChange(e)
  }

  return [internalValue, setInternalValue]
}
