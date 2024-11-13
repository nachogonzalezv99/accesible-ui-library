import { MutableRefObject } from 'react'

export function triggerOnChange(ref: MutableRefObject<HTMLElement | null>, value: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set
  nativeInputValueSetter!.call(ref.current, value)

  ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
}
