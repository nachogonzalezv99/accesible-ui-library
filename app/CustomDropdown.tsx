import { useState } from 'react'
import {
  AiOutlineComment,
  AiOutlineLink,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineStar,
  AiOutlineUser
} from 'react-icons/ai'
import { Avatar } from './_components2/Avatar'
import { Button } from './_components2/Button'
import { Dropdown, DropdownProps } from './_components2/Dropdown'
import { DropdownMenu } from './_components2/DropdownMenu'
import { IconButton } from './_components2/IconButton'
import { Input } from './_components2/Input'
import { Select } from './_components2/Select'
import { Tabs } from './_components2/Tabs'
import { Tag } from './_components2/Tag'

const items = [
  { label: 'Share', value: 'share' },
  { label: 'Publish', value: 'publish' },
  { label: 'Disabled', value: 'disabled', disabled: true }
] as const

export function CustomDropdown({ children, ...props }: DropdownProps) {
  const [selected, setSelected] = useState<(typeof items)[number]['value'] | null>(null)

  return (
    <Dropdown {...props}>
      <Dropdown.Trigger>
        <Button size="md" variant="link">
          {children}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content className="divide-y">
        <div className="px-3">
          <Tabs items={items} value={selected} onChange={setSelected} />
        </div>
        {selected === 'share' && (
          <div className="p-3 flex flex-col gap-3">
            <div className="flex gap-2 px-2">
              <Input size="md" placeholder="Email or group" />
              <Button size="md" variant="contained">
                Invite
              </Button>
            </div>
            <label
              htmlFor="first"
              className="flex items-center justify-between gap-5 hover:bg-gray-50 rounded-md p-2 cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <Avatar>N</Avatar>
                <div className="flex flex-col justify-between flex-1 overflow-hidden">
                  <p className="text-gray-700 truncate w-full">nacho gonzalez (You)</p>
                  <p className="text-sm text-gray-500 truncate w-full">nachogonzalez.v.99@gmail.com</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenu.Trigger>
                  <Button size="sm" variant="outlined" startIcon={<AiOutlineSearch />}>
                    Start icon
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="w-80">
                  <DropdownMenu.Item
                    leftAddornment={<AiOutlineSetting />}
                    rightAddornment={<span className="text-gray-400 text-sm">Ctrl+Alt+L</span>}
                  >
                    Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Item leftAddornment={<AiOutlineUser />}>Users</DropdownMenu.Item>
                  <DropdownMenu.Item leftAddornment={<AiOutlineComment />} disabled>
                    Comments
                  </DropdownMenu.Item>
                  <DropdownMenu.Divider />
                  <DropdownMenu.Item
                    rightAddornment={
                      <Tag color="info" icon={<AiOutlineStar />}>
                        Plus
                      </Tag>
                    }
                  >
                    Comments
                  </DropdownMenu.Item>
                  <DropdownMenu.Item rightAddornment={<Tag>New</Tag>} description="Esta es una descripción">
                    Holaaa
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </label>
            <label
              htmlFor="access"
              className="flex items-center justify-between gap-5 hover:bg-gray-50 rounded-md p-2 cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <Avatar>N</Avatar>
                <div className="flex flex-col justify-between flex-1 overflow-hidden">
                  <p className="text-gray-700 truncate w-full">nacho gonzalez (You)</p>
                  <p className="text-sm text-gray-500 truncate w-full">nachogonzalez.v.99@gmail.com</p>
                </div>
              </div>
              <Select
                id="access"
                placeholder="Select..."
                className="w-40"
                items={[
                  { label: 'Full access', value: 'full', description: 'Edit, suggest, and share with others' },
                  { label: 'Can edit', value: 'edit', description: 'Edit, suggest and comment' },
                  {
                    label: 'Can comment',
                    value: 'comment',
                    description: 'Suggest and comment',
                    leftAddornment: <Tag color="info">New</Tag>
                  },
                  { label: 'Can view', value: 'view' }
                ]}
              />
            </label>
            <label className="flex items-center justify-between gap-5 hover:bg-gray-50 rounded-md p-2 cursor-pointer">
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <Avatar>N</Avatar>
                <div className="flex flex-col justify-between flex-1 overflow-hidden">
                  <p className="text-gray-700 truncate w-full">nacho gonzalez (You)</p>
                  <p className="text-sm text-gray-500 truncate w-full">nachogonzalez.v.99@gmail.com</p>
                </div>
              </div>
              <Dropdown>
                <Dropdown.Trigger>
                  <Button>Open</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>Hey</Dropdown.Content>
              </Dropdown>
            </label>
          </div>
        )}
        {selected === 'publish' && (
          <div className="p-3 flex flex-col justify-center items-center">
            <p className="mt-2 font-semibold text-xl">Publish to web</p>
            <div className="flex items-center gap-1">
              <p className="mt-1 text-gray-500">Create a website with Notion</p>
              <IconButton className="text-gray-300" size="sm" variant="link" icon={<AiOutlineQuestionCircle />} />
            </div>

            <Button className="mt-10 w-full">Publish</Button>
          </div>
        )}
        <div className="p-3 flex justify-between gap-2">
          <Button startIcon={<AiOutlineQuestionCircle />} size="sm" variant="link">
            Learn about sharing
          </Button>
          <Button startIcon={<AiOutlineLink />} size="sm" variant="outlined">
            Copy link
          </Button>
        </div>
      </Dropdown.Content>
    </Dropdown>
  )
}
