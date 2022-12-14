import { Meta, Story } from '@storybook/react'

import { Search } from './Search'

export default {
  title: 'components/Confirmation',
  component: Search,
} as Meta

const Template: Story = () => <Search />

export const Example = Template.bind({})
