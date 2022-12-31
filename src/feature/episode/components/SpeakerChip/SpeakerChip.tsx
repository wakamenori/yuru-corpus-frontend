import styled from 'styled-components'

export type Props = {
  backgroundColor: string
  label: string
  labelColor: string
  onClick?: () => void
}

const Container = styled.div<{ backgroundColor: string, color: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  border-radius: 8px;
  margin:  0.2rem;
  padding: 0 0.5rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

export const SpeakerChip = ({ backgroundColor, label, labelColor, onClick }: Props) => {
  if (label == "") {
    label = "〇〇"
    labelColor = backgroundColor
  }
  return (
    <Container backgroundColor={backgroundColor} color={labelColor} onClick={onClick}>
      <span>{label}</span>
    </Container>
  )
}
