import { Meta, Story } from '@storybook/react'

import { Props, SpeakerDialog } from './SpeakerDialog'

export default {
  title: 'components/SpeakerDialog',
  component: SpeakerDialog,
} as Meta<Props>

const Template: Story<Props> = (args) => <SpeakerDialog {...args} />

export const Example = Template.bind({})
Example.args = {
  open: true,
  onSelect: () => {},
  onClose: () => {},
}
