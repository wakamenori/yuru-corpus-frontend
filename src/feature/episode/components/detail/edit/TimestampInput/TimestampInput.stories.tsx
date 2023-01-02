import { Meta, Story } from '@storybook/react'

import { Props, TimestampInput } from './TimestampInput'

export default {
  title: 'components/TimestampInput',
  component: TimestampInput,
} as Meta<Props>

const Template: Story<Props> = (args) => <TimestampInput {...args} />

export const Example = Template.bind({})
Example.args = {
  isValid: true,
  isEdit: true,
  options: {},
  onClick: () => {},
  inactiveColor: 'pink',
  defaultTimestamp: '00:00:00',
}
