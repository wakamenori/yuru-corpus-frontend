import { Meta, Story } from '@storybook/react'
import { Props, CardRow } from './CardRow'

export default {
  title: 'components/card/CardRow',
  component: CardRow,
} as Meta

const Template: Story<Props> = (args) => <CardRow {...args} />

const summaries = [
  {
    id: 0,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'aaa',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる言語学ラジオ',
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる天文学ラジオ',
  },
]

export const Example = Template.bind({})
Example.args = {
  summaries: summaries,
}
