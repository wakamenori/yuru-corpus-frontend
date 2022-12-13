import { Meta, Story } from '@storybook/react'

import { Card } from './Card'

export default {
  title: 'components/Card',
  component: Card,
} as Meta

const Template: Story = () => <Card />

export const Sample = Template.bind({})
