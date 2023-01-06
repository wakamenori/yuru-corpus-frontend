import { Meta, Story } from '@storybook/react'

import { CardList, Props } from './CardList'

export default {
  title: 'components/card/CardList',
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



const searchResults: Props['searchResults'] = [
  {
      "episodeId": 64,
      "utterances": [
        {
          "speaker": null,
          "timestamp": "00:07:22",
          "token": "コンピュータって"
        },
        {
          "speaker": null,
          "timestamp": "00:09:25",
          "token": "コンピュータによって魔法がっていう"
        },
        {
          "speaker": null,
          "timestamp": "00:09:52",
          "token": "明日から飲み会とかでコンピュータです"
        },
        {
          "speaker": null,
          "timestamp": "00:07:28",
          "token": "コンピュータという仕事の人いたらしいです"
        },
        {
          "speaker": null,
          "timestamp": "00:08:40",
          "token": "あんまりコンピュータって言わないんですよね"
        },
        {
          "speaker": null,
          "timestamp": "00:10:03",
          "token": "コンピュータやってることって"
        },
        {
          "speaker": null,
          "timestamp": "00:07:54",
          "token": "コンピュータと電卓は違うよ"
        },
        {
          "speaker": null,
          "timestamp": "00:07:10",
          "token": "コンピュータってどういう5元"
        },
        {
          "speaker": null,
          "timestamp": "00:10:18",
          "token": "コンピュータは"
        },
        {
          "speaker": null,
          "timestamp": "00:09:32",
          "token": "今日皆さんにはコンピュータは"
        },
        {
          "speaker": null,
          "timestamp": "00:09:21",
          "token": "ただ落合さんはコンピュータによって"
        },
        {
          "speaker": null,
          "timestamp": "00:09:47",
          "token": "コンピュータだと思うんですよ"
        },
        {
          "speaker": null,
          "timestamp": "00:09:49",
          "token": "まあいいよコンピュータで俺"
        },
        {
          "speaker": null,
          "timestamp": "00:07:01",
          "token": "今日からコンピュータ名乗れますね"
        },
        {
          "speaker": null,
          "timestamp": "00:09:07",
          "token": "僕みたいな僕でさらにコンピュータの"
        },
        {
          "speaker": null,
          "timestamp": "00:10:53",
          "token": "コンピュータのやってることって"
        },
        {
          "speaker": null,
          "timestamp": "00:07:43",
          "token": "なんでコンピュータって計算する人なんですよ"
        }
      ]
    },
    {
      "episodeId": 65,
      "utterances": [
        {
          "speaker": null,
          "timestamp": "00:19:55",
          "token": "01コンピュータの世界で"
        },
        {
          "speaker": null,
          "timestamp": "00:01:42",
          "token": "ずっとコンピュータ言語なんですかね"
        },
       {
          "speaker": null,
          "timestamp": "00:38:08",
          "token": "という感じで本日は前回に引き続いて 夜コンピュータ科学ラジオ"
        }
      ]
    },
]
export const SearchExample = Template.bind({})
Example.args = {
  summaries: summaries,
  searchResults: searchResults
}

