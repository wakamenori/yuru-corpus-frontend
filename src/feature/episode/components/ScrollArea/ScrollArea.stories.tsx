import { Meta, Story } from '@storybook/react'

import { Props, ScrollArea } from './ScrollArea'

export default {
  title: 'components/ScrollArea',
  component: ScrollArea,
} as Meta<Props>

const Template: Story<Props> = (args) => <ScrollArea {...args} />

export const Sample = Template.bind({})
Sample.args = {
  isEdit: true,
  reloadMorphemes: () => {},
  speakersInfo: {},
  episodeId: 1,
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
  morphemes: [],
}
