import { Meta, Story } from '@storybook/react'

import { Chip, Props } from './Chip'

export default {
  title: 'components/Chip',
  component: Chip,
} as Meta<Props>

const Template: Story<Props> = (args) => <Chip {...args} />

export const Sample = Template.bind({})
Sample.args = {
  label: 'aaa',
}
