import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { getFullPath, isDynamicRoute, Route } from '../_utils/routes'
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

  const renderMenuItems = (items: Route[], accumulatedPath: string = '') => {
    return items
      .filter(item => !isDynamicRoute(item.path))
      .map(item => {
        const fullPath = getFullPath(accumulatedPath, item.path)

        return item.subroutes && item.subroutes.length > 0 ? (
          <Menu.Subgroup
            label={item.label}
            onClick={() => router.push(fullPath)}
            className={pathname === fullPath ? 'border border-gray bg-gray-100' : ''}
          >
            {renderMenuItems(item.subroutes, fullPath)}
          </Menu.Subgroup>
        ) : (
          <Menu.Item
            leftAddornment={item.startAdornment}
            className={pathname === fullPath ? 'border border-gray bg-gray-100' : ''}
            onClick={() => router.push(fullPath)}
          >
            {item.label}
          </Menu.Item>
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
