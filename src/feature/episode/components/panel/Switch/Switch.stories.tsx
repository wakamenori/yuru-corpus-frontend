import { Meta, Story } from '@storybook/react'

import { Props, Switch } from './Switch'

export default {
  title: 'components/Switch',
  component: Switch,
} as Meta<Props>

const Template: Story<Props> = (args) => <Switch {...args} />

export const Example = Template.bind({})
Example.args = {
  checked: true,
  toggle: () => {},
  label: 'aaa',
}
