import { Meta, Story } from '@storybook/react'

import { Dialog, Props } from './Dialog'

export default {
  title: 'components/Dialog',
  component: Dialog,
} as Meta<Props>

const Template: Story<Props> = (args) => <Dialog {...args} />

export const Example = Template.bind({})
Example.args = {
  title: 'aaa',
  content: 'aaa',
  cancelText: 'aaa',
  confirmText: 'aaa',
  onConfirm: async () => {},
  onClose: () => {},
}
