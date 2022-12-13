import { memo } from 'react'
import styled from 'styled-components'

export type Props = {
  videoId: string
}

const StyledWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  overflow: hidden;
  width: 100%;
  z-index: 100;

  & iframe {
    overflow: hidden;
    border: 0;
    align-self: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
export const Player = memo(function Player({ videoId }: Props) {
  return (
    <StyledWrapper>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </StyledWrapper>
  )
})
