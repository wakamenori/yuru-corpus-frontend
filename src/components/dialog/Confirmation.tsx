import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type Props = {
  toggleDialog: () => void
  title: string
  onConfirm: () => void
  contentText: string
  cancelText?: string
  confirmText: string
}
export const Confirmation = ({
  toggleDialog,
  title,
  onConfirm,
  contentText,
  confirmText,
  cancelText = 'キャンセル',
}: Props) => {
  return (
    <Dialog
      open={true}
      onClose={toggleDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>{cancelText}</Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
