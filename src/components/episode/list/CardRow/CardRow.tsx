import styled from 'styled-components'

import { SearchResult } from '../../../../feature/search/context/search'
import { Summary } from '../../../../types/episode/summary'
import { Card } from '../Card'

export type Props = {
  summaries: Summary[]
  searchResults?: SearchResult[]
}
const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`

export const CardRow = ({ summaries, searchResults }: Props) => {
  return (
    <Container>
      {summaries.map((item, index) => (
        <Card summary={item} key={item.id!} searchResult={searchResults?.[index]} />
      ))}
    </Container>
  )
}
