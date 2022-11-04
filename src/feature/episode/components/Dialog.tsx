import { useState } from "react";
import Button from '@mui/material/Button';
import { Dialog as MuiDialog, CircularProgress, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@mui/material"

import { Cancel, Delete } from "@mui/icons-material";

type Props = {
  title: string;
  content: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export const Dialog = ({ title, content, cancelText, confirmText, onConfirm, onClose }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confirmHandler = async () => {
    setIsSubmitting(true);
    await onConfirm()
    onClose()
    setIsSubmitting(false);
  }

  return (
    <div>
      <MuiDialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} startIcon={<Cancel />} variant="outlined">{cancelText}</Button>
          <Button onClick={confirmHandler} startIcon={isSubmitting ? <CircularProgress size={24} /> : <Delete />} variant="outlined" autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
}
