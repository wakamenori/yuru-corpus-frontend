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
  speakersInfo: {
    horimoto: {
      backgroundColor: 'black',
      color: 'white',
      count: 10,
      percentage: 30,
    },
  },
  episodeId: 1,
  morphemesBySpeaker: [
    {
      speaker: 'horimoto',
      morphemes: [
        {
          timestamp: '00:00:01',
          speaker: 'horimoto',
          token: 'aaa',
        },
      ],
    },
  ],
  morphemes: [],
}
