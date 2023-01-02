import styled from 'styled-components'

export type Props = {
  label: string
  color?: string
  backgroundColor?: string
}

const StyledChip = styled.div<{
  color?: string
  backgroundColor?: string
}>`
  background-color: ${(props) => props.backgroundColor || '#e0e0e0'};
  color: ${(props) => props.color || '#1F2937'};
  border-radius: 4px;
  vertical-align: middle;
  margin: 0 0.2rem 0.1rem 0;
  padding: 0.1rem 0.5rem;

  display: flex;
  align-items: center;

  > p {
    font-size: 0.8rem;
    margin: 0;
  }
  @media (max-width: 600px) {
    padding: 0 0.2rem;
    > p {
    font-size: 0.6rem;
    }
  }
`

export const Chip = ({ label, color, backgroundColor }: Props) => {
  return (
    <StyledChip color={color} backgroundColor={backgroundColor}>
      <p>{label}</p>
    </StyledChip>
  )
}
