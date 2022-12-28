import { Add, HighlightOff } from '@mui/icons-material'
import { Fab } from '@mui/material'
import styled from 'styled-components'

export type Props = {
  isAddNew: boolean
  onClick: () => void
}

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`

export const AddNewButton = ({ isAddNew, onClick }: Props) => {
  return (
    <>
      <StyledFab aria-label='add' onClick={onClick}>
        {isAddNew ? <HighlightOff /> : <Add />}
      </StyledFab>
    </>
  )
}
