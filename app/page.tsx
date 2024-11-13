'use client'

import {
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineStar,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineWallet
} from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { Avatar } from './_components2/Avatar'
import { Breadcrumb } from './_components2/Breadcrumbs'
import { Button, buttonVariants } from './_components2/Button'
import { Dropdown } from './_components2/Dropdown'
import { DropdownMenu } from './_components2/DropdownMenu'
import { IconButton } from './_components2/IconButton'
import { Input } from './_components2/Input'
import { Layout } from './_components2/Layout'
import { Menu } from './_components2/Menu'
import { Modal } from './_components2/Modal'
import { MultiSelect } from './_components2/MultiSelect'
import { Select } from './_components2/Select'
import { Tag } from './_components2/Tag'
import { CustomDropdown } from './CustomDropdown'

export default function Page() {
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
        <Menu>
          <Menu.Item leftAddornment={<AiOutlineHome />}>Home</Menu.Item>
          <Menu.Item leftAddornment={<AiOutlineWallet />}>Projects</Menu.Item>
          <Menu.Item leftAddornment={<AiOutlineWallet />} className="bg-white border border-gray-300">
            Projects
          </Menu.Item>
        </Menu>
      </Layout.Sidebar>
      <Layout.Main>
        <Layout.Header>
          <div className="flex justify-between">
            <Breadcrumb
              items={[{ label: 'Home', href: '/home' }, { label: 'Projects', href: '/projects' }, { label: 'General' }]}
            />
            <div className="flex items-center">
              <Dropdown>
                <Dropdown.Trigger>
                  <Button variant="link">Abrir menu</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Menu>
                    <Menu.Item>Hola</Menu.Item>
                    <Menu.Item>Adios</Menu.Item>
                  </Menu>
                </Dropdown.Content>
              </Dropdown>
              <Button variant="link">Abrir menu</Button>
            </div>

            <div className="flex gap-1">
              <CustomDropdown>Share</CustomDropdown>
              <IconButton variant="link" icon={<AiOutlineComment />} />
              <IconButton variant="link" icon={<AiOutlineClockCircle />} />
              <IconButton variant="link" icon={<AiOutlineStar />} />
              <IconButton variant="link" icon={<FiMoreHorizontal />} />
            </div>
          </div>
        </Layout.Header>
        <Layout.Content>
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col gap-5 py-10">
              <h2 className="font-semibold text-2xl">Icon buttons</h2>
              <div className="flex gap-5 items-center flex-wrap">
                <IconButton size="sm" icon={<AiOutlineUser />} />
                <IconButton size="md" icon={<AiOutlineUser />} />
                <IconButton size="lg" icon={<AiOutlineUser />} />
                <IconButton disabled size="lg" icon={<AiOutlineUser />} />
                <IconButton isLoading size="lg" icon={<AiOutlineUser />} />

                <IconButton size="sm" shape="circle" icon={<AiOutlineUser />} />
                <IconButton size="md" shape="circle" icon={<AiOutlineUser />} />
                <IconButton size="lg" shape="circle" icon={<AiOutlineUser />} />
                <IconButton disabled size="lg" shape="circle" icon={<AiOutlineUser />} />
                <IconButton isLoading size="lg" shape="circle" icon={<AiOutlineUser />} />

                <IconButton variant="outlined" size="sm" icon={<AiOutlineUser />} />
                <IconButton variant="outlined" size="md" icon={<AiOutlineUser />} />
                <IconButton variant="outlined" size="lg" icon={<AiOutlineUser />} />
                <IconButton disabled variant="outlined" size="lg" icon={<AiOutlineUser />} />
                <IconButton isLoading variant="outlined" size="lg" icon={<AiOutlineUser />} />

                <IconButton variant="outlined" size="sm" shape="circle" icon={<AiOutlineUser />} />
                <IconButton variant="outlined" size="md" shape="circle" icon={<AiOutlineUser />} />
                <IconButton variant="outlined" size="lg" shape="circle" icon={<AiOutlineUser />} />
                <IconButton disabled variant="outlined" size="lg" shape="circle" icon={<AiOutlineUser />} />
                <IconButton isLoading variant="outlined" size="lg" shape="circle" icon={<AiOutlineUser />} />

                <IconButton variant="link" size="sm" icon={<AiOutlineUser />} />
                <IconButton variant="link" size="md" icon={<AiOutlineUser />} />
                <IconButton variant="link" size="lg" icon={<AiOutlineUser />} />
                <IconButton disabled variant="link" size="lg" icon={<AiOutlineUser />} />
                <IconButton isLoading variant="link" size="lg" icon={<AiOutlineUser />} />

                <IconButton variant="link" shape="circle" size="sm" icon={<AiOutlineUser />} />
                <IconButton variant="link" shape="circle" size="md" icon={<AiOutlineUser />} />
                <IconButton variant="link" shape="circle" size="lg" icon={<AiOutlineUser />} />
                <IconButton disabled variant="link" shape="circle" size="lg" icon={<AiOutlineUser />} />
                <IconButton isLoading variant="link" shape="circle" size="lg" icon={<AiOutlineUser />} />
              </div>

              <h2 className="font-semibold text-2xl mt-4">Buttons</h2>
              <div className="flex gap-5 items-center flex-wrap">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled size="lg">
                  Large
                </Button>
                <Button isLoading size="lg">
                  Large
                </Button>

                <Button variant="outlined" size="sm">
                  Small
                </Button>
                <Button variant="outlined" size="md">
                  Medium
                </Button>
                <Button variant="outlined" size="lg">
                  Large
                </Button>
                <Button disabled variant="outlined" size="lg">
                  Large
                </Button>
                <Button isLoading variant="outlined" size="lg">
                  Large
                </Button>

                <Button variant="link" size="sm">
                  Small
                </Button>
                <Button variant="link" size="md">
                  Medium
                </Button>
                <Button variant="link" size="lg">
                  Large
                </Button>
                <Button disabled variant="link" size="lg">
                  Large
                </Button>
                <Button isLoading variant="link" size="lg">
                  Large
                </Button>

                <Button size="sm" startIcon={<AiOutlineSearch />}>
                  Small
                </Button>
                <Button size="md" startIcon={<AiOutlineSearch />}>
                  Medium
                </Button>
                <Button size="lg" startIcon={<AiOutlineSearch />}>
                  Large
                </Button>
                <Button disabled startIcon={<AiOutlineSearch />} size="lg">
                  Large
                </Button>
                <Button isLoading startIcon={<AiOutlineSearch />} size="lg">
                  Large
                </Button>
              </div>

              <h2 className="font-semibold text-2xl mt-4">Inputs</h2>
              <div className="flex gap-5 items-center flex-wrap">
                <Input size="sm" placeholder="Name..." />
                <Input size="md" placeholder="Name..." />
                <Input size="lg" placeholder="Name..." />
                <Input size="lg" defaultValue="Ignacio González" disabled />
                <Input size="lg" defaultValue="Ignacio González" isLoading />
              </div>

              <h2 className="font-semibold text-2xl mt-4">Multiselect</h2>
              <div className="flex gap-5 items-center flex-wrap">
                <MultiSelect
                  items={[
                    'Uno',
                    'Dos',
                    'Tres',
                    'Cuatro',
                    'Cinco',
                    'Seis',
                    'Siete',
                    'Ocho',
                    'Nueve',
                    'Diez',
                    'Once',
                    'Doce'
                  ]}
                  size="sm"
                  placeholder="Name..."
                />
                <MultiSelect items={['Uno', 'Dos', 'Tres']} size="md" placeholder="Name..." />
                <MultiSelect items={['Uno', 'Dos', 'Tres']} size="lg" placeholder="Name..." />
                <MultiSelect
                  disabled
                  defaultValue={['Uno', 'Dos']}
                  items={['Uno', 'Dos', 'Tres']}
                  size="lg"
                  placeholder="Name..."
                />
              </div>

              <h2 className="font-semibold text-2xl mt-4">Dropdown position</h2>
              <div className="flex gap-5 flex-wrap">
                <CustomDropdown side="top" align="start">
                  Top start
                </CustomDropdown>
                <CustomDropdown side="top" align="center">
                  Top center
                </CustomDropdown>
                <CustomDropdown side="top" align="end">
                  Top end
                </CustomDropdown>

                <CustomDropdown side="bottom" align="start">
                  Bottom start
                </CustomDropdown>
                <CustomDropdown side="bottom" align="center">
                  Bottom center
                </CustomDropdown>
                <CustomDropdown side="bottom" align="end">
                  Bottom end
                </CustomDropdown>

                <CustomDropdown side="left" align="start">
                  Left start
                </CustomDropdown>
                <CustomDropdown side="left" align="center">
                  Left center
                </CustomDropdown>
                <CustomDropdown side="left" align="end">
                  Left end
                </CustomDropdown>

                <CustomDropdown side="right" align="start">
                  Right start
                </CustomDropdown>
                <CustomDropdown side="right" align="center">
                  Right center
                </CustomDropdown>
                <CustomDropdown side="right" align="end">
                  Right end
                </CustomDropdown>
              </div>
              <div className="flex gap-5 items-center">
                <Input size="sm" />
                <Input size="md" />
                <Input size="lg" />
              </div>
              <div className="flex gap-5 items-center">
                <Select
                  placeholder="Select..."
                  items={[
                    'Uno',
                    'Dos',
                    'Tres',
                    'Cuatro',
                    'Cinco',
                    'Seis',
                    'Siete',
                    'Ocho',
                    'Nueve',
                    'Diez',
                    'Once',
                    'Doce'
                  ]}
                />
                <Select
                  placeholder="Select..."
                  items={[
                    { label: 'Uno', value: 'uno' },
                    { label: 'Dos', value: 'dos' },
                    { label: 'Tres', value: 'tres' },
                    { label: 'Cuatro', value: 'cuatro' },
                    { label: 'Cinco', value: 'cinco' },
                    { label: 'Seis', value: 'seis' },
                    { label: 'Siete', value: 'siete' },
                    { label: 'Ocho', value: 'ocho', disabled: true },
                    { label: 'Nueve', value: 'nueve' },
                    { label: 'Nueve2', value: 'nueve2' },
                    { label: 'Diez', value: 'diez' }
                  ]}
                />
                <Select disabled placeholder="Select..." items={['Uno', 'Dos', 'Tres']} />
                <Select
                  placeholder="Select..."
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
              </div>

              <div className="flex gap-5 items-center">
                <Tag color="default">Hola</Tag>
                <Tag color="error">Hola</Tag>
                <Tag color="info">Hola</Tag>
                <Tag color="success">Hola</Tag>
                <Tag color="warning">Hola</Tag>
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

              <Modal>
                <Modal.Trigger>
                  <Button>Abrir modal</Button>
                </Modal.Trigger>
                <Modal.Content className="w-96">
                  <Modal.Header title="Create new user" />
                  <Modal.Body>
                    <div className="flex flex-col gap-3">
                      <p>Hola</p>
                      <Input placeholder="Name..." />
                      <Button>Send</Button>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="flex justify-between gap-2">
                    <Modal.Close>
                      <Button variant="outlined">Cancel</Button>
                    </Modal.Close>
                    <CustomDropdown>Open</CustomDropdown>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
              <div className="flex items-start gap-2">
                <IconButton size="sm" icon={<AiOutlineSearch />} />
                <Input size="sm" />
                <Select size="sm" items={['Uno', 'Dos']} />
                <MultiSelect className="w-60" size="sm" items={['Uno', 'Dos', 'Tres', 'Cuatro']} />
                <Button size="sm">Small</Button>
              </div>
              <div className="flex items-start gap-2">
                <IconButton size="md" icon={<AiOutlineSearch />} />
                <Input size="md" />
                <Select size="md" items={['Uno', 'Dos']} />
                <MultiSelect className="w-60" size="md" items={['Uno', 'Dos']} />
                <Button size="md">Small</Button>
              </div>
              <div className="flex items-start gap-2">
                <IconButton size="lg" icon={<AiOutlineSearch />} />
                <Input size="lg" />
                <Select size="lg" items={['Uno', 'Dos']} />
                <MultiSelect className="w-60" size="lg" items={['Uno', 'Dos']} />
                <Button size="lg">Small</Button>
              </div>
            </div>
          </div>
        </Layout.Content>
      </Layout.Main>
    </Layout>
  )
}
