import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import { NotificationContext } from '../../../context/notification'
import { Summary } from '../../../types/episode/summary'

export const SearchContext = createContext({
  searchResult: [] as Summary[],
  isLoading: undefined as boolean | undefined,
  isError: undefined as boolean | undefined,
})
const summaryApi = async (episodeId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/summary/by_episode/${episodeId}/`
  const response = await axios.get<Summary>(url)
  return response.data
}

const searchApi = async (searchString: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/search/?string=${searchString}`
  const response = await axios.get<SearchResponse>(url)
  return response.data.result
}

type SearchResult = { episodeId: number }

type SearchResponse = {
  result: SearchResult[]
}

export const SearchContextProvider = (props: any) => {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { notify } = useContext(NotificationContext)

  useEffect(() => {
    const searchString = router.query?.string
    if (typeof searchString !== 'string') {
      return
    }
    (async () => {
        setIsError(false)
        setIsLoading(true)
        try {
          const data = await searchApi(searchString)
          const summaries = await Promise.all(
            data.map(async (episode) => {
              const summary = await summaryApi(episode.episodeId)
              return summary
            }),
          )
          setIsLoading(false)
          setSearchHistory((prev) => {
            return {
              ...prev,
              [searchString]: summaries,
            }
          })
        } catch (e) {
          setIsError(true)
          notify('エラーが発生しました もう一度検索してください', 'error')
        }
    })()
  }, [router.query, notify])

  const [searchHistory, setSearchHistory] = useState<{ [key: string]: Summary[] }>({})
  const searchResult = searchHistory[router.query.string as string] || []

  return (
    <SearchContext.Provider
      value={{ searchResult: searchResult, isError: isError, isLoading: isLoading }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
