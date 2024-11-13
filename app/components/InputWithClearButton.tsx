import { ChangeEventHandler, ComponentProps, MutableRefObject, useEffect, useRef, useState } from 'react'

function triggerOnChange(ref: MutableRefObject<HTMLElement | null>, value: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set
  nativeInputValueSetter!.call(ref.current, value)

  ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
}

interface InputProps extends Omit<ComponentProps<'input'>, 'value' | 'defaultValue'> {
  value?: string
  defaultValue?: string
}
const InputWithClearButton = ({ value, onChange, defaultValue }: InputProps) => {
  const [innerValue, setInnerValue] = useState(defaultValue || '')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (value !== undefined) setInnerValue(value)
  }, [value])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInnerValue(e.target.value)
    if (onChange) onChange(e)
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={innerValue}
        onChange={handleInputChange}
        placeholder="Ingresa texto aquí"
      />
      <button type="button" onClick={() => triggerOnChange(inputRef, '')}>
        Limpiar
      </button>
      <button type="button" onClick={() => triggerOnChange(inputRef, innerValue.slice(0, -1))}>
        Borrar ultimo
      </button>
    </div>
  )
}

export default InputWithClearButton
