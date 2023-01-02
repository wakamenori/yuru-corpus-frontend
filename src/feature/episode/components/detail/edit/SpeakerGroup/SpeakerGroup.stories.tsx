import { Meta, Story } from '@storybook/react'

import { allSpeakers } from '../../../../../../utils/speakers'
import { Props, SpeakerGroup } from './SpeakerGroup'

export default {
  title: 'components/SpeakerGroup',
  component: SpeakerGroup,
} as Meta<Props>

const Template: Story<Props> = (args) => <SpeakerGroup {...args} />

export const Example = Template.bind({})
Example.args = {
  groupName: 'ゆる言語学ラジオ',
  speakers: allSpeakers['ゆる言語学ラジオ'],
  onSelect: () => {},
}
