import { Meta, Story } from '@storybook/react'

import { Pagination, Props } from './Pagination'

export default {
  title: 'components/Pagination',
  component: Pagination,
} as Meta<Props>

const Template: Story<Props> = (args) => <Pagination {...args} />

export const Sample = Template.bind({})
Sample.args = {
  totalPages: 10,
  page: 2,
  handleChange: () => {},
}
