import { useParams, usePathname } from 'next/navigation'
import { ComponentProps, ReactElement, ReactNode, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { getFullPath, isDynamicRoute, Route, useRouting } from '../_utils/routes'
import { buttonVariants } from './Button'
import { Params } from 'next/dist/server/request/params'

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
  const isLast = (index: number) => index === items.length - 1
  console.log(items)

  return (
    <div className={twMerge('flex items-center gap-[2px]', className)} {...props}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-[2px]">
          <a
            key={index}
            href={isLast(index) ? undefined : item.path}
            {...item}
            className={twMerge(
              buttonVariants({ size: 'sm', variant: 'link' }),
              'gap-2 whitespace-nowrap',
              isLast(index)
                ? 'text-gray-800 hover:bg-transparent hover:border-transparent active:bg-transparent active:border-transparent cursor-default'
                : 'text-gray-400'
            )}
          >
            {item.startAdornment ? <span>{item.startAdornment}</span> : index === 0 ? <AiOutlineHome /> : null}
            {item.label}
            {item.endAdornment && <span>{item.endAdornment}</span>}
          </a>

          {!isLast(index) && <span className="text-gray-400">{divider}</span>}
        </span>
      ))}
    </div>
  )
}

const matchDynamicRoute = (fullPath: string, routePath: string) => {
  const dynamicPattern = fullPath.replace(/\[.*?\]/g, '[^/]+')
  return new RegExp(`^${dynamicPattern}$`).test(routePath)
}

const calculateDynamicTitle = (route: Route, title: string[], index: number): string => {
  if (!isDynamicRoute(route.path)) {
    return route.label;
  }

  // Use the title at the current dynamicIndex position
  return title[index] ?? route.label; // Fallback to route label if index is out of bounds
};

const calculateDynamicPath = (fullRoute: string, params: Params): string => {
  return fullRoute.replace(/\[([^\]]+)\]/g, (_, dynamicParamName) => {
    const paramValue = params[dynamicParamName]
    return String(paramValue)
  })
}

export function useGetDynamicBreadcrumb(routes: Route[]) {
  const currentPath = usePathname();
  const { title } = useRouting();
  const params = useParams();

  const findRouteBreadcrumb = (routes: Route[], accumulatedPath: string = '', dynamicIndex = 0): BreadcrumbItem[] => {
    for (const route of routes) {
      const fullPath = getFullPath(accumulatedPath, route.path);

      if (fullPath === currentPath) {
        // If we are on the current path, return the breadcrumb for this route
        return [{ label: route.label, path: fullPath }];
      }

      if (matchDynamicRoute(fullPath, currentPath)) {
        // If we encounter a dynamic route, use the correct title and increment dynamicIndex
        return [
          {
            label: calculateDynamicTitle(route, title, dynamicIndex),
            path: calculateDynamicPath(fullPath, params),
          },
        ];
      }

      if (route.subroutes) {
        // When there are subroutes, pass the incremented dynamicIndex only if we are in a dynamic route
        const result = findRouteBreadcrumb(route.subroutes, fullPath, dynamicIndex + (isDynamicRoute(route.path) ? 1 : 0));
        if (result.length) {
          return [
            ...result,
            {
              label: calculateDynamicTitle(route, title, dynamicIndex),
              path: calculateDynamicPath(fullPath, params),
            },
          ];
        }
      }
    }
    return [];
  };

  // Call the recursive function to find the breadcrumb items and reverse the result
  return findRouteBreadcrumb(routes).reverse();
}

export function useGetRouteTitle(routes: Route[]) {
  const currentPath = usePathname()
  const { title } = useRouting()

  function getTitleForPath(routes: Route[], accumulatedPath: string = ''): string | null {
    for (const route of routes) {
      const fullPath = getFullPath(accumulatedPath, route.path)

      if (fullPath === currentPath) return route.label

      if (matchDynamicRoute(fullPath, currentPath)) {
        if (isDynamicRoute(route.path)) return title[title.length - 1] || route.label
        return route.label
      }

      if (route.subroutes) {
        const subrouteLabel = getTitleForPath(route.subroutes, fullPath)
        if (subrouteLabel) return subrouteLabel
      }
    }
    return null
  }

  return getTitleForPath(routes)
}
