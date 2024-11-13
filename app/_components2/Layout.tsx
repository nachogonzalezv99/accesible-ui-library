import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Route } from '../_utils/routes'
import { Menu } from './Menu'
export function Layout({ children }: { children: ReactNode }) {
  return <div className="h-screen flex overflow-hidden bg-white">{children}</div>
}

Layout.Sidebar = function LayoutSidebar({ children, className }: { className?: string; children: ReactNode }) {
  return <div className={twMerge('bg-gray-50 p-3 border-r flex flex-col gap-1', className)}>{children}</div>
}

interface LayoutMenuProps {
  items: Route[]
}
Layout.Menu = function LayoutMenu({ items }: LayoutMenuProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Utility function to check if a path has dynamic parameters
  const isDynamicPath = (path: string): boolean => /\[.*?\]/.test(path)

  // Recursive function to render menu items, excluding dynamic routes
  const renderMenuItems = (items: Route[]) => {
    return items
      .filter(item => !isDynamicPath(item.path)) // Filter out dynamic routes
      .map(item => {
        if (item.label === 'Home') {
          return (
            <div key={item.path}>
              {item.subroutes && item.subroutes.length > 0 && (
                <div className="ml-4">
                  <Menu>{renderMenuItems(item.subroutes)}</Menu>
                </div>
              )}
            </div>
          )
        }

        return (
          <div key={item.path}>
            <Menu.Item
              leftAddornment={item.startAdornment}
              className={pathname === item.path ? 'border border-gray bg-gray-100' : ''}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </Menu.Item>

            {item.subroutes && item.subroutes.length > 0 && (
              <div className="ml-4">
                <Menu>{renderMenuItems(item.subroutes)}</Menu>
              </div>
            )}
          </div>
        )
      })
  }

  return <Menu>{renderMenuItems(items)}</Menu>
}

Layout.Main = function LayoutMain({ children }: { children: ReactNode }) {
  return <div className="flex-1 flex flex-col">{children}</div>
}

Layout.Header = function LayoutHeader({ children }: { children: ReactNode }) {
  return <div className="border-b border-gray-300 p-3">{children}</div>
}

Layout.Content = function LayoutContent({ children }: { children: ReactNode }) {
  return <div className="p-3 flex-1 overflow-y-auto">{children}</div>
}
