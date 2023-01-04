import { Meta, Story } from '@storybook/react'

import { SearchResult } from '../../../../feature/search/context/search'
import { Summary } from '../../../../types/episode/summary'
import { Card } from './Card'

export default {
  title: 'components/Card',
  component: Card,
} as Meta

const summary: Summary = {
  id: 0,
  videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
  title: 'aaa',
  thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
  publicationDate: '2021-03-11',
  isAnalyzed: true,
  channel: 'ゆる民俗学ラジオ',
}
const searchResult: SearchResult = {
  episodeId: 111,
  utterances: [
    {
      speaker: null,
      timestamp: '00:08:10',
      token: '東京の都ですね',
    },
    {
      speaker: null,
      timestamp: '00:08:38',
      token: '東京っていうのがこのメインを占めていて',
    },
  ],
}

const Template: Story = () => <Card summary={{ ...summary }} />
const Template2: Story = () => <Card summary={{ ...summary }} searchResult={searchResult} />

export const Example = Template.bind({})
export const Example2 = Template2.bind({})
