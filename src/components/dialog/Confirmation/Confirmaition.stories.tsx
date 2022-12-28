import { Meta, Story } from '@storybook/react'

import { Confirmation, Props } from './Confirmation'

export default {
  title: 'components/Confirmation',
  component: Confirmation,
} as Meta<Props>

const Template: Story<Props> = (args) => <Confirmation {...args} />

export const Example = Template.bind({})
Example.args = {
  toggleDialog: () => {},
  title: 'aaa',
  onConfirm: () => {},
  contentText: 'aaa',
  cancelText: 'aaa',
  confirmText: 'aaa',
}
