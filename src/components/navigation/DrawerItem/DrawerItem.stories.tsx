import { Meta, Story } from '@storybook/react'

import { DrawerItem, Props } from './DrawerItem'

export default {
  title: 'components/Confirmation',
  component: DrawerItem,
} as Meta<Props>

const Template: Story<Props> = (args) => <DrawerItem {...args} />

export const Example = Template.bind({})
Example.args = {
  icon: <>dummy</>,
  text: 'aaa',
  onClick: () => {},
}
