import { Story, Meta } from '@storybook/react'
import React from 'react'

import { UserInfo } from '@/types/userInfo'

import TopBar from './Topbar'

export default {
  title: 'components/TopBar',
  component: TopBar,
} as Meta

const userInfo = {
  id: '1111',
  name: 'hayashiki',
  email: 'hayashiki@example.com',
  imageUrl: 'http://localhost/image/1111',
} as unknown as UserInfo

const TopBarProps = {
  userInfo: {
    id: '1111',
    name: 'hayashiki',
    email: 'hayashiki@example.com',
    imageUrl: 'http://localhost/image/1111',
  } as unknown as UserInfo,
}

const Template: Story = (args) => (
  <div className="h-16 bg-white">
    <TopBar userDTO={args.userInfo} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  userInfo: userInfo,
}
