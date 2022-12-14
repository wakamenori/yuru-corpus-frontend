import { Meta, Story } from '@storybook/react'

import { AddNew, Props } from './AddNew'

export default {
  title: 'components/AddNew',
  component: AddNew,
} as Meta<Props>

const Template: Story<Props> = (args) => <AddNew {...args} />

export const Example = Template.bind({})
Example.args = {
  episodeId: 0,
  onReload: () => {},
}
