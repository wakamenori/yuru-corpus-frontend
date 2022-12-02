import styled from 'styled-components'

import { SpeakerInfo } from '../../types/speaker'

type Props = {
  speakersInfo: SpeakerInfo
}

const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  height: 0.5rem;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  background-color: #d1d5db;
`

const Bar = styled.div<{ backgroundColor: string; width: number }>`
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width}%;
`

export const Progress = ({ speakersInfo }: Props) => {
  const speakers = Object.entries(speakersInfo)
    .filter(([name, _]) => name !== '')
    .map(([_, info]) => {
      return { color: info.backgroundColor, width: info.percentage || 0 }
    })
    .sort((a, b) => b.width - a.width)

  return (
    <Container>
      {speakers.map((speaker, index) => {
        return <Bar key={index} backgroundColor={speaker.color} width={speaker.width} />
      })}
    </Container>
  )
}
