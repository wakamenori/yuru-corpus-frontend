import { Meta, Story } from '@storybook/react'

import { Props, UtteranceEditor } from './UtteranceEditor'

export default {
  title: 'components/UtteranceEditor',
  component: UtteranceEditor,
} as Meta<Props>

const Template: Story<Props> = (args) => <UtteranceEditor {...args} />

export const Example = Template.bind({})
Example.args = {
  token: 'aaa',
  episodeId: 0,
  speakerName: 'horimoto',
  speakerNameColor: 'white',
  speakerBackgroundColor: 'black',
  timestamp: '00:00:00',
  onReload: () => {},
  isOdd: true,
}
