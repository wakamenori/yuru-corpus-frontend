import { Box, Grid } from '@mui/material'
import { ChangeEvent, useState, useEffect } from 'react'
import { animateScroll } from 'react-scroll'

import { useHash } from '../../../../../hooks/use-hash'
import { Summary } from '../../../../../types/episode/summary'
import { Card } from '../Card'
import { Pagination } from '../Pagination/Pagination'

export type Props = {
  summary: Summary[]
}

export const CardList = ({ summary }: Props) => {
  const [page, setPage] = useState(1)
  const cardPerPage = 10
  const summarySlice = summary.slice((page - 1) * cardPerPage, page * cardPerPage)
  const totalPages = Math.ceil(summary.length / cardPerPage)

  const [hash, setHash] = useHash()

  useEffect(() => {
    if (hash) {
      setPage(Number(hash))
    }
  }, [])


  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    setHash(value.toString())
    animateScroll.scrollToTop({ duration: 200 })
  }

  return (
    <Box>
      <Grid container rowSpacing={{ xs: 1, sm: 2 }}>
        {summarySlice.map((item) => (
          <Card {...item} key={item.id} />
        ))}
      </Grid>
      <Pagination totalPages={totalPages} page={page} handleChange={handleChange} />
    </Box>
  )
}
