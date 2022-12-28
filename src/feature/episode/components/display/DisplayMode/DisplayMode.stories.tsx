import { Meta, Story } from '@storybook/react'

import { DisplayMode, Props } from './DisplayMode'

export default {
  title: 'components/DisplayMode',
  component: DisplayMode,
} as Meta<Props>

const Template: Story<Props> = (args) => <DisplayMode {...args} />

export const Visible = Template.bind({})
Visible.args = {
  speakersInfo: {
    aaa: {
      backgroundColor: 'black',
      color: 'white',
      count: 10,
      percentage: 90,
    },
  },
  morphemesBySpeaker: [
    {
      speaker: 'aaa',
      morphemes: [
        {
          timestamp: '00:00:01',
          speaker: 'aaa',
          token: 'aaa',
        },
      ],
    },
  ],
  display: true,
}

export const Hidden = Template.bind({})
Hidden.args = {
  speakersInfo: {
    aaa: {
      backgroundColor: 'black',
      color: 'white',
      count: 10,
      percentage: 90,
    },
  },
  morphemesBySpeaker: [
    {
      speaker: 'aaa',
      morphemes: [
        {
          timestamp: '00:00:01',
          speaker: 'aaa',
          token: 'aaa',
        },
      ],
    },
  ],
  display: false,
}
