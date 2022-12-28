import { Meta, Story } from '@storybook/react'

import { Player, Props } from './Player'

export default {
  title: 'components/Player',
  component: Player,
} as Meta<Props>

const Template: Story<Props> = (args) => <Player {...args} />

export const Example = Template.bind({})
Example.args = {
  videoId: 'aaa',
}
