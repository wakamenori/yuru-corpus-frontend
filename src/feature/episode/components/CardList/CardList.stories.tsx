import { Meta, Story } from '@storybook/react'

import { CardList, Props } from './CardList'

export default {
  title: 'components/CardList',
  component: CardList,
} as Meta<Props>

const Template: Story<Props> = (args) => <CardList {...args} />

const summaries = [
  {
    id: 0,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'aaa',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
  },
]

export const Example = Template.bind({})
Example.args = {
  summary: summaries,
}
