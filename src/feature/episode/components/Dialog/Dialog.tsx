import { Cancel, Delete } from '@mui/icons-material'
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'

export type Props = {
  title: string
  content: string
  cancelText: string
  confirmText: string
  onConfirm: () => Promise<void>
  onClose: () => void
}

export const Dialog = ({ title, content, cancelText, confirmText, onConfirm, onClose }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const confirmHandler = async () => {
    setIsSubmitting(true)
    await onConfirm()
    onClose()
    setIsSubmitting(false)
  }

  return (
    <div>
      <MuiDialog
        open={true}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} startIcon={<Cancel />} variant='outlined'>
            {cancelText}
          </Button>
          <Button
            onClick={confirmHandler}
            startIcon={isSubmitting ? <CircularProgress size={24} /> : <Delete />}
            variant='outlined'
            autoFocus
          >
            {confirmText}
          </Button>
        </DialogActions>
      </MuiDialog>
    </div>
  )
}
