import { Meta, Story } from '@storybook/react'

import { Drawer, Props } from './Drawer'

export default {
  title: 'components/Drawer',
  component: Drawer,
} as Meta<Props>

const Template: Story<Props> = (args) => <Drawer {...args} />

export const Sample = Template.bind({})
Sample.args = {
  appBarRowNumber: 3,
  open: true,
  toggleDrawer: () => {},
  closeHandler: () => {},
}
