import { Meta, Story } from '@storybook/react'

import { Card } from './Card'

export default {
  title: 'components/Card',
  component: Card,
} as Meta

const summary = {
  id: 0,
  videoUrl: 'https://www.youtube.com/watch?v=2YY9DT4uDh0',
  title: 'aaa',
  thumbnailUrl: 'https://i.ytimg.com/vi/2YY9DT4uDh0/sddefault.jpg',
  publicationDate: '2021-03-11',
  isAnalyzed: true,
}

const Template: Story = () => <Card {...summary} />

export const Example = Template.bind({})
