import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Card({ children }: { children: ReactNode }) {
  return <div className="w-full border rounded-md divide-y overflow-hidden">{children}</div>
}

export interface CardHeaderProps {
  className?: string
  title?: ReactNode
  children?: ReactNode
  actions?: ReactNode
}
Card.Header = function CardHeader({ title, className, actions, children }: CardHeaderProps) {
  return (
    <div className="p-3 bg-slate-50 flex ">
      <span className="flex align-top">{title && <p className="text-xl font-semibold">{title}</p>}</span>
      <div className={className}>{children}</div>
      <span className="flex align-top ml-auto">{actions && <span>{actions}</span>}</span>
    </div>
  )
}
export interface CardBodyProps {
  className?: string
  title?: ReactNode
  children?: ReactNode
}
Card.Body = function CardBody({ className, children }: CardBodyProps) {
  return <div className={twMerge('p-3', className)}>{children}</div>
}
export interface CardFooterProps {
  className?: string
  title?: ReactNode
  children?: ReactNode
}
Card.Footer = function CardFooter({ className, children }: CardFooterProps) {
  return <div className={twMerge('p-3', className)}>{children}</div>
}
