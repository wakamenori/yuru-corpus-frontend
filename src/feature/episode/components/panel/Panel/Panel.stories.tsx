import { Meta, Story } from '@storybook/react'

import { Panel, Props } from './Panel'

export default {
  title: 'components/Panel',
  component: Panel,
} as Meta<Props>

const Template: Story<Props> = (args) => <Panel {...args} />

export const Sample = Template.bind({})
Sample.args = {
  isEdit: true,
  toggleIsEdit: () => {},
  speakersInfo: {
    key: {
      backgroundColor: 'black',
      color: 'white',
      count: 10,
      percentage: 100,
    },
  },
}
