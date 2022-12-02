import { Switch as MuiSwich } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

type Props = {
  checked: boolean
  toggle: () => void
  label: string
}
export const Switch = ({ checked, toggle, label }: Props) => {
  return (
    <FormGroup onClick={toggle}>
      <FormControlLabel control={<MuiSwich checked={checked} />} label={label} />
    </FormGroup>
  )
}
