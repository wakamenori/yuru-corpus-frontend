import styled from 'styled-components'

export type Props = {
  label: string
  color?: string
  backgroundColor?: string
}

const StyledChip = styled.span<{
  color?: string
  backgroundColor?: string
}>`
  background-color: ${(props) => props.backgroundColor || '#e0e0e0'};
  color: ${(props) => props.color || '#1F2937'};
  margin: 0 0 0 0.5rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
`

export const Chip = ({ label, color, backgroundColor }: Props) => {
  return <StyledChip color={color} backgroundColor={backgroundColor}>{label}</StyledChip>
}
