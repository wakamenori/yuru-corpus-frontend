import styled from 'styled-components'

import { SearchResult } from '../../../../feature/search/context/search'

type Props = {
  utterances: SearchResult['utterances']
}

const Container = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-top: 1px solid #ccc;

  .utterance {
    display: flex;
    height: 1rem;
    margin-bottom: 0.4rem;

    > p {
      line-height: 1rem;
      margin: 0 0.5rem 0 0;
      color: #1f2937;
      font-size: 0.7rem;
      @media (min-width: 600px) {
        font-size: 1rem;
      }
    }

    .token {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`

export const UtteranceSnippet = ({ utterances }: Props) => {
  return (
    <Container>
      {utterances.map((utterance) => {
        if (utterance.timestamp.startsWith('00:')) {
          utterance.timestamp = utterance.timestamp.slice(-5)
        }
        return (
          <div className={'utterance'} key={utterance.timestamp}>
            <p className='timestamp'>{utterance.timestamp}</p>
            <p className='token'>{utterance.token}</p>
          </div>
        )
      })}
    </Container>
  )
}
