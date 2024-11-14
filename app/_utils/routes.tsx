'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { toCamelCase } from './strings'
import { CamelCase } from './types'

export type Route = {
  label: string
  path: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  subroutes?: Route[]
}

export const routes = [
  {
    label: 'Home',
    path: '/',
    subroutes: [
      { label: 'My feed', path: '/my-feed', subroutes: [{ label: 'Likes', path: '/likes' }] },
      { label: 'Conversations', path: '/my-conversations' },
      {
        label: 'Profile',
        path: '/profile',
        subroutes: [
          {
            label: 'My feed profile',
            path: '/my-feed',
            subroutes: [{ label: 'Likes', path: '/likes' }]
          },
          { label: 'Conversations', path: '/my-conversations' }
        ]
      },
      {
        label: 'Projects',
        path: '/projects',
        startAdornment: <AiOutlineUser />,
        subroutes: [
          {
            label: 'By id',
            path: '/[projectId]',
            subroutes: [
              {
                label: 'Subprojects',
                path: '/subprojects',
                subroutes: [{ label: 'By id', path: '/[subprojectId]', subroutes: [{ label: 'Last', path: '/last' }] }]
              }
            ]
          }
        ]
      }
    ]
  }
] as const satisfies Route[]

// The transformed routes type with camel-cased keys
type TransformedRoutes<T extends readonly Route[]> = {
  [K in T[number] as CamelCase<K['label']>]: K extends { subroutes: readonly Route[] }
    ? { path: string } & (hasDynamicParam<K['path']> extends true
        ? (...args: string[]) => { path: string } & TransformedRoutes<K['subroutes']>
        : TransformedRoutes<K['subroutes']>)
    : K extends { path: infer P }
    ? hasDynamicParam<P> extends true
      ? (...args: string[]) => { path: string }
      : { path: string }
    : never
}

// Helper type to check if path is dynamic
type hasDynamicParam<S> = S extends string ? (S extends `${string}[${string}]${string}` ? true : false) : false

// Normalize the current path to avoid double slashes

export const normalizePath = (path: string) => path.replace(/\/+/g, '/')

export const getFullPath = (accumulated: string, path: string) =>
  normalizePath(accumulated + (path.startsWith('/') ? path : `/${path}`))

export function isDynamicRoute(routePath: string) {
  return /\[.*?\]/.test(routePath) // Check if the route has dynamic segments like [projectId]
}

// Transform function to generate the camelCase keys and paths
function transformRoutes<T extends readonly Route[]>(routes: T, basePath = ''): TransformedRoutes<T> {
  const result: any = {}

  routes.forEach(route => {
    const { label, path, subroutes } = route
    const camelCaseLabel = toCamelCase(label)

    const fullPath = getFullPath(basePath, path)

    if (isDynamicRoute(path)) {
      // If it's a dynamic path (like /[projectId]), create a function
      result[camelCaseLabel] = (...args: string[]) => {
        let finalPath = fullPath
        args.forEach(arg => {
          finalPath = finalPath.replace(/\[.*?\]/, arg) // Replace dynamic part like [projectId] with the argument
        })

        // Return path along with resolved subroutes if any
        const resolvedSubroutes = subroutes ? transformRoutes(subroutes, finalPath) : {}
        return { path: finalPath, ...resolvedSubroutes }
      }
    } else {
      // Static path: directly assign the full path
      result[camelCaseLabel] = { path: fullPath }

      // If there are subroutes, recursively resolve them with the accumulated path
      if (subroutes && subroutes.length > 0) {
        result[camelCaseLabel] = {
          ...result[camelCaseLabel],
          ...transformRoutes(subroutes, fullPath)
        }
      }
    }
  })

  return result
}

// Generate the typed routes object
export const routesObj = transformRoutes(routes)

interface RouterContextProps {
  title: string[]
  updateTitle: (name: string[]) => void
}

const RouterContext = createContext<RouterContextProps | null>(null)

export function useRouting() {
  const context = useContext(RouterContext) as RouterContextProps | null
  if (!context) throw new Error('useForm must be used inside a FormProvider')
  return context
}

export function RouterProvider(props: { children: ReactNode }) {
  const [title, setTitle] = useState<string[]>([])

  const updateTitle = (name: string[]) => setTitle(name)

  return <RouterContext.Provider value={{ title, updateTitle }} {...props} />
}
