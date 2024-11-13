import { ComponentProps } from 'react'

export interface LabelProps extends ComponentProps<'label'> {
  id?: string
  label?: string
  required?: boolean
}
export function Label({ id, label, required, ...props }: LabelProps) {
  return (
    Boolean(label) && (
      <label htmlFor={id} className="text-gray-500" {...props}>
        {label} {required && '*'}
      </label>
    )
  )
}
