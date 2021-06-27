import React from 'react'
import { Story, Meta } from '@storybook/react'
import TopBar from './Topbar'

export default {
  title: 'components/TopBar',
  component: TopBar,
} as Meta

const Template: Story = (args) => (
  <div className="h-16 bg-white">
    <TopBar {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
