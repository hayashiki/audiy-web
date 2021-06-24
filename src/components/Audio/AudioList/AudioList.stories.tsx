import React from 'react';
import { Meta, Story } from '@storybook/react'
import { AudioList, AudioListProps } from '@/components/Audio/AudioList/AudioList'
import { mockAudioListData } from '@/components/Audio/AudioList/AudioText.example'

export default {
  title: 'components/AudioList',
  component: AudioList,
} as Meta

const Template: Story<AudioListProps> = (args) => (
  <div className="h-16 bg-white">
    <AudioList {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  audios: mockAudioListData,
}
