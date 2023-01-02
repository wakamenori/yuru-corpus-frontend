import { Meta, Story } from '@storybook/react'

import { EditMode, Props } from './EditMode'

export default {
  title: 'components/EditMode',
  component: EditMode,
} as Meta<Props>

const Template: Story<Props> = (args) => <EditMode {...args} />

export const Example = Template.bind({})
Example.args = {
  reloadMorphemes: () => {},
  episodeId: 0,
  display: true,
  morphemes: [
    {
      timestamp: '00:00:01',
      speaker: 'horimoto',
      token: 'aaa',
    },
    {
      timestamp: '00:00:01',
      speaker: 'mizuno',
      token: 'bbb',
    },
  ],
  speakersInfo: {
    horimoto: {
      backgroundColor: 'black',
      color: 'white',
      count: 10,
      percentage: 30,
    },
    mizuno: {
      backgroundColor: 'pink',
      color: 'black',
      count: 5,
      percentage: 20,
    },
  },
}
