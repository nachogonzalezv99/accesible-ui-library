import { useLayoutEffect, useState } from 'react'
import { CustomChangeEventHandler } from '../_types/events'
import { BaseInput, BaseInputProps } from './BaseInput'
import { Label } from './Label'

interface BaseNumberInputProps extends Omit<BaseInputProps<number | null>, 'min' | 'max' | 'onChange'> {
  id?: string
  label?: string
  onChange?: CustomChangeEventHandler<number | null>
}

export type NumberInputProps =
  | (BaseNumberInputProps & { id: string; label?: string })
  | (BaseNumberInputProps & { id?: undefined; label?: undefined })

export function NumberInput({ label, id, required, defaultValue, value, error, onChange, ...props }: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || null)

  useLayoutEffect(() => {
    if (value !== undefined) setInternalValue(value)
  }, [value])

  return (
    <span className="flex flex-col gap-1">
      <Label id={id} label={label} required={required} />

      <BaseInput
        {...props}
        id={id}
        required={required}
        error={error}
        value={internalValue !== null ? String(internalValue) : ''}
        onChange={e => {
          const value = e.target.value
          console.log(value)
          if (!/^\d+$/.test(value) && value !== '') return
          setInternalValue(value === '' ? null : Number(value))
          if (onChange) onChange({ ...e, target: { ...e.target, value: value === '' ? null : Number(value) } })
        }}
      />
      {Boolean(error) && <p className="text-red-600">{error}</p>}
    </span>
  )
}
