import { Meta, Story } from '@storybook/react'

import { CardList, Props } from './CardList'

export default {
  title: 'components/CardList',
  component: CardList,
} as Meta<Props>

const Template: Story<Props> = (args) => <CardList {...args} />

export const Sample = Template.bind({})
Sample.args = {
  summary: [],
}
