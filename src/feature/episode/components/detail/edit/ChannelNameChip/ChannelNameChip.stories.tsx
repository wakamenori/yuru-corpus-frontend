import { Meta, Story } from '@storybook/react'

import { Props, ChannelNameChip } from './ChannelNameChip'

export default {
  title: 'components/ChannelNaneChip',
  component: ChannelNameChip,
} as Meta<Props>

const Template: Story<Props> = (args) => <ChannelNameChip{...args} />

export const Example = Template.bind({})
Example.args = {
  name: 'ゆる言語学ラジオ',
  isActive: true,
}
