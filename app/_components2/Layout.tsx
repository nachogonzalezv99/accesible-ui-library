import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export function Layout({ children }: { children: ReactNode }) {
  return <div className="h-screen flex overflow-hidden bg-white">{children}</div>
}

Layout.Sidebar = function LayoutSidebar({ children, className }: { className?: string; children: ReactNode }) {
  return <div className={twMerge('bg-gray-50 p-3 border-r flex flex-col gap-1', className)}>{children}</div>
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


