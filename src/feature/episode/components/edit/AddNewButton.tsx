import { Add, HighlightOff } from '@mui/icons-material'
import { Fab } from '@mui/material'
import styled from 'styled-components'

type Props = {
  onReload: () => void
  isAddNew: boolean
  toggleAddNew: () => void
}

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  border-radius: 8px;
`

export const AddNewButton = ({ onReload, isAddNew, toggleAddNew }: Props) => {
  return (
    <>
      <StyledFab aria-label='add' onClick={toggleAddNew}>
        {isAddNew ? <HighlightOff /> : <Add />}
      </StyledFab>
    </>
  )
}
