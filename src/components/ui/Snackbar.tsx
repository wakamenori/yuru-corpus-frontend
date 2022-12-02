import { AlertProps, Alert as MuiAlert, Snackbar as MuiSnackbar } from '@mui/material'
import Stack from '@mui/material/Stack'
import { SyntheticEvent, forwardRef, useState } from 'react'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

type Props = {
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
  onClose: () => void
}

export const Snackbar = ({ message, severity, onClose }: Props) => {
  const [open, setOpen] = useState(true)
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    onClose()
    setOpen(false)
  }
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </MuiSnackbar>
    </Stack>
  )
}
