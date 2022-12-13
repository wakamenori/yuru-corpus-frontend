import { Meta, Story } from '@storybook/react'

import { Props, SpeakerChip } from './SpeakerChip'

export default {
  title: 'components/SpeakerChip',
  component: SpeakerChip,
} as Meta<Props>

const Template: Story<Props> = (args) => <SpeakerChip {...args} />

export const Sample = Template.bind({})
Sample.args = {
  backgroundColor: 'black',
  label: 'aaa',
  labelColor: 'white',
  onClick: () => {},
}
