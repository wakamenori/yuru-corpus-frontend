import { Meta, Story } from '@storybook/react'

import { AppBar } from './AppBar'

export default {
  title: 'components/AppBar',
  components: AppBar,
} as Meta

const Template: Story = () => <AppBar />

export const Sample = Template.bind({})
