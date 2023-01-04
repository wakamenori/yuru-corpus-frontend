import { Box, CircularProgress } from '@mui/material'
import { NextPage } from 'next'
import { useContext } from 'react'

import { CardList } from '../../components/episode/list/CardList'
import { SearchContext } from '../../feature/search/context/search'

const Search: NextPage = () => {
  const { isLoading, searchResult, summaries } = useContext(SearchContext)
  return (
    <>
      <Box marginTop={{ xs: 9, sm: 11 }} marginLeft={3}>
        {isLoading && searchResult.length == 0 ? (
          <CircularProgress />
        ) : (
          <p>検索結果:{searchResult.length}件</p>
        )}
      </Box>
      <Box marginBottom={{ xs: 9, sm: 9 }}>
        <CardList searchResults={searchResult} summaries={summaries} />
      </Box>
    </>
  )
}

export default Search
