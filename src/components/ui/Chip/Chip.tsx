import styled from 'styled-components'

export type Props = {
  label: string
}

const StyledChip = styled.span`
  background-color: #e0e0e0;
  margin: 0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
`

export const Chip = ({ label }: Props) => {
  return <StyledChip>{label}</StyledChip>
}
