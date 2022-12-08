import { Switch as MuiSwitch } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

type Props = {
  checked: boolean
  toggle: () => void
  label: string
}
export const Switch = ({ checked, toggle, label }: Props) => {
  return (
    <FormGroup>
      <FormControlLabel control={<MuiSwitch checked={checked} onChange={toggle} />} label={label} />
    </FormGroup>
  )
}
