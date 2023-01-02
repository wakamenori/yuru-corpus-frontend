import FilterListIcon from '@mui/icons-material/FilterList'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import styled from 'styled-components'

export type Props = {
  onClick: () => void
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#2D5F8B',
    },
  },
})

export const FilterButton = ({ onClick }: Props) => {
  return (
    <ThemeProvider theme={theme}>
    <Button color={'primary'} onClick={onClick} startIcon={<FilterListIcon />}>
      フィルター
    </Button>
    </ThemeProvider>
  )
}
