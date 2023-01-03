import { Box, Grid } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'

import { useHash } from '../../../../../hooks/use-hash'
import { Summary } from '../../../../../types/episode/summary'
import { Card } from '../Card'
import { Pagination } from '../Pagination/Pagination'

export type Props = {
  summaries: Summary[]
}

export const CardList = ({ summaries }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const cardPerPage = 10
  const summarySlice = summaries.slice((currentPage - 1) * cardPerPage, currentPage * cardPerPage)
  const totalPages = Math.ceil(summaries.length / cardPerPage)
  const [hash, setHash] = useHash()

  useEffect(() => {
    if (hash) {
      setCurrentPage(Number(hash))
    }
  }, [])

  useEffect(() => {
    if (totalPages < currentPage && totalPages !== 0) {
      setCurrentPage(totalPages)
      setHash(totalPages.toString())
    }
  }, [totalPages, currentPage, setHash])

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
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
      <Pagination totalPages={totalPages} page={currentPage} handleChange={handleChange} />
    </Box>
  )
}
