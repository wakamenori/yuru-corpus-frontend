import { Meta, Story } from '@storybook/react'

import { FilterButton, Props } from './FilterButton'

export default {
  title: 'components/FilterButton',
  component: FilterButton,
} as Meta<Props>

const Template: Story<Props> = (args) => <FilterButton {...args} />

export const Example = Template.bind({})
Example.args = {
  onClick: () => {},
}
