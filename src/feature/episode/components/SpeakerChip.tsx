import styled from 'styled-components'

type Props = {
  backgroundColor: string
  label: string
  labelColor: string
  onClick?: () => void
}

const Container = styled.div<{ backgroundColor: string; color: string }>`
  background-color: ${(props) => props.backgroundColor};
  font-size: 0.8rem;
  color: ${(props) => props.color};
  margin: 0 0.1rem;
  padding: 0 0.5rem;
  border-radius: 4px;
  width: 3rem;
  height: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const SpeakerChip = ({ backgroundColor, label, labelColor, onClick }: Props) => {
  return (
    <Container backgroundColor={backgroundColor} color={labelColor} onClick={onClick}>
      <span>{label}</span>
    </Container>
  )
}
