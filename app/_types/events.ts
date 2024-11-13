import { ChangeEvent } from 'react'

export type CustomChangeEventHandler<T> = (
  event: Omit<ChangeEvent<HTMLInputElement>, 'target'> & {
    target: Omit<EventTarget & HTMLInputElement, 'value'> & { value: T }
  }
) => void
