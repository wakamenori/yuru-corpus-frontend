import styled from 'styled-components'

import { channelThemes } from '../../../../../../styles/themes'

export type Props = {
  name: string
  onClick?: () => void
  isActive: boolean
  size?: 'small' | 'medium' | 'large'
}

const Container = styled.p<{
  backgroundColor0: string
  backgroundColor1?: string
  textColor: string
  clickable: boolean
  size?: 'small' | 'medium' | 'large'
}>`
  margin: 0.4rem 0.4rem 0.4rem 0;
  ${(props) =>
    props.backgroundColor1
      ? `background: linear-gradient(120deg, ${props.backgroundColor0} 0%, ${props.backgroundColor0} 50%, ${props.backgroundColor1} 50%, ${props.backgroundColor1} 100%);`
      : `background-color: ${props.backgroundColor0};`}
  color: ${(props) => props.textColor};
  display: inline-block;
  padding: 0.1rem 0.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  foontweight: bold;
  border-radius: 4px;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  ${(props) => {
    if (props.size === 'small') {
      return `padding: 0rem 0.2rem;
      margin:  0.2rem 0.2rem 0.2rem 0;
      > span{
      font-size: 0.8rem;
    }
    `
    }
  }}
`

export const ChannelNameChip = ({ name, onClick, isActive, size }: Props) => {
  const backgroundColor0 = isActive ? channelThemes[name].backgroundColor : '#D1D5DB'
  const backgroundColor1 = isActive ? channelThemes[name].backgroundColor1 : '#D1D5DB'
  const textColor = isActive ? channelThemes[name].color : '#374151'

  return (
    <Container
      backgroundColor0={backgroundColor0}
      backgroundColor1={backgroundColor1}
      textColor={textColor}
      onClick={onClick}
      clickable={!!onClick}
      size={size}
    >
      <span>{name}</span>
    </Container>
  )
}
