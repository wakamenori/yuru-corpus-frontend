import { Meta, Story } from '@storybook/react'

import { Props, TokenInput } from './TokenInput'

export default {
  title: 'components/TokenInput',
  component: TokenInput,
} as Meta<Props>

const Template: Story<Props> = (args) => <TokenInput {...args} />

export const Example = Template.bind({})
Example.args = {
  isValid: true,
  isEdit: true,
  isDirty: true,
  onClick: () => {},
  inactiveColor: 'gray',
  defaultToken: 'aaa',
}
