import { Meta, Story } from '@storybook/react'

import { Progress, Props } from './Progress'

export default {
  title: 'components/Progress',
  component: Progress,
} as Meta<Props>

const Template: Story<Props> = (args) => <Progress {...args} />

export const Sample = Template.bind({})
Sample.args = {
  speakersInfo: {
    key: {
      backgroundColor: 'black',
      color: 'white',
      count: 10,
      percentage: 100,
    },
  },
}
