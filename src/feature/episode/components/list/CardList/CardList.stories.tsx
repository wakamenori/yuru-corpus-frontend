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
    channel: 'ゆる言語学ラジオ',
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆるコンピュータ科学ラジオ',
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる学徒ハウス',
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる書道学ラジオ',
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる哲学ラジオ',
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
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる生態学ラジオ',
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる民俗学ラジオ',
  },
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
    title: 'bbb',
    thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
    publicationDate: '2021-03-11',
    isAnalyzed: true,
    channel: 'ゆる音楽学ラジオ',
  },
]

export const Example = Template.bind({})
Example.args = {
  summaries: summaries,
}
