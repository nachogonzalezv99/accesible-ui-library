'use client'
import { ReactNode } from 'react'
import {
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineSetting,
  AiOutlineStar,
  AiOutlineUsergroupAdd
} from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { Avatar } from './_components2/Avatar'
import { Breadcrumb, useGetDynamicBreadcrumb, useGetRouteTitle } from './_components2/Breadcrumbs'
import { Button, buttonVariants } from './_components2/Button'
import { Dropdown } from './_components2/Dropdown'
import { IconButton } from './_components2/IconButton'
import { Input } from './_components2/Input'
import { Layout } from './_components2/Layout'
import { Menu } from './_components2/Menu'
import { Tag } from './_components2/Tag'
import { routes } from './_utils/routes'
import { CustomDropdown } from './CustomDropdown'

export function Wrapper({ children }: { children: ReactNode }) {
  console.log(useGetDynamicBreadcrumb(routes))
  return (
    <Layout>
      <Layout.Sidebar>
        <Dropdown>
          <Dropdown.Trigger>
            <button className={twMerge(buttonVariants({ variant: 'link' }), 'gap-2 w-full justify-start ')}>
              <Avatar size="sm">N</Avatar>
              <p>Nacho gonzalez</p>
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content className="w-96">
            <div className="flex items-center gap-3 flex-1 overflow-hidden p-3">
              <Avatar>N</Avatar>
              <div className="flex flex-col justify-between flex-1 overflow-hidden">
                <p className="text-gray-700 truncate w-full">nacho gonzalez (You)</p>
                <p className="text-sm text-gray-500 truncate w-full">nachogonzalez.v.99@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-2 p-3 border-b">
              <Button variant="outlined" startIcon={<AiOutlineSetting />}>
                Settings
              </Button>
              <Button variant="outlined" startIcon={<AiOutlineUsergroupAdd />}>
                Invite members
              </Button>
            </div>
            <div className="flex flex-col p-3 border-b">
              <Menu>
                <Menu.Item>Add another account</Menu.Item>
                <Menu.Item disabled rightAddornment={<Tag size="sm">Coming soon</Tag>}>
                  Disabled
                </Menu.Item>
                <Menu.Item>Log out</Menu.Item>
              </Menu>
            </div>
            <div className="flex flex-col p-3">
              <Button variant="link" className="w-full justify-start">
                Get windows app
              </Button>
            </div>
          </Dropdown.Content>
        </Dropdown>
        <Input placeholder="Search..." />
        <Layout.Menu items={routes} />

        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="link" className="mt-auto w-full">
              Abrir menu
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Menu>
              <Menu.Item>Hola</Menu.Item>
              <Menu.Item>Adios</Menu.Item>
            </Menu>
          </Dropdown.Content>
        </Dropdown>
      </Layout.Sidebar>
      <Layout.Main>
        <Layout.Header>
          <div className="grid grid-cols-3 items-center">
            <Breadcrumb items={useGetDynamicBreadcrumb(routes)} />
            <div className="justify-self-center text-center">{useGetRouteTitle(routes)}</div>

            <div className="flex gap-1 justify-end">
              <CustomDropdown>Share</CustomDropdown>
              <IconButton variant="link" icon={<AiOutlineComment />} />
              <IconButton variant="link" icon={<AiOutlineClockCircle />} />
              <IconButton variant="link" icon={<AiOutlineStar />} />
              <IconButton variant="link" icon={<FiMoreHorizontal />} />
            </div>
          </div>
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout.Main>
    </Layout>
  )
}
