import { Box, CircularProgress } from '@mui/material'
import axios from 'axios'
import { GetStaticPropsResult, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'

import { NotificationContext } from '../../context/notification'
import { CardList } from '../../feature/episode/components/CardList'
import { Pagination } from '../../feature/episode/components/Pagination'
import { Summary } from '../../types/episode/summary'

type Props = {}

type SearchResult = { episodeId: number }

type SearchResponse = {
  result: SearchResult[]
}
const searchApi = async (searchString: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/search/?string=${searchString}`
  const response = await axios.get<SearchResponse>(url)
  return response.data.result
}
const summaryApi = async (episodeId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/summary/by_episode/${episodeId}/`
  const response = await axios.get<Summary>(url)
  return response.data
}

const Search: NextPage<Props> = ({}) => {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<Summary[]>([])
  const { notify } = useContext(NotificationContext)
  useEffect(() => {
    setSummary([])
    if (typeof router.query?.string === 'string') {
      setLoading(true)
      searchApi(router.query.string)
        .then((data) => {
          setIsError(false)
          setLoading(false)
          data.map((episode) => {
            summaryApi(episode.episodeId)
              .then((data) => {
                setSummary((prev) => [...prev, data])
              })
              .catch((e) => console.log(e))
          })
        })
        .catch((e) => {
          setIsError(true)
          setLoading(false)
          notify('エラーが発生しました もう一度検索してください', 'error')
          console.log(e)
        })
    }
  }, [router.query, notify])

  const [page, setPage] = useState(1)
  const cardPerPage = 10
  const filteredSummary = summary.filter((episode) => {
    return summary.filter((e) => e.id === episode.id).length === 1
  })
  console.log({ filteredSummary })
  const summarySlice = filteredSummary.slice((page - 1) * cardPerPage, page * cardPerPage)
  console.log({ summarySlice })
  const totalPages = Math.ceil(filteredSummary.length / cardPerPage)

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    scroll.scrollToTop({ duration: 200 })
  }
  return (
    <>
      <Box marginTop={{ xs: 9, sm: 11 }}  marginLeft={3}>
        {loading ? <CircularProgress /> : <p>検索結果:{filteredSummary.length}件</p>}
      </Box>
      <CardList summary={summarySlice} />

      <Pagination totalPages={totalPages} page={page} handleChange={handleChange} />
    </>
  )
}

type SummaryResponse = {
  summary: Summary[]
}

// export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
//   try {
//     const { data } = await axios.get<SummaryResponse>(
//       `${process.env.NEXT_PUBLIC_API_ROOT}/summary/`,
//     )
//     return { props: { summary: data.summary.filter((summary) => summary.isAnalyzed) } }
//   } catch (error) {
//     console.log(error)
//     return { notFound: true }
//   }
// }

export default Search
