import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

import { NotificationContext } from '../../../context/notification'
import { useRouter } from '../../../hooks/use-router'
import { event } from '../../../lib/gtag'
import { Summary } from '../../../types/episode/summary'

export type SearchResult = {
  episodeId: number
  utterances: {
    speaker: string | null
    timestamp: string
    token: string
  }[]
}

export const SearchContext = createContext({
  searchResult: [] as SearchResult[],
  summaries: [] as Summary[],
  isLoading: undefined as boolean | undefined,
  isError: undefined as boolean | undefined,
  searchString: undefined as string | undefined,
})
const summaryApi = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/summary/`
  const response = await axios.get<{ summary: Summary[] }>(url)
  return response.data.summary
}

const searchApi = async (searchString: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/search/?string=${searchString}`
  const response = await axios.get<{ result: SearchResult[] }>(url)
  event({
    action: 'search',
    category: 'query string',
    label: searchString,
  })
  return response.data.result
}

export const SearchContextProvider = (props: any) => {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [summaries, setSummaries] = useState([] as Summary[])

  useEffect(() => {
    ;(async () => {
      const allSummaries = await summaryApi()
      setSummaries(allSummaries)
    })()
  }, [])

  const { notify } = useContext(NotificationContext)

  useEffect(() => {
    const searchString = router.query?.string
    if (typeof searchString !== 'string') {
      return
    }
    ;(async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const data = await searchApi(searchString)
        const result = data.map((result) => ({
          ...result,
        }))
        setIsLoading(false)
        setSearchHistory((prev) => {
          return {
            ...prev,
            [searchString]: result,
          }
        })
      } catch (e) {
        setIsError(true)
        notify('エラーが発生しました もう一度検索してください', 'error')
      }
    })()
  }, [router.query, notify])

  const [searchHistory, setSearchHistory] = useState<{ [key: string]: SearchResult[] }>({})

  const searchResult = searchHistory[router.query.string as string] || []
  const matchedSummaries = searchResult
    .map((result) => summaries.find((summary) => summary.id === result.episodeId))
    .filter((summary): summary is Summary => summary !== undefined)

  let searchString = router.query?.string
  if (typeof searchString !== 'string') {
    searchString = undefined
  }

  return (
    <SearchContext.Provider
      value={{
        searchResult: searchResult,
        isError: isError,
        isLoading: isLoading,
        summaries: matchedSummaries,
        searchString: searchString,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
