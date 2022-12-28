import { Meta, Story } from '@storybook/react'

import { Logo } from './Logo'

export default {
  title: 'components/Confirmation',
  component: Logo,
} as Meta

const Template: Story = () => <Logo />

export const Example = Template.bind({})
