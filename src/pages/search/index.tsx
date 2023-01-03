import { Box, CircularProgress } from '@mui/material'
import { NextPage } from 'next'
import { ChangeEvent, useContext,  useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'

import { CardList } from '../../feature/episode/components/list/CardList'
import { Pagination } from '../../feature/episode/components/list/Pagination'
import { SearchContext } from '../../feature/search/context/search'


const Search: NextPage = () => {
  const { isLoading, searchResult } = useContext(SearchContext)
  const summary = searchResult
  const [page, setPage] = useState(1)
  const cardPerPage = 10
  const filteredSummary = summary.filter((episode) => {
    return summary.filter((e) => e.id === episode.id).length === 1
  })
  const summarySlice = filteredSummary.slice((page - 1) * cardPerPage, page * cardPerPage)
  const totalPages = Math.ceil(filteredSummary.length / cardPerPage)

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    scroll.scrollToTop({ duration: 200 })
  }
  return (
    <>
      <Box marginTop={{ xs: 9, sm: 11 }} marginLeft={3}>
        {isLoading && summary.length == 0 ? <CircularProgress /> : <p>検索結果:{filteredSummary.length}件</p>}
      </Box>
      <Box marginBottom={{ xs: 9, sm: 9 }}>
        <CardList summary={summarySlice} />
      </Box>

      <Pagination totalPages={totalPages} page={page} handleChange={handleChange} />
    </>
  )
}

export default Search
