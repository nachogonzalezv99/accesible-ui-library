import { usePathname } from 'next/navigation'
import { ComponentProps, ReactElement, ReactNode } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { Route, useRouting } from '../_utils/routes'
import { buttonVariants } from './Button'

export interface BreadcrumbItem extends ComponentProps<'a'> {
  label: ReactNode
  startAdornment?: ReactElement
  endAdornment?: ReactElement
  path: string
}

export interface BreadcrumbProps extends ComponentProps<'div'> {
  items: BreadcrumbItem[]
  divider?: ReactNode
}
export function Breadcrumb({ items, divider = '/', className, ...props }: BreadcrumbProps) {
  return (
    <div className={twMerge('flex items-center gap-[2px]', className)} {...props}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-[2px]">
          <a
            key={index}
            href={item.path}
            {...item}
            className={twMerge(
              buttonVariants({ size: 'sm', variant: 'link' }),
              'gap-2',
              index < items.length - 1
                ? 'text-gray-400'
                : 'text-gray-800 hover:bg-transparent hover:border-transparent active:bg-transparent active:border-transparent cursor-default'
            )}
          >
            {item.startAdornment ? <span>{item.startAdornment}</span> : index === 0 ? <AiOutlineHome /> : null}
            {item.label}
            {item.endAdornment && <span>{item.endAdornment}</span>}
          </a>

          {index < items.length - 1 && <span className="text-gray-400">{divider}</span>}
        </span>
      ))}
    </div>
  )
}

export function useGetDynamicBreadcrumb(routes: Route[]) {
  const currentPath = usePathname()
  const { title } = useRouting() // Get the title from the provider context

  function isDynamicRoute(routePath: string) {
    return /\[.*?\]/.test(routePath) // Check if the route has dynamic segments like [projectId]
  }

  function matchDynamicRoute(routePath: string, pathname: string) {
    // Convert dynamic segments like [projectId] into regex patterns to match the path
    const dynamicPattern = new RegExp('^' + routePath.replace(/\[.*?\]/g, '[^/]+') + '$')
    return dynamicPattern.test(pathname)
  }

  const findRouteBreadcrumb = (routes: Route[], currentPath: string): BreadcrumbItem[] | null => {
    const traverse = (routeList: Route[], path: string, trail: BreadcrumbItem[] = []): BreadcrumbItem[] | null => {
      for (const route of routeList) {
        const fullPath = route.path
        let label = route.label
        const startAdornment = route.startAdornment
        const endAdornment = route.endAdornment

        // Check if the route matches the exact path or matches a dynamic route pattern
        if (fullPath === path || (isDynamicRoute(fullPath) && matchDynamicRoute(fullPath, path))) {
          // Override label with context title if it's a dynamic route
          if (isDynamicRoute(fullPath)) {
            label = title || label
          }

          // Return breadcrumb item with adornments
          return [...trail, { label, path, startAdornment, endAdornment }] as BreadcrumbItem[]
        }

        // Recursively check subroutes
        if (route.subroutes) {
          const found = traverse(route.subroutes, path, [
            ...trail,
            { label, path: fullPath, startAdornment, endAdornment }
          ] as BreadcrumbItem[])
          if (found) return found
        }
      }
      return null
    }

    return traverse(routes, currentPath)
  }

  return findRouteBreadcrumb(routes, currentPath) || []
}

export function useGetRouteTitle(routes: Route[]) {
  const currentPath = usePathname()
  const { title } = useRouting() // Get the title from the provider context

  function isDynamicRoute(routePath: string) {
    return /\[.*?\]/.test(routePath) // Check if the route has dynamic segments like [projectId]
  }

  function matchDynamicRoute(routePath: string, pathname: string) {
    const dynamicPattern = new RegExp('^' + routePath.replace(/\[.*?\]/g, '([^/]+)') + '$')
    return dynamicPattern.test(pathname)
  }

  function getLabelForPath(pathname: string, routes: Route[]): string | null {
    for (const route of routes) {
      // Check if it's an exact match or a dynamic match
      if (route.path === pathname) {
        return route.label
      }

      // If it's a dynamic route and matches, return the context title instead
      if (isDynamicRoute(route.path) && matchDynamicRoute(route.path, pathname)) {
        return title || route.label // Prefer context title if set
      }

      // Recursively check subroutes
      if (route.subroutes) {
        const subrouteLabel = getLabelForPath(pathname, route.subroutes)
        if (subrouteLabel) return subrouteLabel
      }
    }
    return null // Return null if no match is found
  }

  return getLabelForPath(currentPath, routes)
}
