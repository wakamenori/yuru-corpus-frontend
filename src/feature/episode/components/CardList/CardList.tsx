import { Box, Grid } from '@mui/material'

import { Summary } from '../../../../types/episode/summary'
import { Card } from '../Card'

export type Props = {
  summary: Summary[]
}

export const CardList = ({ summary }: Props) => {
  return (
    <Box>
      <Grid container rowSpacing={{ xs: 1, sm: 2 }}>
        {summary.map((item) => (
          <Card {...item} key={item.id} />
        ))}
      </Grid>
    </Box>
  )
}
