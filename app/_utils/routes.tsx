'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

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
      { label: 'My feed', path: '/my-feed', subroutes: [{ label: 'Likes', path: '/my-feed/likes' }] },
      { label: 'Conversations', path: '/my-conversations' },
      {
        label: 'Profile',
        path: '/profile',
        subroutes: [
          {
            label: 'My feed',
            path: '/profile/my-feed',
            subroutes: [{ label: 'Likes', path: '/profile/my-feed/likes' }]
          },
          { label: 'Conversations', path: '/profile/my-conversations' }
        ]
      },
      {
        label: 'Projects',
        path: '/projects',
        startAdornment: <AiOutlineUser />,
        subroutes: [
          {
            label: 'Project by id',
            path: '/projects/[projectId]'
            // subroutes: [{ label: 'Subprojects', path: '/projects/[projectId]/subprojects' }]
          }
        ]
      }
    ]
  }
] as const satisfies Route[]

// Utility function to convert strings to camelCase
function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => (index === 0 ? match.toLowerCase() : match.toUpperCase()))
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
}

type CamelCase<S extends string> = S extends `${infer First} ${infer Rest}`
  ? `${Lowercase<First>}${Capitalize<CamelCase<Rest>>}` // Convert first word to lowercase, rest to capitalized camelCase
  : Lowercase<S> // For single words, just lowercase

// The transformed routes type with camel-cased keys
type TransformedRoutes<T extends readonly Route[]> = {
  [K in T[number] as CamelCase<K['label']>]: K extends { subroutes: readonly (infer SubRoute extends Route)[] } // Use readonly (infer SubRoute)[] for subroutes
    ? TransformedRoutes<readonly [SubRoute]> // Ensure subroutes are readonly
    : (value: string) => string // Allow string paths and dynamic paths as functions
}

function hasDynamicParams(path: string): boolean {
  return /\[.*?\]/.test(path) // Check for [something] pattern in the path
}

// Transform function to generate the camelCase keys and paths
function transformRoutes<T extends readonly Route[]>(routes: T): TransformedRoutes<T> {
  const result: any = {}

  routes.forEach(route => {
    const { label, path, subroutes } = route
    const camelCaseLabel = toCamelCase(label)

    // If the path has dynamic parameters, create a function to handle them
    if (hasDynamicParams(path)) {
      result[camelCaseLabel] = (...args: string[]) => {
        let finalPath = path
        // Replace [something] with the corresponding argument
        args.forEach(arg => {
          finalPath = finalPath.replace(/\[.*?\]/, arg) // Replace first dynamic part
        })
        return finalPath
      }
    } else {
      // For normal paths, just store the string path
      result[camelCaseLabel] = path
    }

    // If there are subroutes, recursively call transformRoutes
    if (subroutes && subroutes.length > 0) {
      result[camelCaseLabel] = transformRoutes(subroutes)
    }
  })

  return result
}

// Generate the typed routes object
export const routesObj = transformRoutes(routes)
console.log(routesObj.home)

interface RouterContextProps {
  title: string
  updateTitle: (name: string) => void
}

const RouterContext = createContext<RouterContextProps | null>(null)

export function useRouting() {
  const context = useContext(RouterContext) as RouterContextProps | null
  if (!context) throw new Error('useForm must be used inside a FormProvider')
  return context
}

export function RouterProvider(props: { children: ReactNode }) {
  const [title, setTitle] = useState('')

  const updateTitle = (name: string) => setTitle(name)

  return <RouterContext.Provider value={{ title, updateTitle }} {...props} />
}
