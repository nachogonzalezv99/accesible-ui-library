// export interface DropdownProps extends ComponentProps<'div'> {}

import { cloneElement, ReactElement, ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { Dropdown, DropdownProps, useDropdown } from './Dropdown'
import { IconButton } from './IconButton'

export function Modal(props: DropdownProps) {
  return <Dropdown isModal {...props} />
}

Modal.Trigger = Dropdown.Trigger

export interface ModalContentProps {
  className?: string
  children: ReactNode
}
Modal.Content = function ModalContent({ className, ...props }: ModalContentProps) {
  return <Dropdown.Content {...props} className={twMerge('divide-y', className)} overlayClassName='bg-gray-500 opacity-10'/>
}

export interface ModalHeaderProps {
  className?: string
  title?: ReactNode
  children?: ReactNode
}
Modal.Header = function ModalHeader({ title, className, children }: ModalHeaderProps) {
  const { updateOpen } = useDropdown()
  return (
    <div className={twMerge('p-3', className)}>
      <span className="flex align-top">
        {title && <p className="text-xl font-semibold">{title}</p>}
        <IconButton
          variant="outlined"
          shape="circle"
          size="sm"
          icon={<AiOutlineClose />}
          onClick={() => updateOpen(false)}
          className="ml-auto"
        />
      </span>
      {children}
    </div>
  )
}
Modal.Body = function ModalBody({ className, children }: ModalContentProps) {
  return <div className={twMerge('p-3', className)}>{children}</div>
}
Modal.Footer = function ModalFooter({ className, children }: ModalContentProps) {
  return <div className={twMerge('p-3', className)}>{children}</div>
}

export interface ModalCloseProps {
  children: ReactElement
}
Modal.Close = function ModalFooter({ children }: ModalCloseProps) {
  const { updateOpen } = useDropdown()
  return cloneElement(children, { onClick: () => updateOpen(false) })
}
