import { Box } from '@mui/material'
import axios from 'axios'
import { GetStaticPropsResult, NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'

import { CardList } from '../../feature/episode/components/list/CardList'
import { Pagination } from '../../feature/episode/components/list/Pagination'
import { CardFilter } from '../../feature/episode/components/list/filter/CardFilter'
import { useCardFilter } from '../../feature/episode/hooks/use-card-filter'
import { Summary } from '../../types/episode/summary'

type Props = {
  summary: Summary[]
}
const Episode: NextPage<Props> = ({ summary }) => {
  const [page, setPage] = useState(1)
  const cardPerPage = 10
  const { filterConf, filteredSummaries } = useCardFilter(summary)

  const summarySlice = filteredSummaries.slice((page - 1) * cardPerPage, page * cardPerPage)
  const totalPages = Math.ceil(filteredSummaries.length / cardPerPage)

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    scroll.scrollToTop({ duration: 200 })
  }

  return (
    <>
      <Box marginTop={{ xs: 8, sm: 10 }} marginBottom={{ xs: 9, sm: 9 }}>
        <CardFilter filterConf={filterConf} />
        <CardList summary={summarySlice} />
      </Box>
      <Pagination totalPages={totalPages} page={page} handleChange={handleChange} />
    </>
  )
}

type SummaryResponse = {
  summary: Summary[]
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  try {
    const { data } = await axios.get<SummaryResponse>(
      `${process.env.NEXT_PUBLIC_API_ROOT}/summary/`,
    )
    return { props: { summary: data.summary.filter((summary) => summary.isAnalyzed) } }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

export default Episode
