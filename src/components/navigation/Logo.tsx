import Typography from '@mui/material/Typography'
import * as React from 'react'

export const Logo = () => {
  return (<>          <Typography
    variant="h6"
    noWrap
    component="div"
    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
  >
    ゆるコーパス
  </Typography>
  </>)
}