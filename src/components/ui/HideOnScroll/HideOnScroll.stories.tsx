import { Meta, Story } from '@storybook/react'

import { HideOnScroll, Props } from './HideOnScroll'

export default {
  title: 'components/HideOnScroll',
  component: HideOnScroll,
} as Meta<Props>

const Template: Story<Props> = (args) => <HideOnScroll {...args} />

export const Example = Template.bind({})
Example.args = {
  window: () => window,
  children: <>dummy</>,
  enabled: true,
  threshold: 10,
}
