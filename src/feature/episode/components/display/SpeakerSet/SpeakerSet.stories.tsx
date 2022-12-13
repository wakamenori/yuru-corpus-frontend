import { Meta, Story } from '@storybook/react'

import { Props, SpeakerSet } from './SpeakerSet'

export default {
  title: 'components/SpeakerSet',
  component: SpeakerSet,
} as Meta<Props>

const Template: Story<Props> = (args) => <SpeakerSet {...args} />

export const Sample = Template.bind({})
Sample.args = {
  morphemes: [
    {
      timestamp: '00:00:01',
      speaker: 'aaa',
      token: 'aaa',
    },
  ],
  speakerColor: 'pink',
}
