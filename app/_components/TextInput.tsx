import { forwardRef, useLayoutEffect, useState } from 'react'
import { BaseInput, BaseInputProps } from './BaseInput'
import { Label } from './Label'

export interface TextInputProps extends Omit<BaseInputProps<string>, 'min' | 'max'> {
  id?: string
  label?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, required, defaultValue, value, error, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '')

    useLayoutEffect(() => {
      if (value !== undefined) setInternalValue(value)
    }, [value])

    return (
      <span className="flex flex-col gap-1">
        <Label id={id} label={label} required={required} />

        <BaseInput
          ref={ref}
          {...props}
          id={id}
          required={required}
          error={error}
          value={internalValue}
          onChange={e => {
            setInternalValue(e.target.value)
            if (onChange) onChange(e)
          }}
        />

        {Boolean(error) && <p className="text-red-600">{error}</p>}
      </span>
    )
  }
)

TextInput.displayName = 'TextInput'
