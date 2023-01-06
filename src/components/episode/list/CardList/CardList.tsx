import { Box, Grid } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'

import { SearchResult } from '../../../../feature/search/context/search'
import { useHash } from '../../../../hooks/use-hash'
import { useWindowDimensions } from '../../../../hooks/use-window-dimensions'
import { Summary } from '../../../../types/episode/summary'
import { CardRow } from '../CardRow'
import { Pagination } from '../Pagination'

export type Props = {
  summaries: Summary[]
  searchResults?: SearchResult[]
}

function chunk<T extends any[]>(arr: T, size: number) {
  return arr.reduce(
    (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
    [] as T[][],
  )
}

export const CardList = ({ summaries, searchResults }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const cardPerPage = 10
  const cardItemsSlice = summaries.slice((currentPage - 1) * cardPerPage, currentPage * cardPerPage)
  const searchResultsSlice = searchResults?.slice(
    (currentPage - 1) * cardPerPage,
    currentPage * cardPerPage,
  )
  const totalPages = Math.ceil(summaries.length / cardPerPage)
  const [hash, setHash] = useHash()

  useEffect(() => {
    if (hash) {
      setCurrentPage(Number(hash))
    }
  }, [hash])

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

  const { width } = useWindowDimensions()
  const column = width > 1200 ? 2 : 1
  let searchResultsPerRows: SearchResult[][] | undefined
  if (typeof searchResultsSlice !== 'undefined') {
    searchResultsPerRows = chunk(searchResultsSlice, column)
  }

  return (
    <Box>
      <Grid container rowSpacing={{ xs: 1, sm: 2 }}>
        {chunk(cardItemsSlice, column).map((item: Summary[], index: number) => (
          <CardRow
            summaries={item}
            key={item[0].id!}
            searchResults={searchResultsPerRows?.[index]}
          />
        ))}
      </Grid>
      <Pagination totalPages={totalPages} page={currentPage} handleChange={handleChange} />
    </Box>
  )
}
