import { Meta, Story } from '@storybook/react'

import { Props, SpeakerGroup } from './SpeakerGroup'

export default {
  title: 'components/SpeakerGroup',
  component: SpeakerGroup,
} as Meta<Props>

const Template: Story<Props> = (args) => <SpeakerGroup {...args} />

export const Example = Template.bind({})
Example.args = {
  groupName: 'ゆる言語学ラジオ',
  speakers: {
    '水野 大貴': { fullName: '水野' },
    '堀元 見': { fullName: '堀元' },
    '嶋村 貢志': { fullName: '嶋村' },
    '福田 純也': { fullName: '福田' },
    '黒島 規史': { fullName: '黒島' },
  },
  onSelect: () => {},
  // onClose: () => {},
  groupBackgroundColor: '#E7DBD0',
  groupTextColor: '#1F2937',
}
