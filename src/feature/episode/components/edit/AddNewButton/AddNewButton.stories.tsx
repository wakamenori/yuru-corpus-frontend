import { Meta, Story } from '@storybook/react'

import { AddNewButton, Props } from './AddNewButton'

export default {
  title: 'components/AddNewButton',
  component: AddNewButton,
} as Meta<Props>

const Template: Story<Props> = (args) => <AddNewButton {...args} />

export const Example = Template.bind({})
Example.args = {
  isAddNew: true,
  onClick: () => {},
}
