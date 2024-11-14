'use client'
import { AiOutlineComment, AiOutlineSearch, AiOutlineSetting, AiOutlineStar, AiOutlineUser } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { Avatar } from './_components2/Avatar'
import { Button } from './_components2/Button'
import { Card } from './_components2/Card'
import { DropdownMenu } from './_components2/DropdownMenu'
import { IconButton } from './_components2/IconButton'
import { Input } from './_components2/Input'
import { Modal } from './_components2/Modal'
import { MultiSelect } from './_components2/MultiSelect'
import { Select } from './_components2/Select'
import { Tag } from './_components2/Tag'
import { CustomDropdown } from './CustomDropdown'
import { Menu } from './_components2/Menu'

export default function Page() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-5">
          <Card>
            <Card.Header title="Icon buttons" />
            <Card.Body className="flex gap-5 items-center flex-wrap">
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
            </Card.Body>
          </Card>

          <Card>
            <Card.Header title="Buttons" />
            <Card.Body className="flex gap-5 items-center flex-wrap">
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
            </Card.Body>
          </Card>

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
          <div className="flex items-start gap-2 flex-wrap">
            <IconButton size="sm" icon={<AiOutlineSearch />} />
            <Input size="sm" />
            <Select className="w-60" size="sm" items={['Uno', 'Dos']} />
            <MultiSelect className="w-60" size="sm" items={['Uno', 'Dos', 'Tres', 'Cuatro']} />
            <Button size="sm">Small</Button>
          </div>
          <div className="flex items-start gap-2 flex-wrap">
            <IconButton size="md" icon={<AiOutlineSearch />} />
            <Input size="md" />
            <Select className="w-60" size="md" items={['Uno', 'Dos']} />
            <MultiSelect className="w-60" size="md" items={['Uno', 'Dos']} />
            <Button size="md">Small</Button>
          </div>
          <div className="flex items-start gap-2 flex-wrap">
            <IconButton size="lg" icon={<AiOutlineSearch />} />
            <Input size="lg" />
            <Select className="w-60" size="lg" items={['Uno', 'Dos']} />
            <MultiSelect className="w-60" size="lg" items={['Uno', 'Dos']} />
            <Button size="lg">Small</Button>
          </div>

          <Card>
            <Card.Header title="Menu" />
            <Card.Body className="flex gap-5 items-center flex-wrap">
              <Menu>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
                
                <Menu.Item>Item 7</Menu.Item>
                <Menu.Item>Item 8</Menu.Item>
                <Menu.Item>Item 9</Menu.Item>
              </Menu>
            </Card.Body>
          </Card>

          <div className="flex gap-4">
            <Card>
              <Card.Header
                className="flex gap-1"
                actions={<IconButton variant="link" shape="circle" size="sm" icon={<FiMoreHorizontal />} />}
              >
                <Avatar>N</Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">@nachogonzalez99</p>
                  <p className="text-gray-500 text-sm">Instagram</p>
                </div>
              </Card.Header>
              <Card.Body>
                <p>Content</p>
              </Card.Body>
              <Card.Footer className="flex justify-end gap-2">
                <Button variant="outlined">More info</Button>
                <Button>Settings</Button>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header className="flex flex-col" actions={<Button>Change period</Button>}>
                <p className="text-lg font-semibold">Post Activity</p>
                <p className="text-sm text-gray-500">From 15 feb - 15 May, 2024</p>
              </Card.Header>
              <Card.Body>
                <p>Content</p>
              </Card.Body>
              <Card.Footer className="flex justify-end gap-2">
                <Button variant="outlined">More info</Button>
                <Button>Settings</Button>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
