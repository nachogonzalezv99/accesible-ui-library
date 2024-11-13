import { ComponentProps, ReactElement, ReactNode } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { buttonVariants } from './Button'

export interface BreadcrumbItemProps extends ComponentProps<'a'> {
  label: ReactNode
  preffix?: ReactElement
  suffix?: ReactElement
}

export interface BreadcrumbProps extends ComponentProps<'div'> {
  items: BreadcrumbItemProps[]
  divider?: ReactNode
}
export function Breadcrumb({ style, items, divider = '/', ...props }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-[2px]" {...props}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-[2px]">
          <a
            key={index}
            {...item}
            className={twMerge(
              buttonVariants({ size: 'sm', variant: 'link' }),
              'gap-2',
              index < items.length - 1
                ? 'text-gray-400'
                : 'text-gray-800 hover:bg-transparent hover:border-transparent active:bg-transparent active:border-transparent'
            )}
          >
            {item.preffix ? <span>{item.preffix}</span> : index === 0 ? <AiOutlineHome /> : null}
            {item.label}
            {item.suffix && <span>{item.suffix}</span>}
          </a>

          {index < items.length - 1 && <span className='text-gray-400'>{divider}</span>}
        </span>
      ))}
    </div>
  )
}
