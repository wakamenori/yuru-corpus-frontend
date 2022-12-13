import { Meta, Story } from '@storybook/react'

import { Header, Props } from './Header'

export default {
  title: 'components/Header',
  component: Header,
} as Meta<Props>

const Template: Story<Props> = (args) => <Header {...args} />

export const Sample = Template.bind({})
Sample.args = {
  title: 'aaa',
  hideOnScloll: true,
}
