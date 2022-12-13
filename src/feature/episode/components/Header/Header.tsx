import { ArrowBack } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export type Props = {
  title: string
  hideOnScloll?: boolean
}

const Title = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
`

export const Header = ({ title, hideOnScloll }: Props) => {
  const router = useRouter()
  const backHandler = () => {
    router.back()
  }
  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <IconButton
          onClick={backHandler}
          size='large'
          edge='start'
          aria-label='open drawer'
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Title>{title}</Title>
      </Toolbar>
    </AppBar>
  )
}
